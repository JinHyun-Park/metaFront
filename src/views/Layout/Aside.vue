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
import { mapState } from 'vuex';

export default {
  name: 'Aside',
  data() {
    return {
      nowPage: 'ddd',
    };
  },
  computed: {
    ...mapState('frameSet', ['subNm', 'menuLists']),
    // menuLists() {
    //   const currentRoute = this.$router.currentRoute.path;

    //   if (currentRoute.indexOf('/notice/') > -1) {
    //     return this.homeMenuLists;
    //   } if (currentRoute.indexOf('/meta/') > -1) {
    //     return this.boardLists;
    //   }
    //   return this.nullLists;
    // },
  },
  watch: {
    $route(to) {
      console.log(to.path);
    },
  },
  methods: {
    movePage(page) {
      // this.menuLists = Object.assign({}, this.homeMenuLists);
      this.$router.push({ name: page });
    },
    isActive(url) {
      const ret = (this.nowPage === url);
      return ret;
    },
    // getRoutePath() {
    // this.currentRoute = this.$router.currentRoute.path;
    //   console.log('변경');
    //   console.log(this.$router.currentRoute.path);
    // },
  },
};
</script>

<style scoped>
.innerLi {cursor: pointer;}
</style>
