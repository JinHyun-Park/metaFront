<template>
  <section class="form_area border_group dashboard">
    <div>
      <h5 class="s_tit type-2">
        담당 인터페이스 수
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div>
        <img
          src="@/assets/images/ico-pencil.png"
          width="100"
        >
      &nbsp;
      &nbsp;
      &nbsp;
      </div>
      <div
        class
        style="font-size:50px;"
      >
        10 개
      </div>

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
    aa() {
      console.log('clicked');
    },
  },
};
</script>
