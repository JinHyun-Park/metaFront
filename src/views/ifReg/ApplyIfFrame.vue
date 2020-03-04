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
    <reg-step1-apply-if v-if="tabNum === 1" />
    <reg-step2-frame v-if="tabNum === 2" />
    <reg-step3-applicant v-if="tabNum === 3" />
    <reg-step3-approver v-if="tabNum === 4" />
  </div>
</template>

<script>
import RegStep1ApplyIf from '@/views/ifReg/RegStep1ApplyIf.vue'; // 1단계
import RegStep2Frame from '@/views/ifReg/RegStep2Frame.vue'; // 2단계 EAI
import RegStep3Applicant from '@/views/ifReg/RegStep3Applicant.vue'; // 3단계 신청자
import RegStep3Approver from '@/views/ifReg/RegStep3Approver.vue'; // 3단계 승인자

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
    };
  },
  created() {
    this.tabNum = 1;
  },
  methods: {
    tabChange(val) {
      this.tabNum = val;
    },
    isActive(val) {
      return this.tabNum === val;
    },
  },
};
</script>
<style scoped>
  .step {
    cursor: pointer;
  }
</style>
