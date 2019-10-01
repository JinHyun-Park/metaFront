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
import asConfig from '@/config/asideConfig';

export default {
  name: 'Aside',
  data() {
    return {
      nowPage: '', // 좌측 하이라이트
      subNm: '',
      menuLists: [],
    };
  },
  watch: { // 라우트 변화 감시
    $route(to) {
      const { path } = to;
      this.nowPage = this.$router.currentRoute.name;
      this.setLeftItem(path);
    },
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

    setLeftItem(path) { // store를 이용하지 않는 방법
      if (path.indexOf('/notice/') > -1) {
        this.subNm = 'NOTICE';
        this.menuLists = asConfig.NOTICE;
      } else if (path.indexOf('/ifReg/regList') > -1) {
        this.subNm = '신청목록';
        this.menuLists = asConfig.IFREGLIST;
      } else if (path.indexOf('/ifReg/') > -1) {
        this.subNm = '인터페이스 신청';
        this.menuLists = asConfig.IFREG;
      } else if (path.indexOf('/meta/allList') > -1) { // 메타정보 전체 조회
        this.subNm = '메타정보 조회';
        this.menuLists = asConfig.META_ALL;
      } else if (path.indexOf('/meta/mcg') > -1) { // 메타정보 전체 조회
        this.subNm = 'MCG';
        this.menuLists = asConfig.META_ALL;
      } else if (path.indexOf('/meta/eigw/') > -1) { // 메타정보 조회 > EiGW
        this.subNm = 'EIGW';
        this.menuLists = asConfig.META_EIGW;
      } else if (path.indexOf('/meta/eai/') > -1) { // 메타정보 조회 > EAI
        this.subNm = 'EAI';
        this.menuLists = asConfig.META_EAI;
      } else if (path.indexOf('/meta/') > -1) {
        this.subNm = 'META';
        this.menuLists = asConfig.META;
      } else if (path.indexOf('/admin/') > -1) {
        this.subNm = 'ADMIN';
        this.menuLists = asConfig.MGMT;
      }
    },
  },
};
</script>

<style scoped>
.innerLi {cursor: pointer;}
</style>
