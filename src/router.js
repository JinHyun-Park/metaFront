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
    name: 'loginForm',
    component: () => import('@/views/login/LoginForm.vue'),
    children: [{
      path: '/login/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/login/changePwd',
      name: 'changePwd',
      component: () => import('@/views/login/ChangePwd.vue'),
    },
    ],
  },
  {
    path: '/meta/eigw/onlineList',
    name: 'eigwOnlineList',
    component: () => import('@/views/meta/eigw/OnlineList.vue'),
  },
  {
    path: '/meta/eigw/fileList',
    name: 'eigwFileList',
    component: () => import('@/views/meta/eigw/FileList.vue'),
  },
  {
    path: '/meta/mcg/dtlList',
    name: 'mcgDtlList',
    component: () => import('@/views/meta/mcg/DtlList.vue'),
  },
  {
    path: '/meta/mcg/transInfo',
    name: 'mcgTransInfo',
    component: () => import('@/views/meta/mcg/TransInfo.vue'),
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

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to) => {
  localStorage.setItem('LS_ROUTE_KEY', to.name);

  helpers.setFrame(to);
});

export default router;
