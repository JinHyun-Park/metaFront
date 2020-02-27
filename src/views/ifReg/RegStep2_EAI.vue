<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EAI 업무 요청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <!--
                <section class="small_tabs">
                    <ul>
                        <li class="ov">온라인</li>
                        <li>파일</li>
                    </ul>
                </section>
-->

    <section class="border_group border-none">
      <h5 class="s_tit type-2">
        신청목록
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                방식<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                인터페이스명(영문)<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                인터페이스명(한글)<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                방향<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                비동기<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
&nbsp;
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell">
                MQ
              </li>
              <li class="td_cell">
                SEND1P
              </li>
              <li class="td_cell">
                서비스 연동
              </li>
              <li class="td_cell">
                단방향
              </li>
              <li class="td_cell">
                Y
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
            <div class="fold_colgroup">
              <ul class="table_row colspan w-auto">
                <li class="td_cell">
                  <label class="label-default">운영</label>
                </li>
                <li class="td_cell">
                  송신 <a
                    href="#n"
                    title=""
                    class="on"
                  >HostP1</a> <a
                    href="#n"
                    title=""
                  >HostP2</a> <a
                    href="#n"
                    title=""
                  >HostP3</a>
                </li>
                <li class="td_cell">
                  상세 내용
                </li>
                <li class="td_cell">
                  수신 <a
                    href="#n"
                    title=""
                  >Host-PA</a>
                </li>
                <li class="td_cell" />
                <li class="td_cell" />
              </ul>
              <ul class="table_row colspan w-auto">
                <li class="td_cell">
                  <label class="label-default color-green">개발</label>
                </li>
                <li class="td_cell">
                  송신 <a
                    href="#n"
                    title=""
                  >HostD1</a> <a
                    href="#n"
                    title=""
                  >HostD2</a>
                </li>
                <li class="td_cell">
                  상세 내용
                </li>
                <li class="td_cell">
                  수신 <a
                    href="#n"
                    title=""
                    class="on"
                  >Host-DA</a>
                </li>
                <li class="td_cell" />
                <li class="td_cell" />
              </ul>
            </div>
            <ul class="table_row w-auto">
              <li class="td_cell">
                MQ
              </li>
              <li class="td_cell">
                SMS_RSLT
              </li>
              <li class="td_cell">
                SMS 결과
              </li>
              <li class="td_cell">
                단방향
              </li>
              <li class="td_cell">
                Y
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
            <ul class="table_row w-auto">
              <li class="td_cell">
                FILE
              </li>
              <li class="td_cell">
                WEEK_DATA
              </li>
              <li class="td_cell">
                주간 데이터
              </li>
              <li class="td_cell">
                단방향
              </li>
              <li class="td_cell">
                Y
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button extend on"
          >
            인터페이스 추가
          </button>
        </div>
      </h5>
      <div class="row_contain">
        <div class="column on w-3">
          <label class="column_label">인터페이스명</label>
          <input
            type="text"
            value="인터페이스명인터페이스명인터페이스명"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">유형</label>
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
          <label class="column_label">연동방식</label>
          <div class="select_group disabled">
            <select disabled>
              <option value="">
                동기
              </option>
              <option
                value=""
                selected
              >
                비동기
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
          <label class="column_label">수신전문처리</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                실시간/배치
              </option>
              <option value="">
                실시간
              </option>
              <option value="">
                배치
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">수신 프로그램</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-3" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일 전송 유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                file_put
              </option>
              <option value="">
                file_get
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">송신 디렉토리</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">수신 디렉토리</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
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
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">수신 호출 쉘</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OP code</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-3" />
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">장애 시 영향도(상세)</label>
          <textarea
            cols="50"
            row="5"
            placeholder="이러한 영향도 입니다."
          />
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        시스템 정보
        <section class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            삭제
          </button>
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
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시스템명</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                운영
              </option>
              <option value="">
                개발
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">SWING</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SWING
              </option>
              <option value="">
                Non-SWING
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">구분</label>
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
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                OS
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column on w-3">
          <label class="column_label">시스템명</label>
          <input
            type="text"
            value="시스템명시스템명시스템명"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">MID</label>
          <div class="search_group">
            <input
              type="text"
              value="MID"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">운영 담당</label>
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
        <div class="column w-1">
          <label class="column_label">담당 매니저</label>
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
          <label class="column_label">회사</label>
          <div class="select_group disabled">
            <select disabled>
              <option
                value=""
                selected
              >
                SK Telesys
              </option>
              <option value="">
                SK C&amp;C
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">호스트명</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(RIP)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(VIP)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(NAT)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
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
  name: 'RegStep2EAI',
};
</script>
