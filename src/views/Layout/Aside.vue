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
export default {
  data() {
    return {
      asideNm: 'Left Side',
      menuLists: [
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
    };
  },
  methods: {
    movePage(url) {
      console.log(this.$router.currentRoute.path);
      this.menuLists = Object.assign({}, this.homeMenuLists);
    },
    isActive(url) {
      const ret = (this.nowPage === url);
      return ret;
    },
  },
};
</script>

<style scoped>
.innerLi {cursor: pointer;}
</style>
