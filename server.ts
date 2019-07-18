// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
global['Event'] = null;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(
  join(DIST_FOLDER, 'browser', 'index.html')
).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

//fix of document issue
const {
  provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const templateA = fs
  .readFileSync(path.join('dist/browser', 'index.html'))
  .toString();
const win = domino.createWindow(templateA);

win.Object = Object;
win.Math = Math;

global['window'] = win;
global['document'] = win.document;
global['branch'] = null;
global['object'] = win.object;

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  })
    .then(html => {
      callback(null, html);
    })
    .catch(error => {
      throw new Error(error);
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
