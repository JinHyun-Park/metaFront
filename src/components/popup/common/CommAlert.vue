<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="commAlert"
      class="layer_popup ssmall"
      tabindex="0"
      @keydown.prevent.esc.enter.space="closeAlert"
    >
      <section class="confirm_area">
        <label
          v-for="(item, i) in innerMsgs"
          :key="i"
          class=""
        >
          <span>
            {{ item }}
          </span>
        </label>
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
      innerMsgs: [],
    };
  },
  computed: {
    ...mapState('frameSet', ['alertSet']),
  },
  mounted() {
    this.innerMsgs = this.$gf.transEnterExp(this.alertSet.alertMsg);
    this.$refs.commAlert.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    closeAlert() {
      this.$gf.alertOff(this.alertSet.parentFunc, this.alertSet.param);
    },
  },
};
</script>
