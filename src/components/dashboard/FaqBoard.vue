<template>
  <section class="form_area border_group dashboard">
    <h5 class="s_tit type-2">
      FAQ
      <i class="ico-set" />
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
      this.$router.push({ name: 'faqView', params: { boardNum } });
    },
    setBoardStName(boardState) {
      switch (boardState) {
        case '0': return '유효';
        case '1': return '기간만료';
        case '2': return '완료';
        case '9': return '삭제';
        default: return ' ';
      }
    },
    searchList() {
      fetchGetBoardList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          size: this.pageSet.size,
          boardSt: '', // 0:정상
          boardTyp: 'FAQ',
          title: '',
          content: '',
          boardNum: '',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
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
