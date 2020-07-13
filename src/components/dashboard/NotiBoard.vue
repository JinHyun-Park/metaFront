<template>
  <section class="form_area border_group dashboard">
    <h5 class="s_tit type-2">
      공지사항
      <i class="ico-set" />
      <!--
                            <div class="right_button_area">
                                <button type="button" class="default_button on">검색</button>
                            </div>
    -->
    </h5>
    <div class="table_colgroup">
      <div class="table_grid radio_group">
        <div class="table_head w-auto">
          <tr>
            <td class="th_cell">
              Num
            </td>
            <td class="th_cell">
              제목
            </td>
            <td class="th_cell">
              게시상태
            </td>
            <td class="th_cell">
              작성자
            </td>
            <td class="th_cell">
              작성일자
            </td>
          </tr>
        </div>
        <div class="table_body">
          <tr
            v-for="board in boardList"
            :key="board.BOARD_NUM"
            class="table_row w-auto"
          >
            <td class="td_cell">
              {{ board.BOARD_NUM }}
            </td>
            <td
              class="td_cell"
              @click="moveToView(board.BOARD_NUM)"
            >
              {{ board.TITLE }}
            </td>
            <td class="td_cell">
              {{ setBoardStName(board.BOARD_ST) }}
            </td>
            <td class="td_cell">
              {{ board.CHG_ID }}
            </td>
            <td class="td_cell">
              {{ board.formatChgDt }}
            </td>
          </tr>
        </div>

        <!--
              <div class="table_head w-auto">
                <ul>
                  <li class="th_cell" />
                  <li class="th_cell">
                    제목
                  </li>

                  <li class="th_cell" />
                </ul>
              </div>

              <div class="table_body">
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio on">
                      <input
                        id="chk_1"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_1"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">HERE IS SUBJECT TITLE</em>
                    2 documents2 documents22 documents2 docume
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_2"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_2"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are</em>
                    q sign
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_3"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_3"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Channel To Channel</em>
                    Ch to Ch
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_4"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_4"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are Couple Of Days</em>
                    2 documents2 documents2
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_5"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_5"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are</em>
                    q sign
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_6"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_6"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Channels are Variety Things</em>
                    Ch to Ch
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
              </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { fetchGetBoardList } from '@/api/bizCommApi';

export default {
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      boardList: [],
    };
  },
  mounted() {
    this.searchList();
  },
  methods: {
    moveToView(boardNum) {
      this.$router.push({ name: 'noticeView', params: { boardNum } });
    },
    setBoardStName(boardState) {
      switch (boardState) {
        case '0': return '유효(0)';
        case '1': return '기간만료(1)';
        case '2': return '완료(2)';
        case '9': return '삭제(9)';
        default: return ' ';
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
            // alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
