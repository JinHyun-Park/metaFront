<template>
  <div>
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
    <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        MCG 거래 추가
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="addMcgReq()"
          >
            추가
          </button>
          <!--<button type="button" class="default_button extend on">가상 사용자 추가</button>-->
        </div>
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
              >
                구분
              </li>
              <li
                class="th_cell"
              >
                채널ID
              </li>
              <li
                class="th_cell"
              >
                연동방식
              </li>
              <li
                class="th_cell"
              >
                채널유형
              </li>
              <li
                class="th_cell"
              >
                TP명
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="req in reqList"
              :key="req.index"
              class="table_row w-auto"
              @click="dtlReq(req)"
            >
              <li
                class="td_cell"
              >
                {{ req.mcgType }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.chnlId }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.lnkMthd }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.chnlTyp }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.tp }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="remove(req)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row_contain type-2" />
      <div class="row_contain type-2">
        <div class="column on w-3">
          <label class="column_label">채널명</label>
          <div class="search_group">
            <input
              v-model="chnlNm"
              type="text"
              value=""
              @click="chnlpopon()"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="chnlpopon()"
              />
            </span>
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">채널ID</label>
          <input
            v-model="chnlId"
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널유형</label>
          <input
            v-model="chnlTyp"
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <input
            v-model="lnkMthd"
            type="text"
            value="JOP369"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">업무명</label>
          <input

            type="text"
            value="Interface1Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">호출서비스</label>
          <input
            v-model="tp"
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
      </div>
      <div class="row_contain odd">
        <div class="column w-1">
          <label class="column_label">서비스ID</label>
          <input
            v-model="serviceId"
            type="text"
            value="Interface1"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">서비스명</label>
          <input
            v-model="serviceNm"
            type="text"
            value="Interface1Interface"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Servlet URL</label>
          <input
            v-model="servletUrl"
            type="text"
            value="https://www.ccc.vue"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">TCP IP/PORT</label>
          <input
            v-model="tcpIdPort"
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-1">
          <label class="column_label">연동주기</label>
          <div class="select_group">
            <select>
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
          <label class="column_label">타임아웃</label>
          <input

            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">요청일자</label>
          <div class="calander_group">
            <input
              v-model="reqDt"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="reqDt"
              :min="today"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="inputreqDt"
            />
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <h5 class="s_tit type-2">
        MCG 채널 담당자 정보
      </h5>
      <div class="row_contain type-2 except-2">
        <div class="column w-1">
          <label class="column_label">담당자 조회</label>
          <div class="search_group">
            <input
              type="text"
              @click="chrgrpopon()"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="chrgrpopon()"
              />
            </span>
          </div>
        </div>
        <div class="column w-3" />
      </div>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                이름<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                회사<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                연락처<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                이메일<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                역할<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                수정
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(chrgrdtl,idx) in chrgrRows"
              :key="idx"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="chrgrdtl.name"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="chrgrdtl.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="chrgrdtl.phonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="chrgrdtl.email"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="chrgrdtl.role"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addcRow()"
                />
                <i
                  class="ico-del"
                  @click="removecRow(idx)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';
import {
  fetchGetMcgReqList,
  fetchPutMcgReq,
  fetchPutMcgReqChrgr,
  fetchPutMcgReqServer,
  fetchGetMcgReqNum,
} from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';

