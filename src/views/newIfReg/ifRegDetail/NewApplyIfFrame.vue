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
        >
          1. 기본정보 입력
        </li>
        <li
          class="step"
          :class="{on: isActive(2)}"
          @click="tabChanged(2)"
        >
          2. 인터페이스 상세정보 입력
        </li>
        <li
          v-if="procSt === '1' || procSt == null"
          class="step"
          :class="{on: isActive(3)}"
          @click="tabChanged(3)"
        >
          3. 신청 내용 확인 및 승인요청
        </li>
        <li
          v-if="procSt != null && procSt != '0' && procSt != '1'"
          class="step"
          :class="{on: isActive(4)}"
          @click="tabChanged(4)"
        >
          3. 승인화면
        </li>
      </ul>
    </section>
    <new-reg-step1
      v-show="tabNum === 1"
    />
    <new-reg-step2-eai
      v-show="tabNum ===2 && ifKind==='EAI'"
    />
    <new-reg-step2-eigw
      v-show="tabNum ===2 && ifKind==='EIGW'"
    />
    <new-reg-step2-mcg
      v-show="tabNum ===2 && ifKind==='MCG'"
    />
    <new-reg-step3-applicant
      v-if="tabNum === 3"
    />
    <new-reg-step3-approver
      v-if="tabNum === 4"
    />
    <section class="btm_button_area">
      <button
        v-if="ifRegBotBtnSet.isBtnPrev"
        type="button"
        class="default_button btn_prev disabled"
        @click="toBeforeTab"
      >
        이전
      </button>
      <button
        v-if="ifRegBotBtnSet.isBtnTempSave"
        type="button"
        class="default_button on"
        @click="tempSave('btnTemp')"
      >
        임시저장
      </button>
      <button
        v-if="ifRegBotBtnSet.isBtnApprReq"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(2)"
      >
        승인요청
      </button>
      <button
        v-if="ifRegBotBtnSet.isBtnAppr"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(3)"
      >
        승인
      </button>
      <button
        v-if="ifRegBotBtnSet.isBtnReject"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(1)"
      >
        반려
      </button>
      <button
        v-if="ifRegBotBtnSet.isBtnForw"
        type="button"
        class="default_button btn_next"
        @click="toNextTab"
      >
        다음
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import eventBus from '@/utils/eventBus';
import NewRegStep1 from '@/views/newIfReg/ifRegDetail/NewRegStep1.vue'; // 1단계
import NewRegStep2Eai from '@/views/newIfReg/ifRegDetail/NewRegStep2_EAI.vue'; // 2단계 EAI
import NewRegStep2Eigw from '@/views/newIfReg/ifRegDetail/NewRegStep2_EIGW.vue'; // 2단계 EAI
import NewRegStep2Mcg from '@/views/newIfReg/ifRegDetail/NewRegStep2_MCG.vue'; // 2단계 EAI
import NewRegStep3Applicant from '@/views/newIfReg/ifRegDetail/NewRegStep3Applicant.vue'; // 3단계 신청자
import NewRegStep3Approver from '@/views/newIfReg/ifRegDetail/NewRegStep3Approver.vue'; // 3단계 승인자
import ProcMsgPopup from '@/components/popup/ifRegInfo/ProcMsgPopup.vue';
import { getIfRegBotBtnSet, tabChange } from '@/utils/ifRegComm';

