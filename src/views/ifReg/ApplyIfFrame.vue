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
          class="step"
          :class="{on: isActive(3)}"
          @click="tabChange(3)"
        >
          3. 신청 내용 확인 및 승인요청
        </li>
        <li
          class="step"
          :class="{on: isActive(4)}"
          @click="tabChange(4)"
        >
          4. 승인화면(추후삭제)
        </li>
      </ul>
    </section>
    <reg-step1-apply-if
      v-show="tabNum === 1"
      @afterSave="setRegNum"
    />
    <reg-step2-frame
      v-show="tabNum === 2"
    />
    <reg-step3-applicant
      v-show="tabNum === 3"
    />
    <reg-step3-approver
      v-show="tabNum === 4"
    />
    <section class="btm_button_area">
      <button
        v-if="tabNum !== 1"
        type="button"
        class="default_button btn_prev disabled"
        @click="toBeforeTab"
      >
        이전
      </button>
      <button
        v-if="tabNum !== 4"
        type="button"
        class="default_button btn_next"
        @click="toNextTab"
      >
        다음
      </button>
      <button
        v-if="tabNum !== 4"
        type="button"
        class="default_button on"
        @click="tempSave"
      >
        임시저장
      </button>
      <button
        v-if="tabNum === 4"
        type="button"
        class="default_button on"
      >
        승인
      </button>
    </section>
  </div>
</template>

<script>
import RegStep1ApplyIf from '@/views/ifReg/RegStep1ApplyIf.vue'; // 1단계
import RegStep2Frame from '@/views/ifReg/RegStep2Frame.vue'; // 2단계 EAI
import RegStep3Applicant from '@/views/ifReg/RegStep3Applicant.vue'; // 3단계 신청자
import RegStep3Approver from '@/views/ifReg/RegStep3Approver.vue'; // 3단계 승인자
import eventBus from '@/utils/eventBus';

export default {
  name: 'ApplyFrame',
  components: {
    RegStep1ApplyIf,
    RegStep2Frame,
    RegStep3Applicant,
    RegStep3Approver,
  },
  data() {
    return {
      tabNum: '',
      reqNum: '',
    };
  },
  created() {
    if (this.$gf.isEmpty(localStorage.getItem('APPLY_TABNUM'))) {
      this.tabNum = 1;
    } else {
      this.tabNum = Number(localStorage.getItem('APPLY_TABNUM'));
    }
    this.reqNum = '12381237128492879734';
  },
  destroyed() {
    localStorage.setItem('APPLY_TABNUM', '');
  },
  methods: {
    tabChange(val) {
      window.scrollTo(0, 0);
      this.tabNum = val;
      localStorage.setItem('APPLY_TABNUM', this.tabNum);
    },
    isActive(val) {
      return this.tabNum === val;
    },
    toNextTab() {
      window.scrollTo(0, 0);
      this.tempSave();
      this.tabNum = this.tabNum + 1;
      localStorage.setItem('APPLY_TABNUM', this.tabNum);
    },
    toBeforeTab() {
      window.scrollTo(0, 0);
      this.tempSave();
      this.tabNum = this.tabNum - 1;
      localStorage.setItem('APPLY_TABNUM', this.tabNum);
    },
    setRegNum(reqNum) {
      console.log(`reqNum: ${reqNum}`);
      this.reqNum = reqNum;
      // alert(this.reqNum);
    },
    tempSave() {
      console.log('tempSave');
      if (this.tabNum === 1) {
        eventBus.$emit('Step1ReqMstSave', { reqNum: this.reqNum });
      } else if (this.tabNum === 2) {
        eventBus.$emit('Step2EaiSave', { reqNum: this.reqNum });
        eventBus.$emit('Step2EigwSave', { reqNum: this.reqNum });
        // eventBus.$emit('Step2McgSave', { reqNum: this.reqNum });
      }

      // eventBus.$emit('tempSave1');
      // eventBus.$emit('tempSave2', { dat: 'data1111' });
      // eventBus.$emit('tempSave3', 'data222222');
    },
  },
};
</script>
<style scoped>
  .step {
    cursor: pointer;
  }
</style>
