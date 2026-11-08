/**
 * 生成 PWA 应用图标：public/icons/icon-{180,192,512}.png。
 *
 * 来源是品牌标识 public/favicon.svg（陶土底 + 米白 K 字）。
 * 图标按 92% 缩放后居中贴在整块陶土底色上：maskable 安全区是中心
 * 80% 直径的圆，92% 缩放保证 K 字的四个端点都落在安全区内，
 * 圆形 / 圆角矩形裁剪不会削掉笔画。
 *
 * 输出文件在构建时生成（predev / prebuild 调用本脚本，见 package.json），
 * 不提交 —— 与缩略图同一惯例（catalog 下的 -360 图也不提交）。
 * 改了 favicon 后重新构建即可，本地跑 `node scripts/generate-app-icons.mjs` 也行。
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join("public", "icons");
const BG = "#9C3B22"; // --color-primary 陶土色
const SIZES = [180, 192, 512];

mkdirSync(OUT_DIR, { recursive: true });

for (const size of SIZES) {
  const mark = Math.round(size * 0.92);
  const markPng = await sharp("public/favicon.svg").resize(mark, mark).png().toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: markPng, gravity: "centre" }])
    .png()
    .toFile(join(OUT_DIR, `icon-${size}.png`));
  console.log(`icon-${size}.png ✓`);
}
