<template>
  <aside>
    <h3><i class="ico-bar-2" />{{ subNm }}</h3>
    <ul class="lnb">
      <li
        v-for="menuList in menuLists"
        :key="menuList.index"
        class="innerLi"
        :class="{on: isActive(menuList.url)}"
        @click="movePage(menuList.url)"
      >
        {{ menuList.menuNm }}
      </li>
    </ul>
  </aside>
</template>

<script>
// 서버가 안붙으면 수행(1/2)
// import asConfig from '@/config/asideConfig';
import { fetchGetMenuList } from '@/api/bizCommApi';

export default {
  name: 'Aside',
  data() {
    return {
      nowPage: '', // 좌측 하이라이트
      subNm: '',
      menuLists: [],
      asConfig: {},
      menuAllList: [],
    };
  },
  watch: { // 라우트 변화 감시
    $route(to) {
      const { path } = to;
      this.nowPage = this.$router.currentRoute.name;
      this.setLeftItem(path);
    },
  },
  created() {
    // 만일 서버가 안 붙으면 수행(2/2)
    // this.menuAllList = asConfig.menuList;
    this.getMenuList();
  },
  mounted() {
    this.nowPage = this.$router.currentRoute.name;
    this.setLeftItem(this.$router.currentRoute.path);
  },
  methods: {
    movePage(page) {
      this.nowPage = page;
      this.$router.push({ name: page });
    },

    isActive(url) {
      const ret = (this.nowPage === url);
      return ret;
    },

    getMenuList() {
      const param = {
        userId: this.userId,
        // hanNm: this.hanNm,
        // pageNo: this.pageSet.pageNo,
        // size: this.pageSet.size,
      };

      fetchGetMenuList({ params: param })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.menuAllList = res.data.rstData.menuList;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    setLeftItem(path) { // store를 이용하지 않는 방법
      if (path.indexOf('/notice/') > -1) {
        this.subNm = 'NOTICE';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'NOTICE');
      } else if (path.indexOf('/ifReg/regList') > -1) {
        this.subNm = '신청목록';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'IFREGLIST');
      } else if (path.indexOf('/ifReg/') > -1) {
        this.subNm = '인터페이스 신청';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'IFREG');
      } else if (path.indexOf('/meta/allList') > -1) { // 메타정보 전체 조회
        this.subNm = '메타정보 조회';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'META_ALL');
      } else if (path.indexOf('/meta/mcg/') > -1) { // 메타정보 전체 조회
        this.subNm = 'MCG';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'META_MCG');
      } else if (path.indexOf('/meta/eigw/') > -1) { // 메타정보 조회 > EiGW
        this.subNm = 'EIGW';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'META_EIGW');
      } else if (path.indexOf('/meta/eai/') > -1) { // 메타정보 조회 > EAI
        this.subNm = 'EAI';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'META_EAI');
      } else if (path.indexOf('/meta/') > -1) {
        this.subNm = 'META';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'META');
      } else if (path.indexOf('/admin/ifMgmt/comm/') > -1) {
        this.subNm = '공통';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'MGMT_COMM');
      } else if (path.indexOf('/admin/ifMgmt/eigw/') > -1) {
        this.subNm = 'EIGW 관리';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'MGMT_EIGW');
      } else if (path.indexOf('/admin/ifMgmt/mcg/') > -1) {
        this.subNm = 'MCG 관리';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'MGMT_MCG');
      } else if (path.indexOf('/admin/ifMgmt/eai/') > -1) {
        this.subNm = 'EAI 관리';
        this.menuLists = this.menuAllList.filter(item => item.menuLcl === 'MGMT_EAI');
      }
    },
  },
};
</script>

<style scoped>
.innerLi {cursor: pointer;}
</style>
