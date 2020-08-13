<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div v-if="boardNum">
          <i class="ico-bar" /> FAQ 수정
        </div>
        <div v-else>
          <i class="ico-bar" /> FAQ 등록
        </div>
        <div class="breadcrumb">
          <span>게시판</span><em class="on">FAQ</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group style-2">
      <!--
                    <h5 class="s_tit type-2">글쓰기
                        <div class="right_button_area">
                            <button type="button" class="default_button on">취소</button>
                        </div>
                    </h5>
-->
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
      <!-- 한 줄 짜리 -->
      <!--
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">게시글 상태코드</label>
          <input
            v-model="boardSt"
            type="text"
            value=""
          >
        </div>
      </div>
      -->
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">내용</label>
          <!-- <textarea
            cols="5"
            row="10"
            placeholder="내용을 입력해 주세요."
          /> -->
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
      <!-- 태그, 파일
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">TAG</label>
          <input
            type="text"
            value="TAG를 입력해 주세요."
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">파일</label>
          <div class="search_group">
            <input
              type="text"
              value="파일을 선택해 주세요.(.doc, .hwp, .xlsx, .pptx, .jpg, .png, .gif)"
            >
            <span class="search"><i class="ico-search" /></span>
          </div>
        </div>
      </div>
      -->
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
        @click="moveToFaqMain()"
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
  name: 'FaqWrite',
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
    } else { // 등록하는 경우 boardType 'FAQ', boardSt '0'으로 초기화
      this.boardTyp = 'FAQ';
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
    moveToFaqMain() {
      this.$router.push({ name: 'faqMain' });
    },
    moveToFaqView(boardNum) {
      this.$router.push({ name: 'faqView', params: { boardNum } });
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
          console.log('Search_board');
          if (res.data.rstCd === 'S') {
            console.log('select board Success');
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
      console.log(this.boardSt);
      fetchPostBoard({
        boardTyp: this.boardTyp,
        boardSt: this.boardSt,
        title: this.title,
        content: this.content,
        chgId: '',
      })
        .then((res) => {
          console.log(res);
          console.log('Add_board');
          if (res.data.rstCd === 'S') {
            console.log('insert board Success');
          } else {
          // eslint-disable-next-line no-alert
            // alert('insert board failed');
          }
          this.moveToFaqMain();
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
