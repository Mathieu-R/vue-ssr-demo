const webpack = require('webpack');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('./webpack.config.client.js');
const serverConfig = require('./webpack.config.server.js');

module.exports = function devServer(app, cb) {
  let resolve;
  const promise = new Promise(r => resolve = r);
  const updateBundle = (options) => {
    resolve();
    cb(options);
  }

  //clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // hot reload
    new webpack.NoEmitOnErrorsPlugin() // do not build bundle if they have errors
  );

  let clientManifestJSON;
  let serverBundleJSON;
  const clientCompiler = webpack(clientConfig);
  const devMiddlewareInstance = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });

  // webpack dev middleware
  app.use(devMiddlewareInstance);

  clientCompiler.plugin('done', stats => {
    clientManifestJSON = JSON.parse(fs.readFileSync(
      './dist/vue-ssr-client-manifest.json', 'utf-8'
    ));

    if (serverBundleJSON) {
      updateBundle(serverBundleJSON, {
        clientManifest: clientManifestJSON
      })
    }
  });


  // hot middleware
  app.use(webpackHotMiddleware(clientCompiler, {heartbeat: 5000}));

  const serverCompiler = webpack(serverConfig);
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;

    serverBundleJSON = JSON.parse(fs.readFileSync(
      './dist/vue-ssr-server-bundle.json', 'utf-8'
    ));

    if (clientManifestJSON) {
      updateBundle(serverBundleJSON, {
        clientManifest: clientManifestJSON
      })
    }
  });

  return promise;
}
