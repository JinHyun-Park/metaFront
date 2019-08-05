import Vue from 'vue';
import vuescroll from 'vue-scroll';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/common.css';

import globalMixin from '@/mixins/globalMixin';

Vue.config.productionTip = false;

require('es6-promise').polyfill();

Vue.mixin(globalMixin); // 공통 함수 사용을 위한 믹스인 주입
Vue.use(vuescroll);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
