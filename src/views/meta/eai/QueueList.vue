<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />큐 목록
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-4">
          <label class="column_label">인터페이스ID</label>
          <input
            type="text"
            value="SWG"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">큐매니저</label>
          <input
            type="text"
            value="QMGR"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">큐</label>
          <input
            type="text"
            value="SVC_MFF.IN"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">유형</label>
          <div class="select_group">
            <select>
              <option value="">
                IN
              </option>
              <option value="">
                OUT
              </option>
              <option value="">
                XQ
              </option>
              <option value="">
                DQ
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select>
              <option value="">
                Y
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              인터페이스ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              큐매니저<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              큐<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              SWG.SVC_MFF
            </li>
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              SWG.SVC_MFF.IN
            </li>
            <li class="td_cell">
              LQ
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              SWG.SVC_MFF
            </li>
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              SWG.SVC_MFF.IN
            </li>
            <li class="td_cell">
              LQ
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              SWG.SVC_MFF
            </li>
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              SWG.SVC_MFF.IN
            </li>
            <li class="td_cell">
              LQ
            </li>
            <li class="td_cell">
              N
            </li><li />
          </ul>
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
        class="default_button on"
      >
        추가
      </button>
    </section>
  </div>
</template>
