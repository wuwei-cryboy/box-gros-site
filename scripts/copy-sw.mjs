import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = 'dist';
// 静态站：Nitro node-server 预设的静态输出目录。VitePWA 生成的 sw.js /
// workbox-* 只落在 Vite 的 dist 里，Nitro 不会替我们搬过去，所以构建后
// 手动拷到 .output/public（Cloudflare Pages 的发布目录）。
const destDir = '.output/public';

if (existsSync(srcDir)) {
  mkdirSync(destDir, { recursive: true });
  const files = readdirSync(srcDir);
  for (const file of files) {
    if (file === 'sw.js' || file.startsWith('workbox-')) {
      copyFileSync(join(srcDir, file), join(destDir, file));
      console.log('Copied:', file);
    }
  }
}
