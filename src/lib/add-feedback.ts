import { toast } from "sonner";

/** 动效是否允许：弱网/省流模式或系统要求减少动态时，只保留轻提示，不做飞行动画 */
function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const html = document.documentElement;
  if (html.classList.contains("weak-network") || html.classList.contains("data-saver")) return false;
  return true;
}

function flyToCart(sourceRect: DOMRect, imgSrc?: string) {
  const target =
    document.getElementById("quote-dock-cta") ?? document.getElementById("quote-header-link");
  if (!target) return;
  const targetRect = target.getBoundingClientRect();
  const size = Math.min(sourceRect.width, sourceRect.height, 96);
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = `position:fixed;z-index:100;left:0;top:0;width:${size}px;height:${size}px;pointer-events:none;overflow:hidden;border:1px solid var(--color-line);background:var(--color-surface);`;
  if (imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
    el.appendChild(img);
  } else {
    el.style.background = "var(--color-primary)";
    el.style.borderRadius = "9999px";
  }
  document.body.appendChild(el);
  const startX = sourceRect.left + sourceRect.width / 2 - size / 2;
  const startY = sourceRect.top + sourceRect.height / 2 - size / 2;
  const endX = targetRect.left + targetRect.width / 2 - size / 2;
  const endY = targetRect.top + targetRect.height / 2 - size / 2;
  const anim = el.animate(
    [
      { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1 },
      { transform: `translate(${endX}px, ${endY}px) scale(0.15)`, opacity: 0.4 },
    ],
    { duration: 500, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)", fill: "forwards" },
  );
  anim.onfinish = () => el.remove();
  // 兜底清理：动画万一没走到 finish 也不留残留节点
  window.setTimeout(() => el.remove(), 700);
}

/** 找到触发按钮所在商品区块里的第一张图（卡片图或详情页主图） */
function findProductImage(sourceEl: HTMLElement): HTMLImageElement | null {
  let container: HTMLElement | null = sourceEl;
  while (container) {
    const img = container.querySelector("img");
    if (img) return img;
    container = container.parentElement;
  }
  return null;
}

/**
 * 加购反馈：轻提示 + 商品图飞向购物车栏。
 * sourceEl 为触发的按钮；source 位置在调用时同步读取（购物车栏出现会顶起布局），
 * 目标位置等下一帧 React 渲染完购物车栏后再取。
 */
export function notifyAdded(sourceEl: HTMLElement | null, message: string) {
  toast.success(message, { duration: 1800 });
  if (!sourceEl || !motionAllowed()) return;
  const img = findProductImage(sourceEl);
  const imgRect = img?.getBoundingClientRect();
  const rect = imgRect && imgRect.width > 0 ? imgRect : sourceEl.getBoundingClientRect();
  const imgSrc = img?.currentSrc || img?.src;
  requestAnimationFrame(() => flyToCart(rect, imgSrc));
}
