<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />{{ boardNum }}번 FAQ
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
          <span class="view_text">
            <input
              v-model="title"
              type="text"
              readonly
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">공지사항 유형</label>
          <span class="view_text">
            <input
              v-model="boardTyp"
              type="text"
              readonly
            >
          </span>
        </div>
        <div class="column w-2">
          <label class="column_label">상태코드</label>
          <span class="view_text">
            <input
              v-model="boardStName"
              type="text"
              readonly
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">내용</label>
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            :disabled="true"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">작성자</label>
          <span class="view_text">
            <input
              v-model="creId"
              type="text"
              readonly
            >
          </span>
        </div>
        <div class="column w-2">
          <label class="column_label">작성시간</label>
          <span class="view_text">
            <input
              v-model="creDt"
              type="text"
              readonly
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">최근 수정자</label>
          <span class="view_text">
            <input
              v-model="chgId"
              type="text"
              readonly
            >
          </span>
        </div>
        <div class="column w-2">
          <label class="column_label">최근 수정시간</label>
          <span class="view_text">
            <input
              v-model="chgDt"
              type="text"
              readonly
            >
          </span>
        </div>
      </div>
      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="moveToFaqMain()"
        >
          목록
        </button>
        <button
          v-if="(`${auth}` == 'ADMIN')"
          type="button"
          class="default_button"
          @click="moveToFaqWrite(boardNum)"
        >
          수정
        </button>
        <button
          v-if="(`${auth}` == 'ADMIN')"
          type="button"
          class="default_button on"
          @click="deleteBoard(boardNum)"
        >
          삭제
        </button>
      </section>
    </section>
  </div>
</template>

<script>
import { fetchGetBoard, fetchDeleteBoard } from '@/api/bizCommApi';
import { fetchGetUserAuth } from '@/api/loginApi';

export default {
  data() {
    return {
      editorOption: {
        // some quill options
        modules: {
          toolbar: false,
        },
      },
      boardNum: '',
      boardTyp: '',
      boardSt: '',
      title: '',
      content: '',
      creId: '',
      chgId: '',
      creDt: '',
      chgDt: '',
      boardStName: '',
      auth: '',
    };
  },
  computed: {
    editor() {
      return this.$refs.myQillEditor;
    },
  },
  created() {
    this.boardNum = this.$route.params.boardNum;
    this.searchBoard();
    this.getUserAuth();
  },
  methods: {
    moveToFaqMain() {
      this.$router.push({ name: 'faq' });
    },
    moveToFaqWrite(boardNum) {
      this.$router.push({ name: 'faqWrite', params: { boardNum } });
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
    // eslint-disable-next-line consistent-return
    setBoardStName() {
      // eslint-disable-next-line default-case
      switch (this.boardSt) {
        case '0': return '유효';
        case '1': return '기간만료';
        case '2': return '완료';
        case '9': return '삭제';
        default: return '에러';
      }
    },
    searchBoard() {
      fetchGetBoard({
        params: { boardNum: this.boardNum },
      })
        .then((res) => {
          if (res.data.rstCd === 'S') {
            const { boardOne } = res.data.rstData;
            this.boardTyp = boardOne.BOARD_TYP;
            this.boardSt = boardOne.BOARD_ST;
            this.boardStName = this.setBoardStName();
            this.title = boardOne.TITLE;
            this.content = boardOne.CONTENT;
            this.creId = boardOne.CRE_ID;
            this.creDt = boardOne.formatCreDt;
            this.chgId = boardOne.CHG_ID;
            this.chgDt = boardOne.formatChgDt;
          } else {
            // eslint-disable-next-line no-alert
            // alert('select board failed');
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
            this.moveToFaqMain();
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
          this.auth = res.data.rstData.auth.replace(/[[\]]/gi, '');
        }
      })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
