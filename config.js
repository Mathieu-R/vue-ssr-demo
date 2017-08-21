const path = require('path');
const production = process.env.NODE_ENV === 'production';

module.exports = {
    title: 'vue-ssr-demo', // <title> of index.html
    port: {
        front: 4000, // port for devServer
        back: 2000 // port for backend api (proxytable)
    },
    entry: {
        front: [path.resolve(__dirname, 'src/entry-client.js')], // entrypoint for front js file
        back: [path.resolve(__dirname, 'src/entry-server.js')] // entrypoint for server js file
    },
    vendor: ['vue'], // vue, vue-router, vuex,...
    devtool: production ? false : 'eval-source-map',
    componentsPath: path.resolve(__dirname, 'src/components'), // path for components (aliases)
    staticPath: path.resolve(__dirname, 'src'), // path for static files (aliases)
}
