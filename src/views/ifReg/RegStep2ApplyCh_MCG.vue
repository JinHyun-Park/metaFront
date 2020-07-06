<template>
  <div>
    <VirtualUserApplyPopup
      v-if="virtualpopupstate"
      @closePop="turOffPopVitual"
      @addData="addDataVirtual"
    />
    <ChrgrListPopup
      v-if="chrgrpopupstate"
      @closePop="turOffPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        MCG 채널 추가
        <div class="right_button_area">
          <button
            v-if="virtual"
            type="button"
            class="default_button extend on"
            @click="virtualpopon()"
          >
            가상 사용자 추가
          </button>
          <button
            type="button"
            class="default_button extend on"
            @click="addMcgReq()"
          >
            채널 추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label tooltips ov right">신청하고자 하는 인터페이스를 선택해주세요. (SWING 기준)</label>
          <div class="radio_group">
            <span class="default_radio">
              <input
                id="radio_1"
                type="radio"
                name="radio_1"
              >Inbound<label
                class="border-brickpink"
                for="radio_1"
                @click="virtualshow"
              ><span /></label>
            </span>
            <span class="default_radio">
              <input
                id="radio_2"
                type="radio"
                name="radio_1"
              >Outbound<label
                class="border-brickpink"
                for="radio_2"
                @click="virtualhide"
              ><span /></label>
            </span>
          </div>

          <div v-if="virtual">
            가상 사용자를 신청 해주세요.
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="table_colgroup">
        탭 변경시(거래추가) 임시저장 해주세요.
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
      <div class="right_button_area">
        <button
          type="button"
          class="default_button"
          @click="emptyMcgFields"
        >
          항목 비우기
        </button>
      </div>
      <div class="row_contain type-2" />
      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">채널명</label>
          <input
            v-model="chnlNm"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">채널ID</label>
          <input
            v-model="chnlId"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널유형</label>
          <input
            v-model="chnlTyp"
            type="text"
            readonly
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <div class="select_group disabled">
            <select v-model="lnkMthd">
              <option
                v-for="(code, m) in ccCdList.mcgChnlLnkgMthdR"
                :key="m"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">용도</label>
          <input
            v-model="reqPurp"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">내용</label>
          <input
            v-model="chnlCnt"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">예상 일일 건수</label>
          <input
            v-model="dailyTps"
            type="number"
            min="0"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">예상 MAX TPS</label>
          <input
            v-model="maxTps"
            type="number"
            min="0"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">요청일자</label>
          <div class="calander_group">
            <input
              v-model="reqDt"
              type="text"
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
        MCG 채널 서버 정보
      </h5>

      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                서버유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                시스템명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                HOST명<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                Port<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                OS<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP유형<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                추가/수정
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(svrdtl,idx) in svrRows"
              :key="idx"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="svrdtl.svrTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.sysNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.ip"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.port"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.os"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svrdtl.ipTyp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addsRow()"
                />
                <i
                  class="ico-del"
                  @click="removesRow(idx)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row_contain type-2" />
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
import {
  fetchGetMcgReqList,
  fetchGetMcgReqChrgrList,
  fetchGetMcgReqSvrList,
  fetchPutMcgReq,
  fetchPutMcgReqChrgr,
  fetchPutMcgReqServer,
  fetchGetMcgReqNum,
} from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';
import VirtualUserApplyPopup from '@/components/popup/meta/mcg/VirtualUserApplyPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';

