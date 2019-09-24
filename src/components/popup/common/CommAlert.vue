<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup ssmall">
      <section class="confirm_area">
        <label class="">{{ confirmSet.confirmMsg }}</label>
      </section>

      <section class="btm_button_area confirm_btn">
        <button
          type="button"
          class="default_button"
          @click="closeConfirm"
        >
          취소
        </button>
        <button
          type="button"
          class="default_button on"
          @click="excuteParentFunc"
        >
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CommAlert',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('frameSet', ['confirmSet']),
  },
  watch: {

  },
  methods: {
    ...mapActions('frameSet', ['setConfirmSet']),
    closeConfirm() {
      this.setConfirmSet({ confirmOn: false });
    },
    excuteParentFunc() {
      this.$gf.confirmOff(this.confirmSet.parentFunc);
    },
  },
};
</script>
