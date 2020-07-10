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
          <em style="font-size: 16px;">{{ remainTime }}</em>
          <button
            class="log"
            @click="resetCount()"
          >
            연장
          </button>
          <em />
          <em><i class="ico-user" />[{{ hanNm }}] 님 환영합니다!</em>
          <button
            class="log"
            @click="logout()"
          >
            로그아웃<i class="ico-logout" />
          </button>
          </basetimer>
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
                <li @click="movePage('regListAdmin')">
                  신청관리
                </li>
                <li @click="movePage('ccCdList')">
                  공통
                </li>
                <li @click="movePage('programInfo')">
                  EiGW
                </li>
                <li @click="movePage('virtualUserList_MCG')">
                  MCG
                </li>
                <li @click="movePage('approEaiList')">
                  EAI
                </li>
              </ul>
            </li>
            <li class="n">
              <span>통계</span>
              <ul class="sub_menu">
                <li @click="movePage('statEai')">
                  EAI
                </li>
                <li @click="movePage('statEigw')">
                  EiGW
                </li>
                <li @click="movePage('statMcg')">
                  MCG
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
import { mapState, mapActions } from 'vuex';
import { fetchGetLogout } from '@/api/loginApi';
import { fetchGetMyChrgrInfo, fetchGetKeepSession } from '@/api/bizCommApi';

export default {
//   mixins: [common],
  name: 'Header',
  data() {
    return {
      activeItem: '',
      alertMsgText: '123333',
      userHanNm: '',
      hanNm: '',
      remainTime: ':  :  ',
      intervalFuc: '',
    };
  },
  computed: {
    ...mapState('login', ['loginHanNm']),
  },
  created() {
    this.setActiveItem();
    this.getMyInfo();
    this.setMenuAllList(); // 서버로부터 menu 내 left list 수신
    this.$gf.resetCount();
    this.intervalFuc = setInterval(() => {
      this.remainTime = this.$gf.getSessionCount(1);
      if (this.remainTime === '0:00') {
        this.$gf.alertOn('세션이 종료되었습니다. 재로그인 바랍니다.', this.logoutCall);
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.intervalFuc);
  },
  methods: {
    ...mapActions('frameSet', ['setMenuAllList']),
    isActive(page) {
      return this.activeItem === page;
    },
    getMyInfo() {
      fetchGetMyChrgrInfo()
        .then((res) => {
          if (res.status === 200) {
            this.hanNm = res.data.rstData.myInfo.hanNm;
            // eslint-disable-next-line no-alert
            // this.$gf.alertOn(`${this.hanNm}님 환영합니다.`);
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
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
    alertMsg(text) {
      // eslint-disable-next-line no-alert
      alert(text);
      // this.$router.push({ name: 'swingDbInfo' });
    },
    resetCount() {
      fetchGetKeepSession()
        .then((res) => {
          if (res.status === 200) {
            this.timePassed = 0;
            this.$gf.resetCount();
          } else {
            this.logoutCall();
            this.movePage('login');
          }
        })
        .catch((ex) => {
          // console.log(`error occur!! : ${ex}`);
          // todo : 오류니까 무조건 logout하자!!
          this.logoutCall();
          this.movePage('login');
        });
    },
  },
};
</script>

<style scoped>
.inH1 {cursor: pointer; color: white;}
</style>
