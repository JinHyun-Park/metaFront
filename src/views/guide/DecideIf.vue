<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 순서도
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SKT 인터페이스 중 나는 지금 어떤 인터페이스를 신청해야 되지?!
      </h5>
      <div />
      <div>
        <!-- https://app.diagrams.net/ 다이어그램 생성 툴 사용 -->
        <img
          src="@/assets/images/flow-chart-guide.png"
          width="1350"
        >
      </div>
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
              특징
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
              SKT내부 시스템 간 비동기 연동을 위한 시스템
            </li>
            <li class="td_cell">
              비동기 / 메시지 전달 보장(큐 저장) / SWING외 시스템간 연동도 가능
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
              SKT외부 시스템(대외기관, AWS등 Cloud 장비)간 연동을 위한 시스템
            </li>
            <li class="td_cell">
              연동 시스템과 EiGW 간에는 EAI 연동이 필수 / 온라인(socket), 파일(ftp, sftp) 연동 가능
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
              채널 관련 시스템 등 동기식 연동을 위한 시스템
            </li>
            <li class="td_cell">
              SWING B0채널, Tworld, Tgate 등 실시간 동기식 연동 가능
            </li>
            <li class="td_cell">
              장호은 선임
            </li>
          </ul>
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
    };
  },
}

</script>