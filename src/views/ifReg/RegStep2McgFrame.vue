<template>
  <div>
    <section class="small_tabs">
      <ul>
        <li
          class="on"
          @click="tabChange(1)"
        >
          채널코드
        </li>
        <li
          @click="tabChange(2)"
        >
          거래코드
        </li>
      </ul>
    </section>
    <reg-step2-ch-mcg v-if="step2Mcg1" />
    <reg-step2-deal-mcg v-if="step2Mcg2" />
  </div>
</template>

<script>
import RegStep2ChMcg from '@/views/ifReg/RegStep2ApplyCh_MCG.vue'; // 2단계 MCG 채널
import RegStep2DealMcg from '@/views/ifReg/RegStep2ApplyDeal_MCG.vue'; // 2단계 MCG 거래

export default {
  name: 'ApplyFrame',
  components: {
    RegStep2ChMcg,
    RegStep2DealMcg,
  },
  data() {
    return {
      step2Mcg1: true,
      step2Mcg2: false,
    };
  },
  methods: {
    tabChange(val) {
      if (val === 1) {
        this.step2Mcg1 = true;
        this.step2Mcg2 = false;
      } else if (val === 2) {
        this.step2Mcg1 = false;
        this.step2Mcg2 = true;
      }
    },
  },
};
</script>
