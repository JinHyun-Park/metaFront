import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/meta/eigw/onlineList',
    name: 'onlineList',
    component: () => import('@/views/meta/eigw/OnlineList.vue'),
  },
  {
    path: '/meta/mcg/dtlList',
    name: 'mcgDtlList',
    component: () => import('@/views/meta/mcg/dtlList.vue'),
  },
  {
    path: '/ifReg/eaiReg',
    name: 'eaiReg',
    component: () => import('@/views/ifReg/EaiReg.vue'),
  },
  ],
});
