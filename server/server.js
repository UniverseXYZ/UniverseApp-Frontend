import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';

import domino from 'domino';
import App from '../src/App';

const PORT = 3000;

const app = express();
const templateA = fs.readFileSync(path.join('build', 'index.html')).toString();
const win = domino.createWindow(templateA);
win.Object = Object;
win.Math = Math;
global.window = win;
global.document = win.document;
global.location = win.location;
global.object = win.object;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('^/*', (req, res, next) => {
  if (req.url.split('.').length > 1) {
    return;
  }
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Some error happened');
    }
    const newData =
      data.substring(0, data.indexOf('<title>')) + data.substring(data.indexOf('</title>') + 8);
    return res.send(
      newData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace('</head>', `${helmet.meta.toString()}</head>`)
        .replace('</head>', `${helmet.title.toString()}</head>`)
        .replace('</head>', `${helmet.script.toString()}</head>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
