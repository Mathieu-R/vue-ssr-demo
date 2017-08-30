const http = require('http');
const express = require('express');
const fs = require('fs');
const compression = require('compression');
const {createBundleRenderer} = require('vue-server-renderer');
const serverBundleJSON = require('./dist/vue-ssr-server-bundle.json');
const clientManifestJSON = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./src/index.hbs', 'utf-8');
const app = express();
const production = process.env.NODE_ENV === 'production';
const devServer = require('./dev-server');

app.use('/dist', express.static('./dist', {
  maxAge: production ? 31536000000 : 0
}));

app.use(compression());

function doSSR(req, res) {
  const ctx = {url : req.url};
  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      throw err;
    }
    res.end(html);
  });
}

let renderer;
let ready;
if (production) {
  renderer = createBundleRenderer(serverBundleJSON, {
    runInNewContext: false, // recommended
    template, // optional
    clientManifest: clientManifestJSON // optional
  });
} else {
  // dev server
  ready = devServer(app, (bundle, options) => {
    renderer = createBundleRenderer(bundle, Object.assign(options, {
      runInNewContext: false,
      template
    }),
  )});
}

app.get('*', production ? doSSR : (req, res) => {
  ready.then(_ => doSSR(req, res));
});

http.createServer(app).listen(2000, _ => {
  console.log('listening on http://localhost:2000');
});
