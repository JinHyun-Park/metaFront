import Vue from 'vue';
import helpers from '@/utils/helpers';

const plugin = {
  install() {
    Vue.gf = helpers;
    Vue.prototype.$gf = helpers;
  },
};

Vue.use(plugin);
