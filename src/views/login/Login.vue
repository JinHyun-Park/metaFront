<template>
  <div class="contents index">
    <article class="login_contn">
      <section class="title login style-2">
        <!-- <h2><i class="ico-bar" />NARU</h2> -->
        <h2>
          <img
            class="bi_login"
            src="@/assets/images/naru-bi-dark.png"
            alt="나루 로고"
          >
        </h2>
      </section>
      <section class="login form_area border_group">
        <div class="row_contain type-1">
          <div class="column on w-4">
            <label class="column_label">ID</label>
            <input
              v-model="user_id"
              type="text"
              value=""
            >
          </div>
        </div>
        <div class="row_contain type-1">
          <div class="column w-4">
            <label class="column_label">Password</label>
            <input
              v-model="user_pw"
              type="password"
              value=""
              @keyup.13="login()"
            >
          </div>
        </div>
      </section>
      <section class="form_area">
        <div class="row_contain">
          <div class="column w-6">
            <div class="checkbox_group checktype-1">
              <span class="default_checkbox">
                <input
                  id="checkbox_1"
                  v-model="idMem"
                  type="checkbox"
                  name="checkbox_1"
                >ID 기억<label
                  class="border-brickpink"
                  for="checkbox_1"
                ><span /></label>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section class="btm_button_area log">
        <button
          type="button"
          class="default_button on"
          @click="login()"
        >
          LOGIN
        </button>
        <button
          type="button"
          class="default_button sign"
        >
          SIGN UP
        </button>
      </section>
      <section class="help">
        <em
          class="notice"
          @click="popResetPage"
        >Reset password<i class="ico-reset" /></em>
        <em
          class="notice"
          @click="movePage('changePwd')"
        >Change password<i class="ico-help" /></em>
      </section>
    </article>
    <ResetPwdPopup :style="{display: resetPopOn}" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ResetPwdPopup from '@/components/popup/login/ResetPwdPopup.vue';
import { fetchLoginProc, fetchGetUserInfo } from '@/api/loginApi';

export default {
  components: {
    ResetPwdPopup,
  },
  data() {
    return {
      user_id: '',
      user_pw: '',
      hanNm: '',
      idMem: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    if (!this.$gf.isEmpty(this.$cookie.get('idMem'))) {
      this.user_id = this.$cookie.get('idMem');
      this.idMem = true;
    }
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('login', ['setLoginInfo']),
    login() {
      if (this.idMem) {
        this.$cookie.set('idMem', this.user_id);
      } else {
        this.$cookie.delete('idMem');
      }

      console.log('로그인 시도!');
      const form = new FormData();
      form.append('userId', this.user_id);
      form.append('userPw', this.user_pw);

      fetchLoginProc(form)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.headers);
            this.getUserInfo();
            this.$router.push({ name: 'home', hanNm: this.hanNm });
          }
          console.log(res);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
          // eslint-disable-next-line no-alert
          this.$gf.alertOn('로그인에 실패했습니다.\n ID나 비밀번호가 일치하지 않습니다.');
        });
    },
    getUserInfo() {
      fetchGetUserInfo(this.user_id)
        .then((res) => {
          if (res.status === 200) {
            this.hanNm = res.data.rstData.userList[0].hanNm;
            // eslint-disable-next-line no-alert
            this.$gf.alertOn(`${this.hanNm}님 환영합니다.`);
            this.setLoginInfo({ loginHanNm: this.hanNm });
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      // this.$router.push({ name: 'home', hanNm: this.hanNm });
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
    popResetPage() {
      this.setResetPopOn({ resetPopOn: 'flex' });
    },
  },
};
</script>
