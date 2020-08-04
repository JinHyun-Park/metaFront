<template>
  <div class="right_space">
    <ChnlListPopup
      v-if="chnlpopupstate"
      @closePop="turOffPopChnl"
      @addData="addDataChnl"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />가상 사용자 등록
        </div>
        <div class="breadcrumb">
          <span>MCG</span><em class="on">가상사용자</em>
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
          <label class="column_label">채널ID</label>
          <div class="search_group">
            <input
              v-model="chnlIdin"
              type="text"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="chnlpopon()"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">채널명</label>
          <input
            v-model="chnlNmin"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">소속팀명</label>
          <input
            v-model="postTeamNmin"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">담당자</label>
          <input
            v-model="chrgrNmin"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">상위조직</label>
          <input
            v-model="supOrgin"
            type="text"
          >
        </div>
        <div class="column w-2" />
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
        @click="save()"
      >
        등록
      </button>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        가상사용자 목록
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="listing()"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column w-1">
          <label class="column_label">채널ID</label>
          <input
            v-model="chnlId"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널명</label>
          <input
            v-model="chnlNm"
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="table_colgroup">
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
              <li class="th_cell">
                USER_ID
              </li>
              <li class="th_cell">
                LOGIN_ID
              </li>
              <li class="th_cell">
                회사구분
              </li>
              <li class="th_cell">
                비고
              </li>
              <li class="th_cell">
                수정
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
              <li class="td_cell">
                <input
                  v-model="vuser.vUserId"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="vuser.loginId"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="vuser.coCl"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="vuser.vUserRmk"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="modify(vuser)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pagination_space">
        <paginate
          v-model="pageSet.pageNo"
          :page-count="pageSet.pageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="pageMove"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchGetMcgVirtualUserList,
  fetchPostMcgVirtualUserList,
  fetchPutVirtualUserList,
} from '@/api/mcgApi';
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';


export default {
  components: {
    ChnlListPopup,
  },
  data() {
    return {
      index: 0,
      vuserList: [],
      vuserdtl: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      chnlId: '',
      chnlIdin: '',
      vUserId: '',
      chnlCl: '',
      supOrg: '',
      supOrgin: '',
      chnlNm: '',
      postTeamNm: '',
      chnlNmin: '',
      postTeamNmin: '',
      loginId: '',
      chrgrNm: '',
      chrgrNmin: '',
      orgId: '',
      coCl: '',
      vUserRmk: '',
      vUserNum: '',
      isStatusOn: '',
      chnlpopupstate: false,
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.listing();
      this.pageMoveChk = 0;
    },
    listing() {
      console.log('가상사용자 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgVirtualUserList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          chnlId: this.chnlId,
          vUserId: this.vUserId,
          chnlCl: this.chnlCl,
          supOrg: this.supOrg,
          chnlNm: this.chnlNm,
          postTeamNm: this.postTeamNm,
          loginId: this.loginId,
          chrgrNm: this.chrgrNm,
          orgId: this.orgId,
          coCl: this.coCl,
          vUserRmk: this.vUserRmk,
          vUserNum: this.vUserNum,
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

    noshow() {
      this.isStatusOn = false;
      console.log(this.isStatusOn);
    },
    chnlpopon() {
      this.chnlpopupstate = true;
    },

    turOffPopChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chnlpopupstate = false;
    },

    addDataChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chnlpopupstate = false;
      this.chnlIdin = val.chnlId;
      this.chnlNmin = val.chnlNm;

      console.log();
    },

    checksave() {
      if (this.chnlIdin === '') {
        this.$gf.alertOn('채널ID를 입력 해주세요.');
        return 0;
      }
      if (this.chnlNmin === '') {
        this.$gf.alertOn('채널명을 입력 해주세요.');
        return 0;
      }
      if (this.postTeamNmin === '') {
        this.$gf.alertOn('소속팀명을 입력 해주세요.');
        return 0;
      }
      if (this.supOrgin === '') {
        this.$gf.alertOn('상위조직을 입력 해주세요.');
        return 0;
      }
      if (this.chrgrNmin === '') {
        this.$gf.alertOn('담당자명을 입력 해주세요.');
        return 0;
      }
      return 1;
    },

    save() {
      console.log('가상사용자 정보 등록!');
      if (this.checksave() === 0) {
        return;
      }
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutVirtualUserList({
        chnlId: this.chnlIdin,
        vUserId: `${this.chnlIdin}001`,
        chnlCl: this.chnlCl,
        supOrg: this.supOrgin,
        chnlNm: this.chnlNmin,
        postTeamNm: this.postTeamNmin,
        loginId: `VRTL${this.chnlIdin}001`,
        chrgrNm: this.chrgrNmin,
        orgId: this.orgId,
        coCl: this.coCl,
        vUserRmk: this.vUserRmk,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('가상사용자 추가 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    modify(vuser) {
      console.log('가상사용자 정보 수정!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPostMcgVirtualUserList(vuser)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('가상사용자 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
