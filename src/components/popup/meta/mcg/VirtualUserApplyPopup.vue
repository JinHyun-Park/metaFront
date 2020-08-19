<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      class="layer_popup medium"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />가상 사용자 등록</h2>
      </section>
      <section class="form_area border_group">
        <!-- <div class="table_colgroup">
          <div class="table_grid">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  채널ID
                </li>
                <li class="th_cell">
                  채널명
                </li>
                <li class="th_cell">
                  상위조직
                </li>
                <li class="th_cell">
                  소속팀명
                </li>
                <li class="th_cell">
                  담당자
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="vuser in vuserList"
                :key="vuser.index"
                class="table_row w-auto"
              >
                <li class="td_cell">
                  <input
                    v-model="vuser.chnlId"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="vuser.chnlNm"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="vuser.supOrg"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="vuser.postTeamNm"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="vuser.chrgrNm"
                    type="text"
                  >
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <h5 class="s_tit type-2">
          기본 정보
        </h5>
        <div class="row_contain type-2">
          <div class="column on w-2">
            <label class="column_label">채널ID</label>
            <div class="search_group">
              <input
                v-model="chnlId"
                type="text"
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">채널명</label>
            <input
              v-model="chnlNm"
              type="text"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">소속팀명</label>
            <input
              v-model="vTeam"
              type="text"
            >
          </div>
        </div>
        <div class="row_contain type-2">
          <div class="column w-2">
            <label class="column_label">담당자</label>
            <input
              v-model="vHanNm"
              type="text"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">상위조직</label>
            <input
              v-model="vOrg"
              type="text"
            >
          </div>
          <div class="column w-2" />
        </div>
      </section>

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
        <button
          type="button"
          class="default_button on"
          @click="save()"
        >
          등록
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchPutMcgReqVirtual,
  fetchGetMcgReqVirtual,
} from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';

export default {

  data() {
    return {
      chnlId: '',
      chnlNm: '',
      vTeam: '',
      vHanNm: '',
      vOrg: '',
      mcgReqNum: '',
      vuserList: {},
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  created() {
    eventBus.$on('Virtualdtl', (params) => {
      console.log(`event Bus 통해 MCG Chnl에서 조회 params: ${params.mcgReqNum}`);
      this.mcgReqNum = params.mcgReqNum;
      this.chnlId = params.chnlId;
      this.chnlNm = params.chnlNm;
    });
  },


  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),

    listing() {
      console.log('가상사용자 신청목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgReqVirtual({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          chnlId: this.chnlId,
          vUserId: this.vUserId,
          chnlCl: this.chnlCl,
          supOrg: this.supOrg,
          chnlNm: this.chnlNm,
          postTeamNm: this.postTeamNm,
        },
      })

        .then((res) => {
          this.vuserList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(res.data.rstData.searchList);
          console.log(this.vuserList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      console.log('가상사용자 정보 등록!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgReqVirtual({
        chnlId: this.chnlId,
        chnlNm: this.chnlNm,
        vTeam: this.vTeam,
        vHanNm: this.vHanNm,
        vOrg: this.vOrg,
        mcgReqNum: this.mcgReqNum,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('가상사용자 추가 완료!');
          this.$emit('closePop', 'OK, Hellos');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
  },
};
</script>
