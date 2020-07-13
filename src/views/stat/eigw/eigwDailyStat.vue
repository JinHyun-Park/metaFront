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
            :class="{'on': dayOnClass}"
            @click="dayOn"
          >day</label>
          <label
            class="label-default"
            :class="{'on': monthOnClass}"
            @click="monthOn"
          >month</label>
          <label
            class="label-default"
            :class="{'on': yearOnClass}"
            @click="yearOn"
          >year</label>
        </div>
        <div class="column on w-1">
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="searchList()"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div class="row_contain chart_area dashboard">
        <reactive-bar-chart :chart-data="datacollection" />
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
                구분
              </td>
              <td class="th_cell">
                인터페이스ID
              </td>
              <td class="th_cell">
                인터페이스(한글)
              </td>
              <td class="th_cell">
                설정파일
              </td>
              <td class="th_cell">
                0시
              </td>
              <td class="th_cell">
                1시
              </td>
              <td class="th_cell">
                2시
              </td>
              <td class="th_cell">
                3시
              </td>
              <td class="th_cell">
                4시
              </td>
              <td class="th_cell">
                5시
              </td>
              <td class="th_cell">
                6시
              </td>
              <td class="th_cell">
                7시
              </td>
              <td class="th_cell">
                8시
              </td>
              <td class="th_cell" />
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
                <td class="td_cell">
                  {{ stat.instCd }}
                </td>
                <td class="td_cell">
                  {{ stat.mqMngrNm }}
                </td>
                <td class="td_cell">
                  {{ stat.ifId }}
                </td>
                <td class="td_cell">
                  {{ stat.ifNm }}
                </td>
                <td class="td_cell">
                  {{ stat.conf }}
                </td>
                <td class="td_cell">
                  {{ stat.t0 }}
                </td>
                <td class="td_cell">
                  {{ stat.t1 }}
                </td>
                <td class="td_cell">
                  {{ stat.t2 }}
                </td>
                <td class="td_cell">
                  {{ stat.t3 }}
                </td>
                <td class="td_cell">
                  {{ stat.t4 }}
                </td>
                <td class="td_cell">
                  {{ stat.t5 }}
                </td>
                <td class="td_cell">
                  {{ stat.t6 }}
                </td>
                <td class="td_cell">
                  {{ stat.t7 }}
                </td>
                <td class="td_cell">
                  {{ stat.t8 }}
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
import LineChart from '../../chart/LineChart.vue';
import BarChart from '../../chart/BarChart.vue';
import ReactiveBarChart from '../../chart/ReactiveBarChart.vue';
import RadarChart from '../../chart/RadarChart.vue';
import { fetchGetStatEigwDailyTrms } from '@/api/statApi';

export default {
  /* eslint-disable */
  components: {
    'line-chart': LineChart,
    'bar-chart': BarChart,
    'reactive-bar-chart': ReactiveBarChart,
    'radar-chart': RadarChart,
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
      dayOnClass: true,
      monthOnClass: false,
      yearOnClass: false,
    };
  },
  mounted() {
    this.statDate = this.$gf.dateToString(new Date(), '', 'Y');
  },
  methods: {
    computeGraphTotValue() {
      const a = {t0:0, t1:0, t2:0, t3: 0, t4:0};
      a.t0 +=this.statList[i].t0;
      a.t1 +=this.statList[i].t1;
      a.t2 +=this.statList[i].t2;
      a.t3 +=this.statList[i].t3;
      a.t4 +=this.statList[i].t4;

      return Object.values(a);
    },
    computeGraphRowValue(index) {
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

      return Object.values(a);
    },
    setStatDate(val) {
      this.statDate = val;
    },
    searchList() {
      if(this.statDate == null || this.statDate === "") {
        this.$gf.alertOn('조회일 입력 바랍니다.');
        return;
      }

      fetchGetStatEigwDailyTrms({
        params: {
          //statDate: this.statDate.replace(/\-/g, ''),
          statDate: '20200705',
        }
      })
        .then((res) => {
          console.log(res);
          if(res.data.rstCd === 'S'){
            this.statList = res.data.rstData.dailyTrmsList;
            this.drawGraph();
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        })
    },
    drawGraph() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: ['0시', '1시', '2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시'],

        datasets: [
          {
            label: this.statList[0].ifId,
            // Data for the x-axis of the chart/
            data: this.computeGraphRowValue(0),
            backgroundColor: this.dynamicColors(),
          },
          {
            label: this.statList[1].ifId,
            // Data for the x-axis of the chart
            data: this.computeGraphRowValue(1),
            backgroundColor: this.dynamicColors(),
          },
        ],
      };
    },
    dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    dayOn(){
      this.dayOnClass = true;
      this.monthOnClass = this.yearOnClass = false;
      this.searchList();
    },
    monthOn(){
      this.monthOnClass = true;
      this.dayOnClass = this.yearOnClass = false;
      this.searchList();
    },
    yearOn(){
      this.yearOnClass = true;
      this.dayOnClass = this.monthOnClass = false;
      this.searchList();
    },
  },
};
</script>