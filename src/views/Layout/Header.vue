<template>
  <header>
    <div class="gnb">
      <h1
        class="inH1"
        @click="movePage('home')"
      >
        <!-- META PORTAL -->
        <img
          class="bi"
          src="@/assets/images/naru.png"
          alt="SK C&C 로고"
        >
      </h1>
      <nav>
        <ul class="menu">
          <li>
            I/F
            <i class="menu_bar" />
          </li>
          <li>
            EAI
            <i class="menu_bar" />
          </li>
          <li class="on">
            EiGW
            <i class="menu_bar" />
            <ul class="sub_menu">
              <li>
                I/F
              </li>
              <li
                :class="{ov: isActive('eaiReg')}"
                @click="movePage('eaiReg')"
              >
                EAI
              </li>
              <li
                :class="{ov: isActive('onlineList')}"
                @click="movePage('onlineList')"
              >
                EiGW
              </li>
              <li
                :class="{ov: isActive('mcgDtlList')}"
                @click="movePage('mcgDtlList')"
              >
                MCG
              </li>
            </ul>
          </li>
          <li>
            MCG
            <i class="menu_bar" />
          </li>
          <li>
            EiGW
            <i class="menu_bar" />
          </li>
          <li>
            BOARD
            <i class="menu_bar" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import helpers from '@/utils/helpers';

export default {
//   mixins: [common],
  data() {
    return {
      activeItem: '',
    };
  },
  created() {
    this.setActiveItem();
  },
  methods: {
    // ...mapActions('header', ['setActiveLi']),
    isActive(page) {
      return this.activeItem === page;
    },
    setActiveItem() {
      if (this.activeItem === '' || this.activeItem === null || this.activeItem === undefined) {
        this.activeItem = localStorage.getItem('LS_ROUTE_KEY');
      }
    },
    movePage(page) {
    //   console.log(this.gf_isEmpty(''));
      console.log(helpers.isEmpty('1'));
      console.log(helpers.isEmpty2(''));
      this.activeItem = page;
      // this.setActiveLi({ activeLi: page });
      this.$router.push({ name: page });
    },
  },
};
</script>

<style>
.inH1 {cursor: pointer; color: white;}
</style>
