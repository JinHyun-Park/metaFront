<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup large">
      <section class="title style-2">
        <h2><i class="ico-bar" />인퍼테이스 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain type-2">
          <div class="column w-2">
            <!-- <label class="column_label">신청하고자 하는 인터페이스를 선택해주세요.</label>-->
            <div class="radio_group">
              <span class="default_radio on">
                <input
                  id="radio_1"
                  type="radio"
                  name="radio_1"
                >기존<label
                  class="border-brickpink"
                  for="radio_1"
                ><span /></label>
              </span>
              <span class="default_radio">
                <input
                  id="radio_2"
                  type="radio"
                  name="radio_1"
                >신규<label
                  class="border-brickpink"
                  for="radio_2"
                ><span /></label>
              </span>
            </div>
          </div>
          <div class="column w-1" />
        </div>
        <div class="row_contain last">
          <div class="column on w-3">
            <label class="column_label">I/F ID</label>
            <input
              type="text"
              value="QMGR"
            >
          </div>
          <div class="column w-3">
            <label class="column_label">I/F명</label>
            <input
              type="text"
              value="ABC.IF_ID_MFF"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">&nbsp;</label>
            <div class="right_button_area">
              <button
                type="button"
                class="default_button on"
              >
                검색
              </button>
            </div>
          </div>
        </div>

        <!-- 기존 -->
        <div class="table_colgroup">
          <div class="table_grid radio_group">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
&nbsp;
                </li>
                <li class="th_cell">
                  인터페이스ID<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  인터페이스명<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  대외기관명<i class="ico-sort-up" />
                </li>
                <li class="th_cell">
                  개발REAL IP<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  개발NAT IP<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  개발포트<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  운영REAL IP<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  운영NAT IP<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  운영포트<i class="ico-sort-up" />
                </li>
                <li class="th_cell">
                  송수신여부<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  연결유형<i class="ico-sort-up" />
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul class="table_row w-auto">
                <li class="td_cell">
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
            </div>
          </div>
        </div>
        <!-- 기존 //-->

        <!-- 신규 -->
        <div class="table_colgroup">
          <div class="table_grid radio_group">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
&nbsp;
                </li>
                <li class="th_cell">
                  인터페이스명<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  OPCODE<i class="ico-sort-up" />
                </li>
                <li class="th_cell">
                  연동방식<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  신청제목<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  개발반영요청일<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  운영반영요청일<i class="ico-sort-up" />
                </li>
              </ul>
            </div>
            <div class="table_body">
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
                      id="radio_chk_4"
                      type="radio"
                      name="radio_chk_4"
                    ><label for="radio_chk_4"><span /></label>
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
            </div>
          </div>
        </div>
        <!-- 신규 //-->
      </section>

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
        >
          닫기
        </button>
        <button
          type="button"
          class="default_button on"
        >
          선택
        </button>
      </section>
    </article>
  </div>
</template>
