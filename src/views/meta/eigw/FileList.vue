<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보
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
            class="default_button"
          >
            신규신청
          </button>
          <button
            type="button"
            class="default_button on"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">I/F ID(명)</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">파일명</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
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
          <label class="column_label">IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1" />
      </div>

      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              파일명<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              대외기관<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              I/F ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              송수신<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              전송방식<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              IP/PORT<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              변경자(ID)<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
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

    <section class="form_area border_group">
      <h5 class="s_tit">
        상세정보
      </h5>
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
          <label class="column_label">파일명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
          <input
            type="text"
            value="송신"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">파일설명</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용유무</label>
          <input
            type="text"
            value="Y/N"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        SKT_EIGW 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID &amp; 명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">프로세스ID</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">실행프로그램</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">OPCODE</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            type="text"
            value=""
          >
        </div>

        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">재시도건수</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">재시도주기</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">분류제목</label>
          <input
            type="text"
            value="ORD"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        EIGW_EIGW 정보
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">프로세스ID</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실행프로그램</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">분류제목</label>
          <input
            type="text"
            value="MOVIS"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        EIGW_AGENCY 정보
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">실행프로그램</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로세스ID</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">AP유형</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">User ID</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Password</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">분류제목</label>
          <input
            type="text"
            value="ORD"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">NAT IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Port</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            type="text"
            value=""
          >
        </div>

        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">재시도건수</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">재시도주기</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2" />
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        TCP정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">전송방식</label>
          <div class="radio_group">
            <span class="default_radio">
              <input
                id="radio_4"
                type="radio"
                name="radio_1"
              >(S)FTP<label for="radio_4"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_5"
                type="radio"
                name="radio_1"
              >TCP<label for="radio_5"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_6"
                type="radio"
                name="radio_1"
              >기타<label for="radio_6"><span /></label>
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">프로그램명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정파일명</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">내부파일명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">외부파일명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">전송주기</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">전송시간</label>
          <input
            type="text"
            value="ORD"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">개발 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
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
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">운영 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
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
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        기타정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">전송방식</label>
          <div class="radio_group">
            <span class="default_radio">
              <input
                id="radio_7"
                type="radio"
                name="radio_1"
              >(S)FTP<label for="radio_7"><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_8"
                type="radio"
                name="radio_1"
              >TCP<label for="radio_8"><span /></label>
            </span>
            <span class="default_radio on">
              <input
                id="radio_9"
                type="radio"
                name="radio_1"
              >기타<label for="radio_9"><span /></label>
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">프로그램명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정파일명</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">내부파일명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">외부파일명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">전송주기</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">전송시간</label>
          <input
            type="text"
            value="ORD"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">개발 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
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
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">운영 REAL IP</label>
          <input
            type="text"
            value="OPGROUP"
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
    </section>

    <section class="table_grid border_group">
      <div class="table_head w-auto except">
        <h5 class="s_tit">
          담당자 정보
        </h5>
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
            <i class="ico-edit" /><i class="ico-del" />
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
            <i class="ico-edit" /><i class="ico-del" />
          </li>
        </ul>
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
