import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import helpers from '@/utils/helpers';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/meta/eigw/onlineList',
    name: 'onlineList',
    component: () => import('@/views/meta/eigw/OnlineList.vue'),
  },
  {
    path: '/meta/mcg/dtlList',
    name: 'mcgDtlList',
    component: () => import('@/views/meta/mcg/DtlList.vue'),
  },
  {
    path: '/ifReg/eaiReg',
    name: 'eaiReg',
    component: () => import('@/views/ifReg/EaiReg.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
  ],

});

router.afterEach((to) => {
  localStorage.setItem('LS_ROUTE_KEY', to.name);

  helpers.setFrame(to.name);
});

export default router;