export default {
  name: 'ApplyFrame',
  components: {
    NewRegStep1,
    NewRegStep2Eai,
    NewRegStep2Eigw,
    NewRegStep2Mcg,
    NewRegStep3Applicant,
    NewRegStep3Approver,
    ProcMsgPopup,
  },
  data() {
    return {
      procSt: '',
      callType: 'new',
      ifKind: 'EAI',
      eventTabMove: '',
      reqrId: '',
      aprvId: '',

      tabNum: '',

      procMsgPopup: false,
      hstRmk: '',
      popupProp: {
        procSt: '',
      },
      tgtProcSt: 0,

      ifRegBotBtnSet: {
        isBtnPrev: true,
        isBtnForw: true,
        isBtnTempSave: true,
        isBtnApprReq: false,
        isBtnAppr: false,
        isBtnReject: false,
      },
    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum', 'saveFlag', 'movePossible']),
    ...mapState('login', ['hanNm', 'userId', 'adminYn']),
  },
  watch: {
    tabNum() {
      this.setBottomBtn();
    },
  },
  created() {
    if (this.$route.params.reqNum != null) {
      this.setReqNum({ reqNum: this.$route.params.reqNum });
    }
    this.tabNum = 1;
    // if (this.$gf.isEmpty(localStorage.getItem('APPLY_TABNUM'))) {
    //   this.tabNum = 1;
    // } else {
    //   this.tabNum = Number(localStorage.getItem('APPLY_TABNUM'));
    // }

    this.setMovePossible({ movePossible: 'Y' });
  },
  mounted() {
    // this.resetTempSaveFlag();
    this.setParams();
    this.setBottomBtn();
  },
  destroyed() {
    localStorage.setItem('APPLY_TABNUM', '');
    this.setReqNum({ reqNum: '' });
  },
  methods: {
    ...mapActions('ifRegInfo', ['setReqNum', 'resetTempSaveFlag', 'setMovePossible']),

    setParams() {
      if (this.$route.params.reqNum != null) {
        this.setReqNum({ reqNum: this.$route.params.reqNum });
      }
      if (this.$route.params.callType != null) {
        this.callType = this.$route.params.callType;
      }
      if (this.$route.params.ifKind != null) {
        this.ifKind = this.$route.params.ifKind;
      }
      if (this.$route.params.setApplyIfType != null) {
        this.tabNum = 1;
      }
      if (!this.$gf.isEmpty(this.$route.params.reqrId)) {
        this.reqrId = this.$route.params.reqrId;
      }
      if (!this.$gf.isEmpty(this.$route.params.aprvId)) {
        this.aprvId = this.$route.params.aprvId;
      }
      this.procSt = this.$route.params.procSt;
    },
    // tabChange(val) {
    //   console.log(`tabChange : [${this.reqNum}]`);
    //   if (this.procSt == null || this.procSt === '1') {
    //     return;
    //   }
    //   if (this.reqNum != null && this.reqNum !== '') {
    //     window.scrollTo(0, 0);
    //     this.tabNum = val;
    //     localStorage.setItem('APPLY_TABNUM', this.tabNum);
    //   } else {
    //     this.$gf.alertOn('기본정보 입력 후에 이동 가능합니다.');
    //   }
    // },
    setBottomBtn() {
      this.ifRegBotBtnSet = getIfRegBotBtnSet(this.tabNum, this.procSt);
      //임시저장, 승인 등은 작성자, 승인자 등에 맞춰서 한번더 권한 체크
      //임시저장
      if (this.userId != this.reqrId && this.adminYn != "Y") {
        this.ifRegBotBtnSet.isBtnTempSave = false;
        this.ifRegBotBtnSet.isBtnApprReq = false;
        this.ifRegBotBtnSet.isBtnAppr = false;
        this.ifRegBotBtnSet.isBtnReject = false;
      }
      if (this.userId != this.aprvId && this.adminYn != "Y") {
        this.ifRegBotBtnSet.isBtnAppr = false;
        this.ifRegBotBtnSet.isBtnReject = false;
      }
      //혹시 신규 연동 건인 경우에 대해서만 tempsave = true
      if (this.callType === 'new') {
        this.ifRegBotBtnSet.isBtnTempSave = true;
      }
    },
    isActive(val) {
      return this.tabNum === val;
    },
    tempSave() {
      if (this.tabNum === 1) { // 신청 개요 데이터
        eventBus.$emit('Step1ReqMstSave', { reqNum: this.reqNum, callType: this.callType, alertYn: alert });
      } else if (this.tabNum === 2) { // 각단계 별 신청 데이터
        if (this.ifKind === 'EAI') {
          eventBus.$emit('Step2EaiSave', { reqNum: this.reqNum, alertYn: alert });
        } else if (this.ifKind === 'EIGW') {
          eventBus.$emit('Step2EigwSave', { reqNum: this.reqNum, alertYn: alert });
        } else if (this.ifKind === 'MCG') {
          eventBus.$emit('Step2McgSave', { reqNum: this.reqNum, alertYn: alert });
        }
      } else if (this.tabNum === 3) { // 최종 승인요청 화면
        eventBus.$emit('Step3AprvSave', { reqNum: this.reqNum });
      }
    },
    toNextTab() {
      if (this.$gf.isEmpty(this.reqNum)) {
        this.$gf.alertOn('임시저장 후에 이동해주기 바랍니다.');
        return;
      }

      if (this.procSt === '1' || this.procSt == null) {
        if (this.tabNum === 1) {
          window.scrollTo(0, 0);
          this.tabNum = this.tabNum + 1;
          localStorage.setItem('APPLY_TABNUM', this.tabNum);
        } else if (this.tabNum === 2) {
          console.log(`22 isStep2Eai : ${this.saveFlag.isStep2EaiSaveYn} / isStep2Eigw : ${this.saveFlag.isStep2EigwSaveYn} / isStep2Mcg : ${this.saveFlag.isStep2McgSaveYn}`);
          window.scrollTo(0, 0);
          this.tabNum = this.tabNum + 1;
          localStorage.setItem('APPLY_TABNUM', this.tabNum);
        }
      } else if (this.procSt === '2') {
        window.scrollTo(0, 0);
        if (this.tabNum === 2) {
          this.tabNum = this.tabNum + 1;
        }
        this.tabNum = this.tabNum + 1;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
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
          window.scrollTo(0, 0);
          this.tabNum = this.tabNum - 1;
          localStorage.setItem('APPLY_TABNUM', this.tabNum);
        } else {
          window.scrollTo(0, 0);
          this.tabNum = this.tabNum - 1;
          localStorage.setItem('APPLY_TABNUM', this.tabNum);
        }
      } else if (this.procSt === '2') {
        window.scrollTo(0, 0);
        if (this.tabNum === 4) {
          this.tabNum = this.tabNum - 1;
        }
        this.tabNum = this.tabNum - 1;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
      } else {
        window.scrollTo(0, 0);
        this.tabNum = this.tabNum - 1;
        localStorage.setItem('APPLY_TABNUM', this.tabNum);
      }
      this.resetTempSaveFlag();
    },
    tabChanged(val) {
      tabChange(val, this.procSt);
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
