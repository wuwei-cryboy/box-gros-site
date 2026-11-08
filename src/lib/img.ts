// 响应式图片：商品图源文件为 800px，同目录下另有 -360 宽的缩略图。
// srcset 只对 /catalog/ 下的商品图生效（hero 图没有 360 档，不参与）。
export function srcSetFor(src: string): string | undefined {
  if (!src.startsWith("/catalog/") || src.endsWith("/hero.jpg")) return undefined;
  const dot = src.lastIndexOf(".");
  if (dot === -1) return undefined;
  const small = `${src.slice(0, dot)}-360${src.slice(dot)}`;
  return `${small} 360w, ${src} 800w`;
}
