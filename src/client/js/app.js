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
import '../styles/index.css';
import '../styles/cart.css';
import '../styles/category.css';
import '../styles/common.css';
import '../styles/confirmation.css';
import '../styles/error.css';
import '../styles/footer.css';
import '../styles/header.css';
import '../styles/menu.css';
import '../styles/product.css';
import '../styles/search.css';
import '../styles/shipping-and-payment.css';

import {instance as router} from './router';
import {searchInput} from './search-input';
import updateOnlineStatus from './online.js';

export default function initApp() {
  // Enable client side routing
  router.enable();

  window.addEventListener('load', () => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Enable service worker.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  });


  // Enable service worker.
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
  // Add handlers to initiate search (press return or click magnifying glass)
  searchInput.init();
}
