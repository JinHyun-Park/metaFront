<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 프로그램 정보
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        프로그램 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">EIGW구분</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                OPGROUP
              </option>
              <option value="">
                OGROUP
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">프로그램</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로그램유형</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정파일</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">연결유형</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">IP</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">PORT</label>
          <input
            type="text"
            value="8080"
          >
        </div>
        <div class="column w-2" />
      </div>

      <!-- TABLE_GRID
                    <div class="table_grid">
                        <div class="table_head w-auto">
                            <ul>
                                <li class="th_cell">EIGW구분<i class="ico-sort-down"></i></li>
                                <li class="th_cell">프로그램<i class="ico-sort-up"></i></li>
                                <li class="th_cell">설정파일<i class="ico-sort-down"></i></li>
                                <li class="th_cell">IP<i class="ico-sort-down"></i></li>
                                <li class="th_cell">PORT<i class="ico-sort-down"></i></li>
                                <li class="th_cell">프로그램유형<i class="ico-sort-down"></i></li>
                                <li class="th_cell">연결유형<i class="ico-sort-up"></i></li>
                            </ul>
                        </div>
                        <div class="table_body">
                            <ul class="table_row w-auto">
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                                <li class="td_cell">2 documents</li>
                            </ul>
                            <ul class="table_row w-auto">
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                                <li class="td_cell">q sign</li>
                            </ul>
                        </div>
                    </div>
                    TABLE_GRID //-->
    </section>


    <section class="form_area border_group">
      <h5 class="s_tit">
        기본정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">EIGW구분</label>
          <input
            type="text"
            value="50byte"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로그램명</label>
          <input
            type="text"
            value=""
          >
        </div>

        <div class="column w-2">
          <label class="column_label">설정파일명</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        상세정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">개발 REAL IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">개발 NAT IP</label>
          <input
            type="text"
            value=""
          >
        </div>

        <div class="column w-2">
          <label class="column_label">개발 Port</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">운영 REAL IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영 NAT IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영 Port</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">프로그램유형</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연결유형</label>
          <input
            type="text"
            value="type_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">사용유무</label>
          <input
            type="text"
            value="Y"
          >
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
      >
        수정
      </button>
    </section>
  </div>
</template>
