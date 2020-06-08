<template>
  <div>
    <!--
                <section class="small_tabs">
                    <ul>
                        <li class="ov">온라인</li>
                        <li>파일</li>
                    </ul>
                </section>
-->

    <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        MCG 채널 추가
        <div class="right_button_area">
          <button
            v-if="virtual"
            type="button"
            class="default_button extend on"
          >
            가상 사용자 추가
          </button>
          <button
            type="button"
            class="default_button extend on"
            @click="addMcgReq()"
          >
            인터페이스 추가
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

          |
        </div>
      </div>


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
            <select disabled>
              <option value="">
                Y
              </option>
              <option
                value=""
                selected
              >
                N
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
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">예상 MAX TPS</label>
          <input
            v-model="maxTps"
            type="text"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">요청일자</label>
          <div class="calander_group first_cal">
            <input
              v-model="reqDt"
              type="text"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">&nbsp;</label>
          <div class="calander_group">
            <input
              type="text"
              value="2019-08-07"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2 except-2">
        <div class="column w-1">
          <label class="column_label">서버 정보 추가</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-3" />
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              시스템명<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              호스트명<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              IP(VIP)<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              IP(NAT)<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              OS<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              고객사<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              방향<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              송신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              수신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
          </ul>
        </div>
      </div>
      <div class="row_contain type-2 except-2">
        <div class="column w-1">
          <label class="column_label">담당자 추가</label>
          <div class="search_group">
            <input
              type="text"
              value="유영준"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-3" />
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              OPS ID<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              담당자명<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              부서<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              고객사<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              이메일<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              연락처<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              role<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              채널
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              송신지
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              매니저
            </li>
          </ul>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              채널명<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              채널ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              채널유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              연동방식<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              요청일자<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              채널 담당자<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              신청자<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row">
            <li class="td_cell">
              Mywolrd
            </li>
            <li class="td_cell">
              MWD
            </li>
            <li class="td_cell">
              Inbound
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
            <li class="td_cell">
              2 documents
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Yourworld
            </li>
            <li class="td_cell">
              YWD
            </li>
            <li class="td_cell">
              Outbound
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
          </ul>
          <ul class="table_row">
            <li class="td_cell">
              Tworld
            </li>
            <li class="td_cell">
              TWD
            </li>
            <li class="td_cell">
              Ch to Ch
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
            <li class="td_cell">
              q sign
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  fetchGetMcgReqList,
  fetchPutMcgReq,
  fetchPutMcgReqChrgr,
  fetchPutMcgReqServer,
} from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';

export default {
  name: 'RegStep2ApplyChMCG',

  data() {
    return {
      virtual: false,
      isStatusOn: '',
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
      ccompany: '',
      phonNum: '',
      email: '',
      crole: '',
      chnlCom: '',
      useYn: '',

    };
  },

  created() {
    eventBus.$on('Step2GetMCGReqMst', (params) => {
      console.log(`event Bus 통해 Step1 조회 params: ${params.reqNum}`);
      this.listing(params.reqNum);
    });
    eventBus.$on('Step2McgSave', (params) => {
      console.log('event Bus 통해 mcg 저장');
      if (params.reqNum != null) {
        this.reqNum = params.reqNum;
      }
      this.savereq();
    });
    console.log(`parent reqNum : ${this.$parent.reqNum}`);

    // eventBus.$on('MCGREQDTL', (params) => {
    //   console.log('event Bus를 통해 mcg 상세정보 가져옴');
    //   this.dtlshow(params);
    // });
  },
  // mounted() {
  //   eventBus.$emit('MCGREQTEMP', this.reqsendList);
  // },
  destroyed() {
    eventBus.$off('Step2McgSave');
    eventBus.$off('Step2GetMcgReqMst');
  },


  methods: {
    virtualshow() {
      this.virtual = true;
      this.chnlTyp = 'Inbound';
    },
    virtualhide() {
      this.virtual = false;
      this.chnlTyp = 'Outbound';
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
      this.mcgReqNum = '';
      this.mcgType = '';
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

    savereq() {
      for (let i = 0; i < this.reqList.length; i++) {
        this.reqList[i].reqNum = this.reqNum;
        this.reqList[i].procSt = '1';
      }

      fetchPutMcgReq(this.reqList)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('채널 신청 완료!');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    savereqchrgr() {
      fetchPutMcgReqChrgr({
        mcgReqNum: this.mcgReqNum,
        reqNum: this.reqNum,
        mcgReqChrgrNum: this.mcgReqChrgrNum,
        userId: this.userId,
        name: this.name,
        company: this.ccompany,
        phonNum: this.phonNum,
        email: this.email,
        role: this.crole,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('채널 담당자 신청 완료!');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
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
          this.$gf.alertOn('채널 서버 신청 완료!');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
