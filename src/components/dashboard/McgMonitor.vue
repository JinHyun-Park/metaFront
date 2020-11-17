<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4
        v-if="viewMode != 'FULL'"
        class="l_tit"
      >
        모니터링
      </h4>
      <h5 class="s_tit type-2">
        MCG 채널 현황
        <div class="right_button_area">
          <input
            v-model="chkAutoRefresh"
            type="checkbox"
          >
          Auto Refresh
          <button
            class="button is-primary"
            @click="searchEigwTransError()"
          >
            새로고침 : {{ remainTime }}s
          </button>
        </div>
      </h5>
    </div>
    <div
      class="row_contain chart_area"
    >
      <line-chart
        :chart-data="datacollection"
      />
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
  props: {
    viewMode: {
      type: String,
      default: null,
    },
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
      transErrorE001DataValue: [0, 0, 3, 0, 0, 0, 0, 3, 0, 0],
      transErrorE002DataValue: [0, 0, 0, 0, 3, 3, 3, 3, 3, 3],
      transErrorE003DataValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transErrorE004DataValue: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],

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
    this.searchMcgTransError();
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
    searchMcgTransError() {
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
      return Math.floor(Math.random() * ((3 - 0) + 1));
    },
    makeChartData() {
      this.datacollection = {
        labels: this.transErrorTime,
        datasets: [{
          label: 'TWORLD',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE001DataValue,
          fill: false,
        },
        {
          label: 'T Gate',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE002DataValue,
          fill: false,
        },
        {
          label: 'CSP',
          // label: this.transErrorE001DataLabel,
          // data: this.computeGraphRowValue(),
          borderColor: this.dynamicColors(),
          data: this.transErrorE003DataValue,
          fill: false,
        },
        {
          label: 'API HUB',
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
