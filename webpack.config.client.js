const webpack = require('webpack');
const config = require('./config.js');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const client = merge(baseConfig, {
  devtool: config.devtool,
  entry: {
    app: config.entry.front,
    vendor: config.vendor
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new VueSSRClientPlugin()
  ]
});

module.exports = client;
