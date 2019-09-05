<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 채널 신청
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="progress">
      <ul>
        <li class="step">
          1. 기본정보 입력
        </li>
        <li class="step on">
          2. 인터페이스 상세정보 입력
        </li>
        <li class="step">
          3. 신청 내용 확인 및 승인요청
        </li>
      </ul>
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

    <!--
                <section class="small_tabs">
                    <ul>
                        <li class="ov">온라인</li>
                        <li>파일</li>
                    </ul>
                </section>
-->

    <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            추가
          </button>
          <button
            type="button"
            class="default_button extend on"
          >
            가상 사용자 추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">신청하고자 하는 인터페이스를 선택해주세요.</label>
          <div class="radio_group">
            <span class="default_radio on">
              <input
                id="radio_1"
                type="radio"
                name="radio_1"
              >채널추가<label
                class="border-brickpink"
                for="radio_1"
              ><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_2"
                type="radio"
                name="radio_1"
              >거래추가<label
                class="border-brickpink"
                for="radio_2"
              ><span /></label>
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>

      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">채널명</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">채널ID</label>
          <input
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                TYPE-1
              </option>
              <option value="">
                TYPE-2
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
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
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">용도</label>
          <input
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">내용</label>
          <input
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">예상 일일 건수</label>
          <input
            type="text"
            value="700"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">예상 MAX TPS</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">요청일자</label>
          <div class="calander_group first_cal">
            <input
              type="text"
              value="2019-07-08"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">&nbsp;</label>
          <div class="calander_group">
            <input
              type="text"
              value="2019-08-07"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2 except-2">
        <div class="column w-1">
          <label class="column_label">서버 정보 추가</label>
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
        <div class="column w-3" />
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
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
              IP(NAT)<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              OS<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              고객사<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              방향<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
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
              송신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
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
              수신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
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
      <div class="row_contain type-2 except-2">
        <div class="column w-1">
          <label class="column_label">담당자 추가</label>
          <div class="search_group">
            <input
              type="text"
              value="유영준"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-3" />
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              OPS ID<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              담당자명<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              부서<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              고객사<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              이메일<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              연락처<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              role<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
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
              채널
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
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
              송신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
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
              매니저
            </li>
          </ul>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              채널명<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              채널ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              채널유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              연동방식<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              요청일자<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              채널 담당자<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              신청자<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
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
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
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
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
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
  name: 'RegStep2ApplyChMCG',
};
</script>
