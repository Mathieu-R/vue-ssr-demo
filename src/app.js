import Vue from 'vue';
import App from './components/app';

// universal entry
// https://ssr.vuejs.org/en/structure.html

export function createApp(ctx) {
  const app = new Vue({
    render: h => h(App)
  });

  return {app};
}


