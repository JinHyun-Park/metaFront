<template>
  <div>
    <section class="big_tabs">
      <ul>
        <li
          :class="{on: isActive(1)}"
          @click="tabChange(1)"
        >
          EIGW
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

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button btn_prev disabled"
        @click="beforeTab"
      >
        이전
      </button>
      <button
        type="button"
        class="default_button btn_next"
        @click="nextTab"
      >
        다음
      </button>
      <button
        type="button"
        class="default_button on"
        @click="saveTemp"
      >
        임시저장
      </button>
    </section>
  </div>
</template>

<script>
import RegStep2eai from '@/views/ifReg/RegStep2_EAI.vue'; // 2단계 EAI
import RegStep2eigw from '@/views/ifReg/RegStep2_EIGW.vue'; // 2단계 EiGW
import RegStep2ChMcg from '@/views/ifReg/RegStep2McgFrame.vue'; // 2단계 MCG 채널

import { fetchPostIfStep2Reg } from '@/api/ifRegApi';

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
    nextTab() {
      this.$emit('nextTab');
    },
    beforeTab() {
      this.$emit('beforeTab');
    },
    saveTemp() {
      this.regList = {
        eaiInfo: this.eaiInfo,
        eigwInfo: this.eigwInfo,
        mcgInfo: this.mcgInfo,
      };

      // this.$axios.post('/api/ifReq/', this.svrList)
      fetchPostIfStep2Reg(this.regList)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('작성하신 내용이 임시저장 되었습니다');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
        });
    },
  },
};
</script>
