// 骨架屏组件：纯 CSS 脉冲动画，零 JS 依赖，极轻量
import { cn } from "@/lib/cn";

export function ProductCardSkeleton({ layout = "tile" }: { layout?: "tile" | "row" } = {}) {
  const row = layout === "row";
  return (
    <article className={cn("border border-line bg-surface animate-pulse", row ? "flex gap-3 p-3" : "flex flex-col")}>
      <div className={cn("shrink-0 bg-muted", row ? "w-24 aspect-square" : "aspect-square w-full")} />
      <div className={cn("flex min-w-0 flex-1 flex-col", row ? "" : "gap-1 p-4")}>
        <div className="h-3 w-1/4 bg-muted rounded" />
        <div className="mt-1 h-5 w-3/4 bg-muted rounded" />
        <div className="mt-1 h-4 w-1/2 bg-muted rounded" />
        <div className="mt-3 h-8 w-1/3 bg-muted rounded" />
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-10 w-24 bg-muted rounded" />
        </div>
      </div>
    </article>
  );
}

export function ProductListSkeleton({ count = 6 }: { count?: number } = {}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 图片区域 */}
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden" />
      {/* 标题/分类/简介 */}
      <div className="px-4 space-y-3">
        <div className="h-3 w-1/4 bg-muted rounded" />
        <div className="h-7 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>
      {/* 价格阶梯表格 */}
      <div className="px-4 border border-line rounded-lg">
        <div className="grid grid-cols-2 px-3 py-2 text-xs text-muted">
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-2 border-t border-line px-3 py-2">
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-5 w-1/4 bg-muted rounded" />
          </div>
        ))}
      </div>
      {/* 数量选择器 + 加入按钮 */}
      <div className="px-4 flex items-center gap-3">
        <div className="h-12 w-28 bg-muted rounded" />
        <div className="flex-1 h-12 bg-muted rounded" />
      </div>
    </div>
  );
}

export function QuoteFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* 店铺/城市/电话输入框 */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-12 bg-muted rounded" />
        <div className="h-12 bg-muted rounded" />
        <div className="sm:col-span-2 h-12 bg-muted rounded" />
      </div>
      {/* 报价明细行 */}
      <div className="border border-line rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 px-3 py-2 text-xs text-muted bg-surface">
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-3 w-1/3 bg-muted rounded" />
          <div className="h-3 w-1/3 bg-muted rounded" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-4 border-t border-line px-3 py-2">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-4 w-1/4 bg-muted rounded" />
          </div>
        ))}
      </div>
      {/* 合计 + 按钮 */}
      <div className="flex items-end justify-between gap-3">
        <div className="h-8 w-40 bg-muted rounded" />
        <div className="h-12 w-36 bg-muted rounded" />
      </div>
    </div>
  );
}

export function PageSkeleton({ title = true }: { title?: boolean } = {}) {
  return (
    <div className="animate-pulse space-y-8 px-4 py-6">
      {title && <div className="h-10 w-1/3 bg-muted rounded" />}
      <div className="h-48 bg-muted rounded-lg" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}