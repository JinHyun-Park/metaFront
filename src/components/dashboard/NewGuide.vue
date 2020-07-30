<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4 class="l_tit">
        연동 가이드
      </h4>
      <h5 class="s_tit type-2">
        신규 연동 가이드
      </h5>
    </div>
    <div>
      <h3>
        연동이 처음이야??
      </h3>
      <h3>
        내가 좀 알려줄까??
      </h3>
      <h2>
        내가 좀 알려줄까??
      </h2>
      <h1>
        혼자서는 못하겠어??
      </h1>
      <h5>
        혼자서는 못하겠어??
      </h5>
      <button
        type="button"
        class="click_btn"
        @click="aa"
      >
        <img
          src="@/assets/images/img-eigw-btn.png"
          width="100"
        >
      </button>
      <img
        src="@/assets/images/img-eigw-btn.png"
        width="100"
        class="click_btn"
        @click="aa"
      >
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
    aa() {
      console.log('clicked');
    },
  },
};
</script>
