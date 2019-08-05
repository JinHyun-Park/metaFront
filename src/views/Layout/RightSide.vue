<template>
  <transition>
    <aside
      ref="movee"
      v-scroll="onScroll"
      class="move_form"
      :style="{top: topY+'px'}"
      @click="movee"
    >
      <!-- :style="{top: topY+'px'}" -->
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
    </aside>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      topY: 200 + window.scrollY,
    };
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll(e, position) {
      console.log(`${e} || ${position}`);
    },
    movee() {
      console.log(window.scrollY);
      // this.$refs.movee.top = '150px';
      this.topY = 300 + window.scrollY;
    },
  },
};
</script>
