<template>
  <div>
    <McgChnlDetailPopup
      v-if="showChnlDetail"
      :prop-data="propsChnl"
      @closePop="turOffSvrPopChnl"
      @addData="addDataChnl"
    />
    <McgDealDetailPopup
      v-if="showDealDetail"
      :prop-data="propsDeal"
      @closePop="turOffSvrPopDeal"
      @addData="addDataDeal"
    />
    <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        MCG 신청
        <div class="right_button_area">
          <button
            type="button"
            class="default_button extend on"
            @click="showAddView('CHNL')"
          >
            채널 추가
          </button>
          <button
            type="button"
            class="default_button extend on"
            @click="showAddView('DEAL')"
          >
            거래 추가
          </button>
        </div>
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%;"
              >
                구분
              </li>
              <li
                class="th_cell"
                style="width:20%;"
              >
                채널ID
              </li>
              <li
                class="th_cell"
                style="width:15%;"
              >
                연동방식
              </li>
              <li
                class="th_cell"
                style="width:15%;"
              >
                채널유형
              </li>
              <li
                class="th_cell"
                style="width:25%;"
              >
                TP명
              </li>
              <li
                class="th_cell"
                style="width:15%;"
              >
                변경
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(req, idx) in reqList"
              :key="idx"
              class="table_row w-auto"
              @click="dtlReq(req, idx)"
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
                  class="ico-edit"
                  @click="dtlupdate(idx)"
                />
                <i
                  class="ico-del"
                  @click="remove(req)"
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
import {
  fetchGetMcgReqList,
  fetchGetMcgReqSvrList,
  fetchPutMcgReq,
} from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';
import McgChnlDetailPopup from '@/components/popup/meta/mcg/McgChnlDetailPopup.vue';
import McgDealDetailPopup from '@/components/popup/meta/mcg/McgDealDetailPopup.vue';
import { fetchPutIfStepAprvReqAdmin } from '@/api/ifRegApi';

