<template>
  <div class="contents popup">
    <ChrgrListPopup
      v-if="chrgrpopupstate"
      @closePop="turOffPopChrgr"
      @addData="addDataChrgr"
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
          MCG 채널 추가
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
                @click="searchOnChrgr()"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="searchOnChrgr()"
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

export default {
  name: 'McgChnlDetailPopup',
  components: {
    ChrgrListPopup,
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
      opClCd: 'MCG', cdId: 'LNKG_MTHD', allYn: 'Y', listNm: 'mcgChnlLnkgMthd',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNKG_MTHD', allYn: 'N', listNm: 'mcgChnlLnkgMthdR',
    });
    this.mcgChnlRowData = this.propData;
    // this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkChnlSave() === 0) {
        return;
      }
      this.$emit('addData', this.mcgChnlRowData);
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
      if (this.mcgChnlRowData.chrgrRows == null) {
        this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
        return 0;
      }
      for (let i = 0; i < this.mcgChnlRowData.chrgrRows.length; i++) {
        if (this.mcgChnlRowData.chrgrRows[i].name === '') {
          this.$gf.alertOn('채널 담당자를 1명 이상 입력 해주세요.');
          return 0;
        }
      }

      if (this.mcgChnlRowData.svrRows == null) {
        this.$gf.alertOn('서버를 1개 이상 입력 해주세요.');
        return 0;
      }
      for (let i = 0; i < this.mcgChnlRowData.svrRows.length; i++) {
        if (this.mcgChnlRowData.svrRows[i].ip === '') {
          this.$gf.alertOn('서버를 1개 이상 입력 해주세요.');
          return 0;
        }
      }

      return 1;
    },

    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);

      this.mcgChnlRowData.chrgrRows[this.row].name = val.hanNm;
      this.mcgChnlRowData.chrgrRows[this.row].company = val.orgCd;
      this.mcgChnlRowData.chrgrRows[this.row].chrgrId = val.userId;
      this.mcgChnlRowData.chrgrRows[this.row].phonNum = val.mblPhonNum;
      this.mcgChnlRowData.chrgrRows[this.row].email = val.emailAddr;

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
      this.reqDt = val;
    },
  },
};
</script>
