<template>
  <article class="contents index">
    <div class="login_contn">
      <section class="title style-2">
        <h2><i class="ico-bar" />LOGIN</h2>
      </section>
      <div class="login_form">
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
        <section class="btm_button_area">
          <button
            type="button"
            class="default_button on"
            @click="login()"
          >
            LOGIN
          </button>
          <button
            type="button"
            class="default_button"
          >
            SIGN UP
          </button>
        </section>
        <div class="help">
          <em class="notice">forgot password</em>
          <i class="ico-help" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user_id: 'SKCC',
      user_pw: '',
    };
  },
  created() {
    this.setHeaderOn({ headerOn: false });
    this.setAsideOn({ asideOn: false });
    this.setFooterOn({ footerOn: false });
  },
  methods: {
    ...mapActions('frameSet', ['setHeaderOn', 'setAsideOn', 'setFooterOn']),
    login() {
      console.log('로그인 시도!');
      this.$axios.post('http://127.0.0.1/3000/auth/login', { id: this.user_id, pwd: this.user_pw })
        .then((res) => {
          console.log(res);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      this.setHeaderOn({ headerOn: true });
      this.setAsideOn({ asideOn: true });
      this.setFooterOn({ footerOn: true });
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
