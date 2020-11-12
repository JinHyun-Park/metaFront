<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup xlarge"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <!--<total-monitor-full :mode="mode" />-->
      <div class="board_area type_1">
        <queue-monitor :view-mode="viewMode" />
      </div>
      <div class="board_area type_2">
        <eigw-monitor :view-mode="viewMode" />
        <mcg-monitor :view-mode="viewMode" />
      </div>
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
// import { mapState, mapActions } from 'vuex';
import TotalMonitorFull from '@/components/dashboard/TotalMonitorFull.vue';
import QueueMonitor from '@/components/dashboard/QueueMonitor.vue';
import EigwMonitor from '@/components/dashboard/EigwMonitor.vue';
import McgMonitor from '@/components/dashboard/McgMonitor.vue';

export default {
  name: 'EaiIfDetailPopup',
  components: {
    'total-monitor-full': TotalMonitorFull,
    'queue-monitor': QueueMonitor,
    'eigw-monitor': EigwMonitor,
    'mcg-monitor': McgMonitor,
  },
  props: {
    propData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      viewMode: 'FULL',

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
.contents .right_space.main .board_area.type_1 .form_area.dashboard{
  width: 100%;
  height: 470px;
  max-height: 490px;
}

.contents .right_space.main .board_area.type_2 .form_area.dashboard{
  width: 50%;
  height: 400px;
}

.contents.popup .layer_popup {
    max-height: 950px;
}
</style>
