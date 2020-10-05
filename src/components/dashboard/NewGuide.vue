<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4 class="l_tit">
        연동 가이드
      </h4>
      <h5 class="s_tit type-2">
        첫 사용자를 위한 간단 Guide!!
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      &nbsp;
      <button
        type="button"
        class="click_btn"
        style="background-color:white;"
        @click="movePage('naruSummary')"
      >
        <h2>
          NARU란?
        </h2>
        <img
          src="@/assets/images/img-eai-btn.png"
          width="100"
        >
      </button>

      <button
        type="button"
        class="click_btn"
        style="background-color:white;"
        @click="movePage('ifSummary')"
      >
        <h2>
          Who??
        </h2>
        <img
          src="@/assets/images/img-eai-btn.png"
          width="100"
        >
      </button>
      <button
        type="button"
        class="click_btn"
        style="background-color:white;"
        @click="movePage('decideIf')"
      >
        <h2 style="text-align:center;">
          What??
        </h2>
        <img
          src="@/assets/images/img-eigw-btn.png"
          width="100"
        >
      </button>
      <button
        type="button"
        class="click_btn"
        style="background-color:white;"
        @click="movePage('procGuide')"
      >
        <h2>
          How??
        </h2>
        <img
          src="@/assets/images/img-mcg-btn.png"
          width="100"
        >
      </button>
      &nbsp;
    </div>
  </section>
</template>

<script>
// import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
// import { fetchGetQueueDepthList, fetchGetQueueDepthByQueueNmList } from '@/api/monitoringApi';

export default {
  name: 'QueueTransStat',
  components: {
  },
  data() {
    return {
      datacollection: {},
      queueDepthList: [],
      queueDepthForQueueNmList: [],
      remainTime: 5,
      chkAutoRefresh: false,

      isChartOn: true,
      tgtQueueNm: '',
      tgtIfNm: '',
      tgtQueueManager: '',
      curLine: '0',
    };
  },
  created() {
    // this.searchQueueDepth();
  },
  mounted() {
    // this.fillData();
    // this.searchQueueDepth();
  },
  methods: {
    movePage(val) {
      this.$router.push({
        name: val,
      });
    },
  },
};
</script>
