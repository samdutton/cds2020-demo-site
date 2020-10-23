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

import {getProducts} from '../get-data';
import categories from '../../data/categories';
import getPreloads from '../preload.js';

function category(req, res) {
  const thisCategory = req.path.slice(1);
  const products = getProducts(thisCategory);
  const preloads = getPreloads(products);
  res.render('category', {
    cart: req.session.cart,
    categories: categories,
    category: thisCategory,
    layout: req.query.fragment ? 'fragment' : 'layout',
    products: products,
    preloads: preloads,
    scripts: [
      '/js/category_main.js',
    ],
    title: `PWA Shop: ${thisCategory}`,
  });
}

export default category;
