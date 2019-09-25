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
    <section class="form_area border_group style-3">
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
              type="text"
              value="메타프론트에 문의합니다."
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">작성자</label>
          <span class="view_text">
            <input
              type="text"
              value="유영준"
            >
          </span>
        </div>
        <div class="column w-2">
          <label class="column_label">이메일</label>
          <span class="view_text">
            <input
              type="text"
              value="iamakira@sk.com"
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">비밀번호</label>
          <span class="view_text"><input
            type="password"
            value="iamakira"
          ></span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">내용</label>
          <span class="view_text">
            <textarea
              cols="5"
              row="10"
              placeholder=""
            >내용을 이렇습니다.내용을 이렇습니다.내용을 이렇습니다.내용을 이렇습니다.내용을 이렇습니다.내용을 이렇습니다.
내용
내용
내용
내용
내용
내용
내용</textarea>
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">TAG</label>
          <span class="view_text">
            <input
              type="text"
              value="#tag1, #tag2, #tag3, #tag4, #tag5 "
            >
          </span>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">파일</label>
          <span class="view_text">
            <div class="search_group">
              <input
                type="text"
                value="abc.doc, abc.hwp, abc.xlsx, abc.pptx, abc.jpg, abc.png, abc.gif"
              >
              <!--<span class="search"><i class="ico-search"></i></span>-->
            </div>
          </span>
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
      >
        목록
      </button>
      <button
        type="button"
        class="default_button"
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
  name: 'NoticeView',
};
</script>
