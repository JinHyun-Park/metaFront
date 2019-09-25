<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup ssmall">
      <section class="confirm_area">
        <label class="">{{ alertSet.alertMsg }}</label>
      </section>

      <section class="btm_button_area confirm_btn">
        <button
          type="button"
          class="default_button on"
          @click="closeAlert"
        >
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CommAlert',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('frameSet', ['alertSet']),
  },
  methods: {
    closeAlert() {
      this.$gf.alertOff(this.alertSet.parentFunc);
    },
  },
};
</script>
