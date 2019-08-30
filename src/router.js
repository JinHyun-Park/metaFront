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
  // 로그인
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
  // 1. 공지사항
  {
    path: '/notice',
    name: 'noticeForm',
    component: () => import('@/views/notice/NoticeForm.vue'),
    children: [{
      path: '/notice/noticeMain',
      name: 'noticeMain',
      component: () => import('@/views/notice/NoticeMain.vue'),
    }],
  },
  //  2. 인터페이스 신청
  {
    path: '/ifReg',
    name: 'ifRegForm',
    component: () => import('@/views/ifReg/IfRegForm.vue'),
    children: [{
      path: '/ifReg/regList',
      name: 'regList',
      component: () => import('@/views/ifReg/RegList.vue'),
    },
    {
      path: '/ifReg/regStep2_EAI',
      name: 'regStep2_EAI',
      component: () => import('@/views/ifReg/RegStep2_EAI.vue'),
    },
    {
      path: '/ifReg/regStep2_EIGW',
      name: 'regStep2_EIGW',
      component: () => import('@/views/ifReg/RegStep2_EIGW.vue'),
    },
    ],
  },
  // 3. 메타정보 조회
  {
    path: '/meta',
    name: 'metaForm',
    component: () => import('@/views/meta/MetaForm.vue'),
    children: [{ // 자식 페이지 시작
      path: '/meta/allList', // 전체 조회
      name: 'allList',
      component: () => import('@/views/meta/AllList.vue'),
    },
    { // EAI 시작
      path: '/meta/eai/queueList',
      name: 'queueList',
      component: () => import('@/views/meta/eai/QueueList.vue'),
    },
    {
      path: '/meta/eai/queueMgrList',
      name: 'queueMgrList',
      component: () => import('@/views/meta/eai/QueueMgrList.vue'),
    },
    {
      path: '/meta/eai/chnList',
      name: 'chnList',
      component: () => import('@/views/meta/eai/ChnList.vue'),
    },
    {
      path: '/meta/eai/nodeList',
      name: 'nodeList',
      component: () => import('@/views/meta/eai/NodeList.vue'),
    },
    {
      path: '/meta/eai/ifIdList',
      name: 'ifIdList',
      component: () => import('@/views/meta/eai/IfIdList.vue'),
    },
    {
      path: '/meta/eai/swingDbInfo',
      name: 'swingDbInfo',
      component: () => import('@/views/meta/eai/SwingDbInfo.vue'),
    }, // EAI 끝
    ],
  },
  // 4. 메타정보 관리
  {
    path: '/admin',
    name: 'adminForm',
    component: () => import('@/views/admin/AdminForm.vue'),
    children: [{
      path: '/admin/ifMgmt/instList',
      name: 'instList',
      component: () => import('@/views/admin/ifMgmt/InstList.vue'),
    },
    {
      path: '/admin/ifMgmt/serverList',
      name: 'serverList',
      component: () => import('@/views/admin/ifMgmt/ServerList.vue'),
    },
    {
      path: '/admin/ifMgmt/accListEigw',
      name: 'accListEigw',
      component: () => import('@/views/admin/ifMgmt/AccListEigw.vue'),
    },
    {
      path: '/admin/portalMgmt/opsAccList',
      name: 'opsAccList',
      component: () => import('@/views/admin/portalMgmt/OpsAccList.vue'),
    },
    {
      path: '/admin/portalMgmt/accList',
      name: 'accList',
      component: () => import('@/views/admin/portalMgmt/AccList.vue'),
    },
    {
      path: '/admin/eigw/programInfo',
      name: 'programInfo',
      component: () => import('@/views/admin/eigw/ProgramInfo.vue'),
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
