<template>
  <div>
    <section class="form_area border_group">
      <h5 class="s_tit">
        신청 기본 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-4">
          <label class="column_label">제목</label>
          <input
            v-model="ifReqMstInfo.reqTitle"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영 반영예정일</label>
          <div class="calander_group">
            <input
              v-model="ifReqMstInfo.operAplyReqDt"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="ifReqMstInfo.operAplyReqDt"
              :min="today"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="setOperAplyReqDt"
            />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-4">
          <label class="column_label">사유</label>
          <input
            v-model="ifReqMstInfo.reqPurp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">개발 반영예정일</label>
          <div class="calander_group">
            <input
              v-model="ifReqMstInfo.dvlpAplyReqDt"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="ifReqMstInfo.dvlpAplyReqDt"
              :min="today"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="setDvlpAplyReqDt"
            />
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">비고</label>
          <textarea
            v-model="ifReqMstInfo.reqRmk"
            cols="50"
            rows="3"
            placeholder="기타 입니다."
          />
        </div>
      </div>
    </section>

    <section
      v-if="false"
      class="border_group"
    >
      <h5 class="s_tit type-2">
        요청자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="table_grid">
        <div class="table_head except w-auto">
          <ul>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
            <li class="th_cell">
              비고
            </li>
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row form_type w-auto">
            <li class="td_cell on">
              <div class="select_group">
                <select>
                  <option
                    value=""
                    selected
                  >
                    대외기관
                  </option>
                  <option value="">
                    유사관련기관
                  </option>
                </select>
                <span class="select" />
              </div>
            </li>
            <li class="td_cell on">
              <input
                type="text"
                value="유영준"
              >
            </li>
            <li class="td_cell">
              010-123-1234
            </li>
            <li class="td_cell on">
              <input
                type="text"
                value="skcc@skcc.com"
              >
            </li>
            <li class="td_cell" />
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
          <ul class="table_row except form_type w-auto">
            <li class="td_cell">
              <div class="select_group">
                <select>
                  <option
                    value=""
                    selected
                  >
                    대외기관
                  </option>
                  <option value="">
                    유사관련기관
                  </option>
                </select>
                <span class="select" />
              </div>
            </li>
            <li class="td_cell">
              <input
                type="text"
                value="유영준"
              >
            </li>
            <li class="td_cell">
              010-123-1234
            </li>
            <li class="td_cell">
              <input
                type="text"
                value="skcc@skcc.com"
              >
            </li>
            <li class="td_cell" />
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { fetchPostIfStep1Reg, fetchGetIfReqMst, fetchPutIfStep1Reg } from '@/api/ifRegApi';
import eventBus from '@/utils/eventBus';

export default {
  name: 'RegStep1ApplyIf',
  data() {
    return {
      today: '',
      ifReqMstInfo: {
        reqNum: '',
        reqTitle: '',
        reqPurp: '',
        reqrId: '',
        reqrM: '',
        procSt: '',
        dvlpAplyReqDt: '',
        operAplyReqDt: '',
        reqDtm: '',
        reqRmk: '',
        delYn: '',
      },
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },

    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum']),
  },
  mounted() {
    this.today = this.$gf.dateToString(new Date(), '', 'Y');
    this.getIfReqMst(this.reqNum);
  },
  created() {
    eventBus.$on('Step1ReqMstSave', (params) => {
      console.log('event Bus 통해 Step1 저장');
      this.saveIfReqMst(params.callType);
    });
    console.log(`parent reqNum : ${this.$parent.reqNum}`);
  },
  destroyed() {
    eventBus.$off('Step1ReqMstSave');
  },
  methods: {
    ...mapActions('ifRegInfo', ['setReqNum', 'setTempSaveFlag']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP1', rstCd: rtn,
      });
    },

    saveIfReqMst(callType) {
      this.ifReqMstInfo.dvlpAplyReqDt = this.ifReqMstInfo.dvlpAplyReqDt.replace(/\-/g, '');
      this.ifReqMstInfo.operAplyReqDt = this.ifReqMstInfo.operAplyReqDt.replace(/\-/g, '');

      if (callType === 'update') {
        console.log('Step1 수정');
        fetchPutIfStep1Reg(this.ifReqMstInfo)
          .then((res) => {
            console.log(res);
            this.setTempSave(true);
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
            this.setTempSave(false);
          });
      } else {
        // this.$axios.post('/api/eai/regTemp', this.regList)
        fetchPostIfStep1Reg(this.ifReqMstInfo)
          .then((res) => {
            console.log(res);
            this.ifReqMstInfo = res.data.rstData.reqInfo;
            this.setReqNum(this.ifReqMstInfo.reqNum);
            this.setTempSave(true);
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
            this.setTempSave(false);
          });
      }
    },
    getIfReqMst(value) {
      if (value === null) {
        this.$gf.alertOn('작성하신 내용이 저장 되었습니다.');
        return;
      }
      fetchGetIfReqMst({
        params: {
          reqNum: value,
        },
      })
        .then((res) => {
          console.log(res);
          this.ifReqMstInfo = res.data.rstData.ifReqMst;
          // this.setReqNum(this.ifReqMstInfo.reqNum);
          // this.$gf.alertOn('작성하신 내용이 저장 되었습니다.');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
        });
    },
    setDvlpAplyReqDt(val) {
      this.ifReqMstInfo.dvlpAplyReqDt = val;
      console.log(val);
    },
    setOperAplyReqDt(val) {
      this.ifReqMstInfo.operAplyReqDt = val;
      console.log(val);
    },
  },

};
</script>
