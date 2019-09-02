<template>
  <aside>
    <h3><i class="ico-bar-2" />{{ asideNm }}</h3>
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
      asideNm: 'Left Side',
      menuLists2: [
        { index: 1, menuNm: 'EiGW', url: 'aaa' },
        { index: 2, menuNm: 'MCG', url: 'bbb' },
        { index: 3, menuNm: 'EAI', url: 'ccc' },
        { index: 4, menuNm: 'EAI2', url: 'ddd' },
      ],
      nowPage: 'ddd',
      homeMenuLists: [
        { index: 1, menuNm: 'home', url: 'aaa' },
        { index: 2, menuNm: 'home', url: 'bbb' },
        { index: 3, menuNm: 'home', url: 'ccc' },
        { index: 4, menuNm: 'home', url: 'ddd' },
        { index: 5, menuNm: 'home2', url: 'ddd' },
      ],
      boardLists: [
        { index: 1, menuNm: 'board', url: 'aaa' },
        { index: 2, menuNm: 'board', url: 'bbb' },
        { index: 3, menuNm: 'board', url: 'ccc' },
        { index: 4, menuNm: 'board', url: 'ddd' },
        { index: 5, menuNm: 'board', url: 'ddd' },
      ],
      nullLists: [],
    };
  },
  computed: {
    ...mapState('frameSet', ['menuLists']),
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
  methods: {
    movePage() {
      // this.menuLists = Object.assign({}, this.homeMenuLists);
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
