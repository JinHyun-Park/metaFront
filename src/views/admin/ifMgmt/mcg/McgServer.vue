<template>
  <div class="right_space">
    <ChnlListPopup
      v-if="chnlpopupstate"
      @closePop="turOffPopChnl"
      @addData="addDataChnl"
    />
    <ChrgrListPopup
      v-if="chrgrpopupstate"
      @closePop="turOffPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 서버 조회
        </div>
        <div class="breadcrumb">
          <span>MCG</span><em class="on">서버</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        MCG 서버 목록
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
          <label class="column_label">업무코드</label>
          <input
            v-model="opCd"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">거래코드</label>
          <input
            v-model="dealCd"
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
                업무코드<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                거래코드<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                서버유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                Port<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP유형<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                담당자<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                수정
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell">
                <input
                  v-model="opCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="dealCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrPort"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="ipTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="hanNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="save()"
                />
              </li>
            </ul>
            <ul
              v-for="msvr in svrList"
              :key="msvr.index"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="msvr.opCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.dealCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.svrTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.svrIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.svrPort"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.ipTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="msvr.hanNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="modify(msvr)"
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
  fetchGetMcgSvrList,
  fetchPostMcgSvrList,
  fetchPutMcgSvrList,
} from '@/api/mcgApi';
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';


export default {
  components: {
    ChnlListPopup,
    ChrgrListPopup,
  },
  data() {
    return {
      index: 0,
      svrList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      opCd: '',
      dealCd: '',
      svrTyp: '',
      svrIp: '',
      svrPort: '',
      ipTyp: '',
      hanNm: '',
      chrgrId: '',
      chnlpopupstate: false,
      chrgrpopupstate: false,
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
      console.log('서버 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgSvrList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          opCd: this.opCd,
          dealCd: this.dealCd,
          svrTyp: this.svrTyp,
          svrIp: this.svrIp,
          svrPort: this.svrPort,
          ipTyp: this.ipTyp,
          hanNm: this.hanNm,
          chrgrId: this.chrgrId,
        },
      })

        .then((res) => {
          this.svrList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(res.data.rstData.searchList);
          console.log(this.svrList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    chnlpopon() {
      this.chnlpopupstate = true;
    },
    chrgrpopon() {
      this.chrgrpopupstate = true;
    },

    turOffPopChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chnlpopupstate = false;
    },
    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
    },

    addDataChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chnlpopupstate = false;
      this.chnlIdin = val.chnlId;
      this.chnlNmin = val.chnlNm;

      console.log();
    },

    save() {
      console.log('서버 정보 등록!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgSvrList({
        opCd: this.opCd,
        dealCd: this.dealCd,
        svrTyp: this.svrTyp,
        svrIp: this.svrIp,
        svrPort: this.svrPort,
        ipTyp: this.ipTyp,
        hanNm: this.hanNm,
        chrgrId: this.chrgrId,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('서버 추가 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    modify(msvr) {
      console.log('서버 정보 수정!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPostMcgSvrList(msvr)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('서버 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
