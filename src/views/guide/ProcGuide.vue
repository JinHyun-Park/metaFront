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
            class="step"
            :class="{on: isActive(0)}"
            @click="tabChange(0)"
          >
            0. 사전 작업
          </li>
          <li
            class="step"
            :class="{on: isActive(1)}"
            @click="tabChange(1)"
          >
            1. 인터페이스 신청
          </li>
          <li
            class="step"
            :class="{on: isActive(2)}"
            @click="tabChange(2)"
          >
            2. 개발 및 테스트
          </li>
          <li
            class="step"
            :class="{on: isActive(3)}"
            @click="tabChange(3)"
          >
            3. 운영 및 모니터링
          </li>
        </ul>
      </section>
      <div
        v-if="tabNum===0"
        class="border_group"
      >
        <section>
          &nbsp;
          <div>
            <h3>
              1. 어떤 인터페이스를 선택해야되는 지 결정한다.
            </h3>
          </div>
          &nbsp;
          <div>
            <h4>
              SKT 인터페이스는 많다. 여러 환경에 맞는 인터페이스를 우선 고민 후에 신청을 진행할 필요가 있다.
            </h4>
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
                  개요
                </li>
                <li class="th_cell">
                  담당자
                </li>
                <li class="th_cell">
                  담당자
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
                  EAI
                </li>
                <li class="td_cell">
                  EAI는 큐덩어리~!!
                </li>
                <li class="td_cell">
                  전창후 수석
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
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div>
            <h3>
              2. 연동 협의를 위해 필요한 기본적인 정보가 있다.
            </h3>
          </div>
          &nbsp;
        </section>
        <section class="small_tabs">
          <ul>
            <li
              :class="{on: isSTabActive(1)}"
              @click="sTabChange(1)"
            >
              EiGW
            </li>
            <li
              :class="{on: isSTabActive(2)}"
              @click="sTabChange(2)"
            >
              EAI
            </li>
            <li
              :class="{on: isSTabActive(3)}"
              @click="sTabChange(3)"
            >
              MCG
            </li>
          </ul>
        </section>
        <section class="form_area">
          <div
            v-if="sTabNum===1"
            class="table_grid"
          >
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  필요 정보
                </li>
                <li class="th_cell">
                  설명
                </li>
                <li class="th_cell">
                  필수여부
                </li>
                <li class="th_cell">
                  Check
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
                  회선은 어떻게 구축할지??
                </li>
                <li class="td_cell">
                  전용선 구축이 신규로 필요한지?? 그룹사 연동 건인지??의 확인이 우선 필요하다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  대외기관 서버 정보(IP/PORT)
                </li>
                <li class="td_cell">
                  우선 서버 정보는 기본적으로 알아야한다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  파일/온라인 구분 필요
                </li>
                <li class="td_cell">
                  파일 송/수신 및 온라인 송/수신 여부를 명확히 해야 한다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  기존에 연동 중인 시스템인지??
                </li>
                <li class="td_cell">
                  기 연동 시스템의 경우에는 여러 확인사항에 대해서 좀 더 쉽게 접근할 수 있다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="sTabNum===2"
            class="table_grid"
          >
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  필요 정보
                </li>
                <li class="th_cell">
                  설명
                </li>
                <li class="th_cell">
                  필수여부
                </li>
                <li class="th_cell">
                  Check
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
                  출발지 서버 정보(IP/PORT), 도착지 서버 정보(IP/PORT)
                </li>
                <li class="td_cell">
                  EAI 설정을 위해서는 우선 서버 정보는 기본적으로 알아야한다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  T망 내에 연동 중인지??
                </li>
                <li class="td_cell">
                  우리 나와바리에 있어야 연동이 된다
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  기존에 연동 중인 시스템인지??
                </li>
                <li class="td_cell">
                  해본 적 있지?? 그치??
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="sTabNum===3"
            class="table_grid"
          >
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  필요 정보
                </li>
                <li class="th_cell">
                  설명
                </li>
                <li class="th_cell">
                  필수여부
                </li>
                <li class="th_cell">
                  Check
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
                  MCG??
                </li>
                <li class="td_cell">
                  EAI 설정을 위해서는 우선 서버 정보는 기본적으로 알아야한다.
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  T망 내에 연동 중인지??
                </li>
                <li class="td_cell">
                  우리 나와바리에 있어야 연동이 된다
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    checked
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
                </li>
              </ul>
              <ul class="table_row w-auto">
                <li class="td_cell">
                  기존에 연동 중인 시스템인지??
                </li>
                <li class="td_cell">
                  해본 적 있지?? 그치??
                </li>
                <li class="td_cell">
                  <input
                    type="checkbox"
                    disabled
                  >
                </li>
                <li class="td_cell">
                  <input type="checkbox">
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
  </div>
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