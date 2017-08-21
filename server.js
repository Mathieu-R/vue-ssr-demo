const http = require('http');
const express = require('express');
const fs = require('fs');
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundleJSON = require('./dist/vue-ssr-server-bundle.json');
const clientManifestJSON = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./src/index.hbs', 'utf-8');
const app = express();

app.use('/dist', express.static('./dist'));

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


http.createServer(app).listen(2000, _ => {
  console.log('listening on http://localhost:2000');
});