export default {
  name: 'RegStep2ApplyChMCG',

  components: {
    McgChnlDetailPopup, McgDealDetailPopup,
  },

  data() {
    return {
      showChnlDetail: false,
      showDealDetail: false,
      propsChnl: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      propsDeal: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      popupType: 'new',
      currIdx: 0,

      virtual: true,
      isStatusOn: '',
      chnlpopupstate: false,

      chrgrn: '',
      chrgropCd: '',
      reqsendList: [],
      svrList: [],
      chrgrList: [],
      svrShow: [],
      chrgrShow: [],

      procSt: '',

      // 채널 row data
      mcgChnlRowData: {
        mcgReqNum: '',
        mcgType: '채널',
        chnlNm: '',
        chnlId: '',
        lnkMthd: '',
        chnlTyp: '',
        reqPurp: '',
        chnlCnt: '',
        maxTps: '',
        tp: '',
        serviceId: '',
        serviceNm: '',
        servletUrl: '',
        tcpIp: '',
        tcpPort: '',
        dailyTps: '',
        dablInflu: '',
        mcgRmk: '',
        reqDt: '',
        chnlCom: '',
        virtualUserTeam: '',
        virtualUserOrg: '',
        virtualUserHannm: '',

        svrRows: [
          {
            mcgReqNum: '',
            svrTyp: '',
            hostNm: '',
            ip: '',
            port: '',
            os: '',
            ipTyp: '',
            hanNm: '',
            chrgrId: '',
          },
        ],
        chrgrRows: [
          {
            mcgReqNum: '',
            name: '',
            company: '',
            phonNum: '',
            email: '',
            role: '',
            chrgrId: '',
          },
        ],
      },

      // / 거래정보
      mcgDealRowData: {
        mcgReqNum: '',
        reqNum: '',
        mcgType: '',
        opCd: '',
        chnlNm: '',
        chnlId: '',
        lnkMthd: '',
        chnlTyp: '',
        reqPurp: '',
        chnlCnt: '',
        maxTps: '',
        tp: '',
        moduleNm: '',
        serviceId: '',
        serviceNm: '',
        servletUrl: '',
        tcpIp: '',
        tcpPort: '',
        dailyTps: '',
        dablInflu: '',
        mcgRmk: '',
        reqDt: '',
        chnlCom: '',
        chrgrList: '',

        chrgrRows: [
          {
            mcgReqNum: '',
            name: '',
            company: '',
            phonNum: '',
            email: '',
            role: '',
            chrgrId: '',
          },
        ],

      },

      opCd: '',

      svrTyp: '',
      ipTyp: '',
      sysNm: '',
      hostNm: '',
      ip: '',
      port: '',
      os: '',
      scompany: '',
      dir: '',
      srole: '',
      mcgReqChrgrNum: '',
      hanNm: '',
      userId: '',
      name: '',
      company: '',
      phonNum: '',
      email: '',
      role: '',

      useYn: '',
      virtualpopupstate: false,
      svrRows: [
        {
          mcgReqNum: '',
          svrTyp: '',
          hostNm: '',
          ip: '',
          port: '',
          os: '',
          ipTyp: '',
          hanNm: '',
          chrgrId: '',
        },
      ],
      chrgrRows: [
        {
          mcgReqNum: '',
          name: '',
          company: '',
          phonNum: '',
          email: '',
          role: '',
          chrgrId: '',
        },
      ],
      chrgrRowsDeal: [
        {
          mcgReqNum: '',
          name: '',
          company: '',
          phonNum: '',
          email: '',
          role: '',
          chrgrId: '',
        },
      ],
      reqList: [
        {
          reqNum: '',
          chnlNm: '',
          chnlId: '',
          lnkMthd: '',
          chnlTyp: '',
          reqPurp: '',
          chnlCnt: '',
          maxTps: '',
          tp: '',
          moduleNm: '',
          serviceId: '',
          serviceNm: '',
          servletUrl: '',
          tcpIp: '',
          tcpPort: '',
          dailyTps: '',
          dablInflu: '',
          mcgRmk: '',
          reqDt: '',
          chnlCom: '',
        },
      ],
      mcgReqList: {},

      reqListDeal: [
        {
          chnlNm: '',
          chnlId: '',
          lnkMthd: '',
          chnlTyp: '',
          reqPurp: '',
          chnlCnt: '',
          maxTps: '',
          tp: '',
          moduleNm: '',
          serviceId: '',
          serviceNm: '',
          servletUrl: '',
          tcpIp: '',
          tcpPort: '',
          dailyTps: '',
          dablInflu: '',
          mcgRmk: '',
          reqDt: '',
          chnlCom: '',
        },
      ],

      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      today: '',
      notInsert: '',

    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
    ...mapState('ifRegInfo', ['reqNum']),
  },
  created() {
    // this.reqNum = this.$route.params.reqNum;
    eventBus.$on('Step2McgSave', () => {
      console.log('event Bus 통해 mcg 저장');
      this.savereq();
    });
  },
  mounted() {
    if (this.$route.params.ifKind === 'MCG') {
      this.listing(this.reqNum);
    }
    this.today = this.$gf.dateToString(new Date(), '', 'Y');
    this.reqList.splice(0, 1);
    this.svrRows.push({});
    this.chrgrRows.push({});
    this.chrgrRowsDeal.push({});
    eventBus.$emit('VirtualReqNum', this.reqsendList);
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNKG_MTHD', allYn: 'Y', listNm: 'mcgChnlLnkgMthd',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNKG_MTHD', allYn: 'N', listNm: 'mcgChnlLnkgMthdR',
    });
  },
  destroyed() {
    eventBus.$off('Step2McgSave');
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),

    inputreqDt(val) {
      this.reqDt = val;
    },
    addDealChrgrRow() {
      console.log('거래 담당자 목록 추가!');
      this.mcgDealRowData.chrgrRows.push({});
    },

    removeDealChrgrRow(idx) {
      console.log('담당자 목록에서 삭제!');
      this.mcgDealRowData.chrgrRows.splice(idx, 1);
      if (idx === 0) { this.mcgDealRowData.chrgrRows.push({}); }
    },

    checkChnlSave() {
      if (this.mcgChnlRowData.chnlNm === '') {
        this.$gf.alertOn('채널명을 입력 해주세요.');
        return 0;
      }
      if (this.mcgChnlRowData.chnlId === '') {
        this.$gf.alertOn('채널ID를 입력 해주세요.');
        return 0;
      }
      if (this.mcgChnlRowData.chnlTyp === '') {
        this.$gf.alertOn('채널유형을 선택 해주세요.');
        return 0;
      }
      if (this.mcgChnlRowData.lnkMthd === '') {
        this.$gf.alertOn('연동방식을 선택 해주세요.');
        return 0;
      }
      if (this.mcgChnlRowData.chrgrRows.name === '') {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      if (this.mcgChnlRowData.svrRows.ip === '') {
        this.$gf.alertOn('서버를 1개 이상 입력 해주세요.');
        return 0;
      }
      return 1;
    },

    listing(req) {
      console.log('채널 신청 목록 조회!');
      this.reqList.splice(0, 1);
      this.svrRows.splice(0, 1);
      this.chrgrRows.splice(0, 1);
      fetchGetMcgReqList({
        params: {
          reqNum: req,
          procSt: 1,
        },
      })
        .then((res) => {
          this.reqList = res.data.rstData.searchReqList;
          this.procSt = this.reqList[0].procSt;

          console.log(res.data.rstData.searchReqList);
          console.log(this.reqList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    listingsvr(Num) {
      console.log('채널 서버 목록 조회!');
      // this.svrList.splice(0, 1);
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgReqSvrList({
        params: {
          mcgReqNum: Num,
        },
      })
        .then((res) => {
          this.svrList = res.data.rstData.searchSvrList;
          // this.svrRowsrcv = res.data.rstData.searchSvrList;
          // this.chrgrRowsrcv = res.data.rstData.searchChrgrList;
          this.svrRows.splice(0, this.svrRows.length);
          for (let i = 0; i < this.svrList.length; i++) {
            this.svrRows.push(this.svrList[i]);
          }

          console.log(res.data.rstData.searchSvrList);
          console.log(this.svrList);
          console.log(this.svrRows);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    dtlChnlShow(dtl) {
      this.emptyMcgChnlFields();
      this.mcgChnlRowData.mcgReqNum = dtl.mcgReqNum;
      this.mcgChnlRowData.mcgType = dtl.mcgType;
      this.mcgChnlRowData.chnlNm = dtl.chnlNm;
      this.mcgChnlRowData.chnlId = dtl.chnlId;
      this.mcgChnlRowData.lnkMthd = dtl.lnkMthd;
      this.mcgChnlRowData.chnlTyp = dtl.chnlTyp;
      this.mcgChnlRowData.reqPurp = dtl.reqPurp;
      this.mcgChnlRowData.chnlCnt = dtl.chnlCnt;
      this.mcgChnlRowData.maxTps = dtl.maxTps;
      this.mcgChnlRowData.tp = dtl.tp;
      this.mcgChnlRowData.serviceId = dtl.serviceId;
      this.mcgChnlRowData.serviceNm = dtl.serviceNm;
      this.mcgChnlRowData.servletUrl = dtl.servletUrl;
      this.mcgChnlRowData.tcpIp = dtl.tcpIp;
      this.mcgChnlRowData.tcpPort = dtl.tcpPort;
      this.mcgChnlRowData.dailyTps = dtl.dailyTps;
      this.mcgChnlRowData.dablInflu = dtl.dablInflu;
      this.mcgChnlRowData.mcgRmk = dtl.mcgRmk;
      this.mcgChnlRowData.reqDt = dtl.reqDt;
      this.mcgChnlRowData.chnlCom = dtl.chnlCom;
      this.mcgChnlRowData.virtualUserTeam = dtl.virtualUserTeam;
      this.mcgChnlRowData.virtualUserOrg = dtl.virtualUserOrg;
      this.mcgChnlRowData.virtualUserHannm = dtl.virtualUserHannm;

      this.mcgChnlRowData.svrRows = dtl.svrList;
      this.mcgChnlRowData.chrgrRows = dtl.chrgrList;
      if (this.mcgChnlRowData.svrRows.length === 0) {
        this.mcgChnlRowData.svrRows.push({});
      }

      if (this.mcgChnlRowData.chrgrRows.length === 0) {
        this.mcgChnlRowData.chrgrRows.push({});
      }

      this.propsChnl = this.mcgChnlRowData;
      this.popupType = 'update';
      this.showChnlDetail = true;
    },

    dtlDealShow(dtl) {
      this.emptyMcgDealFields();
      this.mcgDealRowData.mcgReqNum = dtl.mcgReqNum;
      this.mcgDealRowData.mcgType = dtl.mcgType;
      this.mcgDealRowData.chnlNm = dtl.chnlNm;
      this.mcgDealRowData.chnlId = dtl.chnlId;
      this.mcgDealRowData.lnkMthd = dtl.lnkMthd;
      this.mcgDealRowData.chnlTyp = dtl.chnlTyp;
      this.mcgDealRowData.reqPurp = dtl.reqPurp;
      this.mcgDealRowData.chnlCnt = dtl.chnlCnt;
      this.mcgDealRowData.maxTps = dtl.maxTps;
      this.mcgDealRowData.tp = dtl.tp;
      this.mcgDealRowData.moduleNm = dtl.moduleNm;
      this.mcgDealRowData.serviceId = dtl.serviceId;
      this.mcgDealRowData.serviceNm = dtl.serviceNm;
      this.mcgDealRowData.servletUrl = dtl.servletUrl;
      this.mcgDealRowData.tcpIp = dtl.tcpIp;
      this.mcgDealRowData.tcpPort = dtl.tcpPort;
      this.mcgDealRowData.dailyTps = dtl.dailyTps;
      this.mcgDealRowData.dablInflu = dtl.dablInflu;
      this.mcgDealRowData.mcgRmk = dtl.mcgRmk;
      this.mcgDealRowData.reqDt = dtl.reqDt;
      this.mcgDealRowData.chnlCom = dtl.chnlCom;

      this.mcgDealRowData.chrgrRows = dtl.chrgrList;

      if (this.mcgDealRowData.chrgrRows.length === 0) {
        this.mcgDealRowData.chrgrRows.push({});
      }

      this.propsDeal = this.mcgDealRowData;
      this.popupType = 'update';
      this.showDealDetail = true;
    },

    dtlupdate(idx) {
      if (this.reqList[idx].mcgType === '채널') {
        this.dtlChnlUpdate(idx);
      } else if (this.reqList[idx].mcgType === '거래') {
        this.dtlDealUpdate(idx);
      }
    },

    dtlChnlUpdate(val) {
      // if (this.checkChnlSave() === 0) {
      //   return;
      // }
      if (this.currIdx === '') {
        this.$gf.alertOn('수정할 데이터를 클릭하세요.');
        return;
      }
      this.reqList[this.currIdx].mcgReqNum = val.mcgReqNum;
      this.reqList[this.currIdx].mcgType = val.mcgType;
      this.reqList[this.currIdx].chnlNm = val.chnlNm;
      this.reqList[this.currIdx].chnlId = val.chnlId;
      this.reqList[this.currIdx].lnkMthd = val.lnkMthd;
      this.reqList[this.currIdx].chnlTyp = val.chnlTyp;
      this.reqList[this.currIdx].reqPurp = val.reqPurp;
      this.reqList[this.currIdx].chnlCnt = val.chnlCnt;
      this.reqList[this.currIdx].maxTps = val.maxTps;
      this.reqList[this.currIdx].tp = val.tp;
      this.reqList[this.currIdx].serviceId = val.serviceId;
      this.reqList[this.currIdx].serviceNm = val.serviceNm;
      this.reqList[this.currIdx].servletUrl = val.servletUrl;
      this.reqList[this.currIdx].tcpIp = val.tcpIp;
      this.reqList[this.currIdx].tcpPort = val.tcpPort;
      this.reqList[this.currIdx].dailyTps = val.dailyTps;
      this.reqList[this.currIdx].dablInflu = val.dablInflu;
      this.reqList[this.currIdx].mcgRmk = val.mcgRmk;
      this.reqList[this.currIdx].reqDt = val.reqDt;
      this.reqList[this.currIdx].chnlCom = val.chnlCom;
      this.reqList[this.currIdx].virtualUserTeam = val.virtualUserTeam;
      this.reqList[this.currIdx].virtualUserOrg = val.virtualUserOrg;
      this.reqList[this.currIdx].virtualUserHannm = val.virtualUserHannm;

      this.reqList[this.currIdx].svrList = val.svrRows;
      this.reqList[this.currIdx].chrgrList = val.chrgrRows;

      // this.$gf.alertOn(`${this.mcgChnlRowData.chnlNm}의 채널 정보가 수정되었습니다.`);
      // this.emptyMcgChnlFields();
    },

    dtlDealUpdate(val) {
      if (this.currIdx === '') {
        this.$gf.alertOn('수정할 데이터를 클릭하세요.');
        return;
      }
      this.reqList[this.currIdx].mcgReqNum = val.mcgReqNum;
      this.reqList[this.currIdx].mcgType = '거래';
      this.reqList[this.currIdx].chnlNm = val.chnlNm;
      this.reqList[this.currIdx].chnlId = val.chnlId;
      this.reqList[this.currIdx].lnkMthd = val.lnkMthd;
      this.reqList[this.currIdx].chnlTyp = val.chnlTyp;
      this.reqList[this.currIdx].reqPurp = val.reqPurp;
      this.reqList[this.currIdx].chnlCnt = val.chnlCnt;
      this.reqList[this.currIdx].maxTps = val.maxTps;
      this.reqList[this.currIdx].tp = val.tp;
      this.reqList[this.currIdx].moduleNm = val.moduleNm;
      this.reqList[this.currIdx].serviceId = val.serviceId;
      this.reqList[this.currIdx].serviceNm = val.serviceNm;
      this.reqList[this.currIdx].servletUrl = val.servletUrl;
      this.reqList[this.currIdx].tcpIp = val.tcpIp;
      this.reqList[this.currIdx].tcpPort = val.tcpPort;
      this.reqList[this.currIdx].dailyTps = val.dailyTps;
      this.reqList[this.currIdx].dablInflu = val.dablInflu;
      this.reqList[this.currIdx].mcgRmk = val.mcgRmk;
      this.reqList[this.currIdx].reqDt = val.reqDt;
      this.reqList[this.currIdx].chnlCom = val.chnlCom;

      this.reqList[this.currIdx].chrgrList = val.chrgrRows;

      // this.$gf.alertOn(`${this.reqList[this.currIdx].chnlNm}의 거래 정보가 수정되었습니다.`);
      // this.emptyMcgDealFields();
    },

    addMcgChnlReq(val) {
      // if (this.checkChnlSave() === 0) {
      //   return;
      // }
      console.log(this.mcgReqNum);
      this.reqList.push({
        mcgReqNum: this.reqList.length,
        reqNum: this.reqNum,
        mcgType: val.mcgType,
        opCd: val.opCd,
        chnlNm: val.chnlNm,
        chnlId: val.chnlId,
        lnkMthd: val.lnkMthd,
        chnlTyp: val.chnlTyp,
        reqPurp: val.reqPurp,
        chnlCnt: val.chnlCnt,
        maxTps: val.maxTps,
        tp: val.tp,
        serviceId: val.serviceId,
        serviceNm: val.serviceNm,
        servletUrl: val.servletUrl,
        tcpIpPort: val.tcpIpPort,
        dailyTps: val.dailyTps,
        dablInflu: val.dablInflu,
        mcgRmk: val.mcgRmk,
        reqDt: val.reqDt,
        virtualUserTeam: val.virtualUserTeam,
        virtualUserOrg: val.virtualUserOrg,
        virtualUserHannm: val.virtualUserHannm,
        chnlCom: val.chnlCom,
        svrList: val.svrRows,
        chrgrList: val.chrgrRows,
      });
      // this.emptyMcgChnlFields();
    },

    addMcgDealReq() {
      this.mcgDealRowData.mcgReqNum = this.reqList.length;
      console.log(this.mcgDealRowData.mcgReqNum);
      this.reqList.push({
        mcgReqNum: this.mcgDealRowData.mcgReqNum,
        reqNum: this.reqNum,
        mcgType: '거래',
        opCd: this.mcgDealRowData.opCd,
        chnlNm: this.mcgDealRowData.chnlNm,
        chnlId: this.mcgDealRowData.chnlId,
        lnkMthd: this.mcgDealRowData.lnkMthd,
        chnlTyp: this.mcgDealRowData.chnlTyp,
        reqPurp: this.mcgDealRowData.reqPurp,
        chnlCnt: this.mcgDealRowData.chnlCnt,
        maxTps: this.mcgDealRowData.maxTps,
        tp: this.mcgDealRowData.tp,
        moduleNm: this.mcgDealRowData.moduleNm,
        serviceId: this.mcgDealRowData.serviceId,
        serviceNm: this.mcgDealRowData.serviceNm,
        servletUrl: this.mcgDealRowData.servletUrl,
        tcpIp: this.mcgDealRowData.tcpIp,
        tcpPort: this.mcgDealRowData.tcpPort,
        dailyTps: this.mcgDealRowData.dailyTps,
        dablInflu: this.mcgDealRowData.dablInflu,
        mcgRmk: this.mcgDealRowData.mcgRmk,
        reqDt: this.mcgDealRowData.reqDt,
        chnlCom: this.mcgDealRowData.chnlCom,
        chrgrList: this.mcgDealRowData.chrgrRows,
      });

      this.emptyMcgDealFields();
    },

    remove(req) {
      console.log('신청삭제!');
      const idx = this.reqList.indexOf(req);
      this.reqList.splice(idx, 1);

      this.emptyMcgChnlFields();
    },
    emptyMcgDealFields() {
      // this.reqsetting();
      this.mcgDealRowData.chnlNm = '';
      this.mcgDealRowData.chnlId = '';
      this.mcgDealRowData.lnkMthd = '';
      this.mcgDealRowData.chnlTyp = '';
      this.mcgDealRowData.reqPurp = '';
      this.mcgDealRowData.chnlCnt = '';
      this.mcgDealRowData.maxTps = '';
      this.mcgDealRowData.tp = '';
      this.mcgDealRowData.moduleNm = '';
      this.mcgDealRowData.serviceId = '';
      this.mcgDealRowData.serviceNm = '';
      this.mcgDealRowData.servletUrl = '';
      this.mcgDealRowData.tcpIp = '';
      this.mcgDealRowData.tcpPort = '';
      this.mcgDealRowData.dailyTps = '';
      this.mcgDealRowData.dablInflu = '';
      this.mcgDealRowData.mcgRmk = '';
      this.mcgDealRowData.reqDt = '';
      this.mcgDealRowData.chnlCom = '';
      this.mcgDealRowData.chrgrRows = [];
      this.mcgDealRowData.chrgrRows.push({});
    },

    emptyMcgChnlFields() {
      // this.mcgReqNum = '';
      // this.reqsetting();
      this.mcgChnlRowData.chnlNm = '';
      this.mcgChnlRowData.chnlId = '';
      this.mcgChnlRowData.lnkMthd = '';
      this.mcgChnlRowData.chnlTyp = '';
      this.mcgChnlRowData.reqPurp = '';
      this.mcgChnlRowData.chnlCnt = '';
      this.mcgChnlRowData.maxTps = '';
      this.mcgChnlRowData.tp = '';
      this.mcgChnlRowData.serviceId = '';
      this.mcgChnlRowData.serviceNm = '';
      this.mcgChnlRowData.servletUrl = '';
      this.mcgChnlRowData.tcpIp = '';
      this.mcgChnlRowData.tcpPort = '';
      this.mcgChnlRowData.dailyTps = '';
      this.mcgChnlRowData.dablInflu = '';
      this.mcgChnlRowData.mcgRmk = '';
      this.mcgChnlRowData.reqDt = '';
      this.mcgChnlRowData.chnlCom = '';
      this.mcgChnlRowData.virtualUserTeam = '';
      this.mcgChnlRowData.virtualUserOrg = '';
      this.mcgChnlRowData.virtualUserHannm = '';
      this.mcgChnlRowData.chrgrRows = [];
      this.mcgChnlRowData.svrRows = [];
      this.mcgChnlRowData.chrgrRows.push({});
      this.mcgChnlRowData.svrRows.push({});
    },

    savereq() {
      console.log(`채널 저장! length : ${this.reqList.length}`);
      if (this.reqList.length === 0) {
        this.reqList.push({ reqNum: this.reqNum });
        this.notInsert = 'Y';
      } else {
        this.notInsert = 'N';
        for (let i = 0; i < this.reqList.length; i++) {
          this.reqList[i].reqNum = this.reqNum;
          this.reqList[i].procSt = '3';

          if (this.reqList[i].svrList != null && this.reqList[i].svrList.length > 0) {
            for (let is = 0; is < this.reqList[i].svrList.length; is++) {
              this.reqList[i].svrList[is].mcgReqNum = this.reqList[i].mcgReqNum;
              this.reqList[i].svrList[is].reqNum = this.reqNum;
              this.reqList[i].svrList[is].useYn = 'Y';
            }
          }

          if (this.reqList[i].chrgrList != null && this.reqList[i].chrgrList.length > 0) {
            for (let ic = 0; ic < this.reqList[i].chrgrList.length; ic++) {
              this.reqList[i].chrgrList[ic].mcgReqNum = this.reqList[i].mcgReqNum;
              this.reqList[i].chrgrList[ic].reqNum = this.reqNum;
              this.reqList[i].chrgrList[ic].useYn = 'Y';
            }
          }
        }
      }

      this.mcgReqList = { reqList: this.reqList };

      console.log('채널 저장!');

      fetchPutMcgReq(this.mcgReqList)
        .then((res) => {
          console.log(res);
          if (this.notInsert === 'Y') {
            this.reqList.splice(0, 1);
          }
          this.$gf.alertOn('저장되었습니다.');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    dtlReq(req, idx) {
      console.log('상세신청정보조회!', idx);
      this.currIdx = idx;
      if (req.mcgType === '채널') {
        this.dtlChnlShow(req);
      } else if (req.mcgType === '거래') {
        this.dtlDealShow(req);
      }
      console.log(this.reqdtl);
    },
    saveAprvReq() {
      fetchPutIfStepAprvReqAdmin({
        reqNum: this.reqNum,
        ifTyp: 'MCG',
        procSt: this.tgtProcSt,
        hstRmk: this.hstRmk,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('처리되었습니다');
          this.movePage('regListAdmin');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    movePage(page) { // 페이지 이동
      this.activeItem = page; // 헤더에서 내려오는 바에 현 위치 표시
      this.$router.push({ name: page });
    },
    showAddView(type) {
      this.popupType = 'new';
      if (type === 'CHNL') {
        this.emptyMcgChnlFields();
        this.propsChnl = this.mcgChnlRowData;
        this.showChnlDetail = true;
      } else if (type === 'DEAL') {
        this.emptyMcgDealFields();
        this.propsDeal = this.mcgDealRowData;
        this.showDealDetail = true;
      }
    },
    turOffSvrPopChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showChnlDetail = false;
    },
    addDataChnl(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      // val.reqNum = this.reqNum;
      if (this.popupType === 'update') {
        this.dtlChnlUpdate(val);
      } else {
        this.addMcgChnlReq(val);
      }
      // this.onlineInfo = val;
      // this.addOnlineInfo();
      this.showChnlDetail = false;
    },
    turOffSvrPopDeal(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showDealDetail = false;
    },
    addDataDeal(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      // val.reqNum = this.reqNum;
      if (this.popupType === 'update') {
        this.dtlDealUpdate(val);
      } else {
        this.addMcgDealReq(val);
      }
      // this.onlineInfo = val;
      // this.addOnlineInfo();
      this.showDealDetail = false;
    },

  },
};
</script>
