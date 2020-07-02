<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 정보 변경 요청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="progress duo">
      <ul>
        <li class="step on">
          1. 기본정보 입력
        </li>
        <li class="step">
          2. 신청 내용 확인 및 승인요청
        </li>
      </ul>
    </section>

    <!--
                <section class="big_tabs">
                    <ul>
                        <li class="on">EIGW</li>
                        <li>EAI</li>
                        <li>MCG</li>
                    </ul>
                </section>
-->

    <section class="form_area border_group">
      <h5 class="s_tit">
        신청사유
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-4">
          <label class="column_label">사유</label>
          <input
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">반영예정일</label>
          <div class="calander_group">
            <input
              type="text"
              value="2019-07-08"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">기타</label>
          <textarea
            cols="50"
            rows="5"
            placeholder="기타 입니다."
          />
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        인터페이스
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">인터페이스</label>
          <div class="radio_group">
            <span class="default_radio">
              <input
                id="radio_1"
                v-model="ddd"
                type="radio"
                value="1"
                name="radio_1"
              >EAI<label for="radio_1"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_2"
                v-model="ddd"
                type="radio"
                value="2"
                name="radio_1"
              >EIGW<label for="radio_2"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_3"
                v-model="ddd"
                type="radio"
                value="3"
                name="radio_1"
              >MCG<label for="radio_3"><span /></label>
            </span>
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">요청 내용</label>
          <textarea
            cols="50"
            rows="5"
            placeholder="참고할 인터페이스ID 와 정보(디렉토리, 쉘, 파일명) 등도 함께 기술 해주세요."
          />
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button btn_prev disabled"
      >
        이전
      </button>
      <button
        type="button"
        class="default_button btn_next"
      >
        다음
      </button>
      <button
        type="button"
        class="default_button on"
      >
        임시저장
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RegStep1ApplyChgIf',
  data() {
    return {
      ddd: '1',
    };
  },
  created() {

  },
};
</script>
