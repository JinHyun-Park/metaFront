<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />공지사항
        </div>
        <div class="breadcrumb">
          <span>커뮤니티</span><em class="on">공지사항</em>
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
            @click="searchList()"
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
              min="2019-6-1"
              :max="endReqDtm"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
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
            <datepicker
              :value="endReqDtm"
              :min="startReqDtm"
              max="2022-01-01"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="log2"
            />
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
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                Num
              </li>
              <li class="th_cell">
                제목
              </li>
              <li class="th_cell">
                게시상태
              </li>
              <li class="th_cell">
                작성자
              </li>
              <li class="th_cell">
                작성일자
              </li>
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="board in boardList"
              :key="board.BOARD_NUM"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ board.BOARD_NUM }}
              </li>
              <li
                class="td_cell"
                @click="moveToView(board.BOARD_NUM)"
              >
                {{ board.TITLE }}
              </li>
              <li class="td_cell">
                {{ setBoardStName(board.BOARD_ST) }}
              </li>
              <li class="td_cell">
                {{ board.CHG_ID }}
              </li>
              <li class="td_cell">
                {{ board.formatChgDt }}
              </li>
              <li class="td_cell">
                <i
                  v-if="(`${auth}` == 'ADMIN')"
                  class="ico-edit"
                  @click="moveToWrite(board.BOARD_NUM)"
                />
                <i
                  v-if="(`${auth}` == 'ADMIN')"
                  class="ico-del"
                  @click="deleteBoard(board.BOARD_NUM)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pagination_space">
        <paginate
          v-model="pageSet.pageNo"
          :page-count="pageSet.pageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="searchList"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>

    <section class="btm_button_area">
      <button
        v-if="(`${auth}` == 'ADMIN')"
        type="button"
        class="default_button on"
        @click="moveToCreate()"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
import { fetchGetBoardList, fetchDeleteBoard } from '@/api/bizCommApi';
import { fetchGetUserAuth } from '@/api/loginApi';

export default {
  name: 'NoticeMain',
  data() {
    return {
      startReqDtm: '',
      endReqDtm: '',
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      boardList: [],
      auth: '',
    };
  },
  mounted() {
    // 3달 전 보기
    this.startReqDtm = this.$gf.dateToString(new Date(), '-3m', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
    this.searchList();
    this.getUserAuth();
  },
  methods: {
    moveToView(boardNum) {
      this.$router.push({ name: 'noticeView', params: { boardNum } });
    },
    moveToWrite(boardNum) {
      this.$router.push({ name: 'noticeWrite', params: { boardNum } });
    },
    moveToCreate() {
      this.$router.push({ name: 'noticeCreate' });
    },
    log(val) {
      this.startReqDtm = val;
    },
    log2(val) {
      this.endReqDtm = val;
    },
    // eslint-disable-next-line consistent-return
    setBoardStName(boardState) {
      // eslint-disable-next-line default-case
      switch (boardState) {
        case '0': return '유효(0)';
        case '1': return '기간만료(1)';
        case '2': return '완료(2)';
        case '9': return '삭제(9)';
      }
    },
    searchList() {
      // this.tgtUrl = '/api/bizcomm/board';
      // this.$axios.get(this.tgtUrl, {
      fetchGetBoardList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          size: this.pageSet.size,
          boardSt: '', // 0:정상
          boardTyp: 'NOTI',
          title: '',
          content: '',
          boardNum: '',
          // eslint-disable-next-line no-useless-escape
          startReqDtm: this.startReqDtm.replace(/\-/g, ''),
          // eslint-disable-next-line no-useless-escape
          endReqDtm: this.endReqDtm.replace(/\-/g, ''),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            // this.boardList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.board, 'Y')
            this.boardList = res.data.rstData.board;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    deleteBoard(boardNum) {
      fetchDeleteBoard({
        params: {
          boardNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('삭제되었습니다.');
            this.searchList();
          } else {
            this.$gf.alertOn(res.data.rstMsg);
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    getUserAuth() {
      fetchGetUserAuth({

      }).then((res) => {
        console.log(res);
        if (res.data.rstCd === 'S') {
          // 대괄호 제거
          this.auth = res.data.rstData.auth.replace(/[\[\]]/gi, '');
          console.log(this.auth);
        }
      })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
