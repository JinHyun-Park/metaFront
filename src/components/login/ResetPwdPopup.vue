<template>
  <div>
    <i class="dim" />
    <article class="login_contn layer_popup">
      <section class="title style-2">
        <h2><i class="ico-bar" />비밀번호 초기화</h2>
      </section>
      <section class="login form_area border_group">
        <div class="row_contain type-1">
          <div class="column on w-2">
            <label class="column_label">ID(SKT 사번)</label>
            <input
              type="text"
              value="190731"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">이름</label>
            <input
              type="text"
              value="SKCC"
            >
          </div>
        </div>
        <div class="row_contain type-1">
          <div class="column w-2">
            <label class="column_label">생년월일(YYMMDD)</label>
            <input
              type="number"
              value="930731"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">휴대전화번호</label>
            <input
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
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    popResetPage() {
      this.setResetPopOn({ resetPopOn: 'none' });
    },
  },
};
</script>
