<template>
  <div class="contents index">
    <!-- <i class="dim" /> -->
    <article class="login_contn">
      <section class="title style-2">
        <h2><i class="ico-bar" />NARU</h2>
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
              value="SKCC"
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
import ResetPwdPopup from '@/components/login/ResetPwdPopup.vue';

export default {
  components: {
    ResetPwdPopup,
  },
  data() {
    return {
      user_id: 'SKCC',
      user_pw: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    login() {
      console.log('로그인 시도!');
      this.$axios.post('/api/auth/login', { id: this.user_id, pwd: this.user_pw })
        .then((res) => {
          console.log(res);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      this.$router.push({ name: 'home' });
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
