<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      class="layer_popup"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />신청 인터페이스 선택</h2>
      </section>
      <section class="form_area border_group">
        <div
          class="table_colgroup"
          style="display: flex; justify-content:space-between; align-content:center;"
        >
      &nbsp;
          <button
            type="button"
            class="click_btn"
            @click="addData('EAI')"
          >
            <h2>
              EAI
            </h2>
            <img
              src="@/assets/images/img-eai-btn.png"
              width="200"
            >
          </button>
          <button
            type="button"
            class="click_btn"
            @click="addData('EIGW')"
          >
            <h2 style="text-align:center;">
              EiGW
            </h2>
            <img
              src="@/assets/images/img-eigw-btn.png"
              width="200"
            >
          </button>
          <button
            type="button"
            class="click_btn"
            @click="addData('MCG')"
          >
            <h2>
              MCG
            </h2>
            <img
              src="@/assets/images/img-mcg-btn.png"
              width="200"
            >
          </button>
      &nbsp;
        </div>
      </section>

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    procSt: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ifKind: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(val) {
      this.ifKind = val;
      this.$emit('addData', this.ifKind);
    },
  },
};
</script>
