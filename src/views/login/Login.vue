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

export default {
  components: {
    ResetPwdPopup,
  },
  data() {
    return {
      user_id: '',
      user_pw: '',
      hanNm: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    login() {
      console.log('로그인 시도!');
      const form = new FormData();
      form.append('userId', this.user_id);
      form.append('userPw', this.user_pw);

      this.$axios.post('/api/loginProc', form)
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
          alert('로그인을 실패했습니다. ID나 비밀번호가 일치하지 않습니다.');
        });
    },
    getUserInfo() {
      this.$axios.get(`/api/user/${this.user_id}`)
        .then((res) => {
          if (res.status === 200) {
            this.hanNm = res.data.rstData.userList[0].chrgrInfo.hanNm;
            // eslint-disable-next-line no-alert
            alert(`${this.hanNm}님 환영합니다.`);
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
