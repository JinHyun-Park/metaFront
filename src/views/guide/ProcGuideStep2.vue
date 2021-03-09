<template>
  <section class="form_area border_group">
    <section>
        <span class="subtitle1">
            1. 신청 프로세스 진행 단계
          </span>
    </section>
    <section class="form_area">
      <div class="table_grid tb_layout">
        <div class="table_head w-auto">
          <ul>
            <li
              class="th_cell"
              style="width:5%;"
            >
              순번
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              단계
            </li>
            <li
              class="th_cell"
              style="width:25%;"
            >
              설명
            </li>
            <li
              class="th_cell"
              style="width:24%;"
            >
              신청자
            </li>
            <li
              class="th_cell"
              style="width:24%;"
            >
              승인자
            </li>
            <li
              class="th_cell"
              style="width:20%;"
            >
              인터페이스담당자
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell" >
              1
            </li>
            <li class="td_cell">
              임시저장
            </li>
            <li class="td_cell">
              임시저장한다.
            </li>
            <li class="td_cell">
              <input type="checkbox" checked disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" disabled>
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell" >
              2
            </li>
            <li class="td_cell">
              승인요청
            </li>
            <li class="td_cell">
              승인자에게 승인요청을 한 상태
            </li>
            <li class="td_cell">
              <input type="checkbox" checked disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" checked disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" disabled>
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell" >
              3
            </li>
            <li class="td_cell">
              접수중
            </li>
            <li class="td_cell">
              승인완료되어 인터페이스 담당자가 접수 중인 상태
            </li>
            <li class="td_cell">
              <input type="checkbox" disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" disabled>
            </li>
            <li class="td_cell">
              <input type="checkbox" checked disabled>
            </li>
          </ul>
        </div>
      </div>
     </section>
    <section>
        <span class="subtitle1">
            2. 개발 시 진행 프로세스(신규/추가 연동 시스템 기준)
          </span>
    </section>
    <section class="form_area">
      <div class="table_grid tb_layout">
        <div class="table_head w-auto">
          <ul>
            <li
              class="th_cell"
              style="width:5%;"
            >
              순번
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              단계
            </li>
            <li
              class="th_cell"
              style="width:25%;"
            >
              EAI
            </li>
            <li
              class="th_cell"
              style="width:24%;"
            >
              EIGW
            </li>
            <li
              class="th_cell"
              style="width:20%;"
            >
              MCG
            </li>
            <li
              class="th_cell"
              style="width:8%;"
            >
              담당자
            </li>
            <li
              class="th_cell"
              style="width:4%;"
            >
              Check
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell" >
              1
            </li>
            <li class="td_cell">
              사전작업 완료 확인
            </li>
            <li class="td_cell">
              신규 연동 시스템과 EAI HUB 간 방화벽 Open
            </li>
            <li class="td_cell">
              신규 연동 기관 서버 정보 EIGW담당자와 공유<br/>
              (방화벽 신청은 EIGW담당자가 진행)
            </li>
            <li class="td_cell">
              신규 채널과 MCG 간 방화벽 Open
            </li>
            <li class="td_cell">
              신청자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              2
            </li>
            <li class="td_cell">
              초기 연동 서버 설정<br/>
              (기존연동 중인 경우 skip)
            </li>
            <li class="td_cell">
              . EAI 파일 시스템 구성 (10GB)<br/>
              . EAI 환경을 위한 OS 계정(eaiadmin) 생성<br/>
              . eaiadmin / application 계정 권한 설정<br/>
              . 신규 연동 시스템 서버 접근 권한 신청
            </li>
            <li class="td_cell">
              EAI 환경 구성(좌동)
            </li>
            <li class="td_cell">
              WebToB 연동 라이브러리 구성
            </li>
            <li class="td_cell">
              신청자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              3
            </li>
            <li class="td_cell">
              연동 설정 작업 요청/확인
            </li>
            <li class="td_cell">
              EAI Component 설치 및 인터페이스 환경 구성
            </li>
            <li class="td_cell">
              관련 EAI 인터페이스 구성 확인
            </li>
            <li class="td_cell">
              Inbound 채널의 경우, 가상신청자 신청
            </li>
            <li class="td_cell">
              신청자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              4
            </li>
            <li class="td_cell">
              신청 인터페이스 구성
            </li>
            <li class="td_cell">
              EAI 신청 인터페이스 구성
            </li>
            <li class="td_cell">
              EIGW 연동 모듈 개발
            </li>
            <li class="td_cell">
              신규 채널 및 거래 등록
            </li>
            <li class="td_cell">
              인터페이스 담당자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              5
            </li>
            <li class="td_cell">
              단위 프로그램 개발
            </li>
            <li class="td_cell"></li>
            <li class="td_cell">
              각 시스템 별 연동 모듈 개발
            </li>
            <li class="td_cell"></li>
            <li class="td_cell">
              신청자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              6
            </li>
            <li class="td_cell">
              개발 테스트
            </li>
            <li class="td_cell">
              
            </li>
            <li class="td_cell">
              . 내부 EAI 연동 이상여부 점검<br/>
              . 외부 대외기관 연동 여부 점검
            </li>
            <li class="td_cell"></li>
            <li class="td_cell">
              신청자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
        </div>
      </div>
    </section>
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