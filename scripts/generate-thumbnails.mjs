#!/usr/bin/env node
/**
 * 构建时生成商品缩略图（build-time thumbnails）。
 *
 * 扫描 public/catalog 下的原图，为每张生成一张 360px 宽的缩略图，
 * 与原图同目录、同名加 `-360` 后缀：
 *   - .webp 原图 -> `-360.webp`（webp, quality 80）
 *   - .jpg/.jpeg 原图 -> `-360.jpg`（jpeg, quality 80）
 *
 * 为什么按原图扩展名生成：src/lib/img.ts 的 srcSetFor() 保留原扩展名
 * 拼出 -360 路径（.webp -> -360.webp，.jpg -> -360.jpg），所以缩略图
 * 必须与原图同扩展名，srcset 引用才能解析。
 *
 * 幂等：目标文件已存在时跳过，不重复生成。hero.jpg 不参与
 * （srcSetFor 明确排除 hero 图）。
 *
 * 由 npm 的 prebuild / predev 自动调用；也可直接运行：
 *   node scripts/generate-thumbnails.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_DIR = path.join(ROOT, "public", "catalog");
const WIDTH = 360;
const QUALITY = 80;
const EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const SKIP_NAMES = new Set(["hero.jpg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function targetFor(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTENSIONS.has(ext)) return null;
  const base = path.basename(file);
  if (SKIP_NAMES.has(base)) return null;
  if (/-360\.(webp|jpg|jpeg|png)$/i.test(base)) return null; // 已是缩略图
  const dir = path.dirname(file);
  const stem = path.basename(file, ext);
  return path.join(dir, `${stem}-360${ext}`);
}

async function main() {
  const all = await walk(CATALOG_DIR);
  let generated = 0;
  let skipped = 0;
  for (const file of all) {
    const target = targetFor(file);
    if (!target) {
      skipped++;
      continue;
    }
    try {
      await stat(target);
      skipped++; // 已存在，幂等跳过
      continue;
    } catch {
      // 不存在，继续生成
    }
    const ext = path.extname(file).toLowerCase();
    const pipeline = sharp(file).resize({ width: WIDTH, withoutEnlargement: true });
    if (ext === ".webp") {
      await pipeline.webp({ quality: QUALITY }).toFile(target);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      await pipeline.jpeg({ quality: QUALITY }).toFile(target);
    } else {
      await pipeline.png({ quality: QUALITY }).toFile(target);
    }
    generated++;
  }
  console.log(
    `[thumbnails] done: ${generated} generated, ${skipped} skipped (already exist or not eligible)`,
  );
}

main().catch((err) => {
  console.error("[thumbnails] failed:", err);
  process.exit(1);
});