export default {
  name: 'RegStep2ApplyChMCG',

  components: { VirtualUserApplyPopup, ChrgrListPopup },

  data() {
    return {
      virtual: false,
      isStatusOn: '',
      chrgrpopupstate: false,
      chrgrn: '',
      chrgropCd: '',
      reqsendList: [],
      svrList: [],
      chrgrList: [],
      currRow: [],
      svrShow: [],
      chrgrShow: [],
      mcgReqNum: '',
      procSt: '',
      mcgType: '채널',
      opCd: '',
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
      mcgReqSvrNum: '',
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
      chnlCom: '',
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
      reqList: [
        {
          chnlNm: '',
          chnlId: '',
          lnkMthd: '',
          chnlTyp: '',
          reqPurp: '',
          chnlCnt: '',
          maxTps: '',
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
      mcgSvrList: {},
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
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
    ...mapState('ifRegInfo', ['reqNum']),
  },
  created() {
    if (this.$route.params.callType === 'update') {
      this.listing(this.reqNum);
    }
    // eventBus.$on('Step2McgSave', () => {
    //   console.log('event Bus 통해 mcg 저장');
    //   this.savereq();
    // });
    // eventBus.$on('MCGREQDTL', (params) => {
    //   console.log('event Bus를 통해 mcg 상세정보 가져옴');
    //   this.dtlshow(params);
    // });
  },
  // mounted() {
  //   eventBus.$emit('MCGREQTEMP', this.reqsendList);
  // },

  mounted() {
    this.today = this.$gf.dateToString(new Date(), '', 'Y');
    this.svrRows.push({});
    this.chrgrRows.push({});
    eventBus.$emit('VirtualReqNum', this.reqsendList);
    // this.reqsetting();

    eventBus.$on('Step2McgSave', () => {
      console.log('event Bus 통해 mcg 저장');
      this.savereq();
    });

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
    ...mapActions('ifRegInfo', ['setTempSaveFlag']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP2MCG', rstCd: rtn,
      });
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
    inputreqDt(val) {
      this.reqDt = val;
    },

    virtualshow() {
      this.virtual = true;
      this.chnlTyp = 'Inbound';
    },
    virtualhide() {
      this.virtual = false;
      this.chnlTyp = 'Outbound';
    },

    virtualpopon() {
      this.virtualpopupstate = true;
    },

    turOffPopVitual() {
      this.virtualpopupstate = false;
    },

    addDataVirtual() {
      this.virtualpopupstate = false;
    },

    chrgrpopon() {
      this.chrgrpopupstate = true;
    },

    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
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

    addsRow() {
      console.log('서버 목록 추가!');
      this.svrRows.push({});
    },
    addcRow() {
      console.log('담당자 목록 추가!');
      this.chrgrRows.push({});
    },

    removesRow(idx) {
      console.log('서버 목록에서 삭제!');
      this.svrRows.splice(idx, 1);
      if (idx === 0) { this.svrRows.push({}); }
    },
    removecRow(idx) {
      console.log('담당자 목록에서 삭제!');
      this.chrgrRows.splice(idx, 1);
      if (idx === 0) { this.chrgrRows.push({}); }
    },

    checksave() {
      if (this.chnlNm === '') {
        this.$gf.alertOn('채널명을 입력 해주세요.');
        return 0;
      }
      if (this.chnlId === '') {
        this.$gf.alertOn('채널ID를 입력 해주세요.');
        return 0;
      }
      if (this.chnlTyp === '') {
        this.$gf.alertOn('채널타입을 선택 해주세요.');
        return 0;
      }
      if (this.lnkMthd === '') {
        this.$gf.alertOn('연동방식을 선택 해주세요.');
        return 0;
      }
      if (this.chrgrRows.name === '') {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      if (this.svrRows.ip === '') {
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
          // console.log(this.svrList);
          // console.log(this.chrgrList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    listchrgr(Num) {
      console.log('채널 담당자 목록 조회!');
      // this.chrgrList.splice(0, 1);
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgReqChrgrList({
        params: {
          mcgReqNum: Num,
        },
      })
        .then((res) => {
          this.chrgrList = res.data.rstData.searchChrgrList;
          // this.svrRowsrcv = res.data.rstData.searchSvrList;
          // this.chrgrRowsrcv = res.data.rstData.searchChrgrList;
          this.chrgrRows.splice(0, this.chrgrRows.length);

          for (let i = 0; i < this.chrgrList.length; i++) {
            this.chrgrRows.push(this.chrgrList[i]);
          }
          console.log(res.data.rstData.searchChrgrList);
          console.log(this.chrgrList);
          console.log(this.chrgrRows);
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

    dtlshow(dtl) {
      this.emptyMcgFields();
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
      this.tcpIp = dtl.tcpIp;
      this.tcpPort = dtl.tcpPort;
      this.dailyTps = dtl.dailyTps;
      this.dablInflu = dtl.dablInflu;
      this.mcgRmk = dtl.mcgRmk;
      this.reqDt = dtl.reqDt;
      this.chnlCom = dtl.chnlCom;

      this.svrRows = dtl.svrList;
      this.chrgrRows = dtl.chrgrList;
      if (this.svrRows.length === 0) {
        this.svrRows.push({});
      }

      if (this.chrgrRows.length === 0) {
        this.chrgrRows.push({});
      }

      // this.listingsvr(dtl.mcgReqNum);
      // this.listchrgr(dtl.mcgReqNum);

      // for (let i = 0; i < this.svrList.length; i++) {
      //   if (this.svrList[i].mcgReqNum === dtl.mcgReqNum) {
      //     this.svrRows.push(this.svrList[i]);
      //   }
      // }

      // for (let i = 0; i < this.chrgrList.length; i++) {
      //   if (this.chrgrList[i].mcgReqNum === dtl.mcgReqNum) {
      //     this.chrgrRows.push(this.chrgrList[i]);
      //   }
      // }
    },

    dtlupdate(idx) {
      if (this.checksave() === 0) {
        return;
      }
      this.reqList[idx].mcgReqNum = this.mcgReqNum;
      this.reqList[idx].mcgType = this.mcgType;
      this.reqList[idx].chnlNm = this.chnlNm;
      this.reqList[idx].chnlId = this.chnlId;
      this.reqList[idx].lnkMthd = this.lnkMthd;
      this.reqList[idx].chnlTyp = this.chnlTyp;
      this.reqList[idx].reqPurp = this.reqPurp;
      this.reqList[idx].chnlCnt = this.chnlCnt;
      this.reqList[idx].maxTps = this.maxTps;
      this.reqList[idx].tp = this.tp;
      this.reqList[idx].serviceId = this.serviceId;
      this.reqList[idx].serviceNm = this.serviceNm;
      this.reqList[idx].servletUrl = this.servletUrl;
      this.reqList[idx].tcpIp = this.tcpIp;
      this.reqList[idx].tcpPort = this.tcpPort;
      this.reqList[idx].dailyTps = this.dailyTps;
      this.reqList[idx].dablInflu = this.dablInflu;
      this.reqList[idx].mcgRmk = this.mcgRmk;
      this.reqList[idx].reqDt = this.reqDt;
      this.reqList[idx].chnlCom = this.chnlCom;

      this.reqList[idx].svrList = this.svrRows;
      this.reqList[idx].chrgrList = this.chrgrRows;


      this.$gf.alertOn(`${this.chnlNm}의 채널 정보가 수정되었습니다.`);
      this.emptyMcgFields();
    },

    addMcgReq() {
      if (this.checksave() === 0) {
        return;
      }
      this.mcgReqNum = this.reqList.length;
      console.log(this.mcgReqNum);
      // this.reqsetting();
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
        tcpIpPort: this.tcpIpPort,
        dailyTps: this.dailyTps,
        dablInflu: this.dablInflu,
        mcgRmk: this.mcgRmk,
        reqDt: this.reqDt,
        chnlCom: this.chnlCom,
        svrList: this.svrRows,
        chrgrList: this.chrgrRows,

      });

      // for (let i = 0; i < this.chrgrRows.length; i++) {
      //   this.chrgrList.push(this.chrgrRows[i]);
      // }

      // for (let i = 0; i < this.svrRows.length; i++) {
      //   this.svrList.push(this.svrRows[i]);
      // }

      this.emptyMcgFields();
      // this.reqsetting();
      // this.savereq();
    },

    remove(req) {
      console.log('신청삭제!');
      const idx = this.reqList.indexOf(req);
      this.reqList.splice(idx, 1);

      this.emptyMcgFields();
    },


    emptyMcgFields() {
      // this.mcgReqNum = '';
      // this.reqsetting();
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
      this.tcpIp = '';
      this.tcpPort = '';
      this.dailyTps = '';
      this.dablInflu = '';
      this.mcgRmk = '';
      this.reqDt = '';
      this.chnlCom = '';
      this.chrgrRows = [];
      this.svrRows = [];
      this.chrgrRows.push({});
      this.svrRows.push({});

      // this.currRow = [
      //   {
      //     mcgReqNum: '',
      //     name: '',
      //     company: '',
      //     phonNum: '',
      //     email: '',
      //     role: '',
      //     chrgrId: '',
      //   },
      // ];
      // this.svrRows = [
      //   {
      //     mcgReqNum: '',
      //     svrTyp: '',
      //     hostNm: '',
      //     ip: '',
      //     port: '',
      //     os: '',
      //     ipTyp: '',
      //     hanNm: '',
      //     chrgrId: '',
      //   },
      // ];
      // this.chrgrRows = [];
      // this.reqsetting();
    },

    savereq() {
      console.log('채널 저장!');
      for (let i = 0; i < this.reqList.length; i++) {
        this.reqList[i].reqNum = this.reqNum;
        this.reqList[i].procSt = '1';

        for (let is = 0; is < this.reqList[i].svrList.length; is++) {
          console.log('서버 저장!');
          this.reqList[i].svrList[is].mcgReqNum = this.reqList[i].mcgReqNum;
          this.reqList[i].svrList[is].reqNum = this.reqNum;
          this.reqList[i].svrList[is].useYn = 'Y';
        }
        // this.mcgSvrList = { svrRows: this.svrRows };

        for (let ic = 0; ic < this.reqList[i].chrgrList.length; ic++) {
          console.log('담당자 저장!');
          this.reqList[i].chrgrList[ic].mcgReqNum = this.reqList[i].mcgReqNum;
          this.reqList[i].chrgrList[ic].reqNum = this.reqNum;
          this.reqList[i].chrgrList[ic].useYn = 'Y';
        }
      }
      if (this.reqList.length === 0) {
        this.mcgReqList = { reqNum: this.reqNum };
      } else {
        this.mcgReqList = { reqList: this.reqList };
      }

      // for (let i = 0; i < this.svrRows.length; i++) {
      //   this.svrRows[i].reqNum = this.reqNum;
      //   this.svrRows[i].useYn = 'Y';
      // }
      this.mcgSvrList = { svrRows: this.svrRows };

      // for (let i = 0; i < this.chrgrRows.length; i++) {
      //   this.chrgrRows[i].reqNum = this.reqNum;
      //   this.chrgrRows[i].useYn = 'Y';
      // }
      this.mcgChrgrList = { chrgrRows: this.chrgrRows };


      console.log('채널 저장!');

      fetchPutMcgReq(this.mcgReqList)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'E') {
            this.setTempSave(false);
          } else {
            this.setTempSave(true);
            // this.savereqchrgr(this.mcgChrgrList);
            // this.savereqserver(this.mcgSvrList);
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

    dtlReq(req, idx) {
      // let svrinfotemp = [];
      console.log('상세신청정보조회!', idx);
      this.dtlshow(req);
      console.log(this.reqdtl);
    },
    savereqserver(svrList) {
      fetchPutMcgReqServer(svrList)
        .then((res) => {
          console.log(res);
          this.setTempSave(true);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
          this.setTempSave(false);
        });
    },
  },
};
</script>
