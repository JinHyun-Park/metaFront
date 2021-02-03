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
                  type="password"
                  value="SKCC1234"
                >
              </div>
            </div>
            <div class="row_contain type-1">
              <div class="column w-4">
                <label class="column_label">신규 비밀번호</label>
                <input
                  type="password"
                  value="SKCC123456*"
                >
              </div>
            </div>
            <div class="row_contain type-1">
              <div class="column w-4">
                <label class="column_label">신규 비밀번호 확인</label>
                <input
                  type="password"
                  value="SKCC123456*"
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
              @click="movePage('login')"
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
export default {
  methods: {
    movePage(page) {
      this.$router.push({ name: page });
    },
    exitPop() {
      this.$emit('closePop', 'none');
    },
  },
};
</script>
