import { cn } from "@/lib/cn";
import { srcSetFor } from "@/lib/img";

export function CatalogPhoto({
  src,
  alt,
  frame = true,
  eager = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  frame?: boolean;
  // 详情页主图是 LCP 元素，用 eager；列表卡片默认懒加载
  eager?: boolean;
  sizes?: string;
}) {
  const srcSet = srcSetFor(src);
  if (!frame) {
    return (
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg">
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        className={cn("relative h-full w-full object-contain")}
      />
    </div>
  );
}
