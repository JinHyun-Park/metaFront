<template>
  <section class="form_area border_group dashboard">
    <div
      class="table_colgroup dashgroup"
    >
      <div>
        <div>
          <img
            src="@/assets/images/ico-warning.png"
            width="100"
          >
        </div>
        <div class="dash_cont">
          2 건
        </div>
        <div class="dash_cont2">
          관련 공지사항 수
        </div>
      </div>

      <div class="verticalLine" />

      <div>
        <img
          src="@/assets/images/ico-pencil.png"
          width="100"
        >
        <div class="dash_cont">
          3 건
        </div>
        <div class="dash_cont2">
          담당 인터페이스 수
        </div>
      </div>

      <div class="verticalLine" />

      <div>
        <div>
          <img
            src="@/assets/images/ico-warning.png"
            width="100"
          >
        </div>
        <div class="dash_cont">
          2 건
        </div>
        <div class="dash_cont2">
          담당 인터페이스 수
        </div>
      </div>

      <div class="verticalLine" />

      <div>
        <img
          src="@/assets/images/ico-pencil.png"
          width="100"
        >
        <div class="dash_cont">
          3 건
        </div>
        <div class="dash_cont2">
          담당 인터페이스 수
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NumberCount',
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
.dashgroup {
  display: flex;
  text-align: center;
}
.dash_cont {
  font-size:50px;
  font-weight: bold;
  margin-top: 25px;
}
.dash_cont2 {
  font-size:25px;
  color:darkgrey;
  margin-top: 15px;
}
</style>
