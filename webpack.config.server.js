const config = require('./config.js');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const server = merge(baseConfig, {
  entry: config.entry.back,
  output: {
    library: 'commonjs2'
  },
  target: 'node',
  devtool: 'source-map',
  externals: nodeExternals({
    // do not externalise dependencies that need to be processed by webpack
    whitelist: /\.(css|vue)$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
});

module.exports = server;
