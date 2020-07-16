<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 일일 연동량
        </div>
        <div class="breadcrumb">
          <span>통계</span><em class="on">EiGW</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">조회일</label>
          <div class="calander_group">
            <input
              v-model="statDate"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="statDate"
              min="2020-6-1"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="setStatDate"
            />
          </div>
        </div>
        <div class="column on w-2" />
        <div class="label_space">
          <label
            class="label-default"
            :class="{'on': hourOnClass}"
            @click="hourOn"
          >hour</label>
          <label
            class="label-default"
            :class="{'on': dayOnClass}"
            @click="dayOn"
          >day</label>
          <label
            class="label-default"
            :class="{'on': monthOnClass}"
            @click="monthOn"
          >month</label>
        </div>
        <div class="column on w-1">
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="hourOn()"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div class="row_contain chart_area dashboard">
        <reactive-line-chart :chart-data="datacollection" />
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <tr>
              <td class="th_cell" />
              <td class="th_cell">
                대외기관
              </td>
              <td class="th_cell">
                인터페이스ID
              </td>
              <td class="th_cell">
                큐매니저
              </td>
              <td class="th_cell">
                설정파일
              </td>
              <td class="th_cell">
                합계
              </td>
              <td
                v-for="time in maxTime"
                :key="time"
                class="th_cell"
              >
                <template v-if="(`${timeUnit}` == '시')">
                  {{ time - 1 }}
                </template>
                <template v-else>
                  {{ time }}
                </template>
                {{ timeUnit }}
              </td>
            </tr>
          </div>
          <div class="table_body">
            <template v-if="statList === [] ||statList.length === 0">
              <tr class="table_row w-auto">
                <td
                  colspan="10"
                  class="td_cell"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(stat, i) in statList"
                :key="i"
                class="table_row w-auto"
              >
                <td class="td_cell">
                  {{ i+1 }}
                </td>
                <td
                  v-for="statItem in statItemList"
                  :key="statItem"
                  class="td_cell"
                >
                  {{ stat[statItem] }}
                </td>
              </tr>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ReactiveLineChart from '../../chart/ReactiveLineChart.vue';
import { fetchGetStatEigwHourlyTrms, fetchGetStatEigwDailyTrms } from '@/api/statApi';

export default {
  /* eslint-disable */
  components: {
    'reactive-line-chart': ReactiveLineChart,
  },
  data() {
    return {
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      statDate: '',
      datacollection: null,
      statList: [],
      hourOnClass: true,
      dayOnClass: false,
      monthOnClass: false,
      statItemList: [],
      statHourlyItemList: ['instCd', 'ifId', 'mqMngrNm', 'conf', 'totCnt', 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 
      't12', 't13', 't14', 't15', 't16', 't17', 't18', 't19', 't20', 't21', 't22', 't23'],
      statDailyItemList: ['instCd', 'ifId', 'mqMngrNm', 'conf', 'totCnt', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10',
      'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd19', 'd20',
      'd21', 'd22', 'd23', 'd24', 'd25', 'd26', 'd27', 'd28', 'd29', 'd30', 'd31'],
      maxTime: 24,
      timeUnit: '시',
    };
  },
  mounted() {
    this.statDate = this.$gf.dateToString(new Date(), '', 'Y');
    this.statItemList = this.statHourlyItemList;
  },
  methods: {
    dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    hourOn(){
      this.hourOnClass = true;
      this.dayOnClass = this.monthOnClass = false;
      this.statItemList = this.statHourlyItemList;
      this.maxTime = 24;
      this.timeUnit = '시',
      this.searchHourlyList();
    },
    dayOn(){
      this.dayOnClass = true;
      this.hourOnClass = this.monthOnClass = false;
      this.statItemList = this.statDailyItemList;
      this.maxTime = 31;
      this.timeUnit = '일',
      this.searchDailyList();
    },
    monthOn(){
      this.monthOnClass = true;
      this.hourOnClass = this.dayOnClass = false;
      this.maxTime = 12;
      this.timeUnit = '월';
      this.searchHourlyList();
    },
    setStatDate(val) {
      this.statDate = val;
    },
    searchHourlyList() {
      if(this.statDate == null || this.statDate === "") {
        this.$gf.alertOn('조회일 입력 바랍니다.');
        return;
      }

      fetchGetStatEigwHourlyTrms({
        params: {
          //statDate: this.statDate.replace(/\-/g, ''),
          statDate: '20200705',
        }
      })
        .then((res) => {
          console.log(res);
          if(res.data.rstCd === 'S'){
            this.statList = res.data.rstData.dailyTrmsList;
            this.makeHourlyChartData();
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        })
    },
    makeHourlyChartData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: ['0시', '1시', '2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시', '10시', '11시', 
        '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', '23시'],
        datasets: this.setHourlyChartData(),
      };
    },
    setHourlyChartData(){
      var datasets = [];
      for(var i=0; i<this.statList.length; i++){
        var dataset = {
          label: this.statList[i].ifId,
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

    searchDailyList() {
      fetchGetStatEigwDailyTrms({
        params: {
          statDate: '20200520',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.statList = res.data.rstData.dailyTrmsList;
            this.makeDailyChartData();
          } else {
          // eslint-disable-next-line no-alert
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    makeDailyChartData() {
      this.datacollection = {
        labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', 
        '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', 
        '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일'],
        datasets: this.setDailyChartData(),
      };
    },
    setDailyChartData(){
      var datasets = [];
      for(var i=0; i<this.statList.length; i++){
        var dataset = {
          label: this.statList[i].ifId,
          data: this.computeDailyGraphRowValue(i),
          backgroundColor: this.dynamicColors(),
          borderColor: this.dynamicColors(),
          lineTension: 0.2,
          fill: false,
        };
        datasets[i] = dataset;
      }
      return datasets;
    },
    computeDailyGraphRowValue(index) {
      const a = {};
      a.d1 = this.statList[index].d1;
      a.d2 = this.statList[index].d2;
      a.d3 = this.statList[index].d3;
      a.d4 = this.statList[index].d4;
      a.d5 = this.statList[index].d5;
      a.d6 = this.statList[index].d6;
      a.d7 = this.statList[index].d7;
      a.d8 = this.statList[index].d8;
      a.d9 = this.statList[index].d9;
      a.d10 = this.statList[index].d10;
      a.d11 = this.statList[index].d11;
      a.d12 = this.statList[index].d12;
      a.d13 = this.statList[index].d13;
      a.d14 = this.statList[index].d14;
      a.d15 = this.statList[index].d15;
      a.d16 = this.statList[index].d16;
      a.d17 = this.statList[index].d17;
      a.d18 = this.statList[index].d18;
      a.d19 = this.statList[index].d19;
      a.d20 = this.statList[index].d20;
      a.d21 = this.statList[index].d21;
      a.d22 = this.statList[index].d22;
      a.d23 = this.statList[index].d23;
      a.d24 = this.statList[index].d24;
      a.d25 = this.statList[index].d25;
      a.d26 = this.statList[index].d26;
      a.d27 = this.statList[index].d27;
      a.d28 = this.statList[index].d28;
      a.d29 = this.statList[index].d29;
      a.d30 = this.statList[index].d30;
      a.d31 = this.statList[index].d31;
      return Object.values(a);
    },
  },
};
</script>