<template>
  <header>
    <div class="gnb">
      <h1
        class="inH1"
        @click="movePage('home')"
      >
        <!-- <img
          class="bi"
          src="@/assets/images/bi.png"
          alt="SK C&C 로고"
        > -->
        NARU
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
            <li @click="movePage('noticeMain')">
              <span>공지사항</span>
            </li>
            <li>
              <span>인터페이스 신청</span>
              <ul class="sub_menu">
                <li>신청목록</li>
                <li>신청등록</li>
              </ul>
            </li>
            <li>
              <span>메타정보 조회</span>
              <ul class="sub_menu">
                <li @click="movePage('allList')">
                  전체 조회
                </li>
                <li>EiGW</li>
                <li>MCG</li>
                <li>EAI</li>
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
                <li
                  @click="movePage('chnList')"
                >
                  EAI 채널 정보
                </li>
                <li @click="movePage('queueMgrList')">
                  큐매니저
                </li>
              </ul>
            </li>
            <li class="n">
              <span>메타정보 관리</span>
              <ul class="sub_menu">
                <li>공통</li>
                <li>EiGW</li>
                <li>MCG</li>
                <li>EAI</li>
                <li @click="movePage('serverList')">
                  서버 정보 관리
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
    isActive(page) {
      return this.activeItem === page;
    },
    setActiveItem() {
      if (this.activeItem === '' || this.activeItem === null || this.activeItem === undefined) {
        this.activeItem = localStorage.getItem('LS_ROUTE_KEY');
      }
    },
    movePage(page) { // 페이지 이동
      this.activeItem = page; // 헤더에서 내려오는 바에 현 위치 표시
      this.$router.push({ name: page });
    },
  },
};
</script>

<style scoped>
.inH1 {cursor: pointer; color: white;}
</style>
