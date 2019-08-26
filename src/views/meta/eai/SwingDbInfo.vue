<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />SWING 인터페이스 DB 관리
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SWING 수신 인터페이스 DB
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
        <div class="column on w-3">
          <label class="column_label">인터페이스ID</label>
          <input
            type="text"
            value="QMGR"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">테이블</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">수신TR</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">SWGMQ</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">SWGTP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
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
        <div class="column w-1" />
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              인터페이스ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              테이블<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              수신TR<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              SWGMQ<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              SWGTP<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              N
            </li><li />
          </ul>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SWING 송신 인터페이스 DB
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
        <div class="column w-3">
          <label class="column_label">인터페이스ID</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">테이블</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">송신ADT</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
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
              테이블<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              송신ADT<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              ABC.SND_SMS_MFF
            </li>
            <li class="td_cell">
              ZEAI_CCA
            </li>
            <li class="td_cell">
              1414
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
