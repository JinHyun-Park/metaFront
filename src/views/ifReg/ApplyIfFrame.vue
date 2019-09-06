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

    <Progress />

    <reg-step1-apply-if v-if="false" />
    <RegStep2eai v-if="false" />
    <RegStep2eigw v-if="false" />
    <RegStep2ChMcg v-if="false" />
    <RegStep2DealMcg v-if="false" />
    <RegStep3Applicant v-if="false" />
    <RegStep3Approver />
  </div>
</template>

<script>
import RegStep1ApplyIf from '@/views/ifReg/RegStep1ApplyIf.vue'; // 1단계
import RegStep2eai from '@/views/ifReg/RegStep2_EAI.vue'; // 2단계 EAI
import RegStep2eigw from '@/views/ifReg/RegStep2_EIGW.vue'; // 2단계 EiGW
import RegStep2ChMcg from '@/views/ifReg/RegStep2ApplyCh_MCG.vue'; // 2단계 MCG 채널
import RegStep2DealMcg from '@/views/ifReg/RegStep2ApplyDeal_MCG.vue'; // 2단계 MCG 거래
import RegStep3Applicant from '@/views/ifReg/RegStep3Applicant.vue'; // 3단계 신청자
import RegStep3Approver from '@/views/ifReg/RegStep3Approver.vue'; // 3단계 승인자
import Progress from '@/components/ifReg/Progress.vue'; // 프로그레스

export default {
  name: 'ApplyFrame',
  components: {
    RegStep1ApplyIf,
    RegStep2eai,
    RegStep2eigw,
    RegStep2ChMcg,
    RegStep2DealMcg,
    RegStep3Applicant,
    RegStep3Approver,
    Progress,
  },
};
</script>
