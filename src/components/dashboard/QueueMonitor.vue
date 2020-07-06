<template>
  <section class="form_area border_group dashboard">
    <div>
      <h4 class="l_tit">
        모니터링
      </h4>
      <h5 class="s_tit type-2">
        큐 적체량(EAI)
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
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div class="table_grid radio_group">
        <div class="table_head w-auto">
          <tr>
            <td class="th_cell">
              Num
            </td>
            <td class="th_cell">
              인터페이스명
            </td>
            <td class="th_cell">
              적체량
            </td>
            <td class="th_cell">
              SM
            </td>
            <td class="th_cell">
              담당자
            </td>
          </tr>
        </div>
        <div class="table_body">
          <tr
            v-for="(queueDepth, i) in queueDepthList"
            :key="i"
            class="table_row w-auto"
          >
            <td class="td_cell">
              {{ i+1 }}
            </td>
            <td class="td_cell">
              {{ queueDepth.ifNm }}
            </td>
            <td
              class="td_cell"
              @click="showChart(i)"
            >
              {{ queueDepth.depthCnt }}
            </td>
            <td class="td_cell">
              {{ queueDepth.domainNm }}
            </td>
            <td class="td_cell">
              {{ queueDepth.nm }}
            </td>
          </tr>
        </div>
      </div>
      <div
        class="row_contain chart_area"
        style="width:60%"
      >
        <line-chart
          v-show="isChartOn"
          :chart-data="datacollection"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import LineChart from '@/views/chart/LineChart.vue';
import { fetchGetQueueDepthList, fetchGetQueueDepthByQueueNmList } from '@/api/monitoringApi';

export default {
  name: 'QueueTransStat',
  components: {
    'reactive-bar-chart': ReactiveBarChart,
    'line-chart': LineChart,
  },
  data() {
    return {
      datacollection: null,
      queueDepthList: [],
      queueDepthForQueueNmList: [],
      remainTime: 5,
      chkAutoRefresh: false,

      isChartOn: true,
      tgtQueueNm: '',
      tgtIfNm: '',
      tgtQueueManager: '',
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
    showChart(idx) {
      this.isChartOn = true;
      this.tgtQueueNm = this.queueDepthList[idx].queueNm;
      this.tgtIfNm = this.queueDepthList[idx].ifNm;
      this.tgtQueueManager = this.queueDepthList[idx].queueManager;
      this.searchQueueDepthByQueueNm();
    },
    searchQueueDepthByQueueNm() {
      if (this.tgtQueueNm === '') {
        this.tgtQueueNm = this.queueDepthList[0].queueNm;
        this.tgtIfNm = this.queueDepthList[0].ifNm;
        this.tgtQueueManager = this.queueDepthList[0].queueManager;
      }
      fetchGetQueueDepthByQueueNmList({
        params: {
          // date, time은 추후 데이터가 들어올때 다시 추가(back-end todo)
          // time: Math.floor(Math.random() * 1000) + 1000,
          // date: '20200625',
          queueNm: this.tgtQueueNm,
          ifNm: this.tgtIfNm,
          queueManager: this.tgtQueueManager,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
          // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.queueDepthForQueueNmList = res.data.rstData.queueDepthList;
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
            if (this.isChartOn) {
              this.searchQueueDepthByQueueNm();
            }
            // this.makeChartData();
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
      for (let i = 0; i < this.queueDepthForQueueNmList.length; i++) {
        a.push(this.queueDepthForQueueNmList[i].time);
      }
      return a;
    },
    computeGraphRowValue() {
      const a = [];
      for (let i = 0; i < this.queueDepthForQueueNmList.length; i++) {
        a.push(this.queueDepthForQueueNmList[i].depthCnt);
      }
      return a;
    },
    makeChartData() {
      this.datacollection = {
        labels: this.computeGraphRowKey(),
        datasets: [{
          label: this.queueDepthForQueueNmList[0].queueNm,
          // backgroundColor: this.dynamicColors(),
          data: this.computeGraphRowValue(),
        }],
      };
    },
    dynamicColors() {
      const a = [];
      for (let i = 0; i < this.queueDepthForQueueNmList.length; i++) {
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
