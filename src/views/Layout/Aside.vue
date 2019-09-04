<template>
  <aside>
    <h3><i class="ico-bar-2" />{{ subNm2 }}</h3>
    <ul class="lnb">
      <li
        v-for="menuList in menuLists2"
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
import { mapState, mapActions } from 'vuex';
import asConfig from '@/config/asideConfig';

export default {
  name: 'Aside',
  data() {
    return {
      nowPage: '', // 좌측 하이라이트
      subNm2: '',
      menuLists2: [],
    };
  },
  computed: {
    ...mapState('frameSet', ['subNm', 'menuLists']),
  },
  watch: { // 라우트 변화 감시
    $route(to) {
      const { path } = to;
      // this.setLeftItem(path);
      this.setLeftItem2(path);
    },
  },
  mounted() {
    this.nowPage = this.$router.currentRoute.name;
    // this.setLeftItem(this.$router.currentRoute.path);
    this.setLeftItem2(this.$router.currentRoute.path);
  },
  updated() {
    this.nowPage = this.$router.currentRoute.name;
  },
  methods: {
    ...mapActions('frameSet', ['setSubNm', 'setMenuLists']),

    movePage(page) {
      this.nowPage = page;
      this.$router.push({ name: page });
    },

    isActive(url) {
      const ret = (this.nowPage === url);
      return ret;
    },

    // 페이지 변화에 따라 좌측 값 세팅
    setLeftItem(path) { // store를 이용하는 방법
      if (path.indexOf('/notice/') > -1) {
        this.setSubNm({ subNm: 'NOTICE' });
        this.setMenuLists({ menuLists: asConfig.NOTICE });
      } else if (path.indexOf('/ifReg/regList') > -1) {
        this.setSubNm({ subNm: '신청목록' });
        this.setMenuLists({ menuLists: asConfig.IFREGLIST });
      } else if (path.indexOf('/ifReg/') > -1) {
        this.setSubNm({ subNm: '인터페이스 신청' });
        this.setMenuLists({ menuLists: asConfig.IFREG });
      } else if (path.indexOf('/meta/') > -1) {
        this.setSubNm({ subNm: 'META' });
        this.setMenuLists({ menuLists: asConfig.META });
      } else if (path.indexOf('/admin/') > -1) {
        this.setSubNm({ subNm: 'ADMIN' });
        this.setMenuLists({ menuLists: asConfig.MGMT });
      }
    },

    setLeftItem2(path) { // store를 이용하지 않는 방법
      if (path.indexOf('/notice/') > -1) {
        this.subNm2 = 'NOTICE';
        this.menuLists2 = asConfig.NOTICE;
      } else if (path.indexOf('/ifReg/regList') > -1) {
        this.subNm2 = '신청목록';
        this.menuLists2 = asConfig.IFREGLIST;
      } else if (path.indexOf('/ifReg/') > -1) {
        this.this.subNm2 = '인터페이스 신청';
        this.menuLists2 = asConfig.IFREG;
      } else if (path.indexOf('/meta/') > -1) {
        this.this.subNm2 = 'META';
        this.menuLists2 = asConfig.META;
      } else if (path.indexOf('/admin/') > -1) {
        this.this.subNm2 = 'ADMIN';
        this.menuLists2 = asConfig.MGMT;
      }
    },
  },
};
</script>

<style scoped>
.innerLi {cursor: pointer;}
</style>
