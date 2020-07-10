<template>
  <div class="right_space">
    <ProcMsgPopup
      v-if="procMsgPopup"
      v-bind="popupProp"
      @closePop="turnOffProcMsg"
      @addData="addProcMsg"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 신청
        </div>
      </h2>
    </section>

    <section class="progress">
      <ul>
        <li
          class="step"
          :class="{on: isActive(1)}"
          @click="tabChange(1)"
        >
          1. 기본정보 입력
        </li>
        <li
          class="step"
          :class="{on: isActive(2)}"
          @click="tabChange(2)"
        >
          2. 인터페이스 상세정보 입력
        </li>
        <li
          v-if="procSt === '1' || procSt == null"
          class="step"
          :class="{on: isActive(3)}"
          @click="tabChange(3)"
        >
          3. 신청 내용 확인 및 승인요청
        </li>
        <li
          v-if="procSt != null && procSt != '0' && procSt != '1'"
          class="step"
          :class="{on: isActive(4)}"
          @click="tabChange(4)"
        >
          3. 승인화면
        </li>
      </ul>
    </section>
    <reg-step1-apply-if
      v-show="tabNum === 1"
    />
    <reg-step2-frame
      v-show="tabNum === 2"
    />
    <reg-step3-applicant
      v-if="tabNum === 3"
    />
    <reg-step3-approver
      v-if="tabNum === 4"
    />
    <section class="btm_button_area">
      <button
        v-if="isBtnPrev"
        type="button"
        class="default_button btn_prev disabled"
        @click="toBeforeTab"
      >
        이전
      </button>
      <button
        v-if="isBtnForw"
        type="button"
        class="default_button btn_next"
        @click="toNextTab"
      >
        다음
      </button>
      <button
        v-if="isBtnTempSave"
        type="button"
        class="default_button on"
        @click="tempSave('btnTemp')"
      >
        임시저장
      </button>
      <button
        v-if="isBtnApprReq"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(2)"
      >
        승인요청
      </button>
      <button
        v-if="isBtnAppr"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(3)"
      >
        승인
      </button>
      <button
        v-if="isBtnReject"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(1)"
      >
        반려
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RegStep1ApplyIf from '@/views/ifReg/RegStep1ApplyIf.vue'; // 1단계
import RegStep2Frame from '@/views/ifReg/RegStep2Frame.vue'; // 2단계 EAI
import RegStep3Applicant from '@/views/ifReg/RegStep3Applicant.vue'; // 3단계 신청자
import RegStep3Approver from '@/views/ifReg/RegStep3Approver.vue'; // 3단계 승인자
import eventBus from '@/utils/eventBus';
import ProcMsgPopup from '@/components/popup/ifRegInfo/ProcMsgPopup.vue';

