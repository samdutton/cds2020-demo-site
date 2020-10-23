/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* global workbox */

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * Precache (cache ahead of time)
 */

// Precache assets generated by workbox-webpack-plugin
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

/**
 * Handle navigation requests
 * All navigational requests will be redirected to this route, like in a SPA.
 * @see https://developers.google.com/web/tools/workbox/modules/workbox-routing
 */

workbox.routing.registerNavigationRoute('/app-shell');

/**
 * Runtime cache (cache when resource is accessed first time)
 */

// Cache partial navigation routes (fragments)
/* eslint-disable max-len */
const offlineNavigationResponse = `<div class="offline-notice">
    <i class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"/>
        <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/>
      </svg>
    </i>
    <h1>No internet connection</h1>
    <p>Check if your device is connected to a mobile network or WiFi.</p>
    <button>Try again</button>
  </div>`;
const fragmentHandler = workbox.strategies.networkFirst();
// Custom response handler.
function fragmentFallbackStrategy({event, url}) {
  return fragmentHandler.handle({event})
    .then((response) => {
      // This gets called with networkFirst base strategy
      return response || new Response(offlineNavigationResponse);
    })
    .catch(() => {
      // This gets called with networkOnly base strategy
      return new Response(offlineNavigationResponse);
    });
}
workbox.routing.registerRoute(
  new RegExp('/(.+)?fragment=true'),
  fragmentFallbackStrategy,
);

const FALLBACK_IMAGE_URL = '/images/icons/image-fallback.svg';
const imagesHandler = workbox.strategies.cacheFirst({
  cacheName: 'images',
  plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 100,
    }),
  ],
});
// Cache images from Cloudinary
workbox.routing.registerRoute(
  new RegExp('https://res.cloudinary.com/pieshop/.*'),
  // POI: Why cacheFirst? Low risk of reusing url for changed resource.
  ({event}) => {
    return imagesHandler.handle({event})
      .catch(() => caches.match(FALLBACK_IMAGE_URL));
  },
);