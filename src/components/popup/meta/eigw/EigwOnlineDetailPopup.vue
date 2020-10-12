<template>
  <div class="contents popup">
    <InstListPopup
      v-if="svrOnInstList"
      v-bind="propsInstList"
      @closePop="turOffSvrPopInstList"
      @addData="addDataInstList"
    />
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <EigwChrgrListPopup
      v-if="svrOnEigwChrgr"
      v-bind="propsEigwChrgr"
      @closePop="turOffSvrPopChrgr"
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
        class="form_area border_group"
      >
        <h5 class="s_tit type-2">
          기본 정보
        </h5>

        <div class="row_contain type-2">
          <div class="column w-1">
            <label class="column_label">I/F ID</label>
            <div class="search_group">
              <input
                v-model="onlineInfo.eigwIfId"
                type="text"
                class="add_text on"
              >
            </div>
          </div>
          <div class="column w-1">
            <label class="column_label">I/F명</label>
            <div class="search_group">
              <input
                v-model="onlineInfo.eigwIfNm"
                type="text"
                class="add_text on"
              >
              <span class="tooltips right ov">
                <i class="tip_contn"><em class="tip_text">신규 I/F의 경우, EAI에서 등록 후 신청바랍니다.</em></i>
              </span>
            </div>
          </div>
        </div>

        <!-- ONLINE -->
        <div class="row_contain type-2">
          <div class="column w-1">
            <label class="column_label">대외기관</label>
            <div class="search_group">
              <input
                v-model="onlineInfo.instNm"
                type="text"
                class="add_text on"
                @click="turnOnSvrPopInstList(-1, 'on')"
              >
              <span class="search">
                <i class="ico-search" />
              </span>
            </div>
          </div>
          <div class="column w-1">
            <label class="column_label">프로그램유형</label>
            <div class="select_group">
              <select v-model="onlineInfo.pgmTyp">
                <option
                  value="CLIENT"
                  selected
                >
                  Client
                </option>
                <option value="SERVER">
                  Server
                </option>
              </select>
              <span class="select" />
            </div>
          </div>
          <div class="column w-1">
            <label class="column_label">연결유형</label>
            <div class="select_group">
              <select v-model="onlineInfo.linkTyp">
                <option
                  value="CONN"
                  selected
                >
                  연결유지형
                </option>
                <option value="DISCONN">
                  비연결형
                </option>
              </select>
              <span class="select" />
            </div>
          </div>
          <div class="column w-1">
            <div class="search_group">
              <input
                v-model="onlineInfo.instCd"
                type="hidden"
                class="add_text on"
              >
            </div>
          </div>
          <div class="column w-1" />
        </div>
        <!-- ONLINE //-->

        <div class="row_contain type-2">
          <div class="column w-1">
            <label class="column_label">개발 REAL IP</label>
            <input
              v-model="onlineInfo.devRealIp"
              type="text"
              class="add_text on"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">개발 Port</label>
            <input
              v-model="onlineInfo.devPort"
              type="number"
              class="add_text on"
            >
          </div>
          <div class="column w-1">
            <label class="column_label tooltips ov top">운영 REAL IP</label>
            <input
              v-model="onlineInfo.prodRealIp"
              type="text"
              class="add_text on"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">운영 Port</label>
            <input
              v-model="onlineInfo.prodPort"
              type="number"
              class="add_text on"
            >
          </div>
          <div class="column w-1" />
        </div>
        <div class="row_contain type-2">
          <div class="column w-4">
            <label class="column_label">기타 요청사항</label>
            <input
              v-model="onlineInfo.eigwRmk"
              type="text"
              class="add_text on"
            >
          </div>
          <div class="column w-1" />
        </div>
        <h5 class="s_tit type-2">
          담당자 정보
        </h5>
        <label class="column_label">검색이 되지 않는 신규인력은 구분에 '입력'을 선택하고 정보를 기입해주세요.</label>
        <div class="table_colgroup">
          <div class="table_grid">
            <div class="table_head w-auto except">
              <ul>
                <li class="th_cell">
                  구분
                </li>
                <li class="th_cell">
                  기관
                </li>
                <li class="th_cell">
                  이름
                </li>
                <li class="th_cell">
                  직급
                </li>
                <li class="th_cell">
                  연락처
                </li>
                <li class="th_cell">
                  E-mail
                </li>
                <li class="th_cell">
                  삭제
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(row, i) in onlineUserList"
                :key="row.userId"
                class="table_row form_type except w-auto"
              >
                <li class="td_cell">
                  <div class="select_group">
                    <select v-model="row.chrgrTyp">
                      <option value="">
                        전체
                      </option>
                      <option value="in">
                        내부운영
                      </option>
                      <option value="out">
                        대외기관
                      </option>
                      <option value="new">
                        입력
                      </option>
                    </select>
                    <span class="select" />
                  </div>
                </li>
                <li class="td_cell">
                  <input
                    v-model="row.instNm"
                    type="text"
                    @click="searchOnChrgr(i)"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="row.hanNm"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <div class="select_group">
                    <select v-model="row.ofcLvlCd">
                      <option
                        v-for="(code, n) in ccCdList.ofcLvlCd"
                        :key="n"
                        :value="code.cdDtlId"
                      >
                        {{ code.cdNm }}
                      </option>
                    </select>
                    <span class="select" />
                  </div>
                </li>
                <li class="td_cell">
                  <input
                    v-model="row.mblPhonNum"
                    type="text"
                  >
                </li>
                <li class="td_cell">
                  <input
                    v-model="row.emailAddr"
                    type="text"
                  >
                </li>
                <td class="td_cell">
                  <i
                    class="ico-add"
                    @click="addOnlineUser(i)"
                  />
                  <i
                    class="ico-del"
                    @click="delOnlineUser(i)"
                  />
                </td>
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
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EigwChrgrListPopup from '@/components/popup/meta/eigw/EigwChrgrListPopup.vue';

