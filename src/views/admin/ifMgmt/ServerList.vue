<template>
  <div class="right_space">
    <section class="title style-2">
      <h2>
        <div>
          <i class="ico-bar" />서버 정보 조회
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <div class="select_group">
            <label class="column_label">Role</label>
            <select>
              <option
                value=""
                selected
              >
                수신서버
              </option>
              <option value="">
                송신서버
              </option>
              <option value="">
                개발
              </option>
              <option value="">
                운영
              </option>
            </select>
            <span class="select" />
          </div>
          <button
            type="button"
            class="default_button"
          >
            임시추가
          </button>
          <button
            type="button"
            class="default_button on"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="add_info">
        <input
          type="text"
          class="add_text on"
          value="채널 업무 담당조회추가 채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="채널양식 업무 담당추가 채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="채널양식 업무 거래코드 채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="거래 업무 담당 조회추가채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="거래 연동 담당 ID추가 채널 업무"
        >
        <input
          type="text"
          class="add_text"
          value="채널 ID 조회 담당추가 채널 업무"
        >
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell" />
              <li class="th_cell">
                시스템명<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                호스트명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                IP(VIP)<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP(NAT)<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                OS<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                고객사<i class="ico-sort-down" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell w-auto">
                <span class="default_radio on">
                  <input
                    id="radio_chk_1"
                    type="radio"
                    name="radio_chk_1"
                  ><label for="radio_chk_1"><span /></label>
                </span>
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                <span class="default_radio">
                  <input
                    id="radio_chk_2"
                    type="radio"
                    name="radio_chk_2"
                  ><label for="radio_chk_2"><span /></label>
                </span>
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                <span class="default_radio">
                  <input
                    id="radio_chk_3"
                    type="radio"
                    name="radio_chk_3"
                  ><label for="radio_chk_3"><span /></label>
                </span>
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                q sign
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                <span class="default_radio">
                  <input
                    id="radio_chk_4"
                    type="radio"
                    name="radio_chk_4"
                  ><label for="radio_chk_4"><span /></label>
                </span>
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                <span class="default_radio">
                  <input
                    id="radio_chk_5"
                    type="radio"
                    name="radio_chk_5"
                  ><label for="radio_chk_5"><span /></label>
                </span>
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                2 documents
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
      >
        수정
      </button>
      <button
        type="button"
        class="default_button"
      >
        추가
      </button>
      <button
        type="button"
        class="default_button on"
      >
        등록
      </button>
    </section>
  </div>
</template>
