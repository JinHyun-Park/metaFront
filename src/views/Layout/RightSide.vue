<template>
  <aside
    v-scroll="onScroll"
    class="move_form"
    :style="{top: topY + 'px'}"
  >
    <div class="move_contn">
      <section
        class="form_area"
      >
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
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      topY: 150,
    };
  },
  created() {
    window.addEventListener('scroll', this.onScroll); // onScroll 리스너 등록
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll); // onScroll 해제
  },
  methods: {
    onScroll() {
      this.topY = window.scrollY + 100;
    },
  },
};
</script>
