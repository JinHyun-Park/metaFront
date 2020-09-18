<template>
  <section class="form_area border_group">
    <div>
      <section>
        <div>
          <span class="subtitle1">
            1. 어떤 인터페이스를 선택해야되는 지 결정한다.
          </span>
          <span class="subtitle2">
            SKT 인터페이스는 많다.
          </span>
          <span class="subtitle2">
            여러 환경에 맞는 인터페이스를 우선 고민 후에 신청을 진행할 필요가 있다.
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
                Swing 정보 조회성, 실시간성 (데이터 보장 되지 않음)
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
          <span class="subtitle1">
            2. 연동 협의를 위해 필요한 기본적인 정보가 있다.
          </span>
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
                송수신 시스템의 서버 정보 (hostname, IP, SKT 시스템 여부)
              </li>
              <li class="td_cell">
                대상 시스템이 SKT 내부망에 있어야하며, EAI HUB와 방화벽 오픈이 가능해야 합니다.
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
                연동 데이터의 실시간 처리 대상 및 파일 전송 대상 여부
              </li>
              <li class="td_cell">
                연동 방식(MQ, File)을 정하기 위해 데이터가 어떤식으로 발생하고 처리 되는지 검토 필요
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
                송수신 시스템의 서버 정보 (hostname, IP, SKT 시스템 여부)
              </li>
              <li class="td_cell">
                대상 시스템이 SKT 내부망에 있어야하며, MCG와 방화벽 오픈이 가능해야 합니다.
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
                채널, TP(거래) 정보
              </li>
              <li class="td_cell">
                채널 - 같은 용도의 MCG 채널이 있을 경우, 기존 채널에 거래코드 추가 /
                거래 - 송수신단에서 연동할 TP를 개발한 후 해당 TP로 거래코드 추가
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
                연동 목적 검토
              </li>
              <li class="td_cell">
                MCG는 실시간 조회성 인터페이스로, 즉각적으로 데이터 처리가 필요합니다.
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
  </section>
</template>

<script>
export default {
  /* eslint-disable */
  data() {
    return {
      procStCd: '',
      sTabNum: 1,
    };
  },
  methods : {
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