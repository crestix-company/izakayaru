import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist'),basePath=process.env.SITE_BASE_PATH||'/',pages=['index.html','menu.html','about.html','access.html','404.html'];
const media=new Set();let links=0;
for(const file of pages){
 const html=readFileSync(resolve(root,file),'utf8');
 assert(html.includes('lang="ja"')&&html.includes('居酒屋ルー'),file+' identity');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' h1');
 assert(!/README|Lorem ipsum|Umikaze|ForestGarden|サロンデサン|仮文言/.test(html),file+' stale content');
 for(const [,attr,value]of html.matchAll(/\b(href|src)="([^"]+)"/g)){
  if(/^(https?:|tel:|data:)/.test(value))continue;
  const [path,hash]=value.split('#'),target=path===basePath?'index.html':path||file;
  const dest=resolve(root,target);assert(existsSync(dest),file+' missing '+value);
  if(hash)assert(readFileSync(dest,'utf8').includes('id="'+hash+'"'),file+' missing anchor '+value);
  if(attr==='src'||target.endsWith('.webp')||target.startsWith('assets/'))media.add(target);links++;
 }
 for(const [,srcset]of html.matchAll(/srcset="([^"]+)"/g))for(const entry of srcset.split(',')){const path=entry.trim().split(' ')[0];assert(existsSync(resolve(root,path)),path);media.add(path)}
 for(const tag of html.match(/<img\b[^>]*>/g)||[])assert(/alt="[^"]+"/.test(tag)&&/width=/.test(tag)&&/height=/.test(tag),file+' alt/dimensions');
 if(file!=='404.html')assert(html.includes('tel:09040583377')&&html.includes('https://www.instagram.com/izakaya_roo/')&&html.includes('南橋本2-5-21'),file+' contact');
}
const menu=readFileSync(resolve(root,'menu.html'),'utf8');
for(const fact of ['150','200','500','600','800','手作り餃子','ほうとう','吉田うどん','ささみフライ','税込','photo-9-1440.webp'])assert(menu.includes(fact),'Menu '+fact);
const access=readFileSync(resolve(root,'access.html'),'utf8');
for(const fact of ['16:00〜22:30','日曜日','0xe7d46e289ab840c1'])assert(access.includes(fact),'Access '+fact);
const base=process.argv[2];
if(base)for(const path of ['',...pages,...media]){const r=await fetch(new URL(path,base));assert.equal(r.status,200,path);assert(Buffer.from(await r.arrayBuffer()).equals(readFileSync(resolve(root,path||'index.html'))),path+' served bytes')}
console.log(JSON.stringify({pages:pages.length,links,media:media.size,mediaBytes:[...media].reduce((n,p)=>n+statSync(resolve(root,p)).size,0),liveMatched:!!base,status:'PASS'},null,2));
