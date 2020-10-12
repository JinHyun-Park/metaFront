<template>
  <div class="right_space">
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
  },
  data() {
    return {
      procSt: '',
      callType: 'new',
      ifKind: 'EAI',
      eventTabMove: '',

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
      },
    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum', 'saveFlag', 'movePossible']),
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
    if (this.$gf.isEmpty(localStorage.getItem('APPLY_TABNUM'))) {
      this.tabNum = 1;
    } else {
      this.tabNum = Number(localStorage.getItem('APPLY_TABNUM'));
    }

    this.setMovePossible({ movePossible: 'Y' });
  },
  mounted() {
    // this.resetTempSaveFlag();
    this.setParams();
    this.setBottomBtn();
  },
  destroyed() {
    localStorage.setItem('APPLY_TABNUM', '');
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
  },
};
</script>
<style scoped>
  .step {
    cursor: pointer;
  }
</style>
