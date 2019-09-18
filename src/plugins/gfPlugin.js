import Vue from 'vue';
import helpers from '@/utils/helpers';

const plugin = {
  install() {
    Vue.helpers = helpers;
    Vue.prototype.$helpers = helpers;
  },
};

Vue.use(plugin);
