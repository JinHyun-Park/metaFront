<template>
  <header>
    <div class="gnb">
      <h1
        class="inH1"
        @click="movePage('home')"
      >
        <img
          class="bi"
          src="@/assets/images/naru-bi-white.png"
          alt="나루 로고"
        >
        <!-- NARU -->
      </h1>
      <div>
        <div class="util_space">
          <em @click="confirmOn"><i class="ico-user" />[{{ loginHanNm }}] 님 환영합니다!</em>
          <button
            class="log"
            @click="logout()"
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
                <li @click="movePage('regList')">
                  신청목록
                </li>
                <li @click="movePage('applyIf')">
                  신청등록
                </li>
              </ul>
            </li>
            <li>
              <span>메타정보 조회</span>
              <ul class="sub_menu">
                <li @click="movePage('allList')">
                  전체 조회
                </li>
                <li
                  :class="{ov: isActive('eigwOnlineList')}"
                  @click="movePage('eigwOnlineList')"
                >
                  EiGW
                </li>
                <li
                  :class="{ov: isActive('mcgDtlList')}"
                  @click="movePage('mcgDtlList')"
                >
                  MCG
                </li>
                <li
                  :class="{ov: isActive('queueList')}"
                  @click="movePage('queueList')"
                >
                  EAI
                </li>
              </ul>
            </li>
            <li class="n">
              <span>메타정보 관리</span>
              <ul class="sub_menu">
                <li @click="movePage('ccCdList')">
                  공통
                </li>
                <li @click="movePage('programInfo')">
                  EiGW
                </li>
                <li @click="movePage('virtualUserList_MCG')">
                  MCG
                </li>
                <li @click="movePage('ifIdListAdmin')">
                  EAI
                </li>
              </ul>
            </li>
            <li class="n">
              <span>포탈 관리</span>
              <ul class="sub_menu">
                <li @click="movePage('accList')">
                  사용자 계정 관리
                </li>
                <li @click="movePage('opsAccList')">
                  OPS계정 정보 조회
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
import { mapState } from 'vuex';
import { fetchGetLogout } from '@/api/loginApi';

export default {
//   mixins: [common],
  name: 'Header',
  data() {
    return {
      activeItem: '',
      alertMsgText: '123333',
    };
  },
  computed: {
    ...mapState('login', ['loginHanNm']),
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
    logout() {
      const confirmText = '로그아웃 하시겠습니다??';
      this.$gf.confirmOn(confirmText, this.logoutCall);
    },
    logoutCall() {
      // this.$axios.get('/api/logout')
      fetchGetLogout()
        .then((res) => {
          if (res.status === 200) {
            console.log('로그아웃!');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      this.movePage('login');
    },
    confirmOn() {
      // this.$gf.moveSite();
      const text1 = '11222';
      this.$gf.confirmOn('괜찮으세요??', this.alertMsg, text1);
      // this.$gf.alertOn('', this.alertMsg);
    },
    alertMsg(text) {
      // eslint-disable-next-line no-alert
      alert(text);
      // this.$router.push({ name: 'swingDbInfo' });
    },
  },
};
</script>

<style scoped>
.inH1 {cursor: pointer; color: white;}
</style>
