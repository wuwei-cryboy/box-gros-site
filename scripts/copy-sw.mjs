import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = 'dist';
const destDir = '.vercel/output/static';

if (existsSync(srcDir)) {
  const files = readdirSync(srcDir);
  for (const file of files) {
    if (file === 'sw.js' || file.startsWith('workbox-')) {
      copyFileSync(join(srcDir, file), join(destDir, file));
      console.log('Copied:', file);
    }
  }
}
