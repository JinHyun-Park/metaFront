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
        <h3>
          1. 개발 시 진행 프로세스
        </h3>
      </div>
          &nbsp;
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
              각 서버에 개발 component를 설치한다.
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
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
              각 서버에 개발 component가 잘 됐는지 확인한다.
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
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
              각 서버에 개발 component가 잘 돌아가는지 확인한다.
            </li>
            <li class="td_cell">
              여인진 차장(전창후 수석)
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
        <h3>
          2. 문제 발생 시 이슈별 해결 방안
        </h3>
      </div>
          &nbsp;
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