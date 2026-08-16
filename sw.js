const CACHE="run-strong-fixed-v5";
const ASSETS=["./","./index.html","./styles-v3.css?v=20260815-3","./app-v3.js?v=20260815-3","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.hostname==="raw.githubusercontent.com"){e.respondWith(fetch(e.request,{cache:"no-store"}));return;}
  if(e.request.mode==="navigate"){e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match("./index.html")));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
