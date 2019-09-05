<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 업무 요청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="big_tabs">
      <ul>
        <li class="on">
          EIGW
        </li>
        <li>EAI</li>
        <li>MCG</li>
      </ul>
    </section>

    <section class="small_tabs">
      <ul>
        <li class="ov">
          온라인
        </li>
        <li>파일</li>
      </ul>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            삭제
          </button>
          <button
            type="button"
            class="default_button on"
          >
            추가
          </button>
          <!-- <button type="button" class="default_button on">수정</button>-->
        </div>
      </h5>
      <!-- ONLINE -->
      <div class="table_colgroup first">
        <div class="table_grid">
          <div class="table_head">
            <ul>
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
                개발포트<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                운영REAL IP<i class="ico-sort-down" />
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
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row">
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
                <i class="ico-del" />
              </li>
            </ul>
            <ul class="table_row">
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
                <i class="ico-del" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- ONLINE //-->
      <!-- FILE -->
      <div class="table_colgroup first">
        <div class="table_grid">
          <colgroup />
          <div class="table_head">
            <ul>
              <li class="th_cell">
                파일명<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                파일날짜<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                대외기관명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                개발REAL IP<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                개발포트<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                운영REAL IP<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                운영포트<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                송수신<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                전송주기<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                전송시각<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                전송방식<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                인터페이스ID<i class="ico-sort-up" />
              </li>
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row">
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
              <li class="td_cell">
                2 documents
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
            <ul class="table_row">
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
              <li class="td_cell">
                q sign
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- FILE //-->
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID(명)</label>
          <div class="search_group">
            <input
              type="text"
              value="OPTGROUP"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
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
        <div class="column w-1">
          <label class="column_label">대외기관</label>
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
        <div class="column w-1">
          <label class="column_label">파일명</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <!-- ONLINE -->
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                Client
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">송수신</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                송신
              </option>
              <option value="">
                수신
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                연결유지
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
      <!-- ONLINE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">송수신</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">전송주기</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">전송시각</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">전송방식</label>
          <div class="radio_group">
            <span class="default_radio on">
              <input
                id="radio_1"
                type="radio"
                name="radio_1"
              >(S)FTP<label for="radio_1"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_2"
                type="radio"
                name="radio_1"
              >TCP<label for="radio_2"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_3"
                type="radio"
                name="radio_1"
              >기타<label for="radio_3"><span /></label>
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">개발 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발 Port</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 Port</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>

      <!-- FILE -->
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">계정정보</label>
          <input
            type="text"
            value="ID"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value="PW"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">경로</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <!-- FILE //-->
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
        <div class="table_head w-auto except">
          <ul>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              부서
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
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row form_type except w-auto">
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
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell on">
              <div class="search_group">
                <input
                  type="text"
                  value="유영준"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
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
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
          <ul class="table_row form_type except w-auto">
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
              q sign
            </li>
            <li class="td_cell">
              <div class="search_group">
                <input
                  type="text"
                  value=""
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </li>
            <li class="td_cell">
              010-000-0000
            </li>
            <li class="td_cell">
              gmail@gmail.com
            </li>
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ONLINE -->
    <section class="form_area border_group">
      <h5 class="s_tit">
        비고
      </h5>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">추가요청사항</label>
          <textarea
            cols="50"
            row="5"
            placeholder="요청사항 입니다."
          />
        </div>
      </div>
    </section>
    <!-- ONLINE //-->

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
  name: 'RegStep2EIGW',
};
</script>
