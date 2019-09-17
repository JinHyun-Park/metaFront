import Vue from 'vue';
import 'babel-polyfill';
import vuescroll from 'vue-scroll';
import './plugins/axios';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import router from './router';
import store from './store';

// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './assets/css/common.css';

import globalMixin from '@/mixins/globalMixin';
import gfFunc from '@/utils/gfFunc';

Vue.config.productionTip = false;

// Vue.myGlobalMethod = gfFunc;
Vue.prototype.$myMethod = gfFunc; // 함수를 전역에서 사용할 수 있도록.

require('es6-promise').polyfill();

Vue.mixin(globalMixin); // 공통 함수 사용을 위한 믹스인 주입
Vue.use(vuescroll);
Vue.component('paginate', Paginate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
