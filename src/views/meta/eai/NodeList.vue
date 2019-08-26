<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />노드 목록
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
          <label class="column_label">노드</label>
          <input
            type="text"
            value="QMGR"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">유형</label>
          <div class="select_group">
            <select>
              <option value="">
                C
              </option>
              <option value="">
                S
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">호스트</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search"><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">IP</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search"><i class="ico-search" /></span>
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
              노드<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              호스트<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              IP<i class="ico-sort-up" />
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
              C
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
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
              C
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
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
              S
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
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
