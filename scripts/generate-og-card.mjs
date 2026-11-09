/**
 * 生成 WhatsApp / 社交分享图 public/og.jpg（1200x630）。
 *
 * 版式沿用旧分享图：奶油底 + 双线框，顶部小字 MAISON DE GROS · CONAKRY，
 * 中央是已批准的橙色 G 标志（public/favicon.svg 同款）+ 大字 BOX GROS，
 * 下方四个品类图标（Téléphones / Montres / Lunettes / Parfums），
 * 底部斜体 Vente en gros aux détaillants。底色奶油 #F3EEE6，点缀陶土红 #9C3B22。
 *
 * 文字不用 AI 生图，全部是 SVG 文本；字体用站内同款 Fraunces（衬线体）。
 * Fraunces 的 TTF 不在仓库里：脚本在构建时从 google/fonts 下载一次，
 * 缓存在系统临时目录，下次直接复用；下载失败则退回 DejaVu Serif，
 * 构建不会因此中断。输出的 og.jpg 由构建生成，不提交。
 *
 * G 标志的 path 与 public/favicon.svg 一致（icon-g-smooth.svg 的定稿）：
 * 外框 161-862（宽 701），上下 346-680（高 334），fill #F5820B。
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
const OUT = join("public", "og.jpg");

const CREAM = "#F3EEE6";
const INK = "#1C1917";
const TERRA = "#9C3B22";
const ORANGE = "#F5820B";

// Fraunces 可变字体（google/fonts 仓库），构建时下载一次后缓存。
const FONT_URL =
  "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf";
const FONT_CACHE = join(tmpdir(), "boxgros-fraunces-vf.ttf");

// G 标志在 1024 坐标系里的包围盒（favicon.svg / icon-g-smooth.svg 定稿）。
const MARK = { x0: 161, y0: 346, x1: 862, y1: 680 };
const MARK_PATH =
  "M161 346H291V378A172 172 0 0 0 613 463H423V346H765V378A302 302 0 0 1 161 378V346Z";
const MARK_SQUARE = { x: 758, y: 568, w: 104, h: 104 };

async function ensureFont() {
  try {
    const s = await stat(FONT_CACHE);
    if (s.size > 100_000) return FONT_CACHE;
  } catch {
    // 缓存不存在，往下下载。
  }
  try {
    const res = await fetch(FONT_URL, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100_000) throw new Error("font file too small");
    await writeFile(FONT_CACHE, buf);
    console.log(`og-card: Fraunces TTF downloaded (${(buf.length / 1024).toFixed(0)} KiB)`);
    return FONT_CACHE;
  } catch (err) {
    console.warn(`og-card: Fraunces 下载失败（${err.message}），退回 DejaVu Serif`);
    return null;
  }
}

// G 标志按目标宽度缩放后居中放在 (cx, top)。
function markGroup(cx, top, width) {
  const scale = width / (MARK.x1 - MARK.x0);
  const tx = cx - ((MARK.x0 + MARK.x1) / 2) * scale;
  const ty = top - MARK.y0 * scale;
  return `<g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) scale(${scale.toFixed(4)})" fill="${ORANGE}"><path d="${MARK_PATH}"/><rect x="${MARK_SQUARE.x}" y="${MARK_SQUARE.y}" width="${MARK_SQUARE.w}" height="${MARK_SQUARE.h}"/></g>`;
}

function phoneIcon(cx, cy) {
  return `<g stroke="${INK}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <rect x="${cx - 17}" y="${cy - 32}" width="34" height="64" rx="7"/>
    <rect x="${cx - 11}" y="${cy - 22}" width="22" height="40" fill="${TERRA}" stroke="none"/>
    <circle cx="${cx}" cy="${cy + 26}" r="2.2" fill="${INK}" stroke="none"/>
  </g>`;
}

function watchIcon(cx, cy) {
  return `<g stroke="${INK}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <rect x="${cx - 10}" y="${cy - 33}" width="20" height="14"/>
    <rect x="${cx - 10}" y="${cy + 19}" width="20" height="14"/>
    <circle cx="${cx}" cy="${cy}" r="19"/>
    <rect x="${cx + 19}" y="${cy - 3}" width="4" height="6"/>
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 10}"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + 8}" y2="${cy + 3}"/>
    <circle cx="${cx}" cy="${cy}" r="1.8" fill="${INK}" stroke="none"/>
  </g>`;
}

function glassesIcon(cx, cy) {
  return `<g stroke="${INK}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="${cx - 21}" cy="${cy}" rx="16" ry="12"/>
    <ellipse cx="${cx + 21}" cy="${cy}" rx="16" ry="12"/>
    <line x1="${cx - 5}" y1="${cy - 2}" x2="${cx + 5}" y2="${cy - 2}"/>
    <line x1="${cx - 37}" y1="${cy - 4}" x2="${cx - 45}" y2="${cy - 8}"/>
    <line x1="${cx + 37}" y1="${cy - 4}" x2="${cx + 45}" y2="${cy - 8}"/>
  </g>`;
}

function perfumeIcon(cx, cy) {
  return `<g stroke="${INK}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <rect x="${cx - 7}" y="${cy - 33}" width="14" height="9"/>
    <rect x="${cx - 5}" y="${cy - 24}" width="10" height="7"/>
    <rect x="${cx - 15}" y="${cy - 17}" width="30" height="50" rx="5"/>
    <rect x="${cx - 12}" y="${cy + 8}" width="24" height="22" fill="${TERRA}" stroke="none"/>
  </g>`;
}

const CATEGORIES = [
  { label: "TÉLÉPHONES", icon: phoneIcon },
  { label: "MONTRES", icon: watchIcon },
  { label: "LUNETTES", icon: glassesIcon },
  { label: "PARFUMS", icon: perfumeIcon },
];

function buildSvg(fontFile) {
  const fontFace = fontFile
    ? `<style>@font-face { font-family: 'Fraunces'; src: url('file://${fontFile}'); }</style>`
    : "";
  const serif = `'Fraunces', 'DejaVu Serif', serif`;
  const cx = [345, 515, 685, 855];
  const icons = CATEGORIES.map((c, i) => c.icon(cx[i], 470)).join("");
  const labels = CATEGORIES.map(
    (c, i) =>
      `<text x="${cx[i] + 1.5}" y="540" font-family="${serif}" font-size="20" font-weight="500" letter-spacing="3" text-anchor="middle" fill="${INK}">${c.label}</text>`,
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fontFace}
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="16" y="16" width="1168" height="598" fill="none" stroke="${INK}" stroke-width="2"/>
  <rect x="26" y="26" width="1148" height="578" fill="none" stroke="${TERRA}" stroke-width="1"/>
  <text x="604.5" y="92" font-family="${serif}" font-size="25" font-weight="500" letter-spacing="9" text-anchor="middle" fill="${TERRA}">MAISON DE GROS · CONAKRY</text>
  ${markGroup(600, 118, 260)}
  <text x="602" y="372" font-family="${serif}" font-size="116" font-weight="500" letter-spacing="4" text-anchor="middle" fill="${INK}">BOX GROS</text>
  <line x1="512" y1="408" x2="688" y2="408" stroke="${TERRA}" stroke-width="2"/>
  ${icons}
  ${labels}
  <text x="600" y="588" font-family="${serif}" font-size="23" font-style="italic" font-weight="500" text-anchor="middle" fill="${INK}">Vente en gros aux détaillants</text>
</svg>`;
}

const fontFile = await ensureFont();
mkdirSync("public", { recursive: true });
const out = await sharp(Buffer.from(buildSvg(fontFile)))
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);
console.log(`og.jpg ✓ (${W}x${H}, ${(out.size / 1024).toFixed(1)} KiB, ${fontFile ? "Fraunces" : "DejaVu Serif"})`);
