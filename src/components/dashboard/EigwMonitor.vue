<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4 class="l_tit">
        모니터링
      </h4>
      <h5 class="s_tit type-2">
        대외연동 오류(EiGW)
        <div class="right_button_area">
          <input
            v-model="chkAutoRefresh"
            type="checkbox"
          >
          Auto Refresh
          <button
            class="button is-primary"
            @click="searchQueueDepth()"
          >
            새로고침 : {{ remainTime }}s
          </button>
        </div>
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div
        class="row_contain chart_area"
      >
        <line-chart
          :chart-data="datacollection"
        />
      </div>
    </div>
  </section>
</template>

<script>
// import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import LineChart from '@/views/chart/LineChart.vue';

export default {
  name: 'QueueTransStat',
  components: {
    // 'reactive-bar-chart': ReactiveBarChart,
    'line-chart': LineChart,
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
      tgtIfId: '',
      curLine: '0',

      eaiIfList: [],

      // // sample data
      transErrorTime: [2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109],
      transErrorE001DataLabel: ['', '', '', 'KAIT.SEND', ''],
      transErrorE001DataValue: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      transErrorE002DataValue: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      transErrorE003DataValue: [0, 0, 2, 0, 0, 0, 0, 0, 5, 0],
      transErrorE004DataValue: [1, 1, 0, 1, 0, 1, 0, 1, 0, 0],

      transErrorCnt: {
        errorE001: [{
          time: 1200,
          errorList: [{
            ifId: 'KTOA',
            ifNm: '한국통신',
          },
          {
            ifId: 'KAIT',
            ifNm: '한국정보',
          }],
        }, {
          time: 1202,
          errorList: [{
            ifId: 'KTOA',
            ifNm: '한국통신',
          },
          {
            ifId: 'KAIT',
            ifNm: '한국정보',
          }],
        }],
        errorE002: [{
          time: 1201,
          errorList: [{
            ifId: 'KTOA',
            ifNm: '한국통신',
          },
          ],
        }],
        errorE003: [],
        errorE004: [{
          time: 1204,
          errorList: [{
            ifId: 'KTOA',
            ifNm: '한국통신',
          },
          ],
        }],
      },
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
    // this.searchQueueDepth();
    this.searchEigwTransError();
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
    searchEigwTransError() {
      // this.searchQueueDepthByQueueNm();
      this.makeChartData();
    },
    dynamicColors() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    },
    getRandomValue() {
      return Math.floor(Math.random() * ((10 - 0) + 1));
    },
    makeChartData() {
      this.datacollection = {
        labels: this.transErrorTime,
        datasets: [{
          label: '대외기관 접속 불가',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE001DataValue,
          fill: false,
        },
        {
          label: '대외기관 프로세스 이상',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE002DataValue,
          fill: false,
        },
        {
          label: '내부 전문 오류',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE003DataValue,
          fill: false,
        },
        {
          label: '전문 수신오류(Timeout)',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE004DataValue,
          fill: false,
        }],
      };
    },
    setAutoRefresh() {
      this.intervalFuc = setInterval(() => {
        this.searchEigwTransError();
        this.remainTime = 6;
      }, 5000);
      this.remainTimeFuc = setInterval(() => {
        this.remainTime -= 1;
      }, 1000);
    },
  },
};
</script>
