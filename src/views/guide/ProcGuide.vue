<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />신청프로세스 가이드
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        인터페이스 신규/변경을 위한 신청프로세스는 하기와 같다.
      </h5>
      <section class="progress">
        <ul>
          <li
            class="step click_btn"
            :class="{on: isActive(0)}"
            @click="tabChange(0)"
          >
            0. 사전 작업
          </li>
          <li
            class="step click_btn"
            :class="{on: isActive(1)}"
            @click="tabChange(1)"
          >
            1. 인터페이스 신청
          </li>
          <li
            class="step click_btn"
            :class="{on: isActive(2)}"
            @click="tabChange(2)"
          >
            2. 개발 및 테스트
          </li>
          <li
            class="step click_btn"
            :class="{on: isActive(3)}"
            @click="tabChange(3)"
          >
            3. 운영 및 모니터링
          </li>
        </ul>
      </section>
      <guide-step0
        v-if="tabNum===0"
      />
      <guide-step1
        v-if="tabNum===1"
      />
      <guide-step2
        v-if="tabNum===2"
      />
      <guide-step3
        v-if="tabNum===3"
      />
    </section>
  </div>
</template>

<script>
import GuideStep0 from '@/views/guide/ProcGuideStep0.vue'; // 0단계 사전작업
import GuideStep1 from '@/views/guide/ProcGuideStep1.vue'; // 1단계 인터페이스 신청
import GuideStep2 from '@/views/guide/ProcGuideStep2.vue'; // 2단계 개발 및 테스트
import GuideStep3 from '@/views/guide/ProcGuideStep3.vue'; // 3단계 운영 및 모니터링

export default {
  /* eslint-disable */
  components: {
    GuideStep0,
    GuideStep1,
    GuideStep2,
    GuideStep3,
  },
  data() {
    return {
      procStCd: '',
      tabNum: 0,
      sTabNum: 1,
    };
  },
  methods : {
    isActive(val) {
      return this.tabNum === val;
    },
    tabChange(val) {
      console.log(`tabChange : [${val}]`);
      this.tabNum = val;
    },
    isSTabActive(val) {
      return this.sTabNum === val;
    },
    sTabChange(val) {
      console.log(`smalltab Change : [${val}]`);
      this.sTabNum = val;
    },
  }
}

</script>