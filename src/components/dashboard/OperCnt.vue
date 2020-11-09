<template>
  <section class="form_area border_group dashboard">
    <div>
      <h5 class="s_tit type-2">
        담당 인터페이스 수
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div>
        <img
          src="@/assets/images/ico-pencil.png"
          width="100"
        >
      &nbsp;
      &nbsp;
      &nbsp;
      </div>
      <div
        class="meta_cnt"
        @click="movePage()"
      >
        {{ allMetaCnt }} 개
      </div>

      &nbsp;
    </div>
  </section>
</template>

<script>
// import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import { fetchGetAllMetaCnt } from '@/api/bizCommApi';

export default {
  name: 'QueueTransStat',
  components: {
  },
  data() {
    return {
      allMetaCnt: 0,
    };
  },
  mounted() {
    this.searchAllMetaCnt();
  },
  methods: {
    searchAllMetaCnt() {
      fetchGetAllMetaCnt()
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.allMetaCnt = res.data.rstData.allMetaCnt;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    movePage() {
      this.$router.push({
        name: 'allList',
        params: {
          srchType: 'IN_MY',
        },
      });
    },
  },
};
</script>

<style scoped>
.meta_cnt {
  font-size:50px;
  margin-top:25px;
}
</style>
