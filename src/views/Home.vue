<template>
  <article class="contents index except">
    <div class="right_space main">
      <section class="title style-1">
        <h2>
          <div>
            <i class="ico-bar" />Main Dashboard
          </div>
        </h2>
      </section>
      <div class="board_area">
        <new-guide style="width:50%" />
        <new-cnt style="width:25%" />
        <oper-cnt style="width:25%" />
      </div>
      <!-- <div class="board_area">
        <number-count style="width: 100%;" />
      </div> -->
      <!--<queue-monitor-real />-->
      <queue-monitor />
      <eigw-monitor />
      <!--<queue-stat />-->
      <div class="board_area">
        <eai-daily-trms-stat />
        <mcg-daily-trms-stat />
        <eigw-daily-trms-stat />
      </div>
      <reg-list-extend />

      <div class="board_area">
        <noti-board />
        <reg-list />
        <faq-board />
      </div>
    </div>
  </article>
</template>

<script>
import { fetchGetBoardList } from '@/api/bizCommApi';
// import RadarChart from './chart/RadarChart.vue';

import NotiBoard from '@/components/dashboard/NotiBoard.vue';
import FaqBoard from '@/components/dashboard/FaqBoard.vue';
import QueueMonitorReal from '@/components/dashboard/QueueMonitorReal.vue';
import QueueMonitor from '@/components/dashboard/QueueMonitor.vue';
import EigwMonitor from '@/components/dashboard/EigwMonitor.vue';
// import QueueTransStat from '../components/dashboard/QueueTransStat.vue';
import RegList from '@/components/dashboard/RegList.vue';
import RegListExtend from '@/components/dashboard/RegListExtend.vue';
import McgDailyTrmsStat from '@/components/dashboard/McgDailyTrmsStat.vue';
import EigwDailyTrmsStat from '@/components/dashboard/EigwDailyTrmsStat.vue';
import EaiDailyTrmsStat from '@/components/dashboard/EaiDailyTrmsStat.vue';
import NewGuide from '@/components/dashboard/NewGuide.vue';
import NewCnt from '@/components/dashboard/NewCnt.vue';
import OperCnt from '@/components/dashboard/OperCnt.vue';
// import NumberCount from '@/components/dashboard/NumberCount.vue';


export default {
  name: 'Home',
  components: {
    // 'radar-chart': RadarChart,
    'noti-board': NotiBoard,
    'faq-board': FaqBoard,
    // 'queue-stat': QueueTransStat,
    'queue-monitor': QueueMonitor,
    'queue-monitor-real': QueueMonitorReal,
    'eigw-monitor': EigwMonitor,
    'reg-list': RegList,
    'reg-list-extend': RegListExtend,
    'mcg-daily-trms-stat': McgDailyTrmsStat,
    'eigw-daily-trms-stat': EigwDailyTrmsStat,
    'eai-daily-trms-stat': EaiDailyTrmsStat,
    'new-guide': NewGuide,
    'new-cnt': NewCnt,
    'oper-cnt': OperCnt,
    // NumberCount,
  },
  data() {
    return {
      datacollection: null,
      startReqDtm: '',
      endReqDtm: '',
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      boardList: [],
    };
  },
  created() {
    this.fillData();
  },
  mounted() {
    // 3달 전 보기
    this.startReqDtm = this.$gf.dateToString(new Date(), '-3m', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
    this.searchList();
  },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            // Data for the x-axis of the chart
            data: [
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * 100) + 1;
    },
    moveToView(boardNum) {
      this.$router.push({ name: 'noticeView', params: { boardNum } });
    },
    // eslint-disable-next-line consistent-return
    setBoardStName(boardState) {
      // eslint-disable-next-line default-case
      switch (boardState) {
        case '0': return '유효(0)';
        case '1': return '기간만료(1)';
        case '2': return '완료(2)';
        case '9': return '삭제(9)';
      }
    },
    searchList() {
      // this.tgtUrl = '/api/bizcomm/board';
      // this.$axios.get(this.tgtUrl, {
      fetchGetBoardList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          size: this.pageSet.size,
          boardSt: '', // 0:정상
          boardTyp: 'NOTI',
          title: '',
          content: '',
          boardNum: '',
          // eslint-disable-next-line no-useless-escape
          startReqDtm: this.startReqDtm.replace(/\-/g, ''),
          // eslint-disable-next-line no-useless-escape
          endReqDtm: this.endReqDtm.replace(/\-/g, ''),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.boardList = res.data.rstData.board;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            // alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
