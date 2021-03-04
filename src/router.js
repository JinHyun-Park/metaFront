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
  // 0. 개요
  {
    path: '/guide',
    name: 'guideForm',
    component: () => import('@/views/guide/GuideForm.vue'),
    children: [{
      path: '/guide/ifSummary',
      name: 'ifSummary',
      component: () => import('@/views/guide/IfSummary.vue'),
    },
    {
      path: '/guide/naruSummary',
      name: 'naruSummary',
      component: () => import('@/views/guide/NaruSummary.vue'),
    },
    {
      path: '/guide/decideIf',
      name: 'decideIf',
      component: () => import('@/views/guide/DecideIf.vue'),
    },
    {
      path: '/guide/procGuide',
      name: 'procGuide',
      component: () => import('@/views/guide/ProcGuide.vue'),
    },
    ],
  },
  // 1. 공지사항
  {
    path: '/board',
    name: 'boardForm',
    component: () => import('@/views/board/BoardForm.vue'),
    children: [{
      path: '/board/notice',
      name: 'notice',
      component: () => import('@/views/board/NoticeMain.vue'),
    },
    {
      path: '/board/noticeView/:boardNum',
      name: 'noticeView',
      component: () => import('@/views/board/NoticeView.vue'),
    },
    {
      path: '/board/noticeCreate',
      name: 'noticeCreate',
      component: () => import('@/views/board/NoticeWrite.vue'),
    },
    {
      path: '/board/noticeWrite/:boardNum',
      name: 'noticeWrite',
      component: () => import('@/views/board/NoticeWrite.vue'),
    },
    {
      path: '/board/faq',
      name: 'faq',
      component: () => import('@/views/board/FaqMain.vue'),
    },
    {
      path: '/board/faqView/:boardNum',
      name: 'faqView',
      component: () => import('@/views/board/FaqView.vue'),
    },
    {
      path: '/board/faqCreate',
      name: 'faqCreate',
      component: () => import('@/views/board/FaqWrite.vue'),
    },
    {
      path: '/board/faqWrite/:boardNum',
      name: 'faqWrite',
      component: () => import('@/views/board/FaqWrite.vue'),
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
  // 2-1. 인터페이스 신청(신청버전)
  {
    path: '/newIfReg',
    name: 'newIfReg',
    component: () => import('@/views/newIfReg/NewIfReg.vue'),
    children: [{
      path: '/newIfReg/newIfRegList',
      name: 'newIfRegList',
      component: () => import('@/views/newIfReg/NewIfRegList.vue'),
    },
    { // 인터페이스 신청 탭 구분 적용
      path: '/newIfReg/newApplyIf',
      name: 'newApplyIf',
      component: () => import('@/views/newIfReg/ifRegDetail/NewApplyIfFrame.vue'),
    },
    { // 인터페이스 정보 변경 요청 탭 구분 적용
      path: '/newIfReg/chgIfinfo',
      name: 'newChgIfinfo',
      component: () => import('@/views/ifReg/ChangeIfInfoFrame.vue'),
    },
    // {
    //   path: '/newIfReg/eaiReg',
    //   name: 'eaiReg',
    //   component: () => import('@/views/ifReg/EaiReg.vue'),
    // },
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
    },
    {
      path: '/meta/eai/ifIdListDetail',
      name: 'ifIdListDetail',
      component: () => import('@/views/meta/eai/IfIdListDetail.vue'),
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
  // 4. 통계
  {
    path: '/stat',
    name: 'statForm',
    component: () => import('@/views/stat/StatForm.vue'),
    children: [{ // EAI 시작
      path: '/stat/eai',
      name: 'statEai',
      component: () => import('@/views/stat/eai/eaiDailyStat.vue'),
    },
    {
      path: '/stat/eigw',
      name: 'statEigw',
      component: () => import('@/views/stat/eigw/eigwDailyStat.vue'),
    },
    {
      path: '/stat/mcg',
      name: 'statMcg',
      component: () => import('@/views/stat/mcg/mcgDailyStat.vue'),
    },
    ],
  },
  // 4. 메타정보 관리
  {
    path: '/innerMgmt',
    name: 'adminForm',
    component: () => import('@/views/admin/AdminForm.vue'),
    children: [{
      path: '/innerMgmt/ifMgmt/comm/instList',
      name: 'instList',
      component: () => import('@/views/admin/ifMgmt/InstList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/comm/serverList',
      name: 'serverList',
      component: () => import('@/views/admin/ifMgmt/ServerList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/comm/ccCdList',
      name: 'ccCdList',
      component: () => import('@/views/admin/ifMgmt/CcCdList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/accListEigw',
      name: 'accListEigw',
      component: () => import('@/views/admin/ifMgmt/eigw/AccListEigw.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/eigwServer',
      name: 'eigwServer',
      component: () => import('@/views/admin/ifMgmt/eigw/EigwServer.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/fileListAdmin',
      name: 'fileListAdmin',
      component: () => import('@/views/admin/ifMgmt/eigw/FileListAdmin.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/onlineListAdmin',
      name: 'onlineListAdmin',
      component: () => import('@/views/admin/ifMgmt/eigw/OnlineListAdmin.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/prodCompleteList',
      name: 'prodCompleteList',
      component: () => import('@/views/admin/ifMgmt/eigw/ProdCompleteList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/regOnline/:eigwReqNum',
      name: 'regOnline',
      component: () => import('@/views/admin/ifMgmt/eigw/regOnline.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eigw/regFile/:eigwReqNum',
      name: 'regFile',
      component: () => import('@/views/admin/ifMgmt/eigw/regFile.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/mcg/virtualUserList_MCG',
      name: 'virtualUserList_MCG',
      component: () => import('@/views/admin/ifMgmt/mcg/VirtualUserList_MCG.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/mcg/mcgChrgr',
      name: 'mcgChrgr',
      component: () => import('@/views/admin/ifMgmt/mcg/McgChrgr.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/mcg/mcgServer',
      name: 'mcgServer',
      component: () => import('@/views/admin/ifMgmt/mcg/McgServer.vue'),
    },
    { // EAI 시작
      path: '/innerMgmt/ifMgmt/eai/queueList',
      name: 'queueListAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/QueueList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/queueMgrList',
      name: 'queueMgrListAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/QueueMgrList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/ifIdList',
      name: 'ifIdListAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/IfIdList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/swingDbInfo',
      name: 'swingDbInfoAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/SwingDbInfo.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/eaiServer',
      name: 'eaiServerAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/EaiServer.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/ifIdListDetail',
      name: 'ifIdListDetailAdmin',
      component: () => import('@/views/admin/ifMgmt/eai/IfIdListDetail.vue'),
    }, // EAI 끝
    {
      path: '/innerMgmt/ifMgmt/eai/ifIdListAdminMgmt',
      name: 'ifIdListAdminMgmt',
      component: () => import('@/views/admin/ifMgmt/eai/IfIdListAdminMgmt.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/chnList',
      name: 'chnList',
      component: () => import('@/views/admin/ifMgmt/eai/ChnList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/nodeList',
      name: 'nodeList',
      component: () => import('@/views/admin/ifMgmt/eai/NodeList.vue'),
    },
    {
      path: '/innerMgmt/portalMgmt/opsAccList',
      name: 'opsAccList',
      component: () => import('@/views/admin/portalMgmt/OpsAccList.vue'),
    },
    {
      path: '/innerMgmt/portalMgmt/accList',
      name: 'accList',
      component: () => import('@/views/admin/portalMgmt/AccList.vue'),
    },
    {
      path: '/innerMgmt/ifMgmt/eai/approEaiList',
      name: 'approEaiList',
      component: () => import('@/views/admin/ifMgmt/eai/ApproEaiList.vue'),
    },
    {
      path: '/innerMgmt/ifreg/regListAdmin',
      name: 'regListAdmin',
      component: () => import('@/views/admin/ifReg/RegListAdmin.vue'),
    },
    {
      path: '/innerMgmt/ifreg/RegStepAdminAll',
      name: 'regStepAdminAll',
      component: () => import('@/views/admin/ifReg/RegStepAdminAll.vue'),
    },
    {
      path: '/innerMgmt/ifreg/RegStepAdminEai',
      name: 'regStepAdminEai',
      component: () => import('@/views/admin/ifReg/RegStepAdminEai.vue'),
    },
    {
      path: '/innerMgmt/ifreg/RegStepAdminEigw',
      name: 'regStepAdminEigw',
      component: () => import('@/views/admin/ifReg/RegStepAdminEigw.vue'),
    },
    {
      path: '/innerMgmt/ifreg/RegStepAdminMcg',
      name: 'regStepAdminMcg',
      component: () => import('@/views/admin/ifReg/RegStepAdminMcg.vue'),
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
