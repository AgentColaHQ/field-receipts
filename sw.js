// Field Receipts offline helper.
// It saves the app on the phone after the first visit, so it opens with no signal.
// It only controls the /field-receipts/ pages. It does not touch the main website.

var CACHE = "field-receipts-v1";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf("field-receipts-") === 0 && k !== CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Try the network first (so updates arrive), but give up after 3 seconds
// and use the saved copy. Weak gym signal will not leave you waiting.
function networkFirst(request) {
  return caches.open(CACHE).then(function (cache) {
    var fromNetwork = fetch(request).then(function (response) {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    });
    var timeout = new Promise(function (resolve, reject) {
      setTimeout(function () { reject(new Error("slow")); }, 3000);
    });
    return Promise.race([fromNetwork, timeout]).catch(function () {
      return cache.match(request, { ignoreSearch: true }).then(function (saved) {
        if (saved) return saved;
        if (request.mode === "navigate") return cache.match("./index.html");
        return fromNetwork;
      });
    });
  });
}

// Fonts rarely change: use the saved copy first, and save new ones.
function cacheFirst(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (saved) {
      if (saved) return saved;
      return fetch(request).then(function (response) {
        if (response && (response.ok || response.type === "opaque")) cache.put(request, response.clone());
        return response;
      });
    });
  });
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  } else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(cacheFirst(request));
  }
});
