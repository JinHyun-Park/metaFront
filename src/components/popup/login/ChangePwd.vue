<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      class="layer_popup"
      @keydown.prevent.esc="exitPop()"
    >
      <div class="contents index">
        <article class="login_contn">
          <section class="title login style-2">
            <h2><i class="ico-bar" />비밀번호 변경</h2>
          </section>
          <section class="login form_area border_group">
            <div class="row_contain type-1">
              <div class="column on w-4">
                <label class="column_label">기존 비밀번호</label>
                <input
                  v-model="passwd"
                  type="password"
                >
              </div>
            </div>
            <div class="row_contain type-1">
              <div class="column w-4">
                <label class="column_label">신규 비밀번호</label>
                <input
                  v-model="newPassWd"
                  type="password"
                >
              </div>
            </div>
            <div class="row_contain type-1">
              <div class="column w-4">
                <label class="column_label">신규 비밀번호 확인</label>
                <input
                  v-model="newPassWd2"
                  type="password"
                >
              </div>
            </div>
          </section>
          <section class="btm_button_area">
            <button
              type="button"
              class="default_button"
              @click="exitPop()"
            >
              취소
            </button>
            <button
              type="button"
              class="default_button on"
              @click="confirmChgPw()"
            >
              확인
            </button>
          </section>
        </article>
      </div>
    </article>
  </div>
</template>

<script>
import { fetchChangePasswd } from '@/api/loginApi';

export default {
  data() {
    return {
      passwd: '',
      newPassWd: '',
      newPassWd2: '',
    };
  },
  mounted() {
    this.passwd = '';
    this.newPassWd = '';
    this.newPassWd2 = '';
  },
  methods: {
    confirmChgPw() {
      if(this.chkParamerter()) {
        fetchChangePasswd({
          passWd: this.passwd,
          newPassWd: this.newPassWd
      })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn('성공적으로 변경되었습니다.');
              this.exitPop();
            }
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      }
    },
    chkParamerter() {
      if(this.$gf.isEmpty(this.passwd)) {
        this.$gf.alertOn('현재 비밀번호를 입력해주시기 바랍니다.');
        return false;
      }
      if(this.$gf.isEmpty(this.newPassWd) || this.$gf.isEmpty(this.newPassWd2)) {
        this.$gf.alertOn('신규 비밀번호를 입력해주시기 바랍니다.');
        return false;
      }
      if(this.newPassWd != this.newPassWd2) {
        this.$gf.alertOn('새로 입력하신 신규 비밀번호가 상이합니다.');
        return false;
      }
      return true;
    },
    exitPop() {
      this.$emit('closePop', 'none');
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
  },
};
</script>
