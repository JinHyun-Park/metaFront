<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 일일 연동량
        </div>
        <div class="breadcrumb">
          <span>통계</span><em class="on">EIGW</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">조회일</label>
          <div class="calander_group">
            <input
              v-model="reqDtm"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="reqDtm"
              min="2020-6-1"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="setReqDtm"
            />
          </div>
        </div>
        <div class="column on w-3" />
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
              </tr>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetUserInfoList } from '@/api/loginApi';

export default {
  /* eslint-disable */
  data() {
    return {
      sample: [
        {ifId: 'KTOA.SEND_MIR', ifNm : 'KTOA 번호이동 송신', mqMngrNm: 'EIGW1P', instCd: 'KTOA', conf: 'KTOA1011', statDate: '20200615', t1: '1',
        t2:'2',t3:'3',t4:'4',t5:'6',
        },
        {ifId: 'KTOA.RECV_MIR', ifNm : 'KTOA 번호이동 수신', mqMngrNm: 'EIGW1P', instCd: 'KTOA', conf: 'KTOA1021', statDate: '20200615', 1: '1',
        2:'2',3:'3',4:'4',
        },

      ],

      reqDtm: '',
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },

      statList: [],
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),

  },
  mounted() {
    this.reqDtm = this.$gf.dateToString(new Date(), '', 'Y');
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    setReqDtm(val) {
      this.reqDtm = val;
    },
    searchList() {
      if(this.reqDtm == null || this.reqDtm === "") {
        this.$gf.alertOn('조회일 입력 바랍니다.');
        return;
      }

      this.statList = this.sample;
      // fetchGetUserInfoList({  
      //   params: {
      //     reqDtm: this.reqDtm,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.rstCd === 'S') {
      //       //this.userList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.userList, 'Y');
      //       this.statList = res.data.rstData.statList;
      //     }
      //   })
      //   .catch((ex) => {
      //     console.log(`error occur!! : ${ex}`);
      //   });
    },
  },
};
</script>