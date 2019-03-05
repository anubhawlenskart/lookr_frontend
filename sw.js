const staticAssets = [
    './',
    './index.html',    
    './style.css',
    './styles/bootstrap.css',    
    './styles/ditto.css',
    './styles/font-awesome.css',
    './styles/slick.css',
    'https://bsdk.api.ditto.com/lenskart/3.2.0/api.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    './scripts/lookersscreen.js',
    './scripts/common.js',
    './scripts/otpscreen.js',
    './scripts/mobilescreen.js',
    './scripts/otherprofilescreen.js',
    './scripts/framedetailsscreen.js',
    './scripts/setting.js',
    './scripts/wishlist.js',
    './scripts/editprofile.js',
    './scripts/custom.js',
    './scripts/toggle.js',
    './scripts/app.js',
    './scripts/bootstrap.min.js',
];

self.addEventListener('install', async event => {
    const cache = await caches.open('eyewish-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
   const req = event.request;
   const url = new URL(req.url);
   if(url.origin === location.origin){
    event.respondWith(cacheFirst(req));
   } else {
    event.respondWith(networkFirst(req));
   }
        
});




async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('eyewish-dynamic');
    try {
        const res = await fetch(req);
        cache.get(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}


