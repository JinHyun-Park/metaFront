<template>
  <section class="form_area border_group">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EAI
        </div>
      </h2>
    </section>
    <section>
      <div>
        <span class="subtitle1">
          1. 개발 시 진행 프로세스(신규 연동 시스템 기준)
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
              연동 대상 시스템과 EAI 시스템 간 방화벽 Open
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
              EAI 환경 설치를 위해 시스템 계정(eaiadmin) 생성 및 권한 부여와 파일 시스템 구성
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
              서버 접근 권한 신청 및 승인
            </li>
            <li class="td_cell">
              EAI 담당자(신청), 신청 시스템 담당 매니저(승인)
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
              EAI Component 설치 및 연동 설정
            </li>
            <li class="td_cell">
              EAI 담당자
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
          2. 문제 발생 시 이슈별 해결 방안
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
              Case
            </li>
            <li class="th_cell">
              설명
            </li>
            <li class="th_cell">
              해결방안
            </li>
            <li class="th_cell">
              담당자
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              Queue Connection Error
            </li>
            <li class="td_cell">
              큐에 접근하지 못하는 경우
            </li>
            <li class="td_cell">
              큐에 잘 접근한다.
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              큐 채널 접속 오류
            </li>
            <li class="td_cell">
              채널에 접속이 안된다.
            </li>
            <li class="td_cell">
              왜 그런지 생각해본다
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              데이터 미수신
            </li>
            <li class="td_cell">
              양방향 연동인데, 응답 데이터를 받지 못하는 것 같다.
            </li>
            <li class="td_cell">
              내 잘못은 아닌가 자책을 한다.
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              큐 채널 접속 오류
            </li>
            <li class="td_cell">
              채널에 접속이 안된다.
            </li>
            <li class="td_cell">
              왜 그런지 생각해본다
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
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