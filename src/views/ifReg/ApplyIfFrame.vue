<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 신청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="progress">
      <ul>
        <li class="step on">
          1. 기본정보 입력
        </li>
        <li class="step">
          2. 인터페이스 상세정보 입력
        </li>
        <li class="step">
          3. 신청 내용 확인 및 승인요청
        </li>
      </ul>
    </section>

    <reg-step1-apply-if v-if="false" />
    <RegStep2eai v-if="false" />
    <RegStep2eigw v-if="false" />
    <RegStep2mcg />
  </div>
</template>

<script>
import RegStep1ApplyIf from '@/views/ifReg/RegStep1ApplyIf.vue'; // 1단계
import RegStep2eai from '@/views/ifReg/RegStep2_EAI.vue'; // 2단계 EAI
import RegStep2eigw from '@/views/ifReg/RegStep2_EIGW.vue'; // 2단계 EiGW
import RegStep2mcg from '@/views/ifReg/RegStep2ApplyCh_MCG.vue'; // 2단계 MCG

export default {
  name: 'ApplyFrame',
  components: {
    RegStep1ApplyIf, RegStep2eai, RegStep2eigw, RegStep2mcg,
  },
};
</script>
