<template>
  <header>
    <div class="gnb">
      <h1>
        <img
          class="bi"
          src="@/assets/images/bi.png"
          alt="SK C&C 로고"
        >
      </h1>
      <div>
        <div class="util_space">
          <em><i class="ico-user" />유영준님 환영합니다!</em>
          <button class="log">
            로그아웃<i class="ico-logout" />
          </button>
        </div>
        <nav>
          <ul class="menu">
            <li>
              <span>신청</span>
              <ul class="sub_menu">
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
              <span>조회</span>
              <ul class="sub_menu">
                <li>I/F</li>
                <li>EAI</li>
                <li class="ov">
                  EiGW
                </li>
              </ul>
            </li>
            <li class="n">
              <span>모니터링</span>
              <ul class="sub_menu">
                <li>I/F</li>
                <li>EAI</li>
                <li class="ov">
                  EiGW
                </li>
                <li>MCG</li>
                <li>EiGW</li>
              </ul>
            </li>
            <li>
              <span>공지사항</span>
              <ul class="sub_menu">
                <li class="ov">
                  EiGW
                </li>
                <li>MCG</li>
                <li>EiGW</li>
              </ul>
            </li>
            <li>
              <span>관리</span>
              <ul class="sub_menu">
                <li>EAI</li>
                <li class="ov">
                  EiGW
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
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
