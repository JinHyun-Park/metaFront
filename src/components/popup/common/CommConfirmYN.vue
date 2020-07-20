<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="commConfirmYN"
      class="layer_popup ssmall"
      tabindex="0"
      @keydown.esc="closeConfirm('N')"
    >
      <section class="confirm_area">
        <!-- <i class="ico-confirm" /> -->
        <i :class="{'ico-confirm': isConfirm, 'ico-warning': isWarning, 'ico-cancel': isCancel}" />
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
          class="default_button"
          @click="closeConfirm('N')"
        >
          취소
        </button>
        <button
          type="button"
          class="default_button on"
          @click="closeConfirm('Y')"
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
  name: 'CommConfirmYN',
  data() {
    return {
      innerNum: 1,
      isWarning: false, // 1
      isCancel: false, // 2
      isConfirm: true, // 3 or others
      innerMsgs: [],
    };
  },
  computed: {
    ...mapState('frameSet', ['confirmSet']),
  },
  mounted() {
    this.checkIcon(this.confirmSet.iconNum);
    this.innerMsgs = this.$gf.transEnterExp(this.confirmSet.confirmMsg);
    this.$refs.commConfirmYN.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    closeConfirm(flag) {
      if (flag === 'Y') {
        this.$gf.confirmOff(this.confirmSet.parentFunc, this.confirmSet.param);
      } else {
        this.$gf.confirmOff();
      }
    },
    checkIcon(val) { // 입력한 아이콘 값에 따라 confirm modal에 뜨는 아이콘 달라짐
      if (val === '1') {
        this.isWarning = true;
        this.isCancel = false;
        this.isConfirm = false;
      } else if (val === '2') {
        this.isWarning = false;
        this.isCancel = true;
        this.isConfirm = false;
      } else {
        this.isWarning = false;
        this.isCancel = false;
        this.isConfirm = true;
      }
    },
  },
};
</script>
