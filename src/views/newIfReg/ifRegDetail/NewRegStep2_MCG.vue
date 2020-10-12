<template>
  <div>
    <ProcMsgPopup
      v-if="procMsgPopup"
      v-bind="popupProp"
      @closePop="turnOffProcMsg"
      @addData="addProcMsg"
    />
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
        MCG 신청
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
    <section
      v-if="isChnlShow"
      class="form_area border_group several_table"
    >
      <h5 class="s_tit type-2">
        MCG 채널 추가
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="emptyMcgChnlFields"
          >
            항목 비우기
          </button>
          <button
            type="button"
            class="default_button on"
            @click="addMcgChnlReq"
          >
            채널 추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">채널명</label>
          <input
            v-model="mcgChnlRowData.chnlNm"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">채널ID</label>
          <input
            v-model="mcgChnlRowData.chnlId"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널유형</label>
          <input
            v-model="mcgChnlRowData.chnlTyp"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <div class="select_group disabled">
            <select v-model="mcgChnlRowData.lnkMthd">
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
            v-model="mcgChnlRowData.reqPurp"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">내용</label>
          <input
            v-model="mcgChnlRowData.chnlCnt"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">예상 일일 건수</label>
          <input
            v-model="mcgChnlRowData.dailyTps"
            type="number"
            min="0"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">예상 MAX TPS</label>
          <input
            v-model="mcgChnlRowData.maxTps"
            type="number"
            min="0"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">요청일자</label>
          <div class="calander_group">
            <input
              v-model="mcgChnlRowData.reqDt"
              type="text"
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="mcgChnlRowData.reqDt"
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
                추가/삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(svrdtl,idx) in mcgChnlRowData.svrRows"
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
              v-for="(chrgrdtl,idx) in mcgChnlRowData.chrgrRows"
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
    <section
      v-if="isDealShow"
      class="form_area border_group several_table"
    >
      <h5 class="s_tit type-2">
        MCG 거래 추가
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="emptyMcgDealFields"
          >
            항목 비우기
          </button>
          <button
            type="button"
            class="default_button on"
            @click="addMcgDealReq"
          >
            거래 추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-3">
          <label class="column_label">채널명</label>
          <div class="search_group">
            <input
              v-model="mcgDealRowData.chnlNm"
              type="text"

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
            v-model="mcgDealRowData.chnlId"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">채널유형</label>
          <input
            v-model="mcgDealRowData.chnlTyp"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <input
            v-model="mcgDealRowData.lnkMthd"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">모듈명</label>
          <input
            v-model="mcgDealRowData.moduleNm"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">호출서비스</label>
          <input
            v-model="mcgDealRowData.tp"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain odd">
        <div class="column w-1">
          <label class="column_label">서비스ID</label>
          <input
            v-model="mcgDealRowData.serviceId"
            type="text"
            value="Interface1"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">서비스명</label>
          <input
            v-model="mcgDealRowData.serviceNm"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Servlet URL</label>
          <input
            v-model="mcgDealRowData.servletUrl"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">TCP IP</label>
          <input
            v-model="mcgDealRowData.tcpIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">TCP PORT</label>
          <input
            v-model="mcgDealRowData.tcpPort"
            type="number"
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
              v-model="mcgDealRowData.reqDt"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="mcgDealRowData.reqDt"
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
        MCG 거래 담당자 정보
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
              v-for="(chrgrdtl,idx) in mcgDealRowData.chrgrRows"
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
                  @click="addDealChrgrRow()"
                />
                <i
                  class="ico-del"
                  @click="removeDealChrgrRow(idx)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="btm_button_area">
      <button
        v-if="isOperBtn"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(5)"
      >
        운영반영 완료
      </button>
      <button
        v-if="isDevBtn"
        type="button"
        class="default_button on"
        @click="aprvMsgReq(4)"
      >
        개발반영 완료
      </button>
      <button
        v-if="isDevBtnReject"
        type="button"
        class="default_button"
        @click="aprvMsgReq(3)"
      >
        접수중
      </button>
      <button
        v-if="isBtnReject"
        type="button"
        class="default_button"
        @click="aprvMsgReq(1)"
      >
        반려
      </button>
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
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';
import ProcMsgPopup from '@/components/popup/ifRegInfo/ProcMsgPopup.vue';
import { fetchPutIfStepAprvReqAdmin } from '@/api/ifRegApi';

