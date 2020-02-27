<template>
  <div>
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

    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="table_grid">
        <div class="table_head except w-auto">
          <ul>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
            <li class="th_cell">
              비고
            </li>
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row form_type w-auto">
            <li class="td_cell on">
              <div class="select_group">
                <select>
                  <option
                    value=""
                    selected
                  >
                    대외기관
                  </option>
                  <option value="">
                    유사관련기관
                  </option>
                </select>
                <span class="select" />
              </div>
            </li>
            <li class="td_cell on">
              <input
                type="text"
                value="유영준"
              >
            </li>
            <li class="td_cell">
              010-123-1234
            </li>
            <li class="td_cell on">
              <input
                type="text"
                value="skcc@skcc.com"
              >
            </li>
            <li class="td_cell" />
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
          <ul class="table_row except form_type w-auto">
            <li class="td_cell">
              <div class="select_group">
                <select>
                  <option
                    value=""
                    selected
                  >
                    대외기관
                  </option>
                  <option value="">
                    유사관련기관
                  </option>
                </select>
                <span class="select" />
              </div>
            </li>
            <li class="td_cell">
              <input
                type="text"
                value="유영준"
              >
            </li>
            <li class="td_cell">
              010-123-1234
            </li>
            <li class="td_cell">
              <input
                type="text"
                value="skcc@skcc.com"
              >
            </li>
            <li class="td_cell" />
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
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
  name: 'RegStep1ApplyIf',
  components: {
  },
};
</script>
