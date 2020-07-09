<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      class="layer_popup small"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="form_area border_group">
        <div class="row_contain type-3">
          <div class="column on w-4">
            <label class="column_label">의견</label>
            <textarea
              v-model="hstRmk"
              cols="60"
              rows="5"
            />
          </div>
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
        <button
          type="button"
          class="default_button on"
          @click="addData"
        >
          {{ btnMsg }}
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
      hstRmk: '',
      btnMsg: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    this.setBtnMsg();
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    setBtnMsg() {
      switch (this.procSt) {
        case 1:
          this.btnMsg = '반려';
          break;
        case 2:
          this.btnMsg = '승인요청';
          break;
        case 3:
          this.btnMsg = '승인';
          break;
        case 4:
          this.btnMsg = '개발반영 완료';
          break;
        case 5:
          this.btnMsg = '최종완료';
          break;
        default:
          this.btnMsg = '저장';
          break;
      }
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      this.$emit('addData', this.hstRmk);
    },
  },
};
</script>
