import { Datepicker } from '@livelybone/vue-datepicker'; // vue datePicker
import Vue from 'vue';
import 'babel-polyfill';
import vuescroll from 'vue-scroll';
import './plugins/axios';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/common.css';
import globalMixin from '@/mixins/globalMixin';
import '@/plugins/gfPlugin';

import '@livelybone/vue-datepicker/lib/css/index.css'; // dataPicker css import

Vue.config.productionTip = false;

require('es6-promise').polyfill();

Vue.mixin(globalMixin); // 공통 함수 사용을 위한 믹스인 주입
Vue.use(vuescroll);
Vue.component('paginate', Paginate);

Vue.component('datepicker', Datepicker); // Global register

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
