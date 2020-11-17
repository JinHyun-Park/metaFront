<template>
  <section class="form_area border_group">
    <div>
      <section>
        <div>
          <span class="subtitle1">
            1. 운영 전환
          </span>
          <span class="subtitle2">
            신청 프로세스가 "운영 반영 완료" 상태가 되면, 실제 인터페이스가 운영기에 반영된 상태이다.
          </span>
          <span class="subtitle2">
            운영 반영은 선 반영되는 경우도 있고, 업무 측 일정과 동일하게 진행될 수도 있다. 이는 담당자와 협의가 필요하다.
          </span>
        </div>
      </section>
      <section class="form_area">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                인터페이스 명
              </li>
              <li class="th_cell">
                연동 환경
              </li>
              <li class="th_cell">
                담당자(C&C)
              </li>
              <li class="th_cell">
                담당자(SKT)
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell">
                EAI
              </li>
              <li class="td_cell">
                SKT내부 및 관계사 EAI 시스템 간 비동기 연동을 위한 인터페이스 제공
              </li>
              <li class="td_cell">
                전창후 수석
              </li>
              <li class="td_cell">
                김정태 님/MNO IT최적화팀
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
                유영준 수석/강태훈 선임
              </li>
              <li class="td_cell">
                김정태 님/MNO IT최적화팀
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                MCG
              </li>
              <li class="td_cell">
                Swing 정보 조회성, 실시간성 (데이터 보장 되지 않음)
              </li>
              <li class="td_cell">
                장호은 선임
              </li>
              <li class="td_cell">
                김정태 님/MNO IT최적화팀
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div>
          <span class="subtitle1">
            2. 연동 완료 후 포탈 내에서 확인 가능한 정보는 하기와 같다.
          </span>
        </div>
      </section>
      <section class="form_area">
        <div
          class="table_grid"
        >
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                제공 정보
              </li>
              <li class="th_cell">
                설명
              </li>
              <li class="th_cell">
                EAI
              </li>
              <li class="th_cell">
                EiGW
              </li>
              <li class="th_cell">
                MCG
              </li>
              <li class="th_cell">
                관련 화면
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell">
                큐 적체량 조회
              </li>
              <li class="td_cell">
                송/수신 측 시스템의 문제로 데이터를 처리하지 못하고 큐에 적체되는 경우 발생
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <button
                  class="button is-primary home_btn"
                >
                  큐 모니터링
                </button>
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                EiGW 오류 현황
              </li>
              <li class="td_cell">
                대외 연동 중 발생하는 오류내용을 확인(F002, F004는 대외기관 문제)
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <button
                  class="button is-primary home_btn"
                >
                  EiGW 모니터링
                </button>
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                EAI/EIGW 연동 정보 조회
              </li>
              <li class="td_cell">
                IF ID를 기준으로 상세 연동 정보를 조회한다.
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <button
                  class="button is-primary home_btn"
                >
                  메타정보 조회
                </button>
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                MCG 연동 정보 조회
              </li>
              <li class="td_cell">
                MCG 의 거래/채널 정보를 조회한다.
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  disabled
                >
              </li>
              <li class="td_cell">
                <input
                  type="checkbox"
                  checked
                  disabled
                >
              </li>
              <li class="td_cell">
                <button
                  class="button is-primary home_btn"
                >
                  MCG 정보 조회
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div
      v-if="tabNum===1"
      class="border_group"
    >
      <section>
          &nbsp;
        <div>
          <span class="subtitle1">
            1. [인터페이스 신청] 메뉴를 통해서 인터페이스를 신청한다.
          </span>
          <span class="subtitle2">
            - 인터페이스 신청 목록에서 오른쪽 상단의 "신규 신청" 버튼이나 작성 중인 신청 목록의 제목을 클릭하면 수정할 수 있다.
          </span>
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
                  MCG는 멀티채널게이트웨이~
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