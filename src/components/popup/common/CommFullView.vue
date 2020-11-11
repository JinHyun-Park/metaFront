<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup xlarge"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <div class="board_area">
        <total-monitor-full :mode="mode" />
        <eigw-monitor />
      </div>
      <div class="board_area">
        <total-monitor-full :mode="mode" />
        <eigw-monitor />
      </div>
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
          저장
        </button>
      </section>
    </article>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import TotalMonitorFull from '@/components/dashboard/TotalMonitorFull.vue';
import EigwMonitor from '@/components/dashboard/EigwMonitor.vue';

export default {
  name: 'EaiIfDetailPopup',
  components: {
    'total-monitor-full': TotalMonitorFull,
    'eigw-monitor': EigwMonitor,
  },
  props: {
    propData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      mode: 'FULL',

    };
  },
  methods: {
    closePop() {
      this.$emit('closePop', 'Hellos');
    },

  },
};
</script>

<style scoped>
.contents .right_space.main .board_area .form_area.dashboard{
  width: 50%;
}

.contents.popup .layer_popup {
    max-height: 950px;
}
</style>
