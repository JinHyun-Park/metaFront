<template>
  <div>
    <section class="big_tabs">
      <ul>
        <li
          class="on"
          @click="tabChange('eigw')"
        >
          EIGW
        </li>
        <li
          @click="tabChange('eai')"
        >
          EAI
        </li>
        <li
          @click="tabChange('mcg')"
        >
          MCG
        </li>
      </ul>
    </section>
    <RegStep2eai v-if="step2Eai" />
    <RegStep2eigw v-if="step2Eigw" />
    <RegStep2ChMcg v-if="step2Mcg" />
  </div>
</template>

<script>
import RegStep2eai from '@/views/ifReg/RegStep2_EAI.vue'; // 2단계 EAI
import RegStep2eigw from '@/views/ifReg/RegStep2_EIGW.vue'; // 2단계 EiGW
import RegStep2ChMcg from '@/views/ifReg/RegStep2McgFrame.vue'; // 2단계 MCG 채널

export default {
  name: 'ApplyFrame',
  components: {
    RegStep2eai,
    RegStep2eigw,
    RegStep2ChMcg,
  },
  data() {
    return {
      step2Eai: false,
      step2Eigw: true,
      step2Mcg: false,
    };
  },
  methods: {
    tabChange(val) {
      if (val === 'eigw') {
        this.step2Eigw = true;
        this.step2Eai = false;
        this.step2Mcg = false;
      } else if (val === 'eai') {
        this.step2Eigw = false;
        this.step2Eai = true;
        this.step2Mcg = false;
      } else if (val === 'mcg') {
        this.step2Eigw = false;
        this.step2Eai = false;
        this.step2Mcg = true;
      }
    },
  },
};
</script>
