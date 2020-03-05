<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />신청 완료 (신청자용)
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="border_group border-none">
      <h5 class="s_tit">
        신청내역
      </h5>
    </section>

    <section class="info_title small">
      <em class="sub_tit">EIGW(온라인)</em>
      <i class="ico-remove" />
    </section>
    <section class="form_area border_group">
      <div class="row_contain odd type-1">
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <div class="search_group">
            <input
              type="text"
              value="0945OIK2S"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">송수신</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기간</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널유형</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">전송방식</label>
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
      </div>
      <div class="row_contain odd type-1">
        <div class="column on w-1">
          <label class="column_label">담당자1</label>
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
          <label class="column_label">담당자2</label>
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
          <label class="column_label">담당자3</label>
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
          <label class="column_label">개발 IP</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발 Port</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
      </div>
    </section>

    <section class="info_title small">
      <em class="sub_tit">MCG</em>
      <i class="ico-remove" />
    </section>
    <section class="form_area border_group">
      <div class="row_contain odd type-1">
        <div class="column on w-1">
          <label class="column_label">업무코드</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">기관코드</label>
          <input
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널그룹</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널유형</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
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
      </div>
      <div class="row_contain odd type-3">
        <div class="column on w-1">
          <label class="column_label">채널담당자1</label>
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
          <label class="column_label">채널담당자2</label>
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
          <label class="column_label">채널담당자3</label>
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
          <label class="column_label">적용서버</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발언어</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Java Container</label>
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
      </div>
    </section>

    <section class="table_grid border_group">
      <div class="table_head">
        <h5 class="s_tit">
          승인자 지정
        </h5>
        <ul>
          <li class="th_cell">
            Unit명
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
          <li class="th_cell">
            비고
          </li>
          <!--                            <li class="th_cell"></li>-->
        </ul>
      </div>
      <div class="table_body">
        <ul class="table_row form_type">
          <li class="td_cell on">
            <div class="search_group">
              <input
                type="text"
                value="MIS"
              >
              <span class="search">
                <i class="ico-search" />
              </span>
            </div>
          </li>
          <li class="td_cell">
            <input
              type="text"
              value="유영준"
            >
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
          <li class="td_cell" />
          <!--<li class="td_cell"><i class="ico-edit"></i><i class="ico-del"></i></li>-->
        </ul>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button btn_prev disabled"
        @click="beforeTab"
      >
        이전
      </button>
      <button
        type="button"
        class="default_button btn_next"
        @click="nextTab"
      >
        다음
      </button>
      <button
        type="button"
        class="default_button on"
      >
        완료
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RegStep3Applicant',
  methods: {
    beforeTab() {
      this.$emit('beforeTab');
    },
    nextTab() {
      this.$emit('nextTab');
    },
  },
};
</script>
