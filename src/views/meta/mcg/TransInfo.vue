<template>
  <div class="right_space">
    <ChrgrListPopup
      v-if="chrgrpopupstate"
      @closePop="turOffPopChrgr"
      @addData="addDataChrgr"
    />
    <ChnlListPopup
      v-if="chnlpopupstate"
      @closePop="turOffPopChnl"
      @addData="addDataChnl"
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
          placeholder="업무코드"
        >
        <div class="search_group">
          <label class="column_label tooltips ov top">
            <span class="tip_contn">
              <em class="tip_text">   MCG 채널ID 로 조회
              </em></span></label>
          <input
            v-model="chnlId"
            type="text"
            class="add_text"
            placeholder="채널ID"
          >
          <span class="search">
            <i
              class="ico-search"
              @click="chnlpopon()"
            />
          </span>
        </div>

        <input
          v-model="chnlTyp"
          type="text"
          class="add_text"
          placeholder="채널유형"
        >
        <input
          v-model="dealCd"
          type="text"
          class="add_text"
          placeholder="거래코드"
        >
        <input
          v-model="dealNm"
          type="text"
          class="add_text"
          placeholder="거래명"
        >

        <select v-model="useYn">
          <option value="Y">
            Y
          </option>
          <option value="N">
            N
          </option>
        </select>
        <span class="select" />
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
            <li class="th_cell">
              사용여부<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="deal in dealList"
            :key="deal.index"
            class="table_row w-auto"
            @click="dtlDeal(deal), Chrgrinfodtl(deal.opCd, deal.dealCd)"
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
            <li class="td_cell">
              {{ deal.useYn }}
            </li>
          </ul>
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
        <div class="column w-1">
          <label class="column_label">요청담당자</label>
          <div class="search_group">
            <input
              v-model="chrgrReq.hanNm"
              type="text"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="chrgrpopon('REQ', dealdtl.opCd)"
              />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">응답담당자</label>
          <div class="search_group">
            <input
              v-model="chrgrRps.hanNm"
              type="text"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="chrgrpopon('RPS', dealdtl.opCd)"
              />
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
                value="Y"
                selected
              >
                Y
              </option>
              <option value="N">
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
<style scoped>
ul:hover{
background-color: rgb(223, 219, 219);
}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchPutMcgDealList,
  fetchPostMcgDealList,
  fetchGetMcgDealList,
  // fetchPostMcgChrgrList,
  fetchGetMcgDealChrgrList,
} from '@/api/mcgApi';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';

export default {
  components: {
    ChrgrListPopup,
    ChnlListPopup,
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
      chrgrReq: [],
      chrgrRps: [],
      chrgrinfoReq: {
        chrgrTyp: '',
        hanNm: '',
        chrgrId: '',
        mblPhonNum: '',
      },
      chrgrinfoRps: {
        chrgrTyp: '',
        hanNm: '',
        chrgrId: '',
        mblPhonNum: '',
      },
      chrgrnm: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      opCd: null,
      opCdr: '',
      dealCd: '',
      deakCdr: '',
      chrgrdealCd: '',
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
      chrgrpopupstate: false,
      chnlpopupstate: false,
      chrgrn: '',
      chrgropCd: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
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
      console.log('거래 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgDealList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
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


    Chrgrinfodtl(opCdr, dealCdr) {
      console.log('채널 담당자 조회!');
      console.log(this.chrgrinfoReq, this.chrgrinfoRps);
      fetchGetMcgDealChrgrList({
        params: {
          chrgrTyp: this.chrgrTyp,
          hanNm: this.hanNm,
          chrgrId: this.chrgrId,
          mblPhonNum: this.mblPhonNum,
          opCd: opCdr,
          dealCd: dealCdr,

        },
      })

        .then((res) => {
          this.chrgrReq = res.data.rstData.searchList.chrgr1;
          this.chrgrRps = res.data.rstData.searchList.chrgr2;
          if (this.chrgrReq === null) {
            this.chrgrinfoReq.hanNm = '';
            this.chrgrinfoReq.chrgrId = '';
            this.chrgrReq = this.chrgrinfoReq;
          }
          if (this.chrgrRps === null) {
            this.chrgrinfoRps.hanNm = '';
            this.chrgrinfoRps.chrgrId = '';
            this.chrgrRps = this.chrgrinfoRps;
          }
          console.log(this.chrgrReq, this.chrgrRps);

          console.log('대표 담당자 조회!');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    noshow() {
      this.isStatusOn = false;
      console.log(this.isStatusOn);
    },

    chrgrpopon(n, opCdr, dealCdr) {
      this.chrgrn = n;
      this.chrgropCd = opCdr;
      this.chrgrpopupstate = true;
      this.chrgrdealCd = dealCdr;
    },

    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
    },

    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
      if (this.chrgrn === 'REQ') {
        this.chrgrReq.chrgrId = val.userId;
        this.chrgrReq.hanNm = val.hanNm;
        console.log('REQ');
      } else if (this.chrgrn === 'RPS') {
        this.chrgrRps.chrgrId = val.userId;
        this.chrgrRps.hanNm = val.hanNm;
        console.log('RPS');
      }
      console.log(val.userId, this.chrgrReq.chrgrId, this.chrgrRps.chrgrId);
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
      this.chnlId = val.chnlId;

      console.log();
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
        opCd: this.opCd,
        dealCd: this.dealCd,
        realDealCd: this.realDealCd,
        dealModuleNm: this.dealModuleNm,
        dealNm: this.dealNm,
        //  reqChrgr: this.reqChrgr,
        //   rpsChrgr: this.rpsChrgr,
        //  lnkgCycl: this.lnkgCycl,
        //   ifSz: this.ifSz,
        //    servletUrl: this.servletUrl,
        //     tcpIp: this.tcpIp,
        //      tcpPort: this.tcpPort,
        //    dealTimeout: this.dealTimeout,
        //     dealRmk: this.dealRmk,
        useYn: this.useYn,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('거래 추가 완료!');
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
