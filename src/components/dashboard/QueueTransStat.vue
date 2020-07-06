<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4 class="l_tit">
        통계
      </h4>
      <h5 class="s_tit type-2">
        EAI 연동량
      </h5>
      <div class="right_button_area">
        <input
          v-model="chkAutoRefresh"
          type="checkbox"
        >
        Auto Refresh
        </input>
        <button
          class="button is-primary"
          @click="searchQueueDepth()"
        >
          새로고침 : {{ remainTime }}s
        </button>
      </div>
    </div>
    <div class="row_contain chart_area">
      <reactive-bar-chart :chart-data="datacollection" />
    </div>
  </section>
</template>

<script>
import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import { fetchGetQueueDepthList } from '@/api/dashboardApi';

export default {
  name: 'QueueTransStat',
  components: {
    'reactive-bar-chart': ReactiveBarChart,
  },
  data() {
    return {
      datacollection: null,
      queueDepthList: [],
      remainTime: 5,
      chkAutoRefresh: false,
    };
  },
  watch: {
    chkAutoRefresh() {
      if (this.chkAutoRefresh) {
        this.setAutoRefresh();
      } else {
        clearInterval(this.intervalFuc);
        clearInterval(this.remainTimeFuc);
        this.remainTime = 5;
      }
    },
  },
  created() {
    this.searchQueueDepth();
  },
  mounted() {
    // this.fillData();
    // this.searchQueueDepth();
  },

  destroyed() {
    clearInterval(this.intervalFuc);
    clearInterval(this.remainTimeFuc);
  },
  methods: {
    searchQueueDepth() {
    // this.tgtUrl = '/api/bizcomm/board';
    // this.$axios.get(this.tgtUrl, {
      fetchGetQueueDepthList({
        params: {
          time: Math.floor(Math.random() * 1000) + 1000,
          date: '20200625',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
          // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.queueDepthList = res.data.rstData.queueDepthList;
            this.makeChartData();
          } else {
          // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    computeGraphRowKey() {
      const a = [];
      for (let i = 0; i < this.queueDepthList.length; i++) {
        a.push(this.queueDepthList[i].ifNm);
      }
      return a;
    },
    computeGraphRowValue() {
      const a = [];
      for (let i = 0; i < this.queueDepthList.length; i++) {
        a.push(this.queueDepthList[i].depthCnt);
      }
      return a;
    },
    makeChartData() {
      this.datacollection = {
        labels: this.computeGraphRowKey(),
        datasets: [{
          label: '큐적체량',
          backgroundColor: this.dynamicColors(),
          data: this.computeGraphRowValue(),
        }],
      };
    },
    dynamicColors() {
      const a = [];
      for (let i = 0; i < this.queueDepthList.length; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        a.push(`rgb(${r},${g},${b})`);
      }
      return a;
    },
    setAutoRefresh() {
      this.intervalFuc = setInterval(() => {
        this.searchQueueDepth();
        this.remainTime = 6;
      }, 5000);
      this.remainTimeFuc = setInterval(() => {
        this.remainTime -= 1;
      }, 1000);
    },
  },
};
</script>
