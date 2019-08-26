<template>
  <div class="right_space">
    <section class="title style-2">
      <h2><i class="ico-bar" />인터페이스 목록 조회</h2>
      <div class="breadcrumb">
        <span>EGIW</span><em class="on">EAI</em>
      </div>
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
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">인터페이스 ID</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12"
          >
        </div>
        <div class="column w-4">
          <label class="column_label">인터페이스명</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">연동 방식</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                Y
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">방향</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                단방향
              </option>
              <option value="">
                양방향
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">사용여부</label>
          <div class="select_group disabled">
            <select disabled>
              <option value="">
                Y
              </option>
              <option
                value=""
                selected
              >
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2" />
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">송신 큐매니저</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">수신 큐매니저</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">담당자</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SKT
              </option>
              <option value="">
                SKB
              </option>
              <option value="">
                SKP
              </option>
              <option value="">
                SKTX
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
              인터페이스ID<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              인터페이스명<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              연동 방식<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              방향<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              송신 큐매니저<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              수신 큐매니저<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              SWG.SVC_MFF
            </li>
            <li class="td_cell">
              서비스 연동
            </li>
            <li class="td_cell">
              MQ
            </li>
            <li class="td_cell">
              단방향
            </li>
            <li class="td_cell">
              SEND1P
            </li>
            <li class="td_cell">
              RCV1P
            </li>
            <li class="td_cell">
              Y
            </li>
          </ul>
          <ul class="table_row w-auto">
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
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
      >
        등록
      </button>
    </section>
  </div>
</template>
