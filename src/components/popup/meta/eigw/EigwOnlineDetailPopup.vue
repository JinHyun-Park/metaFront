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
      class="layer_popup large"
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
        eigwType: 'online',
        dablInflu: '',
        procSt: 1,
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
    this.onlineInfo = this.propData;
    this.onlineUserList = this.propData.onlineUserList;

    // this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkOnlineFields() === 0) {
        return;
      }
      this.onlineInfo.onlineUserList = this.onlineUserList;
      this.$emit('addData', this.onlineInfo);
    },
    checkOnlineFields() {
      if (this.onlineInfo.eigwIfNm === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.onlineInfo.eigwIfId === '') {
        this.$gf.alertOn('인터페이스 영문 약자를 입력하세요');
        return 0;
      } if (this.onlineInfo.instNm === '') {
        this.$gf.alertOn('대외기관을 입력하세요');
        return 0;
      } if (this.onlineInfo.pgmTyp === '') {
        this.$gf.alertOn('프로그램 유형을 선택하세요');
        return 0;
      } if (this.onlineInfo.linkTyp === '') {
        this.$gf.alertOn('연결 유형을 선택하세요');
        return 0;
      } if (this.onlineInfo.devRealIp === '' || this.onlineInfo.devPort === '' || this.onlineInfo.prodRealIp === '' || this.onlineInfo.prodPort === '') {
        this.$gf.alertOn('서버정보를 입력하세요');
        return 0;
      }

      if (this.onlineUserList == null) {
        this.$gf.alertOn('담당자 정보를 입력하세요');
      }

      for (let i = 0; i < this.onlineUserList.length; i++) {
        if (this.$gf.isEmpty(this.onlineUserList[i].chrgrTyp)) {
          this.$gf.alertOn('담당자 구분을 선택하세요');
          return 0;
        } if (this.onlineUserList[i].chrgrTyp === 'new') {
          if (this.onlineUserList[i].ofcLvlCd === '' || this.onlineUserList[i].instNm === ''
          || this.onlineUserList[i].instCd === '' || this.onlineUserList[i].hanNm === ''
          || this.onlineUserList[i].instCd === undefined
          || this.onlineUserList[i].hanNm === undefined
          || this.onlineUserList[i].ofcLvlCd === undefined
          || this.onlineUserList[i].instNm === undefined
          || this.onlineUserList[i].mblPhonNum === undefined
          || this.onlineUserList[i].emailAddr === undefined
          || this.onlineUserList[i].mblPhonNum === '' || this.onlineUserList[i].emailAddr === '') {
            this.$gf.alertOn('담당자 정보를 입력하세요');
            return 0;
          }
        } else if (this.onlineUserList[i].userId === undefined || this.onlineUserList[i].userId === '') {
          this.$gf.alertOn('담당자 정보를 입력하세요');
          return 0;
        }
      }
      return 1;
    },
    turnOnSvrPopInstList(val, type) {
      this.instPopupCase = val;
      this.typeCase = type;
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.typeCase === 'on') {
        if (this.instPopupCase === -1) {
          this.onlineInfo.instCd = val.instCd;
          this.onlineInfo.instNm = val.instNm;
        } else {
          this.onlineUserList[this.instPopupCase].instCd = val.instCd;
          this.onlineUserList[this.instPopupCase].instNm = val.instNm;
        }
      }
      if (this.typeCase === 'file') {
        if (this.instPopupCase === -2) {
          this.fileInfo.instCd = val.instCd;
          this.fileInfo.instNm = val.instNm;
        } else {
          this.fileUserList[this.instPopupCase].instCd = val.instCd;
          this.fileUserList[this.instPopupCase].instNm = val.instNm;
        }
      }
      this.svrOnInstList = false;
    },
    searchOnChrgr(row) {
      this.row = row;
      if (this.onlineUserList[row].chrgrTyp === '' || this.onlineUserList[row].chrgrTyp === undefined) {
        this.$gf.alertOn('구분을 선택하세요');
        return;
      }
      console.log('담당자 추가!');
      this.addOnlineChrgrRow(row);
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.type === 'on') {
        this.onlineUserList[this.row].hanNm = val.hanNm;
        this.onlineUserList[this.row].userId = val.userId;
        this.onlineUserList[this.row].instCd = val.instCd;
        this.onlineUserList[this.row].instNm = val.instNm;
        this.onlineUserList[this.row].ofcLvlCd = val.ofcLvlCd;
        this.onlineUserList[this.row].ofcLvlNm = val.ofcLvlNm;
        this.onlineUserList[this.row].mblPhonNum = val.mblPhonNum;
        this.onlineUserList[this.row].emailAddr = val.emailAddr;
      } else {
        this.fileUserList[this.row].hanNm = val.hanNm;
        this.fileUserList[this.row].userId = val.userId;
        this.fileUserList[this.row].instCd = val.instCd;
        this.fileUserList[this.row].instNm = val.instNm;
        this.fileUserList[this.row].ofcLvlCd = val.ofcLvlCd;
        this.fileUserList[this.row].ofcLvlNm = val.ofcLvlNm;
        this.fileUserList[this.row].mblPhonNum = val.mblPhonNum;
        this.fileUserList[this.row].emailAddr = val.emailAddr;
      }
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    addOnlineChrgrRow(row) {
      this.type = 'on';
      console.log('행 추가!');
      if (this.onlineUserList[row].chrgrTyp === 'in') {
        this.svrOnChrgr = true;
      } else if (this.onlineUserList[row].chrgrTyp === 'out') {
        this.svrOnEigwChrgr = true;
      } else {
        this.turnOnSvrPopInstList(row, 'on');
      }
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    addOnlineUser(i) {
      console.log('행 추가!');
      this.onlineUserList.splice(i + 1, 0, {});
    },
    delOnlineUser(i) {
      console.log('행 삭제!');

      this.onlineUserList.splice(i, 1);
      if (this.onlineUserList.length === 0) {
        this.onlineUserList.push({});
      }
    },
  },
};
</script>