export default {
  name: 'RegStep2ApplyChMCG',

  components: {
    VirtualUserApplyPopup, ChrgrListPopup, ProcMsgPopup, ChnlListPopup,
  },


  data() {
    return {
      isChnlShow: false,
      isDealShow: false,

      procMsgPopup: false,
      popupProp: {
        procSt: '',
      },
      hstRmk: '',

      virtual: true,
      isStatusOn: '',
      chnlpopupstate: false,
      chrgrpopupstate: false,
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
    // this.reqsetting();
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


    showAddView(type) {
      this.emptyMcgChnlFields();
      this.emptyMcgDealFields();
      if (type === 'CHNL') {
        this.isDealShow = false;
        this.isChnlShow = true;
      } else if (type === 'DEAL') {
        this.isChnlShow = false;
        this.isDealShow = true;
      }
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

      if (this.isChnlShow) {
        this.mcgChnlRowData.chrgrRows[this.mcgChnlRowData.chrgrRows.length - 1].name = val.hanNm;
        this.mcgChnlRowData.chrgrRows[this.mcgChnlRowData.chrgrRows.length - 1].company = val.orgCd;
        this.mcgChnlRowData.chrgrRows[this.mcgChnlRowData.chrgrRows.length - 1].chrgrId = val.userId;
        this.mcgChnlRowData.chrgrRows[this.mcgChnlRowData.chrgrRows.length - 1].phonNum = val.mblPhonNum;
        this.mcgChnlRowData.chrgrRows[this.mcgChnlRowData.chrgrRows.length - 1].email = val.emailAddr;
      } else {
        this.mcgDealRowData.chrgrRows[this.mcgDealRowData.chrgrRows.length - 1].name = val.hanNm;
        this.mcgDealRowData.chrgrRows[this.mcgDealRowData.chrgrRows.length - 1].company = val.orgCd;
        this.mcgDealRowData.chrgrRows[this.mcgDealRowData.chrgrRows.length - 1].chrgrId = val.userId;
        this.mcgDealRowData.chrgrRows[this.mcgDealRowData.chrgrRows.length - 1].phonNum = val.mblPhonNum;
        this.mcgDealRowData.chrgrRows[this.mcgDealRowData.chrgrRows.length - 1].email = val.emailAddr;
      }

      this.chrgrpopupstate = false;
    },

    addsRow() {
      console.log('채널 서버 목록 추가!');
      this.mcgChnlRowData.svrRows.push({});
    },
    addcRow() {
      console.log('채널 담당자 목록 추가!');
      this.mcgChnlRowData.chrgrRows.push({});
    },

    addDealChrgrRow() {
      console.log('거래 담당자 목록 추가!');
      this.mcgDealRowData.chrgrRows.push({});
    },

    removesRow(idx) {
      console.log('서버 목록에서 삭제!');
      this.mcgChnlRowData.svrRows.splice(idx, 1);
      if (idx === 0) { this.mcgChnlRowData.svrRows.push({}); }
    },
    removecRow(idx) {
      console.log('담당자 목록에서 삭제!');
      this.mcgChnlRowData.chrgrRows.splice(idx, 1);
      if (idx === 0) { this.mcgChnlRowData.chrgrRows.push({}); }
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

      this.mcgChnlRowData.svrRows = dtl.svrList;
      this.mcgChnlRowData.chrgrRows = dtl.chrgrList;
      if (this.mcgChnlRowData.svrRows.length === 0) {
        this.mcgChnlRowData.svrRows.push({});
      }

      if (this.mcgChnlRowData.chrgrRows.length === 0) {
        this.mcgChnlRowData.chrgrRows.push({});
      }
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
    },

    dtlupdate(idx) {
      if (this.reqList[idx].mcgType === '채널') {
        this.dtlChnlUpdate(idx);
      } else if (this.reqList[idx].mcgType === '거래') {
        this.dtlDealUpdate(idx);
      }
    },

    dtlChnlUpdate(idx) {
      if (this.checkChnlSave() === 0) {
        return;
      }
      this.reqList[idx].mcgReqNum = this.mcgChnlRowData.mcgReqNum;
      this.reqList[idx].mcgType = this.mcgChnlRowData.mcgType;
      this.reqList[idx].chnlNm = this.mcgChnlRowData.chnlNm;
      this.reqList[idx].chnlId = this.mcgChnlRowData.chnlId;
      this.reqList[idx].lnkMthd = this.mcgChnlRowData.lnkMthd;
      this.reqList[idx].chnlTyp = this.mcgChnlRowData.chnlTyp;
      this.reqList[idx].reqPurp = this.mcgChnlRowData.reqPurp;
      this.reqList[idx].chnlCnt = this.mcgChnlRowData.chnlCnt;
      this.reqList[idx].maxTps = this.mcgChnlRowData.maxTps;
      this.reqList[idx].tp = this.mcgChnlRowData.tp;
      this.reqList[idx].serviceId = this.mcgChnlRowData.serviceId;
      this.reqList[idx].serviceNm = this.mcgChnlRowData.serviceNm;
      this.reqList[idx].servletUrl = this.mcgChnlRowData.servletUrl;
      this.reqList[idx].tcpIp = this.mcgChnlRowData.tcpIp;
      this.reqList[idx].tcpPort = this.mcgChnlRowData.tcpPort;
      this.reqList[idx].dailyTps = this.mcgChnlRowData.dailyTps;
      this.reqList[idx].dablInflu = this.mcgChnlRowData.dablInflu;
      this.reqList[idx].mcgRmk = this.mcgChnlRowData.mcgRmk;
      this.reqList[idx].reqDt = this.mcgChnlRowData.reqDt;
      this.reqList[idx].chnlCom = this.mcgChnlRowData.chnlCom;

      this.reqList[idx].svrList = this.mcgChnlRowData.svrRows;
      this.reqList[idx].chrgrList = this.mcgChnlRowData.chrgrRows;

      this.$gf.alertOn(`${this.mcgChnlRowData.chnlNm}의 채널 정보가 수정되었습니다.`);
      this.emptyMcgChnlFields();
    },

    dtlDealUpdate(idx) {
      if (this.checkDealSave() === 0) {
        return;
      }
      this.reqList[idx].mcgReqNum = this.mcgDealRowData.mcgReqNum;
      this.reqList[idx].mcgType = '거래';
      this.reqList[idx].chnlNm = this.mcgDealRowData.chnlNm;
      this.reqList[idx].chnlId = this.mcgDealRowData.chnlId;
      this.reqList[idx].lnkMthd = this.mcgDealRowData.lnkMthd;
      this.reqList[idx].chnlTyp = this.mcgDealRowData.chnlTyp;
      this.reqList[idx].reqPurp = this.mcgDealRowData.reqPurp;
      this.reqList[idx].chnlCnt = this.mcgDealRowData.chnlCnt;
      this.reqList[idx].maxTps = this.mcgDealRowData.maxTps;
      this.reqList[idx].tp = this.mcgDealRowData.tp;
      this.reqList[idx].moduleNm = this.mcgDealRowData.moduleNm;
      this.reqList[idx].serviceId = this.mcgDealRowData.serviceId;
      this.reqList[idx].serviceNm = this.mcgDealRowData.serviceNm;
      this.reqList[idx].servletUrl = this.mcgDealRowData.servletUrl;
      this.reqList[idx].tcpIp = this.mcgDealRowData.tcpIp;
      this.reqList[idx].tcpPort = this.mcgDealRowData.tcpPort;
      this.reqList[idx].dailyTps = this.mcgDealRowData.dailyTps;
      this.reqList[idx].dablInflu = this.mcgDealRowData.dablInflu;
      this.reqList[idx].mcgRmk = this.mcgDealRowData.mcgRmk;
      this.reqList[idx].reqDt = this.mcgDealRowData.reqDt;
      this.reqList[idx].chnlCom = this.mcgDealRowData.chnlCom;

      this.reqList[idx].chrgrList = this.mcgDealRowData.chrgrRows;

      this.$gf.alertOn(`${this.mcgDealRowData.chnlNm}의 거래 정보가 수정되었습니다.`);
      this.emptyMcgDealFields();
    },

    addMcgChnlReq() {
      if (this.checkChnlSave() === 0) {
        return;
      }
      this.mcgChnlRowData.mcgReqNum = this.reqList.length;
      console.log(this.mcgReqNum);
      this.reqList.push({
        mcgReqNum: this.mcgChnlRowData.mcgReqNum,
        reqNum: this.reqNum,
        mcgType: this.mcgChnlRowData.mcgType,
        opCd: this.mcgChnlRowData.opCd,
        chnlNm: this.mcgChnlRowData.chnlNm,
        chnlId: this.mcgChnlRowData.chnlId,
        lnkMthd: this.mcgChnlRowData.lnkMthd,
        chnlTyp: this.mcgChnlRowData.chnlTyp,
        reqPurp: this.mcgChnlRowData.reqPurp,
        chnlCnt: this.mcgChnlRowData.chnlCnt,
        maxTps: this.mcgChnlRowData.maxTps,
        tp: this.mcgChnlRowData.tp,
        serviceId: this.mcgChnlRowData.serviceId,
        serviceNm: this.mcgChnlRowData.serviceNm,
        servletUrl: this.mcgChnlRowData.servletUrl,
        tcpIpPort: this.mcgChnlRowData.tcpIpPort,
        dailyTps: this.mcgChnlRowData.dailyTps,
        dablInflu: this.mcgChnlRowData.dablInflu,
        mcgRmk: this.mcgChnlRowData.mcgRmk,
        reqDt: this.mcgChnlRowData.reqDt,
        chnlCom: this.mcgChnlRowData.chnlCom,
        svrList: this.mcgChnlRowData.svrRows,
        chrgrList: this.mcgChnlRowData.chrgrRows,
      });
      this.emptyMcgChnlFields();
    },

    addMcgDealReq() {
      if (this.checkDealSave() === 0) {
        return;
      }
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

    checkDealSave() {
      if (this.mcgDealRowData.chnlNm === '') {
        this.$gf.alertOn('채널명을 입력 해주세요.');
        return 0;
      }
      if (this.mcgDealRowData.chnlId === '') {
        this.$gf.alertOn('채널ID를 입력 해주세요.');
        return 0;
      }
      if (this.mcgDealRowData.chnlTyp === '') {
        this.$gf.alertOn('채널타입을 선택 해주세요.');
        return 0;
      }
      if (this.mcgDealRowData.lnkMthd === '') {
        this.$gf.alertOn('연동방식을 선택 해주세요.');
        return 0;
      }
      if (this.mcgDealRowData.chrgrRows.length === 0) {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      return 1;
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
      // this.svrRows = [];
      this.mcgDealRowData.chrgrRows.push({});
      // this.svrRows.push({});
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
      if (req.mcgType === '채널') {
        this.isDealShow = false;
        this.isChnlShow = true;
        this.dtlChnlShow(req);
      } else if (req.mcgType === '거래') {
        this.isChnlShow = false;
        this.isDealShow = true;
        this.dtlDealShow(req);
      }

      console.log(this.reqdtl);
    },
    aprvMsgReq(tgtProcSt) {
      if (tgtProcSt === 1) {
        this.$gf.alertOn('반려는 아직 지원하지 않습니다.');
        return;
      }
      this.tgtProcSt = tgtProcSt;
      this.turnOnProcMsg();
    },
    turnOnProcMsg() {
      this.popupProp.procSt = this.tgtProcSt;
      this.procMsgPopup = true;
    },
    turnOffProcMsg(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.procMsgPopup = false;
    },
    addProcMsg(val) {
      this.procMsgPopup = false;
      this.hstRmk = val;
      this.saveAprvReq();
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
      this.mcgDealRowData.chnlId = val.chnlId;
      this.mcgDealRowData.chnlNm = val.chnlNm;
      this.mcgDealRowData.chnlTyp = val.chnlTyp;
      this.mcgDealRowData.lnkMthd = val.lnkMthd;

      console.log();
    },
  },
};
</script>
