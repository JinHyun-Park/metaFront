<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />가상 사용자 등록
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <!--
                        <div class="right_button_area">
                            <button type="button" class="default_button on">등록</button>
                        </div>
-->
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-2">
          <label class="column_label">상위조직</label>
          <input
            type="text"
            value="QMGR"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널명</label>
          <input
            type="text"
            value="ABC.IF_ID_MFF"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">소속팀명</label>
          <input
            type="text"
            value="ABC."
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">담당자</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널ID</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2" />
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
      >
        수정
      </button>
      <button
        type="button"
        class="default_button"
      >
        추가
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
