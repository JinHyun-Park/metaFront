<template>
  <section class="form_area border_group">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />개발 시 진행 프로세스(신규 연동 시스템 기준)
        </div>
      </h2>
    </section>
    <section>
      <div>
        <span class="subtitle1">
          1. EAI
        </span>
      </div>
    </section>
    <section class="form_area">
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              순번
            </li>
            <li class="th_cell">
              진행내용
            </li>
            <li class="th_cell">
              담당자
            </li>
            <li class="th_cell">
              Check
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              1
            </li>
            <li class="td_cell">
              신규 연동 시스템과 EAI HUB 간 방화벽 Open
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
              EAI 파일 시스템 구성(10GB)
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
              EAI 환경 구성 및 관리를 위한 OS 계정(eaiadmin) 생성
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
              EAI 사용을 위한 eaiadmin 및 application 서비스 계정 권한 설정
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
              5
            </li>
            <li class="td_cell">
              신규 연동 시스템 서버 접근 권한 신청
            </li>
            <li class="td_cell">
              EAI 담당자 or 신청자
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
              EAI Component 설치 및 인터페이스 환경 구성
            </li>
            <li class="td_cell">
              EAI 담당자
            </li>
            <li class="td_cell">
              <input type="checkbox">
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              7
            </li>
            <li class="td_cell">
              프로그램 개발 및 테스트
            </li>
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
    <section>
      <div>
        <span class="subtitle1">
          2. MCG
        </span>
      </div>
    </section>
    <section class="form_area">
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              순번
            </li>
            <li class="th_cell">
              진행내용
            </li>
            <li class="th_cell">
              담당자
            </li>
            <li class="th_cell">
              Check
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              1
            </li>
            <li class="td_cell">
              신규 연동 채널과 MCG 간 방화벽 Open
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
              Inbound 채널의 경우 가상사용자 신청
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
              신규 채널 및 거래 등록
            </li>
            <li class="td_cell">
              MCG 담당자
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
              프로그램 개발 및 테스트
            </li>
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