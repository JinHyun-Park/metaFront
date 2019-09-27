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
    <!-- bidirectional data binding（双向数据绑定） -->
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />

    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'NoticeWrite',
  methods: {
    moveToNotiMain() {
      this.$router.push({ name: 'noticeMain' });
    },
  },
};
</script>
