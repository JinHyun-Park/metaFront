<template>
  <aside class="move_form">
    <section class="form_area">
      <h5 class="s_tit">
        기본 설정
      </h5>
      <div class="row_contain type-2">
        <div class="column w-6">
          <label class="column_label">인터페이스 ID</label>
          <input
            type="text"
            value="myidisyoungjunyu"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-6">
          <label class="column_label">인터페이스명</label>
          <input
            type="text"
            value="Interface12"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-6">
          <label class="column_label">유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                MQ
              </option>
              <option value="">
                FILE
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-6">
          <label class="column_label">HUB</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                1
              </option>
              <option value="">
                2
              </option>
              <option value="">
                3
              </option>
              <option value="">
                4
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<style>
.move_form{
position:fixed;
/* width:175px; */
/* display:inline-block; */
 right:0px; /*창에서 오른쪽 길이*/
 top:34%; /* 창에서 위에서 부터의 높이 */
 /* background-color: transparent; margin:0; */
 }
</style>
