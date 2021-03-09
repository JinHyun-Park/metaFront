<template>
  <section class="form_area border_group dashboard">
    <h4 class="l_tit">
      통계
    </h4>
    <h5 class="s_tit type-2">
      EAI 거래량({{ tgtStatDate }}) * 매일 8시 갱신
      <!--<div class="label_space">
        <label class="label-default">EAI</label>
        <label class="label-default on">EiGW</label>
        <label class="label-default">MCG</label>
      </div>-->
    </h5>
    <div class="row_contain type-2 chart_area">
      <bar-chart :chart-data="datacollection" />
    </div>
  </section>
</template>

<script>
import BarChart from '@/views/chart/BarChart.vue';
import { fetchGetStatEaiHourlyTrms } from '@/api/statApi';

export default {
  name: 'EaiDailyTrmsStat',
  components: {
    'bar-chart': BarChart,
  },
  data() {
    return {
      datacollection: {},
      dailyTrmsList: [],
      tgtStatDate: this.$gf.dateToString(new Date(), '-32h', 'N'),  //8시 반영시간 기준(24+8h차이)
    };
  },
  mounted() {
    this.searchStat();
  },
  methods: {
    searchStat() {
    // this.tgtUrl = '/api/bizcomm/board';
    // this.$axios.get(this.tgtUrl, {
      fetchGetStatEaiHourlyTrms({
        params: {
          statDate: this.tgtStatDate,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
          // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.dailyTrmsList = res.data.rstData.hourlyTrmsList;
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
    computeGraphRowKey() {
      const a = [];
      for (let i = 0; i < this.dailyTrmsList.length; i++) {
        a.push(this.dailyTrmsList[i].ifNm);
      }
      return a;
    },
    computeGraphRowValue() {
      const a = [];
      for (let i = 0; i < this.dailyTrmsList.length; i++) {
        a.push(this.dailyTrmsList[i].totCnt);
      }
      return a;
    },
    makeChartData() {
      this.datacollection = {
        labels: this.computeGraphRowKey(),
        datasets: [{
          label: '일일연동량',
          backgroundColor: this.dynamicColors(),
          data: this.computeGraphRowValue(),
        }],
      };
    },
    dynamicColors() {
      const a = [];
      for (let i = 0; i < this.dailyTrmsList.length; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        a.push(`rgb(${r},${g},${b})`);
      }
      return a;
    },

  },
};
</script>
