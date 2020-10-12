<template>
  <div>
    <section class="form_area border_group">
      <div>
        <h5 class="s_tit type-2">
          신청 기본 정보
        </h5>
      </div>
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
      tabNum: 1,
      procSt: 0,
      callType: 'new',

      ifReqMstInfo: {
        reqNum: '',
        reqTitle: '',
        reqPurp: '',
        reqrId: '',
        reqrM: '',
        procSt: '0',
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
  mounted() {
    this.today = this.$gf.dateToString(new Date(), '', 'Y');

    if (this.$route.params.reqNum != null) {
      this.getIfReqMst(this.$route.params.reqNum);
    }
    if (this.$route.params.callType != null) {
      this.callType = this.$route.params.callType;
    }
    this.procSt = this.$route.params.procSt;
  },
  methods: {
    ...mapActions('ifRegInfo', ['setReqNum', 'setTempSaveFlag']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP1', rstCd: rtn,
      });
    },
    checkParams() {
      if (this.ifReqMstInfo.reqTitle === null || this.ifReqMstInfo.reqTitle === '') {
        this.$gf.alertOn('제목은 필수입력입니다.');
        return false;
      }
      if (this.ifReqMstInfo.dvlpAplyReqDt === null || this.ifReqMstInfo.dvlpAplyReqDt === '') {
        this.$gf.alertOn('개발 반영 예정일은 필수입력입니다.');
        return false;
      }
      if (this.ifReqMstInfo.operAplyReqDt === null || this.ifReqMstInfo.operAplyReqDt === '') {
        this.$gf.alertOn('운영 반영 예정일은 필수입력입니다.');
        return false;
      }
      return true;
    },
    saveIfReqMst(callType) {
      this.ifReqMstInfo.dvlpAplyReqDt = this.ifReqMstInfo.dvlpAplyReqDt.replace(/-/g, '');
      this.ifReqMstInfo.operAplyReqDt = this.ifReqMstInfo.operAplyReqDt.replace(/-/g, '');

      if (!this.checkParams()) {
        this.setTempSave('F');
        return;
      }

      if (callType === 'update') {
        console.log('Step1 수정');
        fetchPutIfStep1Reg(this.ifReqMstInfo)
          .then((res) => {
            console.log(res);
            this.setTempSave('T');
            this.$gf.alertOn('수정 되었습니다.');
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
            this.setTempSave('F');
            this.$gf.alertOn('실패되었습니다.');
          });
      } else {
        // this.$axios.post('/api/eai/regTemp', this.regList)
        fetchPostIfStep1Reg(this.ifReqMstInfo)
          .then((res) => {
            console.log(res);
            this.ifReqMstInfo = res.data.rstData.reqInfo;
            this.setReqNum({ reqNum: this.ifReqMstInfo.reqNum });
            this.setTempSave('T');
            this.$gf.alertOn('저장 되었습니다.');
            this.getIfReqMst(this.reqNum);
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
            this.setTempSave('F');
            this.$gf.alertOn('실패되었습니다.');
          });
      }
    },
    getIfReqMst(value) {
      // if (value === null) {
      //   this.$gf.alertOn('작성하신 내용이 저장 되었습니다.');
      //   return;
      // }
      fetchGetIfReqMst({
        params: {
          reqNum: value,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.ifReqMstInfo = res.data.rstData.ifReqMst;
          }
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
