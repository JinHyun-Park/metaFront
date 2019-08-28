<template>
  <div>
    <i class="dim" />
    <article class="login_contn layer_popup">
      <section class="title login style-2">
        <h2><i class="ico-bar" />비밀번호 초기화</h2>
      </section>
      <section class="login form_area border_group">
        <div class="row_contain type-1">
          <div class="column on w-2">
            <label class="column_label">ID(SKT 사번)</label>
            <input
              v-model="userId"
              type="text"
              value=""
            >
          </div>
          <div class="column w-2">
            <label class="column_label">이름</label>
            <input
              v-model="hanNm"
              type="text"
              value=""
            >
          </div>
        </div>
        <div class="row_contain type-1">
          <div class="column w-2">
            <label class="column_label">생년월일(YYMMDD)</label>
            <input
              v-model="juminNo"
              type="number"
              value="YYMMDD"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">휴대전화번호</label>
            <input
              v-model="mblPhonNum"
              type="number"
              value="0101231234"
            >
          </div>
        </div>
      </section>
      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="popResetPage"
        >
          취소
        </button>
        <button
          type="button"
          class="default_button on"
          @click="popResetPage"
        >
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ResetPwdPopup',
  data() {
    return {
      userId : "",
      hanNm : "",
      juminNo : "",
      mblPhonNum : "",
    };
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    popResetPage() {
      this.setResetPopOn({ resetPopOn: 'none' });
    },
    resetReqUserPw() {
      var reqData = { userId: this.userId, hanNm: this.hanNm,
                      juminNo: this.juminNo, mblPhonNum: this.mblPhonNum };
      this.$axios.post('/api/user/reqresetpasswd', reqData)
        .then((res) => {
          if(res.data.rstCd == 'S') {
            console.log(res.headers);
            this.popResetPage();
          } else {
            alert(res.data.rstMsg);
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
