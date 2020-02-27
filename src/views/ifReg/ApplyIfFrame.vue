<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 채널 신청
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="progress">
      <ul>
        <li
          class="step"
          @click="tabChange(1)"
        >
          1. 기본정보 입력
        </li>
        <li
          class="step on"
          @click="tabChange(2)"
        >
          2. 인터페이스 상세정보 입력
        </li>
        <li
          class="step"
          @click="tabChange(3)"
        >
          3. 신청 내용 확인 및 승인요청
        </li>
        <li
          class="step"
          @click="tabChange(4)"
        >
          4. 승인화면(추후삭제)
        </li>
      </ul>
    </section>
    <RegStep1ApplyIf v-if="step1" />
    <RegStep2Frame v-if="step2" />
    <RegStep3Applicant v-if="step3apply" />
    <RegStep3Approver v-if="step3approve" />
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
      step1: true,
      step2: false,
      step3apply: false,
      step3approve: false,
    };
  },
  methods: {
    tabChange(val) {
      if (val === 1) {
        this.step1 = true;
        this.step2 = false;
        this.step3apply = false;
        this.step3approve = false;
      } else if (val === 2) {
        this.step1 = false;
        this.step2 = true;
        this.step3apply = false;
        this.step3approve = false;
      } else if (val === 3) {
        this.step1 = false;
        this.step2 = false;
        this.step3apply = true;
        this.step3approve = false;
      } else if (val === 4) {
        this.step1 = false;
        this.step2 = false;
        this.step3apply = false;
        this.step3approve = true;
      }
    },
  },
};
</script>
