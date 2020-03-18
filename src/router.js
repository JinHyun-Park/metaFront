import Vue from 'vue';
import Router from 'vue-router';
import helpers from '@/utils/helpers';
import Home from './views/Home.vue';

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
    },
    {
      path: '/notice/noticeView',
      name: 'noticeView',
      component: () => import('@/views/notice/NoticeView.vue'),
    },
    {
      path: '/notice/noticeWrite',
      name: 'noticeWrite',
      component: () => import('@/views/notice/NoticeWrite.vue'),
    },
    ],
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
    { // 인터페이스 신청 탭 구분 적용
      path: '/ifReg/applyIf',
      name: 'applyIf',
      component: () => import('@/views/ifReg/ApplyIfFrame.vue'),
    },
    { // 인터페이스 정보 변경 요청 탭 구분 적용
      path: '/ifReg/chgIfinfo',
      name: 'chgIfinfo',
      component: () => import('@/views/ifReg/ChangeIfInfoFrame.vue'),
    },
    {
      path: '/ifReg/eaiReg',
      name: 'eaiReg',
      component: () => import('@/views/ifReg/EaiReg.vue'),
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
    },
    {
      path: '/meta/eai/eaiServer',
      name: 'eaiServer',
      component: () => import('@/views/meta/eai/EaiServer.vue'),
    }, // EAI 끝
    {
      path: '/meta/eigw/onlineList',
      name: 'eigwOnlineList',
      component: () => import('@/views/meta/eigw/OnlineList.vue'),
    },
    {
      path: '/meta/eigw/eigwFileList',
      name: 'eigwFileList',
      component: () => import('@/views/meta/eigw/FileList.vue'),
    },
    {
      path: '/meta/mcg/mcgDtlList',
      name: 'mcgDtlList',
      component: () => import('@/views/meta/mcg/DtlList.vue'),
    },
    {
      path: '/meta/mcg/mcgTransInfo',
      name: 'mcgTransInfo',
      component: () => import('@/views/meta/mcg/TransInfo.vue'),
    },
    ],
  },
  // 4. 메타정보 관리
  {
    path: '/admin',
    name: 'adminForm',
    component: () => import('@/views/admin/AdminForm.vue'),
    children: [{
      path: '/admin/ifMgmt/comm/instList',
      name: 'instList',
      component: () => import('@/views/admin/ifMgmt/InstList.vue'),
    },
    {
      path: '/admin/ifMgmt/comm/serverList',
      name: 'serverList',
      component: () => import('@/views/admin/ifMgmt/ServerList.vue'),
    },
    {
      path: '/admin/ifMgmt/comm/ccCdList',
      name: 'ccCdList',
      component: () => import('@/views/admin/ifMgmt/CcCdList.vue'),
    },
    {
      path: '/admin/ifMgmt/eigw/programInfo',
      name: 'programInfo',
      component: () => import('@/views/admin/ifMgmt/eigw/ProgramInfo.vue'),
    },
    {
      path: '/admin/ifMgmt/eigw/accListEigw',
      name: 'accListEigw',
      component: () => import('@/views/admin/ifMgmt/eigw/AccListEigw.vue'),
    },
    {
      path: '/admin/ifMgmt/eigw/eigwServer',
      name: 'eigwServer',
      component: () => import('@/views/admin/ifMgmt/eigw/EigwServer.vue'),
    },
    {
      path: '/admin/ifMgmt/eigw/fileListAdmin',
      name: 'fileListAdmin',
      component: () => import('@/views/admin/ifMgmt/eigw/FileListAdmin.vue'),
    },
    {
      path: '/admin/ifMgmt/eigw/onlineListAdmin',
      name: 'onlineListAdmin',
      component: () => import('@/views/admin/ifMgmt/eigw/OnlineListAdmin.vue'),
    },
    {
      path: '/admin/ifMgmt/mcg/virtualUserList_MCG',
      name: 'virtualUserList_MCG',
      component: () => import('@/views/admin/ifMgmt/mcg/VirtualUserList_MCG.vue'),
    },
    {
      path: '/admin/ifMgmt/eai/ifIdListAdmin',
      name: 'ifIdListAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/IfIdListAdmin.vue'),
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

    ],
  },
  {
    path: '*',
    redirect: '/',
  },
  ],

});

// let loader;

router.beforeEach((to, from, next) => {
  //   loader = Vue.$loading.show({
  //     // Optional parameters
  //     // container: this.fullPage ? null : this.$refs.formContainer,
  //     canCancel: false,
  //     // onCancel: this.onCancel,
  //   });
  helpers.showLoading(100);
  next();
});

router.afterEach((to) => {
  localStorage.setItem('LS_ROUTE_KEY', to.name);

  helpers.setFrame(to);
  //   helpers.hideLoading();
});

export default router;
