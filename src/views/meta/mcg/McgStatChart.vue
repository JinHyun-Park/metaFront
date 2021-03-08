<template>
  <section class="form_area border_group dashboard">
    <h4 class="l_tit">
      시간별 통계
    </h4>
    <h5 class="s_tit type-2">
      MCG 거래량({{ tgtStatDate }}) * 매일 12시에 갱신
      <!--<div class="label_space">
        <label class="label-default">EAI</label>
        <label class="label-default on">EiGW</label>
        <label class="label-default">MCG</label>
      </div>-->
    </h5>
    <div class="row_contain type-2 chart_area">
      <line-chart :chart-data="datacollection" />
    </div>
  </section>
</template>

<script>
import LineChart from '@/views/chart/LineChart.vue';
import { fetchGetStatMcgHourlyTrms } from '@/api/statApi';

export default {
  name: 'McgTrmsStat',
  components: {
    'line-chart': LineChart,
  },
  props: {
    searchData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      datacollection: {},
      dailyTrmsList: [],
      statList:[],
      tgtStatDate: this.$gf.dateToString(new Date(), '-36h', 'N'),
      tgtOpCd : '',
      tgtDealId : '',

    };
  },
  mounted() {
    console.log(`searchData : ${this.searchData}`);
    this.tgtOpCd = this.searchData.opCd;
    this.tgtDealId = this.searchData.dealCd;
    this.searchStat();
  },
  methods: {
    searchStat() {
      fetchGetStatMcgHourlyTrms({
        params: {
          inputKeyword: this.tgtDealId,
          inputOpCd: this.tgtOpCd,
          statDate: this.tgtStatDate,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
          // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.statList = res.data.rstData.hourlyTrmsList;
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
        a.push(""+this.dailyTrmsList[i].opCd+"-"+this.dailyTrmsList[i].tx);
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
        labels: ['0시', '1시', '2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시', '10시', '11시', 
        '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', '23시'],
        datasets: this.setHourlyChartData(),
      };
    },
    setHourlyChartData(){
      var datasets = [];
      for(var i=0; i<this.statList.length; i++){
        var dataset = {
          label: this.statList[i].opCd + '-' + this.statList[i].tx,
          data: this.computeHourlyGraphRowValue(i),
          backgroundColor: this.dynamicColors(),
          borderColor: this.dynamicColors(),
          lineTension: 0.2,
          fill: false,
        };
        datasets[i] = dataset;
      }
      return datasets;
    },
    computeHourlyGraphRowValue(index) {
      const a = {};
      a.t0 = this.statList[index].t0;
      a.t1 = this.statList[index].t1;
      a.t2 = this.statList[index].t2;
      a.t3 = this.statList[index].t3;
      a.t4 = this.statList[index].t4;
      a.t5 = this.statList[index].t5;
      a.t6 = this.statList[index].t6;
      a.t7 = this.statList[index].t7;
      a.t8 = this.statList[index].t8;
      a.t9 = this.statList[index].t9;
      a.t10 = this.statList[index].t10;
      a.t11 = this.statList[index].t11;
      a.t12 = this.statList[index].t12;
      a.t13 = this.statList[index].t13;
      a.t14 = this.statList[index].t14;
      a.t15 = this.statList[index].t15;
      a.t16 = this.statList[index].t16;
      a.t17 = this.statList[index].t17;
      a.t18 = this.statList[index].t18;
      a.t19 = this.statList[index].t19;
      a.t20 = this.statList[index].t20;
      a.t21 = this.statList[index].t21;
      a.t22 = this.statList[index].t22;
      a.t23 = this.statList[index].t23;
      return Object.values(a);
    },
    dynamicColors() {
      const a = [];
      for (let i = 0; i < this.statList.length; i++) {
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
