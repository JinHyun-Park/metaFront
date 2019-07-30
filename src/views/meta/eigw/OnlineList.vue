<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보(실시간)
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
            추가
          </button>
          <button
            type="button"
            class="default_button on"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain except">
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
          <label class="column_label">프로그램/설정파일</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">PORT</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>

      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              EIGW구분<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              I/F ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              프로그램/설정파일<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              대외기관<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              IP/PORT<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              담당자정보<i class="ico-sort-up" />
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
          </ul>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        서버 &amp; 접속정보
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">I/F ID &amp; 명</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">대외기관</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">EIGW구분</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">프로그램명</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정파일명</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로그램유형</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">세션수</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">소켓타임아웃</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정유형</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
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
          <label class="column_label">MQ 타임아웃</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-4" />
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
        <ul class="table_row w-auto except">
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
        <ul class="table_row w-auto except">
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

    <section class="form_area border_group">
      <h5 class="s_tit">
        비고
      </h5>
      <div class="row_contain">
        <div class="column w-6">
          <textarea
            cols="50"
            rows="5"
            placeholder="비고란 입니다."
          />
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

<script>
</script>
