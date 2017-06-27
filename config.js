const path = require('path');
const production = process.env.NODE_ENV === 'production';

module.exports = {
    title: 'vue-ssr-demo', // <title> of index.html
    port: {
        front: 4000, // port for devServer
        back: 8080 // port for backend api (proxytable)
    },
    entry: {
        front: [path.resolve(__dirname, 'front/index.js')], // entrypoint for front js file
        back: [path.resolve(__dirname, 'back/entry-server.js')] // entrypoint for server js file
    },
    vendor: ['vue'], // vue, vue-router, vuex,...
    devtool: production ? 'source-map' : 'eval-source-map',
    componentsPath: path.resolve(__dirname, 'front/components'), // path for components (aliases)
    staticPath: path.resolve(__dirname, 'front'), // path for static files (aliases)
}
