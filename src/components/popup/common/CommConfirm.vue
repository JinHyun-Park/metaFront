<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup Ssmall">
      <!--
                <section class="title style-2">
                    <h2><i class="ico-bar"></i>Confirm Popup</h2>
                </section>
-->
      <section class="confirm_area">
        <!-- <i class="ico-confirm" /> -->
        <i :class="{'ico-confirm': isConfirm, 'ico-warning': isWarning, 'ico-cancel': isCancel}" />
        <label class=""> {{ confirmSet.confirmMsg }}</label>
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
  name: 'CommConfirm',
  data() {
    return {
      innerNum: 1,
      isWarning: false, // 1
      isCancel: false, // 2
      isConfirm: true, // 3 or others
    };
  },
  computed: {
    ...mapState('frameSet', ['confirmSet']),
  },
  mounted() {
    this.checkIcon(this.confirmSet.iconNum);
  },
  methods: {
    ...mapActions('frameSet', ['setConfirmSet']),
    closeConfirm() {
      this.setConfirmSet({ confirmOn: false });
    },
    excuteParentFunc() {
      this.$gf.confirmOff(this.confirmSet.parentFunc);
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
