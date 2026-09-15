import { mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
const base = process.env.SITE_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base)) throw new Error('Invalid SITE_BASE_PATH');
mkdirSync(output, { recursive: true });
for (const page of ['index.html', 'menu.html', 'about.html', 'access.html', '404.html']) {
  const original = readFileSync(resolve(root, page), 'utf8');
  writeFileSync(resolve(output, page), page === '404.html' ? original.replace('href="/"', 'href="' + base + '"') : original);
}
cpSync(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
writeFileSync(resolve(output, '.nojekyll'), '');
console.log('Static site prepared in dist/ (base path: ' + base + ')');
