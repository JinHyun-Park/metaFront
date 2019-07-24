import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/common.css';

import globalMixin from '@/mixins/globalMixin';

Vue.config.productionTip = false;

Vue.mixin(globalMixin); // 공통 함수 사용을 위한 믹스인 주입

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
