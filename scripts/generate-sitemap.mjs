#!/usr/bin/env node
/**
 * 生成 sitemap.xml + robots.txt（写进 public/，构建时随静态站一起发布）。
 *
 * 商品 slug 直接从 src/data/catalog.ts 取（正则提取，与
 * scripts/prerender-static.mjs 同一套取法），避免手写一份会漂移的清单。
 * 域名取 VITE_PUBLIC_HOSTNAME，默认 boxgoods.eu.cc。
 * 跑在 prebuild 里（见 package.json），每次构建都会重新生成。
 *
 * 用法：node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = join(ROOT, "src", "data", "catalog.ts");
const PUBLIC_DIR = join(ROOT, "public");
const HOST = process.env.VITE_PUBLIC_HOSTNAME || "boxgoods.eu.cc";
const BASE = `https://${HOST}`;

function productSlugs() {
  const text = readFileSync(CATALOG, "utf8");
  const slugs = [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error(`[sitemap] no product slugs found in ${CATALOG}`);
  }
  return slugs;
}

function main() {
  const urls = ["/", "/devis", ...productSlugs().map((s) => `/produit/${s}`)];
  const today = new Date().toISOString().slice(0, 10);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod></url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), xml);
  writeFileSync(
    join(PUBLIC_DIR, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`,
  );
  console.log(
    `[sitemap] ${urls.length} urls (${urls.length - 2} products) -> public/sitemap.xml + public/robots.txt`,
  );
}

main();
