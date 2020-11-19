<template>
  <div class="contents popup">
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
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <!--<section class="title style-2">
        <h2><i class="ico-bar" />EAI 인터페이스 등록</h2>
      </section>-->
      <section
        class="form_area border_group several_table"
      >
        <h5 class="s_tit type-2">
          MCG 거래 추가
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
              readonly
            >
          </div>
          <div class="column w-2">
            <label class="column_label">연동방식</label>
            <input
              v-model="mcgDealRowData.lnkMthd"
              type="text"
              readonly
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
              v-model="mcgDealRowData.timeOut"
              type="number"
              min="0"
              oninput="this.value = Math.abs(this.value)"
              style="text-align:right"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">요청일자</label>
            <div class="calander_group">
              <input
                v-model="mcgDealRowData.reqDt"
                type="text"
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
        <div class="table_colgroup">
          <div class="table_grid">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  이름
                </li>
                <li class="th_cell">
                  회사
                </li>
                <li class="th_cell">
                  연락처
                </li>
                <li class="th_cell">
                  이메일
                </li>
                <li class="th_cell">
                  역할
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
                    @click="searchOnChrgr(idx)"
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

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
        <button
          type="button"
          class="default_button on"
          @click="addData"
        >
          저장
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import ChnlListPopup from '@/components/popup/meta/mcg/ChnListPopup.vue';

export default {
  name: 'McgDealDetailPopup',
  components: {
    ChrgrListPopup,
    ChnlListPopup,
  },
  props: {
    propData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chrgrpopupstate: false,
      chnlpopupstate: false,

      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
      today: '',
      reqDt: '',

      row: 0,

      // 채널 row data
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
        timeOut: '',
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

      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.today = this.$gf.dateToString(new Date(), '', 'Y');
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNK_MTHD', allYn: 'Y', listNm: 'mcgChnlLnkMthd',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNK_MTHD', allYn: 'N', listNm: 'mcgChnlLnkMthdR',
    });
    this.mcgDealRowData = this.propData;
    // this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkDealSave() === 0) {
        return;
      }
      this.$emit('addData', this.mcgDealRowData);
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
      if (this.mcgDealRowData.chrgrRows == null) {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      if (this.mcgDealRowData.chrgrRows.length === 0) {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      return 1;
    },

    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);

      this.mcgDealRowData.chrgrRows[this.row].name = val.hanNm;
      this.mcgDealRowData.chrgrRows[this.row].company = val.orgCd;
      this.mcgDealRowData.chrgrRows[this.row].chrgrId = val.userId;
      this.mcgDealRowData.chrgrRows[this.row].phonNum = val.mblPhonNum;
      this.mcgDealRowData.chrgrRows[this.row].email = val.emailAddr;

      this.chrgrpopupstate = false;
    },

    chrgrpopon() {
      this.chrgrpopupstate = true;
    },
    turOffPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.chrgrpopupstate = false;
    },
    searchOnChrgr(row) {
      this.row = row;
      this.chrgrpopon(row);
    },
    inputreqDt(val) {
      this.mcgDealRowData.reqDt = val;
    },
    addcRow() {
      console.log('채널 담당자 목록 추가!');
      this.mcgDealRowData.chrgrRows.push({});
    },
    removecRow(idx) {
      console.log('담당자 목록에서 삭제!');
      this.mcgDealRowData.chrgrRows.splice(idx, 1);
      if (idx === 0) { this.mcgDealRowData.chrgrRows.push({}); }
    },
  },
};
</script>