export default {
  name: 'RegStep2ApplyDealMCG',
  components: {
    ChnlListPopup, ChrgrListPopup,
  },
  data() {
    return {
      index: 0,
      vuserList: [],
      vuserdtl: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
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
      isStatusOn: '',
      chnlpopupstate: false,
      chrgrpopupstate: false,
      chrgrn: '',
      chrgropCd: '',
      reqList: [],
      reqsendList: [],
      svrList: [],
      chrgrList: [],
      currRow: [],
      mcgReqNum: '',
      procSt: '',
      mcgType: '거래',
      opCd: '',
      lnkMthd: '',
      chnlTyp: '',
      reqPurp: '',
      chnlCnt: '',
      maxTps: '',
      tp: '',
      serviceId: '',
      serviceNm: '',
      servletUrl: '',
      tcpIdPort: '',
      dailyTps: '',
      dablInflu: '',
      mcgRmk: '',
      reqDt: '',
      mcgReqSvrNum: '',
      sysNm: '',
      hostNm: '',
      ip: '',
      port: '',
      os: '',
      scompany: '',
      dir: '',
      srole: '',
      mcgReqChrgrNum: '',
      userId: '',
      name: '',
      company: '',
      phonNum: '',
      email: '',
      role: '',
      chnlCom: '',
      useYn: '',
      chrgrRows: [
        {
          name: '',
          company: '',
          phonNum: '',
          email: '',
          role: '',
          chrgrId: '',
        },
      ],
      mcgReqList: {},
      mcgChrgrList: {},
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      today: '',

    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum']),
  },
  mounted() {
    this.today = this.$gf.dateToString(new Date(), '', 'Y');
    this.reqsetting();
  },
  created() {
    if (this.$route.params.callType === 'update') {
      this.listing(this.reqNum);
    }
    eventBus.$on('Step2McgSave', () => {
      console.log('event Bus 통해 mcg 저장');
      this.savereq();
    });
    console.log(`parent reqNum : ${this.$parent.reqNum}`);
  },
  destroyed() {
    eventBus.$off('Step2McgSave');
  },
  methods: {
    ...mapActions('ifRegInfo', ['setTempSaveFlag']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP2MCG', rstCd: rtn,
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
      this.chnlId = val.chnlId;
      this.chnlNm = val.chnlNm;
      this.chnlTyp = val.chnlTyp;
      this.lnkMthd = val.lnkMthd;

      console.log();
    },

    chrgrpopon() {
      this.chrgrpopupstate = true;
    },

    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
    },

    addcRow() {
      console.log('담당자 목록 추가!');
      this.chrgrRows.push({});
    },

    removecRow(idx) {
      console.log('담당자 목록에서 삭제!');
      this.chrgrRows.splice(idx, 1);
      if (idx === 0) { this.chrgrRows.push({}); }
    },

    inputreqDt(val) {
      this.reqDt = val;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);

      this.chrgrRows[this.chrgrRows.length - 1].name = val.hanNm;
      this.chrgrRows[this.chrgrRows.length - 1].company = val.orgCd;
      this.chrgrRows[this.chrgrRows.length - 1].chrgrId = val.userId;
      this.chrgrRows[this.chrgrRows.length - 1].phonNum = val.mblPhonNum;
      this.chrgrRows[this.chrgrRows.length - 1].email = val.emailAddr;

      this.chrgrpopupstate = false;
    },

    listing(req) {
      console.log('채널 신청 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgReqList({
        params: {
          reqNum: req,
          procSt: 1,
        },
      })
        .then((res) => {
          this.reqList = res.data.rstData.searchReqList;
          // this.svrList = res.data.rstData.searchSvrList;
          // this.chrgrList = res.data.rstData.searchChrgrList;
          console.log(res.data.rstData.searchReqList);
          console.log(this.reqList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    dtlshow(dtl) {
      this.mcgReqNum = dtl.mcgReqNum;
      this.mcgType = dtl.mcgType;
      this.chnlNm = dtl.chnlNm;
      this.chnlId = dtl.chnlId;
      this.lnkMthd = dtl.lnkMthd;
      this.chnlTyp = dtl.chnlTyp;
      this.reqPurp = dtl.reqPurp;
      this.chnlCnt = dtl.chnlCnt;
      this.maxTps = dtl.maxTps;
      this.tp = dtl.tp;
      this.serviceId = dtl.serviceId;
      this.serviceNm = dtl.serviceNm;
      this.servletUrl = dtl.servletUrl;
      this.tcpIdPort = dtl.tcpIdPort;
      this.dailyTps = dtl.dailyTps;
      this.dablInflu = dtl.dablInflu;
      this.mcgRmk = dtl.mcgRmk;
      this.reqDt = dtl.reqDt;
      this.chnlCom = dtl.chnlCom;
    },

    addMcgReq() {
      this.reqList.push({
        mcgReqNum: this.mcgReqNum,
        reqNum: this.reqNum,
        mcgType: this.mcgType,
        opCd: this.opCd,
        chnlNm: this.chnlNm,
        chnlId: this.chnlId,
        lnkMthd: this.lnkMthd,
        chnlTyp: this.chnlTyp,
        reqPurp: this.reqPurp,
        chnlCnt: this.chnlCnt,
        maxTps: this.maxTps,
        tp: this.tp,
        serviceId: this.serviceId,
        serviceNm: this.serviceNm,
        servletUrl: this.servletUrl,
        tcpIdPort: this.tcpIdPort,
        dailyTps: this.dailyTps,
        dablInflu: this.dablInflu,
        mcgRmk: this.mcgRmk,
        reqDt: this.reqDt,
        chnlCom: this.chnlCom,

      });

      this.emptyMcgFields();
    },

    remove(req) {
      console.log('신청삭제!');
      const idx = this.reqList.indexOf(req);
      this.reqList.splice(idx, 1);

      this.emptyMcgFields();
    },


    emptyMcgFields() {
      this.reqsetting();
      this.chnlNm = '';
      this.chnlId = '';
      this.lnkMthd = '';
      this.chnlTyp = '';
      this.reqPurp = '';
      this.chnlCnt = '';
      this.maxTps = '';
      this.tp = '';
      this.serviceId = '';
      this.serviceNm = '';
      this.servletUrl = '';
      this.tcpIdPort = '';
      this.dailyTps = '';
      this.dablInflu = '';
      this.mcgRmk = '';
      this.reqDt = '';
      this.chnlCom = '';

      this.currRow = [];
    },

    reqsetting() {
      fetchGetMcgReqNum({
        params: {
        },
      })
        .then((res) => {
          this.mcgReqNum = res.data.rstData.mcgReqNum;
          // this.svrList = res.data.rstData.searchSvrList;
          // this.chrgrList = res.data.rstData.searchChrgrList;
          console.log(this.mcgReqNum);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    savereq() {
      for (let i = 0; i < this.reqList.length; i++) {
        this.reqList[i].reqNum = this.reqNum;
        this.reqList[i].procSt = '1';
      }
      this.mcgReqList = { reqList: this.reqList };

      for (let i = 0; i < this.chrgrRows.length; i++) {
        this.chrgrRows[i].reqNum = this.reqNum;
        this.chrgrRows[i].useYn = 'Y';
      }
      this.mcgChrgrList = { chrgrRows: this.chrgrRows };

      fetchPutMcgReq(this.mcgReqList)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'E') {
            this.setTempSave(false);
          } else {
            this.setTempSave(true);
            this.savereqchrgr(this.mcgChrgrList);
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
          this.setTempSave(false);
        });
    },
    savereqchrgr(chrgrList) {
      fetchPutMcgReqChrgr(chrgrList)
        .then((res) => {
          console.log(res);
          this.setTempSave(true);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
          this.setTempSave(false);
        });
    },
    dtlReq(req) {
      // let svrinfotemp = [];
      console.log('상세신청정보조회!');
      this.dtlshow(req);
      console.log(this.reqdtl);
    },
    savereqserver() {
      fetchPutMcgReqServer({
        mcgReqNum: this.mcgReqNum,
        reqNum: this.reqNum,
        mcgReqSvrNum: this.mcgReqSvrNum,
        sysNm: this.sysNm,
        hostNm: this.hostNm,
        ip: this.ip,
        port: this.port,
        os: this.os,
        company: this.scompany,
        dir: this.dir,
        role: this.srole,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

  },
};
</script>
