<template>
  <section class="form_area border_group dashboard">
    <transition name="slide-fade">
      <CommFullView
        v-if="isFullView"
        @closePop="turnOffFullView"
      />
    </transition>
    <div>
      <h4
        v-if="viewMode != 'FULL'"
        class="l_tit"
      >
        모니터링
      </h4>
      <h5 class="s_tit type-2">
        큐 적체량(EAI)
        <div class="right_button_area">
          <div class="select_group">
            <select v-model="srchType">
              <option value="">
                전체
              </option>
              <option value="IN_PART">
                파트내
              </option>
              <option value="IN_MY">
                내것만
              </option>
            </select>
          </div>
          &nbsp;&nbsp;
          <input
            v-model="chkAutoRefresh"
            type="checkbox"
          >
          Auto Refresh&nbsp;&nbsp;
          <button
            class="button is-primary home_btn"
            @click="searchQueueDepth()"
          >
            새로고침 : {{ remainTime }}s
          </button>
          <!--
          <button
            class="button is-primary"
            @click="showFullView()"
          >
            <img
              src="@/assets/images/ico-sizeup3.png"
              width="13"
            >
            전체화면
          </button>-->
        </div>
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div
        class="table_grid radio_group"
        style="width:70%"
      >
        <div class="table_head w-auto">
          <tr>
            <td class="th_cell">
              Num
            </td>
            <td class="th_cell">
              큐매니저
            </td>
            <td class="th_cell">
              큐명
            </td>
            <td class="th_cell">
              인터페이스명
            </td>
            <td class="th_cell">
              적체량
            </td>
            <td class="th_cell">
              담당자(SM)
            </td>
            <td class="th_cell">
              상세조회
            </td>
          </tr>
        </div>
        <div class="table_body">
          <tr
            v-for="(queueDepth, i) in queueDepthList"
            :key="i"
            class="table_row w-auto click_btn"
            :class="checkCurLine(i)"
            @click="showChart(i), setCurLine(i)"
          >
            <td class="td_cell">
              {{ i+1 }}
            </td>
            <td class="td_cell">
              {{ queueDepth.queueManager }}
            </td>
            <td class="td_cell">
              {{ queueDepth.queueNm }}
            </td>
            <td class="td_cell">
              {{ queueDepth.ifNm }}
            </td>
            <td class="td_cell">
              {{ queueDepth.depthCnt }}
            </td>
            <td class="td_cell">
              {{ queueDepth.nm }}({{ queueDepth.domainNm }})
            </td>
            <li class="td_cell">
              <label
                class="label-default color-gray click_btn"
                @click="moveIfIdDetail(i)"
              >
                조회
              </label>
            </li>
          </tr>
        </div>
      </div>
      <div
        class="row_contain chart_area"
        style="width:30%"
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
// import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import MultipleLineChart from '@/views/chart/MultipleLineChart.vue';
import { fetchGetQueueDepthList, fetchGetQueueDepthByQueueNmList } from '@/api/monitoringApi';
import { fetchGetEaiIfList } from '@/api/eaiApi';
import CommFullView from '@/components/popup/common/CommFullView.vue';

export default {
  name: 'QueueTransStat',
  components: {
    // 'reactive-bar-chart': ReactiveBarChart,
    'line-chart': MultipleLineChart,
    CommFullView,
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
      remainTime: 60,
      chkAutoRefresh: false,

      isFullView: false,

      isChartOn: true,
      tgtQueueNm: '',
      tgtIfNm: '',
      tgtQueueManager: '',
      tgtIfId: '',
      curLine: '0',
      srchType: '',

      eaiIfList: [],
    };
  },
  watch: {
    chkAutoRefresh() {
      if (this.chkAutoRefresh) {
        this.setAutoRefresh();
      } else {
        clearInterval(this.intervalFuc);
        clearInterval(this.remainTimeFuc);
        this.remainTime = 60;
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
    // 시연용 : 큐 상세 정보 조회를 위한 임시 함수(나중에 바꾸자!!)
    moveIfIdDetail(idx) {
      this.tgtIfId = this.queueDepthList[idx].queueNm.replace('.IN', '');
      this.searchEaiIfList(this.tgtIfId);
    },
    // 시연용 : 큐 상세 정보 조회를 위한 임시 함수(나중에 바꾸자!!)
    searchEaiIfList(tgtIfId) {
      fetchGetEaiIfList({
        params: {
          pageNo: 1,
          pageCount: 0,
          eaiIfId: tgtIfId,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.eaiIfList = res.data.rstData.searchList;
            this.$router.push({
              name: 'ifIdListAdmin',
              params: {
                eaiIfSeq: this.eaiIfList[0].eaiIfSeq,
                callType: 'update',
              },
            });
          } else {
            this.$gf.alertOn('오류가 발생하였습니다. 관리자에게 문의 하세요.');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    searchQueueDepthByQueueNm() {
      if (this.tgtQueueNm === '') {
        this.tgtQueueNm = this.queueDepthList[0].queueNm;
        this.tgtIfNm = this.queueDepthList[0].ifNm;
        this.tgtQueueManager = this.queueDepthList[0].queueManager;
      }
      fetchGetQueueDepthByQueueNmList({
        params: {
          time: this.queueDepthList[0].time,
          date: this.queueDepthList[0].date,
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
            // alert('failed');
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
          time: null,
          date: this.$gf.dateToString(new Date(), '', 'N'),
          srchType: this.srchType,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
          // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.queueDepthList = res.data.rstData.queueDepthList;
            if (this.queueDepthList.length > 10) {
              this.queueDepthList.splice(10, this.queueDepthList.length - 10);
            }
            if (this.isChartOn) {
              this.searchQueueDepthByQueueNm();
            }
            // this.makeChartData();
          } else {
          // eslint-disable-next-line no-alert
            // alert('failed');
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
    computeGraphRowValueInQ() {
      const a = [];
      for (let i = 0; i < this.queueDepthForQueueNmList.length; i++) {
        a.push(this.queueDepthForQueueNmList[i].inQ);
      }
      return a;
    },
    computeGraphRowValueOutQ() {
      const a = [];
      for (let i = 0; i < this.queueDepthForQueueNmList.length; i++) {
        a.push(this.queueDepthForQueueNmList[i].outQ);
      }
      return a;
    },
    makeChartData() {
      this.datacollection = {
        labels: this.computeGraphRowKey(),
        datasets: [{
          // out큐
          type:'line',
          yAxisID: 'second-y-axis',
          label: 'OUT Q',
          borderColor: 'rgb(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))',
          data: this.computeGraphRowValueOutQ(),
        }, {
          // in큐
          type:'line',
          yAxisID: 'second-y-axis',
          label: 'IN Q',
          borderColor: 'rgb(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))',
          data: this.computeGraphRowValueInQ(),
        }, {
          // 적체량
          type:'bar',
          yAxisID: 'first-y-axis',
          label: '큐적체건수',
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
        this.remainTime = 61;
      }, 60*1000);
      this.remainTimeFuc = setInterval(() => {
        this.remainTime -= 1;
      }, 1*1000);
    },
    setCurLine(val) {
      this.curLine = val;
    },
    checkCurLine(idx) {
      if (this.curLine === idx) {
        return 'on';
      }
      return '';
    },
    showFullView() {
      this.isFullView = true;
    },
    turnOffFullView() {
      this.isFullView = false;
    },
  },
};
</script>
