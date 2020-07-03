<template>
  <div>
    <section class="big_tabs">
      <ul>
        <li
          :class="{on: isActive(1)}"
          @click="tabChange(1)"
        >
          EiGW
        </li>
        <li
          :class="{on: isActive(2)}"
          @click="tabChange(2)"
        >
          EAI
        </li>
        <li
          :class="{on: isActive(3)}"
          @click="tabChange(3)"
        >
          MCG
        </li>
      </ul>
    </section>
    <reg-step2eigw v-show="subTabNum === 1" />
    <reg-step2eai v-show="subTabNum === 2" />
    <reg-step2-ch-mcg v-show="subTabNum === 3" />
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
      subTabNum: '',

      eaiInfo: [],
      eigwInfo: [],
      mcgInfo: [],
      regList: [],
    };
  },
  created() {
    this.subTabNum = 1;
  },
  methods: {
    tabChange(val) {
      this.subTabNum = val;
    },
    isActive(val) {
      return this.subTabNum === val;
    },
  },
};
</script>