export default {
  name: 'EigwOnlineDetailPopup',
  components: {
    InstListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
  },
  props: {
    propData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      svrOnChrgr: false,
      svrOnEigwChrgr: false,
      propsChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      propsEigwChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      onlineInfo: {
        eigwIfId: '',
        eigwIfNm: '',
        eigwType: '',
        dablInflu: '',
        procSt: '',
        eigwRmk: '',
        instCd: '',
        pgmTyp: '',
        linkTyp: '',
        srFlag: '',
        instNm: '',
        devRealIp: '',
        devPort: '',
        prodRealIp: '',
        prodPort: '',
      },
      onlineUserList: [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ],

      svrOnChrgr: false,
      propsChrgr: {
        message: '',
      },
      callChrgr: '',

      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
    // this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkFields() === 0) {
        return;
      }
      this.$emit('addData', this.eaiIfDetail);
    },

    turnOnSvrPopChrgr(callChrgr) {
      this.callChrgr = callChrgr;
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;

      // this.chrgrId = val.userId;
      if (this.callChrgr === 1) {
        this.eaiIfDetail.sndChrgrId1 = val.userId;
        this.eaiIfDetail.sndChrgrNm1 = val.hanNm;
        this.eaiIfDetail.sndChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 2) {
        this.eaiIfDetail.sndChrgrId2 = val.userId;
        this.eaiIfDetail.sndChrgrNm2 = val.hanNm;
        this.eaiIfDetail.sndChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 3) {
        this.eaiIfDetail.sndChrgrMngrId = val.userId;
        this.eaiIfDetail.sndChrgrMngrNm = val.hanNm;
        this.eaiIfDetail.sndChrgrMngrOrgNm = val.orgNm;
      }
      if (this.callChrgr === 4) {
        this.eaiIfDetail.rcvChrgrId1 = val.userId;
        this.eaiIfDetail.rcvChrgrNm1 = val.hanNm;
        this.eaiIfDetail.rcvChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 5) {
        this.eaiIfDetail.rcvChrgrId2 = val.userId;
        this.eaiIfDetail.rcvChrgrNm2 = val.hanNm;
        this.eaiIfDetail.rcvChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 6) {
        this.eaiIfDetail.rcvChrgrMngrId = val.userId;
        this.eaiIfDetail.rcvChrgrMngrNm = val.hanNm;
        this.eaiIfDetail.rcvChrgrMngrOrgNm = val.orgNm;
      }
    },
  },
};
</script>
