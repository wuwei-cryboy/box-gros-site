import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { srcSetFor } from "@/lib/img";
import { ImageViewer } from "@/components/image-viewer";

const SWIPE_THRESHOLD_PX = 60;

export function ProductGallery({ src, gallery, alt, className }: { src: string; gallery?: string[]; alt: string; className?: string }) {
  const images = useMemo(
    () => (gallery && gallery.length > 0 ? gallery : [src]),
    [gallery, src],
  );
  const [active, setActive] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  // 滑动后紧接着会触发一次 click：拖动距离超过 10px 时屏蔽这次点击，避免误开查看器
  const suppressClickRef = useRef(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    dx: number;
    dragging: boolean;
    horizontal: boolean | null;
  } | null>(null);
  const main = images[active] ?? src;
  const mainSrcSet = srcSetFor(main);

  // 预加载相邻图片：滑动切换时不再先闪空白
  useEffect(() => {
    [active - 1, active + 1].forEach((index) => {
      const url = images[index];
      if (!url) return;
      const im = new Image();
      const set = srcSetFor(url);
      if (set) {
        im.srcset = set;
        im.sizes = "(max-width: 1024px) 100vw, 50vw";
      }
      im.src = url;
    });
  }, [active, images]);

  // 滑动后把当前缩略图滚到可见位置
  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-thumb="${active}"]`);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [active]);

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    dragRef.current = { startX: t.clientX, startY: t.clientY, dx: 0, dragging: true, horizontal: null };
  }

  function onTouchMove(e: React.TouchEvent) {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !drag.dragging || !track) return;
    const t = e.touches[0];
    const dx = t.clientX - drag.startX;
    const dy = t.clientY - drag.startY;
    if (drag.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      drag.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!drag.horizontal) {
        // 纵向滑动：交给页面滚动，不拦截
        drag.dragging = false;
        return;
      }
      track.style.transition = "none";
    }
    if (!drag.horizontal) return;
    drag.dx = dx;
    track.style.transform = `translateX(calc(${-active * 100}% + ${dx}px))`;
  }

  function onTouchEnd() {
    const drag = dragRef.current;
    const track = trackRef.current;
    dragRef.current = null;
    if (!drag || !track) return;
    if (drag.horizontal && Math.abs(drag.dx) > 10) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 120);
    }
    // 恢复过渡并回到吸附位置；若 setActive 改了 active，React 会再过渡到新位置
    track.style.transition = "";
    track.style.transform = `translateX(${-active * 100}%)`;
    if (!drag.horizontal) return;
    const width = track.clientWidth || 1;
    const ratio = drag.dx / width;
    if (drag.dx < -SWIPE_THRESHOLD_PX || ratio < -0.2) {
      setActive((a) => Math.min(a + 1, images.length - 1));
    } else if (drag.dx > SWIPE_THRESHOLD_PX || ratio > 0.2) {
      setActive((a) => Math.max(a - 1, 0));
    }
  }

  if (images.length === 1) {
    return (
      <>
        <div
          className={cn("cursor-zoom-in overflow-hidden rounded-2xl", className)}
          onClick={() => setViewerOpen(true)}
          role="button"
          aria-label={`${alt}：点击放大查看`}
        >
          <img
            src={main}
            srcSet={mainSrcSet}
            sizes={mainSrcSet ? "(max-width: 1024px) 100vw, 50vw" : undefined}
            alt={alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="aspect-square w-full object-cover"
          />
        </div>
        <ImageViewer
          images={images}
          index={active}
          onIndexChange={setActive}
          open={viewerOpen}
          onOpenChange={setViewerOpen}
          alt={alt}
        />
      </>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 overflow-hidden", className)}>
      <div
        className="relative cursor-zoom-in overflow-hidden rounded-2xl [touch-action:pan-y]"
        onClick={() => {
          if (!suppressClickRef.current) setViewerOpen(true);
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${active + 1} / ${images.length}`}
      >
        <div
          ref={trackRef}
          className="gallery-track flex"
          style={{ transform: `translateX(${-active * 100}%)` }}
        >
          {images.map((image, index) => {
            const slideSrcSet = srcSetFor(image);
            return (
              <img
                key={index}
                src={image}
                srcSet={slideSrcSet}
                sizes={slideSrcSet ? "(max-width: 1024px) 100vw, 50vw" : undefined}
                alt={index === active ? alt : ""}
                loading={index === active ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === active ? "high" : undefined}
                draggable={false}
                className="aspect-square w-full shrink-0 select-none object-cover"
              />
            );
          })}
        </div>
        <span
          aria-hidden="true"
          className="absolute right-2 bottom-2 rounded-full bg-fg/70 px-2 py-0.5 text-xs tabular-nums text-bg"
        >
          {active + 1} / {images.length}
        </span>
      </div>
      <div ref={thumbsRef} className="flex gap-2 overflow-x-auto scroll-clean">
        {images.map((image, index) => {
          if (index > 0 && image === images[0]) return null;
          const thumbSrcSet = srcSetFor(image);
          return (
            <button
              key={index}
              type="button"
              data-thumb={index}
              onClick={() => setActive(index)}
              className={cn(
                "shrink-0 rounded-lg border p-0.5 transition-opacity",
                index === active ? "border-primary" : "border-line opacity-60 hover:opacity-100",
              )}
              aria-label={`Photo ${index + 1}`}
            >
              <img
                src={image}
                srcSet={thumbSrcSet}
                sizes={thumbSrcSet ? "64px" : undefined}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-16 rounded-md object-cover"
              />
            </button>
          );
        })}
      </div>
      <ImageViewer
        images={images}
        index={active}
        onIndexChange={setActive}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        alt={alt}
      />
    </div>
  );
}
