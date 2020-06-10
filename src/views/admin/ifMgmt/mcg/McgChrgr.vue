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
          <i class="ico-bar" />MCG 담당자 조회
        </div>
        <div class="breadcrumb">
          <span>MCG</span><em class="on">담당자</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        MCG 담당자 목록
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
        <div class="column w-1">
          <label class="column_label">담당자명</label>
          <input
            v-model="hanNm"
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
                담당자유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                담당자명<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                조직<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                연락처<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                EMAIL<i class="ico-sort-up" />
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
                  v-model="chrgrTyp"
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
                <input
                  v-model="orgCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mblPhonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="email"
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
              v-for="mcgr in chrgrList"
              :key="mcgr.index"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="mcgr.opCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.dealCd"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.chrgrTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.name"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.phonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="mcgr.mEmail"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="modify(mcgr)"
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
          :click-handler="listing"
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
  fetchGetMcgChrgrList,
  fetchPostMcgChrgrList,
  fetchPutMcgChrgrList,
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
      chrgrList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      opCd: '',
      dealCd: '',
      chrgrTyp: '',
      mblPhonNum: '',
      orgCd: '',
      hanNm: '',
      chrgrId: '',
      email: '',
      mEmail: '',
      company: '',
      phonNum: '',

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
    listing() {
      console.log('담당자 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgChrgrList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          opCd: this.opCd,
          dealCd: this.dealCd,
          chrgrTyp: this.chrgrTyp,
          mblPhonNum: this.mblPhonNum,
          orgCd: this.orgCd,
          hanNm: this.hanNm,
          chrgrId: this.chrgrId,
          email: this.email,
        },
      })

        .then((res) => {
          this.chrgrList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(res.data.rstData.searchList);
          console.log(this.chrgrList);
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
      console.log('담당자 정보 등록!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgChrgrList({
        opCd: this.opCd,
        dealCd: this.dealCd,
        chrgrTyp: this.chrgrTyp,
        mblPhonNum: this.mblPhonNum,
        orgCd: this.orgCd,
        hanNm: this.hanNm,
        chrgrId: this.chrgrId,
        name: this.name,
        mEmail: this.mEmail,
        company: this.company,
        phonNum: this.phonNum,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('담당자 추가 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    modify(mcgr) {
      console.log('담당자 정보 수정!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPostMcgChrgrList(mcgr)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('담당자 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
