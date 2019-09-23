<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup ssmall">
      <section class="confirm_area">
        <label class="">{{ modalSet.modalMsg }}</label>
      </section>

      <section class="btm_button_area confirm_btn">
        <button
          type="button"
          class="default_button"
          @click="closeModal"
        >
          취소
        </button>
        <button
          type="button"
          class="default_button on"
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
    ...mapState('frameSet', ['modalSet']),
  },
  watch: {

  },
  methods: {
    ...mapActions('frameSet', ['setModalSet']),
    closeModal() {
      this.setModalSet({ modalOn: false });
    },
  },
};
</script>
