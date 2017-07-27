const http = require('http');
const express = require('express');
const fs = require('fs');
//const {promisify} = require('util');
//const readFileAsync = promisify(fs.readFile);
import createApp from './front/index';
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundleJSON = require('./dist/vue-ssr-server-bundle.json');
const clientManifestJSON = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./front/index.html', 'utf-8');
const app = express();

const renderer = createBundleRenderer(serverBundleJSON, {
  runInNewContext: false, // recommended
  template, // optional
  clientManifestJSON // optional
});

app.get('*', (req, res) => {
  const ctx = {url : req.url};
  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      throw err;
    }
    res.end(html);
  });
});

export default ctx => {
  // return app instance
  // can also do
  // data prefetching and route matching here
  const {app} = createApp();
  return app;
}



http.createServer(app).listen(2000, _ => {
  console.log('listening on http://localhost:2000');
});
