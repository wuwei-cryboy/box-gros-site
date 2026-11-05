import pkg from "/workspace/node_modules/playwright-core/index.js";
const { chromium } = pkg;

const executablePath =
  "/opt/pw-browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell";

const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto("file:///workspace/.grok/og-card.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const metrics = await page.evaluate(() => {
  const a = document.querySelector(".line-a");
  const b = document.querySelector(".line-b");
  const target = a.getBoundingClientRect().width;
  let lo = 0.05;
  let hi = 1.4;
  for (let i = 0; i < 22; i += 1) {
    const mid = (lo + hi) / 2;
    b.style.letterSpacing = `${mid}em`;
    b.style.paddingLeft = `${mid}em`;
    const w = b.getBoundingClientRect().width;
    if (w < target) lo = mid;
    else hi = mid;
  }
  const mid = (lo + hi) / 2;
  b.style.letterSpacing = `${mid}em`;
  b.style.paddingLeft = `${mid}em`;
  const aw = a.getBoundingClientRect().width;
  const bw = b.getBoundingClientRect().width;
  const ar = a.getBoundingClientRect();
  const br = b.getBoundingClientRect();
  return {
    letterSpacing: mid,
    aWidth: aw,
    bWidth: bw,
    a: { x: ar.x, y: ar.y, w: ar.width, h: ar.height },
    b: { x: br.x, y: br.y, w: br.width, h: br.height },
  };
});
console.log(JSON.stringify(metrics, null, 2));
await page.screenshot({
  path: "/workspace/.grok/card-raw.png",
  type: "png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await browser.close();
