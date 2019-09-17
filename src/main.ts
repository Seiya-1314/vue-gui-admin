import Vue, { DirectiveOptions } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins';
import './icons';

import '@/styles/index.scss';

import * as directives from '@/directives'

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
