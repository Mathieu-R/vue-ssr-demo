import {createApp} from './app';
const production = process.env.NODE_ENV === 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const {app} = createApp();
    const {url} = context;
    // data pre-fetching
    // and routing here
    // https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/entry-server.js
    resolve(app);
  })
}
