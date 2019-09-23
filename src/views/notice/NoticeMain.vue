<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />공지사항
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
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column w-2">
          <label class="column_label">조회기간</label>
          <div class="calander_group first_cal">
            <input
              v-model="startReqDtm"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="startReqDtm"
              min="2018-6-1"
              max="2020-01-01"
              :day-str="dayStr"
              :scrollbar-props="{isMobile: isM}"
              :popper-props="popperProps"
              @input="log"
            />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">&nbsp;</label>
          <div class="calander_group">
            <input
              v-model="endReqDtm"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
        <div class="column w-4">
          <label class="column_label">검색어</label>
          <div class="search_group">
            <input
              type="text"
              value="Searching"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              업무코드<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              채널ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              등록일<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              신청자<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              1011
            </li>
            <li class="td_cell">
              2 documents2 documents2 documents2 documents2 documents2 documents2 documents
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Mywolrd
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1012
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Yourworld
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1013
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Tworld
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1011
            </li>
            <li class="td_cell">
              2 documents2 documents2 documents2 documents2 documents2 documents2 documents
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Mywolrd
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1012
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Yourworld
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1013
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Tworld
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1011
            </li>
            <li class="td_cell">
              2 documents2 documents2 documents2 documents2 documents2 documents2 documents
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Mywolrd
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1012
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Yourworld
            </li>
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              1013
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              2019-08-07
            </li>
            <li class="td_cell">
              Tworld
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
        @click="moveToWrite()"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NoticeMain',
  data() {
    return {
      startReqDtm: '',
      endReqDtm: '',

      dayStr: ['7', '1', '2', '3', '4', '5', '6'],
      date: '2018-06-01',
      isM: '',
      popperProps: {
        type: Object,
      },
    };
  },
  mounted() {
    this.startReqDtm = this.$gf.dateToString(new Date(), '-7d');
    this.endReqDtm = this.$gf.dateToString(new Date());
    this.date = this.$gf.dateToString(new Date());
  },
  methods: {
    moveToWrite() {
      this.$router.push({ name: 'noticeWrite' });
    },
    log(val) {
      this.startReqDtm = val;
      console.log(val);
    },
  },
};
</script>
