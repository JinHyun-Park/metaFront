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
          <button
            class="log"
            @click="movePage('login')"
          >
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
                  :class="{ov: isActive('eigwOnlineList')}"
                  @click="movePage('eigwOnlineList')"
                >
                  EiGW
                </li>
                <li
                  :class="{ov: isActive('eigwFileList')}"
                  @click="movePage('eigwFileList')"
                >
                  EiGW FILE
                </li>
                <li
                  :class="{ov: isActive('mcgDtlList')}"
                  @click="movePage('mcgDtlList')"
                >
                  MCG
                </li>
                <li
                  :class="{ov: isActive('mcgTransInfo')}"
                  @click="movePage('mcgTransInfo')"
                >
                  MCG TRANS
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
// import helpers from '@/utils/helpers';
import { mapActions } from 'vuex';

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
    ...mapActions('frameSet', ['setHeaderOn', 'setAsideOn', 'setFooterOn']),
    isActive(page) {
      return this.activeItem === page;
    },
    setActiveItem() {
      if (this.activeItem === '' || this.activeItem === null || this.activeItem === undefined) {
        this.activeItem = localStorage.getItem('LS_ROUTE_KEY');
      }
    },
    movePage(page) {
    //   console.log(helpers.isEmpty('1'));
    //   console.log(helpers.isEmpty2(''));
      // if (page !== 'login') {
      //   this.setHeaderOn({ headerOn: true });
      //   this.setAsideOn({ asideOn: true });
      //   this.setFooterOn({ footerOn: true });
      // }
      this.activeItem = page;
      // this.setActiveLi({ activeLi: page });
      this.$router.push({ name: page });
    },
  },
};
</script>

<style scoped>
.inH1 {cursor: pointer; color: white;}
</style>
