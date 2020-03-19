<template>
  <div class="right_space">
    <ChrgrListPopup
      v-if="chrgrpopupstate"
      @closePop="turOffPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 거래 조회
        </div>
        <div class="breadcrumb">
          <span>MCG</span><em class="on">거래조회</em>
        </div>
      </h2>
    </section>

    <section class="border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="save()"
          >
            추가
          </button>
          <button
            type="button"
            class="default_button on"
            @click="listing()"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="add_info">
        <input
          v-model="opCd"
          type="text"
          class="add_text on"
        >
        <input
          v-model="chnlId"
          type="text"
          class="add_text"
        >
        <input
          v-model="chnlTyp"
          type="text"
          class="add_text"
        >
        <input
          v-model="dealCd"
          type="text"
          class="add_text"
        >
        <input
          v-model="dealNm"
          type="text"
          class="add_text"
        >
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              업무코드<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              채널ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              채널유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              거래코드<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              거래명<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="deal in dealList"
            :key="deal.index"
            class="table_row w-auto"
            @click="dtlDeal(deal)"
          >
            <li class="td_cell">
              {{ deal.opCd }}
            </li>
            <li class="td_cell">
              {{ deal.chnlId }}
            </li>
            <li class="td_cell">
              {{ deal.chnlTyp }}
            </li>
            <li class="td_cell">
              {{ deal.dealCd }}
            </li>
            <li class="td_cell">
              {{ deal.dealNm }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      v-if="isStatusOn"
      class="info_title"
    >
      <em class="sub_tit">채널ID: {{ dealdtl.chnlId }}    거래코드 : {{ dealdtl.dealCd }}</em>
      <i
        class="ico-remove"
        @click="noshow()"
      />
    </section>

    <section
      v-if="isStatusOn"
      class="form_area border_group"
    >
      <div class="row_contain odd type-3">
        <div class="column on w-1">
          <label class="column_label">거래코드</label>
          <input
            v-model="dealdtl.dealCd"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">거래명</label>
          <input
            v-model="dealdtl.dealNm"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Servlet URL</label>
          <input
            v-model="dealdtl.servletUrl"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">TCP IP/PORT</label>
          <input
            v-model="dealdtl.tcpIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            v-model="dealdtl.tcvPort"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-3">
        <div class="column on w-1">
          <label class="column_label">요청담당자</label>
          <div class="search_group">
            <input
              v-model="dealdtl.reqChrgr"
              type="text"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">응답담당자</label>
          <div class="search_group">
            <input
              v-model="dealdtl.rpsChrgr"
              type="text"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">전문 크기(byte)</label>
          <input
            v-model="dealdtl.ifSz"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연동주기</label>
          <div class="select_group">
            <input
              v-model="dealdtl.lnkgCycl"
              type="text"
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">타임아웃</label>
          <input
            v-model="dealdtl.dealTimeout"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">비고</label>
          <input
            v-model="dealdtl.dealRmk"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용여부</label>
          <div class="select_group">
            <select v-model="dealdtl.useYn">
              <option
                value=""
                selected
              >
                Y
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <button
            type="button"
            class="default_button on"
            @click="modify(dealdtl)"
          >
            수정
          </button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchPutMcgDealList,
  fetchPostMcgDealList,
  fetchGetMcgDealList,
} from '@/api/mcgApi';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';

export default {
  components: {
    ChrgrListPopup,
  },
  data() {
    return {
      index: 0,
      dealList: [],
      dealdtl: [],
      svrinfo: {
        svrIp: '',
        svrPort: '',
      },
      svrinfo0: [],
      svrinfo1: [],
      svrinfo2: [],
      svrinfo3: [],
      chrgrinfo: {
        chrgrTyp: '',
        hanNm: '',
        chrgrId: '',
        mblPhonNum: '',
      },
      chrgrm: [],
      chrgrs: [],
      chrgrnm: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      opCd: null,
      opCdr: '',
      dealCd: '',
      realDealCd: '',
      dealModuleNm: '',
      dealNm: '',
      reqChrgr: '',
      rpsChrgr: '',
      lnkgCycl: '',
      ifSz: '',
      servletUrl: '',
      tcpIp: '',
      tcpPort: '',
      dealTimeout: '',
      dealRmk: '',
      chnlTyp: '',
      chnlId: '',
      containerNum: '',
      tcpgwNm: '',
      dvlpLang: '',
      chnlRmk: '',
      useYn: 'Y',
      svrTyp: '',
      svrIp: '',
      svrPort: '',
      mcgServerNum: '',
      ipTyp: '',
      sUserId: '',
      chrgrTyp: '',
      hanNm: '',
      chrgrId: '',
      mblPhonNum: '',
      isStatusOn: '',
      chrgrpopupstate: '',
      chrgrn: '',
      chrgropCd: '',
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    listing() {
      console.log('거래 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgDealList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          size: this.pageSet.size,
          opCd: this.opCd,
          dealCd: this.dealCd,
          realDealCd: this.realDealCd,
          dealModuleNm: this.dealModuleNm,
          dealNm: this.dealNm,
          reqChrgr: this.reqChrgr,
          rpsChrgr: this.rpsChrgr,
          lnkgCycl: this.lnkgCycl,
          ifSz: this.ifSz,
          servletUrl: this.servletUrl,
          tcpIp: this.tcpIp,
          tcpPort: this.tcpPort,
          dealTimeout: this.dealTimeout,
          dealRmk: this.dealRmk,
          chnlTyp: this.chnlTyp,
          chnlId: this.chnlId,
        },
      })

        .then((res) => {
          this.dealList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(res.data.rstData.searchList);
          console.log(this.dealList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    noshow() {
      this.isStatusOn = false;
      console.log(this.isStatusOn);
    },

    chrgrpopon(n, opCdr) {
      this.chrgrn = n;
      this.chrgropCd = opCdr;
      this.chrgrpopupstate = true;
    },

    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
    },

    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
      if (this.chrgrn === 1) { this.chrgrm.chrgrId = val.userId; this.chrgrm.hanNm = val.hanNm; }
      if (this.chrgrn === 2) { this.chrgrs.chrgrId = val.userId; this.chrgrs.hanNm = val.hanNm; }

      console.log(val.userId, this.chrgrm.chrgrId, this.chrgrs.chrgrId);
    },

    dtlDeal(deal) {
      // let svrinfotemp = [];
      console.log('상세거래조회!');
      this.dealdtl = deal;
      console.log(this.dealdtl);
      this.isStatusOn = true;
      console.log(this.isStatusOn);
    },


    save() {
      console.log('거래 정보 등록!');

      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgDealList({
        dealCd: this.dealCd,
        realDealCd: this.realDealCd,
        dealModuleNm: this.dealModuleNm,
        dealNm: this.dealNm,
        reqChrgr: this.reqChrgr,
        rpsChrgr: this.rpsChrgr,
        lnkgCycl: this.lnkgCycl,
        ifSz: this.ifSz,
        servletUrl: this.servletUrl,
        tcpIp: this.tcpIp,
        tcpPort: this.tcpPort,
        dealTimeout: this.dealTimeout,
        dealRmk: this.dealRmk,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('거래 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    modify(deal) {
      console.log('거래 정보 수정!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPostMcgDealList(deal)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('거래 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
