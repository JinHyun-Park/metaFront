<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup small">
      <section class="title style-2">
        <h2><i class="ico-bar" />대외기관 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain type-3 last">
          <div class="column on w-5">
            <label class="column_label">기관명</label>
            <input
              type="text"
              value="QMGR"
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

        <div class="table_colgroup">
          <div class="table_grid radio_group">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
&nbsp;
                </li>
                <li class="th_cell">
                  기관명<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  기관코드<i class="ico-sort-down" />
                </li>
                <li class="th_cell">
                  주소<i class="ico-sort-up" />
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
                  q sign
                </li>
                <li class="td_cell">
                  2 documents2 documents2
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
                  q signq sign
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
