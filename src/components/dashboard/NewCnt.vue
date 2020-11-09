<template>
  <section class="form_area border_group dashboard">
    <div>
      <h5 class="s_tit type-2">
        관련 공지사항 수
      </h5>
    </div>
    <div
      class="table_colgroup"
      style="display: flex; justify-content:space-between; align-content:center;"
    >
      <div>
        <img
          src="@/assets/images/ico-warning.png"
          width="100"
        >
      &nbsp;
      &nbsp;
      &nbsp;
      </div>
      <div
        class="noti_cnt"
      >
        {{ notiCnt }} 건
      </div>

      &nbsp;
    </div>
  </section>
</template>

<script>
// import ReactiveBarChart from '@/views/chart/ReactiveBarChart.vue';
import { fetchGetBoardNotiCnt } from '@/api/bizCommApi';

export default {
  name: 'QueueTransStat',
  components: {
  },
  data() {
    return {
      notiCnt: 0,

    };
  },
  mounted() {
    this.searchNotiCnt();
  },
  methods: {
    searchNotiCnt() {
      fetchGetBoardNotiCnt()
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.notiCnt = res.data.rstData.boardCnt;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>

<style scoped>
.noti_cnt{
  font-size:50px;
  margin-top:25px;
}
</style>
