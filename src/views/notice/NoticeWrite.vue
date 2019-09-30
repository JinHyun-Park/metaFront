<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />공지사항 등록
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
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
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">작성자</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">이메일</label>
          <input
            type="text"
            value="@sk.com"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">비밀번호</label>
          <input
            type="password"
            value=""
          >
        </div>
      </div>
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
        type="button"
        class="default_button"
        @click="moveToNotiMain()"
      >
        취소
      </button>
      <button
        type="button"
        class="default_button on"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NoticeWrite',
  data() {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    moveToNotiMain() {
      this.$router.push({ name: 'noticeMain' });
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
  },
};
</script>
