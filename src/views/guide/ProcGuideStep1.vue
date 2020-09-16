<template>
  <section class="form_area border_group">
    <div>
      <section>
          &nbsp;
        <div>
          <h3>
            1. [인터페이스 신청] 메뉴를 통해서 인터페이스를 신청한다.
          </h3>
            &nbsp;
          <h4>
            - 인터페이스 신청 목록에서 오른쪽 상단의 "신규 신청" 버튼이나 작성 중인 신청 목록의 제목을 클릭하면 수정할 수 있다.
          </h4>
          <h4>
            - 인터페이스 신청 Top 메뉴의 "신청 등록" 메뉴를 직접 클릭한다.
          </h4>
            &nbsp;
            &nbsp;
          <h3>
            2. 신청 단계별 주요 입력 항목
          </h3>
            &nbsp;
        </div>
      </section>
      <section class="small_tabs">
        <ul>
          <li
            :class="{on: isSTabActive(1)}"
            @click="sTabChange(1)"
          >
            1. 기본 정보 신청
          </li>
          <li
            :class="{on: isSTabActive(2)}"
            @click="sTabChange(2)"
          >
            2. 인터페이스 상세정보 입력
          </li>
          <li
            :class="{on: isSTabActive(3)}"
            @click="sTabChange(3)"
          >
            3. 신청 내용 확인 및 승인요청/확인
          </li>
        </ul>
      </section>
      <div v-if="sTabNum===1">
        <div align="left">
          <img
            src="@/assets/images/procGuide_step1.png"
            width="1300"
          >
        </div>
      </div>
      <div v-if="sTabNum===2">
        <div align="left">
          <img
            src="@/assets/images/procGuide_step2.png"
            width="1300"
          >
        </div>
        <section class="form_area">
          <div class="table_grid">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  인터페이스 명
                </li>
                <li class="th_cell">
                  개요
                </li>
                <li class="th_cell">
                  담당자
                </li>
                <li class="th_cell">
                  Download
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
                  EAI
                </li>
                <li class="td_cell">
                  EAI 업무요청서 상세 가이드
                </li>
                <li class="td_cell">
                  전창후 수석
                </li>
                <li class="td_cell">
                  <i class="ico-edit" />
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  EiGW
                </li>
                <li class="td_cell">
                  대외기관 연동은 EiGW와 함께
                </li>
                <li class="td_cell">
                  강태훈 선임
                </li>
                <li class="td_cell">
                  <i class="ico-edit" />
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  MCG
                </li>
                <li class="td_cell">
                  MCG 채널설계서, 거래 요청서 상세 가이드
                </li>
                <li class="td_cell">
                  장호은 선임
                </li>
                <li class="td_cell">
                  <i class="ico-edit" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div v-if="sTabNum===3">
        <div align="left">
          <img
            src="@/assets/images/procGuide_step3-2.png"
            width="1300"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  /* eslint-disable */
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