export default {
  name: 'ApplyFrame',
  components: {
    RegStep1ApplyIf,
    RegStep2Frame,
    RegStep3Applicant,
    RegStep3Approver,
    ProcMsgPopup,
  },
  data() {
    return {
      procSt: '',
      callType: 'new',
      eventTabMove: '',

      tabNum: '',

      isBtnPrev: false,
      isBtnForw: false,
      isBtnTempSave: false,
      isBtnApprReq: false,
      isBtnAppr: false,
      isBtnReject: false,
      clickBtn: true,

      procMsgPopup: false,
      hstRmk: '',
      popupProp: {
        procSt: '',
      },
      tgtProcSt: 0,
    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum', 'saveFlag']),
  },
  watch: {
    tabNum() {
      this.setBtnShow();
    },
    // // saveFlag: {
    //   deep: true,
    //   handler() {
    //     if (this.procSt === '1' || this.procSt == null) {
    //       console.log(`22 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
    //       if (this.tabNum === 1) {
    //         if (this.saveFlag.isStep1SaveYn !== false) {
    //           if (alert) {
    //             this.$gf.alertOn('저장되었습니다.');
    //             // 신규->변경으로 임시저장 이벤트 변경
    //             this.callType = 'update';
    //           }
    //           this.resetTempSaveFlag();
    //           if (this.eventTabMove === 'PREV') {
    //             this.toNextTab();
    //             this.eventTabMove = '';
    //           } else if (this.eventTabMove === 'FORW') {
    //             this.toBeforeTab();
    //             this.eventTabMove = '';
    //           }
    //         }
    //       } else if (this.tabNum === 2) {
    //         if (this.saveFlag.isStep2EaiSaveYn !== false && this.saveFlag.isStep2EigwSaveYn !== false && this.saveFlag.isStep2McgSaveYn !== false) {
    //           if (alert) {
    //             this.$gf.alertOn('저장되었습니다.');
    //           }
    //           this.resetTempSaveFlag();
    //           if (this.eventTabMove === 'PREV') {
    //             this.toNextTab();
    //             this.eventTabMove = '';
    //           } else if (this.eventTabMove === 'FORW') {
    //             this.toBeforeTab();
    //             this.eventTabMove = '';
    //           }
    //         }
    //       } else {
    //       // 바꾸지마라
    //         if (this.eventTabMove === 'PREV') {
    //           this.toNextTab();
    //           this.eventTabMove = '';
    //         } else if (this.eventTabMove === 'FORW') {
    //           this.toBeforeTab();
    //           this.eventTabMove = '';
    //         } else {

    //         }
    //       }
    //     }
    //   },
    // },
  },
  created() {
    this.setReqNum({ reqNum: null });
    if (this.$gf.isEmpty(localStorage.getItem('APPLY_TABNUM'))) {
      this.tabNum = 1;
    } else {
      this.tabNum = Number(localStorage.getItem('APPLY_TABNUM'));
    }
    this.setParams();
  },
  mounted() {
    this.resetTempSaveFlag();
  },
  destroyed() {
    localStorage.setItem('APPLY_TABNUM', '');
  },
  methods: {
    ...mapActions('ifRegInfo', ['setReqNum', 'resetTempSaveFlag']),

    setParams() {
      if (this.$route.params.reqNum != null) {
        this.setReqNum({ reqNum: this.$route.params.reqNum });
      }
      if (this.$route.params.callType != null) {
        this.callType = this.$route.params.callType;
      }
      this.procSt = this.$route.params.procSt;
    },
    tabChange(val) {
      console.log(`tabChange : [${this.reqNum}]`);
      if (this.procSt == null || this.procSt === '1') {
        return;
      }
      if (this.reqNum != null && this.reqNum !== '') {
        window.scrollTo(0, 0);
        this.tabNum = val;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
      } else {
        this.$gf.alertOn('기본정보 입력 후에 이동 가능합니다.');
      }
    },
    setBtnShow() {
      // tabNum : 1(기본정보입력) / 2(인터페이스 상세) / 3(승인요청) / 4(승인)
      // procSt : 1(임시저장) / 2(승인요청)
      this.isBtnPrev = (this.tabNum > 1);
      this.isBtnForw = (this.tabNum < 3);
      this.isBtnTempSave = (this.tabNum < 4 && (this.procSt == null || this.procSt === '1'));
      this.isBtnApprReq = (this.tabNum === 3 && (this.procSt == null || this.procSt === '1'));
      this.isBtnAppr = (this.tabNum === 4 && this.procSt === '2');
      this.isBtnReject = (this.tabNum === 4 && this.procSt === '2');
    },
    isActive(val) {
      return this.tabNum === val;
    },
    toNextTab() {
      // if (this.procSt === '1' || this.procSt == null) {
      //   if (!this.tempSave('btnTab')) {
      //     console.log('nextTab > temeSave false');
      //     return;
      //   }
      // }
      if (this.procSt === '1' || this.procSt == null) {
        if (this.tabNum === 1) {
          console.log(`22 isStep1SaveYn : ${this.saveFlag.isStep1SaveYn}`);
          if (this.saveFlag.isStep1SaveYn === 'T') {
            window.scrollTo(0, 0);
            this.tabNum = this.tabNum + 1;
            localStorage.setItem('APPLY_TABNUM', this.tabNum);
          } else {
            this.$gf.alertOn('임시저장 후 이동 부탁드립니다.');
          }
        } else if (this.tabNum === 2) {
          console.log(`22 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
          if (this.saveFlag.isStep2EaiSaveYn === 'T' || this.saveFlag.isStep2EigwSaveYn === 'T' || this.saveFlag.isStep2McgSaveYn === 'T') {
            window.scrollTo(0, 0);
            this.tabNum = this.tabNum + 1;
            localStorage.setItem('APPLY_TABNUM', this.tabNum);
          } else {
            this.$gf.alertOn('임시저장 후 이동 부탁드립니다.');
          }
        }
      } else {
        window.scrollTo(0, 0);
        this.tabNum = this.tabNum + 1;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
      }
      this.resetTempSaveFlag();
    },
    toBeforeTab() {
      if (this.procSt === '1' || this.procSt == null) {
        if (this.tabNum === 2) {
          console.log(`22 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
          if (this.saveFlag.isStep2EaiSaveYn === 'T' || this.saveFlag.isStep2EigwSaveYn === 'T' || this.saveFlag.isStep2McgSaveYn === 'T') {
            window.scrollTo(0, 0);
            this.tabNum = this.tabNum - 1;
            localStorage.setItem('APPLY_TABNUM', this.tabNum);
          } else {
            this.$gf.alertOn('임시저장 후 이동 부탁드립니다.');
          }
        } else {
          window.scrollTo(0, 0);
          this.tabNum = this.tabNum - 1;
          localStorage.setItem('APPLY_TABNUM', this.tabNum);
        }
      } else {
        window.scrollTo(0, 0);
        this.tabNum = this.tabNum - 1;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
      }
      this.resetTempSaveFlag();
    },
    clickPrevent() {
      if (this.clickBtn) {
        this.clickBtn = !this.clickBtn;
      }
    },
    tempSave(callMeth) {
      console.log('tempSave');
      this.clickPrevent();

      const alert = (callMeth === 'btnTemp');

      // 저장을 위한 각 화면 별 eventbus 호출
      if (this.tabNum === 1) { // 신청 개요 데이터
        eventBus.$emit('Step1ReqMstSave', { reqNum: this.reqNum, callType: this.callType, alertYn: alert });
      } else if (this.tabNum === 2) { // 각단계 별 신청 데이터
        eventBus.$emit('Step2EaiSave', { reqNum: this.reqNum, alertYn: alert });
        eventBus.$emit('Step2EigwSave', { reqNum: this.reqNum, alertYn: alert });
        eventBus.$emit('Step2McgSave', { reqNum: this.reqNum, alertYn: alert });
      } else if (this.tabNum === 3) { // 최종 승인요청 화면
        eventBus.$emit('Step3AprvSave', { reqNum: this.reqNum });
      }

      // 중복 클릭 방지
      this.clickBtn = true;

      if (callMeth === 'tabForw') {
        this.eventTabMove = 'PREV';
      } else if (callMeth === 'tabPrev') {
        this.eventTabMove = 'FORW';
      }

      // 신청 후 저장 alert 처리
      if (this.tabNum === 1) {
        if (this.saveFlag.isStep1SaveYn !== false) {
          if (alert) {
            this.$gf.alertOn('저장되었습니다.');
            // 신규->변경으로 임시저장 이벤트 변경
            this.callType = 'update';
          }
          // this.resetTempSaveFlag();
          // return true;
        }
      } else if (this.tabNum === 2) {
        console.log(`22 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
        if (this.saveFlag.isStep2EaiSaveYn !== false && this.saveFlag.isStep2EigwSaveYn !== false && this.saveFlag.isStep2McgSaveYn !== false) {
          if (alert) {
            this.$gf.alertOn('저장되었습니다.');
          }
          // this.resetTempSaveFlag();
          // return true;
        }
      } else {
        // this.resetTempSaveFlag();
        // return true;
      }
      console.log(`33 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
      // this.resetTempSaveFlag();
      // return false;
    },
    aprvMsgReq(tgtProcSt) {
      this.tgtProcSt = tgtProcSt;
      this.turnOnProcMsg();
    },
    aprvReq() {
      if (this.tabNum === 3) {
        eventBus.$emit('Step3AprvReq', { reqNum: this.reqNum, procSt: this.tgtProcSt, hstRmk: this.hstRmk });
      } else if (this.tabNum === 4) {
        eventBus.$emit('Step4AprvReq', { reqNum: this.reqNum, procSt: this.tgtProcSt, hstRmk: this.hstRmk });
      }
    },
    turnOnProcMsg() {
      this.popupProp.procSt = this.tgtProcSt;
      this.procMsgPopup = true;
    },
    turnOffProcMsg(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.procMsgPopup = false;
    },
    addProcMsg(val) {
      this.procMsgPopup = false;
      this.hstRmk = val;
      this.aprvReq();
    },
  },
};
</script>
<style scoped>
  .step {
    cursor: pointer;
  }
</style>
