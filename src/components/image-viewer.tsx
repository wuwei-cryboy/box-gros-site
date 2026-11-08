import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_MS = 300;
const TAP_MAX_MS = 250;
const TAP_MAX_MOVE_PX = 12;
const SWIPE_DOWN_CLOSE_PX = 90;

type Vec = { x: number; y: number };

type ImageViewerProps = {
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alt: string;
};

/**
 * 全屏图片查看器：双指缩放、双击放大/还原、放大后拖动平移、
 * 点 X / 点背景 / 按 Esc / 下滑关闭。只用 transform 做动画。
 */
export function ImageViewer({ images, index, onIndexChange, open, onOpenChange, alt }: ImageViewerProps) {
  const [scale, setScale] = useState(MIN_SCALE);
  const [pos, setPos] = useState<Vec>({ x: 0, y: 0 });
  const [gesturing, setGesturing] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef(new Map<number, Vec>());
  const pinchRef = useRef<{ startDist: number; startScale: number; startMid: Vec; startPos: Vec } | null>(null);
  const panRef = useRef<{ start: Vec; startPos: Vec; startTime: number } | null>(null);
  const lastTapRef = useRef<{ at: number } | null>(null);

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
    setPos({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  useEffect(() => {
    reset();
  }, [index, reset]);

  // 平移范围：放大后图片边缘不超过容器边缘；未放大时归零
  const clampPos = useCallback((p: Vec, s: number): Vec => {
    const el = mediaRef.current;
    if (!el || s <= MIN_SCALE) return { x: 0, y: 0 };
    const maxX = Math.max(0, (el.offsetWidth * (s - 1)) / 2);
    const maxY = Math.max(0, (el.offsetHeight * (s - 1)) / 2);
    return { x: Math.min(maxX, Math.max(-maxX, p.x)), y: Math.min(maxY, Math.max(-maxY, p.y)) };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = { x: e.clientX, y: e.clientY };
    pointersRef.current.set(e.pointerId, p);
    if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()];
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      pinchRef.current = {
        startDist: dist,
        startScale: scale,
        startMid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        startPos: pos,
      };
      panRef.current = null;
      setGesturing(true);
    } else if (pointersRef.current.size === 1) {
      panRef.current = { start: p, startPos: pos, startTime: Date.now() };
      if (scale > MIN_SCALE) setGesturing(true);
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const map = pointersRef.current;
    if (!map.has(e.pointerId)) return;
    map.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (map.size === 2 && pinchRef.current) {
      const [a, b] = [...map.values()];
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const pinch = pinchRef.current;
      if (dist <= 0 || pinch.startDist <= 0) return;
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinch.startScale * (dist / pinch.startDist)));
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const nextPos = clampPos(
        { x: pinch.startPos.x + (mid.x - pinch.startMid.x), y: pinch.startPos.y + (mid.y - pinch.startMid.y) },
        nextScale,
      );
      setScale(nextScale);
      setPos(nextPos);
    } else if (map.size === 1 && panRef.current && scale > MIN_SCALE) {
      const pan = panRef.current;
      setPos(
        clampPos(
          { x: pan.startPos.x + (e.clientX - pan.start.x), y: pan.startPos.y + (e.clientY - pan.start.y) },
          scale,
        ),
      );
    }
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const map = pointersRef.current;
    const wasSingle = map.size === 1;
    map.delete(e.pointerId);
    if (map.size < 2) pinchRef.current = null;
    if (map.size === 0) setGesturing(false);
    const pan = panRef.current;
    panRef.current = null;
    if (!wasSingle || !pan) return;
    const dx = e.clientX - pan.start.x;
    const dy = e.clientY - pan.start.y;
    const dt = Date.now() - pan.startTime;
    const moved = Math.hypot(dx, dy);
    if (dt <= TAP_MAX_MS && moved <= TAP_MAX_MOVE_PX) {
      // 轻点：300ms 内第二次轻点即双击，切换 1x / 2x（放大以轻点处为中心）
      const now = Date.now();
      const last = lastTapRef.current;
      if (last && now - last.at <= DOUBLE_TAP_MS) {
        lastTapRef.current = null;
        if (scale > MIN_SCALE) {
          setScale(MIN_SCALE);
          setPos({ x: 0, y: 0 });
        } else {
          const el = mediaRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const target: Vec = {
              x: rect.left + rect.width / 2 - e.clientX,
              y: rect.top + rect.height / 2 - e.clientY,
            };
            setScale(2);
            setPos(clampPos(target, 2));
          } else {
            setScale(2);
          }
        }
        return;
      }
      lastTapRef.current = { at: now };
      return;
    }
    // 未放大时下滑关闭
    if (scale <= MIN_SCALE && dy > SWIPE_DOWN_CLOSE_PX && Math.abs(dy) > Math.abs(dx)) {
      onOpenChange(false);
    }
  }

  function go(delta: number) {
    const next = (index + delta + images.length) % images.length;
    onIndexChange(next);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center outline-none">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">
            双指缩放查看图片，双击放大或还原，点右上角叉号或下滑关闭
          </Dialog.Description>
          <div
            ref={mediaRef}
            className="viewer-media flex max-h-full max-w-full items-center justify-center [touch-action:none]"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
              transition: gesturing ? "none" : undefined,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={images[index]}
              alt={alt}
              draggable={false}
              className="max-h-[100dvh] max-w-full select-none object-contain"
            />
          </div>
          {images.length > 1 ? (
            <>
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-2 py-0.5 text-xs tabular-nums text-white"
              >
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="上一张"
                className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center bg-black/50 text-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="下一张"
                className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center bg-black/50 text-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="关闭"
              className={cn(
                "absolute top-4 right-4 flex size-11 items-center justify-center",
                "bg-black/50 text-white",
              )}
            >
              <X className="size-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
