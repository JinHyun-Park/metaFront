<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 개요
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SKT 인터페이스 구조는 아래와 같다. 생각보다 복잡하지 않다. 너도 할 수 있어!!
      </h5>
      <div />
      <div>
        <img
          src="@/assets/images/ico-pencil.png"
          width="1300"
          height="500"
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