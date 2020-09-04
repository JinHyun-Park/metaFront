<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div v-if="boardNum">
          <i class="ico-bar" /> 공지사항 수정
        </div>
        <div v-else>
          <i class="ico-bar" /> 공지사항 등록
        </div>
        <div class="breadcrumb">
          <span>게시판</span><em class="on">공지사항</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group style-2">
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">제목</label>
          <input
            v-model="title"
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">게시판 유형</label>
          <div class="select_group">
            <select v-model="boardTyp">
              <option
                v-for="boardTypOption in boardTypOptions"
                :key="boardTypOption.id"
              >
                {{ boardTypOption.value }}
              </option>
            </select>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">게시글 상태코드</label>
          <div class="select_group">
            <select v-model="boardSt">
              <option
                v-for="boardStOption in boardStOptions"
                :key="boardStOption.id"
                :value="boardStOption.value"
                :selected="(boardStOption.value === `${boardSt}`)"
              >
                {{ boardStOption.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="row_contain type-2">
        <div class="column w-4">
          <div v-if="!boardNum">
            <label class="column_label">관련 인터페이스</label>
            <label>
              <input
                v-model="boardIF"
                type="checkbox"
                name="interface"
                value="EAI"
              > EAI
            </label>
            <label>
              <input
                v-model="boardIF"
                type="checkbox"
                name="interface"
                value="EiGW"
              > EiGW
            </label>
            <label>
              <input
                v-model="boardIF"
                type="checkbox"
                name="interface"
                value="MCG"
              > MCG
            </label>
          </div>
        </div>
      </div>

      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">내용</label>
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
        @click="moveToNotiMain()"
      >
        목록
      </button>
      <button
        v-if="boardNum"
        type="button"
        class="default_button"
        @click="moveToBack()"
      >
        취소
      </button>

      <button
        v-if="boardNum"
        type="button"
        class="default_button on"
        @click="editBoard()"
      >
        수정
      </button>
      <button
        v-else
        type="button"
        class="default_button on"
        @click="addBoard(boardNum)"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
import { fetchGetBoard, fetchPostBoard, fetchPutBoard } from '@/api/bizCommApi';

export default {
  data() {
    return {
      editorOption: {
        // some quill options
      },
      boardNum: '',
      boardTyp: '',
      boardSt: '',
      title: '',
      content: '',
      creId: '',
      chgId: '',
      boardIF: [],
      boardCtyp1: '',
      boardCtyp2: '',
      boardCtyp3: '',
      boardTypOptions: [
        {
          id: 'noti',
          value: 'NOTI',
        },
        {
          id: 'faq',
          value: 'FAQ',
        },
      ],
      boardStOptions: [
        {
          id: '0',
          name: '유효(0)',
          value: '0',
        },
        {
          id: '1',
          name: '기간만료(1)',
          value: '1',
        },
        {
          id: '2',
          name: '완료(2)',
          value: '2',
        },
        {
          id: '9',
          name: '삭제(9)',
          value: '9',
        },
      ],
      preRoute: null,
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created() {
    if (this.$route.params.boardNum) {
      this.boardNum = this.$route.params.boardNum;
      this.searchBoard();
    } else { // 등록하는 경우 boardType 'NOTI', boardSt '0'으로 초기화
      this.boardTyp = 'NOTI';
      this.boardSt = '0';
    }
  },
  // 취소버튼을 위한 이전주소로 가기
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.preRoute = from;
    });
  },
  methods: {
    moveToNotiMain() {
      this.$router.push({ name: 'notice' });
    },
    moveToFaqView(boardNum) {
      this.$router.push({ name: 'noticeView', params: { boardNum } });
    },
    moveToBack() {
      this.$router.push({ path: this.preRoute.path, params: this.preRoute.params });
    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
    },

    searchBoard() {
      fetchGetBoard({
        params: { boardNum: this.boardNum },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            const { boardOne } = res.data.rstData;
            this.boardTyp = boardOne.BOARD_TYP;
            this.boardSt = boardOne.BOARD_ST;
            this.title = boardOne.TITLE;
            this.content = boardOne.CONTENT;
          } else {
            // eslint-disable-next-line no-alert
            // alert('select board failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    addBoard() {
      fetchPostBoard({
        boardTyp: this.boardTyp,
        boardSt: this.boardSt,
        boardCtyp1: this.boardIF[0],
        boardCtyp2: this.boardIF[1],
        boardCtyp3: this.boardIF[2],
        title: this.title,
        content: this.content,
        chgId: '',
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            console.log('insert board Success');
          } else {
          // eslint-disable-next-line no-alert
            // alert('insert board failed');
          }
          this.moveToNotiMain();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    editBoard() {
      fetchPutBoard({
        boardNum: this.boardNum,
        boardTyp: this.boardTyp,
        boardSt: this.boardSt,
        title: this.title,
        content: this.content,
      })
        .then((res) => {
          console.log(res);
          console.log('Edit_board');
          if (res.data.rstCd === 'S') {
            console.log('update board Success');
          } else {
            // eslint-disable-next-line no-alert
            // alert('update board failed');
          }
          this.moveToFaqView(this.boardNum);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
