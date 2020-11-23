<template>
  <div class="right_space">
    <InstListPopup
      v-if="svrOnInstList"
      v-bind="propsInstList"
      @closePop="turOffSvrPopInstList"
      @addData="addDataInstList"
    />
    <EaiListPopup
      v-if="svrOnEaiList"
      v-bind="propsEaiList"
      @closePop="turOffSvrPopEaiList"
      @addData="addDataEaiList"
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
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />운영기 반영 완료 인터페이스
        </div>
        <div class="breadcrumb">
          <span>EiGW</span><em class="on">운영기 반영 리스트</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        신청 기본 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">I/F ID</label>
          <div class="search_group">
            <input
              v-model="reqOnlineInfo.eigwIfId"
              type="text"
              class="add_text on"
              readonly
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">I/F명</label>
          <div class="search_group">
            <input
              v-model="reqOnlineInfo.eigwIfNm"
              type="text"
              class="add_text on"
              readonly
            >
            <span class="tooltips right ov">
              <i class="tip_contn"><em class="tip_text">신규 I/F의 경우, EAI에서 등록 후 신청바랍니다.</em></i>
            </span>
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <div class="search_group">
            <input
              v-model="reqOnlineInfo.instNm"
              type="text"
              class="add_text on"
              readonly
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">프로그램유형</label>
          <div class="search_group">
            <input
              v-model="reqOnlineInfo.pgmTyp"
              type="text"
              class="add_text on"
              readonly
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <div class="search_group">
            <input
              v-model="reqOnlineInfo.linkTyp"
              type="text"
              class="add_text on"
              readonly
            >
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">개발 REAL IP</label>
          <input
            v-model="reqOnlineInfo.devRealIp"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발 Port</label>
          <input
            v-model="reqOnlineInfo.devPort"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label tooltips ov top">운영 REAL IP</label>
          <input
            v-model="reqOnlineInfo.prodRealIp"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 Port</label>
          <input
            v-model="reqOnlineInfo.prodPort"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">기타 요청사항</label>
          <input
            v-model="reqOnlineInfo.eigwRmk"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1" />
      </div>
      <h5 class="s_tit type-2">
        신청 담당자 정보
      </h5>
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
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="row in reqChrgrList"
              :key="row.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                <input
                  v-if="row.chrgrTyp === 'in'"
                  type="text"
                  class="add_text on"
                  value="내부운영"
                  readonly
                >
                <input
                  v-else-if="row.chrgrTyp === 'out'"
                  type="text"
                  class="add_text on"
                  value="대외기관"
                  readonly
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
                  class="add_text on"
                  readonly
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.hanNm"
                  type="text"
                  class="add_text on"
                  readonly
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select
                    v-model="row.ofcLvlCd"
                    disabled
                  >
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
                  class="add_text on"
                  readonly
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.emailAddr"
                  type="text"
                  class="add_text on"
                  readonly
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="setOnlineInfoFromReqOnlineInfo(), setOnlineChrgrFromReqChrgrList()"
          >
            신청 정보 세팅
          </button>
          <button
            type="button"
            class="default_button"
            @click="addOnlineInfo()"
          >
            신규신청
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="onlineInfo.eaiIfId"
            type="text"
            @click="turnOnSvrPopEaiList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="onlineInfo.instNm"
            type="text"
            @click="turnOnSvrPopInstList(-2)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">EiGW구분</label>
          <select v-model="onlineInfo.mqMngrNm">
            <option value="EIGW1P">
              1호기
            </option>
            <option value="EIGW2P">
              2호기
            </option>
          </select>
          <span class="select" />
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">거래명</label>
          <input
            v-model="onlineInfo.onlineDealNm"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">거래설명</label>
          <input
            v-model="onlineInfo.onlineDealDesc"
            type="text"
          >
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">사용유무</label>
          <select v-model="onlineInfo.useYn">
            <option value="Y">
              사용
            </option>
            <option value="N">
              미사용
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-2">
          <label class="column_label">모니터링유무</label>
          <select v-model="onlineInfo.mntgYn">
            <option value="Y">
              사용
            </option>
            <option value="N">
              미사용
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-1" />
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto except">
            <ul>
              <li class="th_cell">
                기관
              </li>
              <li class="th_cell">
                이름
              </li>
              <li class="th_cell">
                조직
              </li>
              <li class="th_cell">
                핸드폰
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
              v-for="(inchrgr, i) in inChrgrList"
              :key="inchrgr.userId"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="inchrgr.instNm"
                  type="text"
                  @click="searchInChrgr(i)"
                >
              </li>
              <li class="td_cell">
                {{ inchrgr.hanNm }}
              </li>
              <li class="td_cell">
                {{ inchrgr.orgNm }}
              </li>
              <li class="td_cell">
                {{ inchrgr.mblPhonNum }}
              </li>
              <li class="td_cell">
                {{ inchrgr.emailAddr }}
              </li>
              <td class="td_cell">
                <i
                  class="ico-add"
                  @click="addInChrgrList(i)"
                />
                <i
                  class="ico-del"
                  @click="deleteInChrgrList(i)"
                />
              </td>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        대외기관 담당자 정보
      </h5>
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
                핸드폰
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
              v-for="(outchrgr, i) in outChrgrList"
              :key="outchrgr.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="outchrgr.chrgrTyp">
                    <option value="">
                      전체
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
                  v-model="outchrgr.instNm"
                  type="text"
                  @click="searchOutChrgr(i)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="outchrgr.hanNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="outchrgr.ofcLvlCd">
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
                  v-model="outchrgr.mblPhonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="outchrgr.emailAddr"
                  type="text"
                >
              </li>
              <td class="td_cell">
                <i
                  class="ico-add"
                  @click="addOutChrgrList(i)"
                />
                <i
                  class="ico-del"
                  @click="deleteOutChrgrList(i)"
                />
              </td>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import * as eigwApi from '@/api/eigwApi';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';
import EaiListPopup from '@/components/popup/meta/eigw/EaiListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EigwChrgrListPopup from '@/components/popup/meta/eigw/EigwChrgrListPopup.vue';
// import EigwServerListPopup from '@/components/popup/meta/eigw/EigwServerListPopup.vue';

export default {
  components: {
    InstListPopup,
    EaiListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
  },
  data() {
    return {
      reqOnlineInfo: '',
      eigwReqNum: '',
      reqChrgrList: '',
      onlineInfo: {
        onlineMetaNum: '',
        eaiIfId: '',
        instCd: '',
        instNm: '',
        mqMngrNm: '',
        onlineDealNm: '',
        onlineDealDesc: '',
        useYn: '',
        mntgYn: '',
      },
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      svrOnEaiList: false,
      propsEaiList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      serverPopupCase: '',
      svrOnChrgr: false,
      propsChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      inChrgrList: [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          orgNm: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ],
      outChrgrList: [
        {
          chrgrTyp: '',
          category: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ],
      svrOnEigwChrgr: false,
      propsEigwChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
  },
  created() {
    this.eigwReqNum = this.$route.params.eigwReqNum;
  },
  mounted() {
    this.searchReqOnlineInfo();
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
    // this.onlineUserList = this.propData.onlineUserList;
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchReqOnlineInfo() {
      eigwApi.fetchGetEigwReqOnlineInfo({
        params: {
          eigwReqNum: this.eigwReqNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.reqOnlineInfo = res.data.rstData.reqOnlineInfo;
            this.reqChrgrList = res.data.rstData.reqChrgrList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPopInstList(val) {
      this.instPopupCase = val;
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(val);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(this.instPopupCase);
      if (this.instPopupCase === -1) {
        this.instCd = val.instCd;
        this.instNm = val.instNm;
      } else if (this.instPopupCase === -2) {
        this.onlineInfo.instCd = val.instCd;
        this.onlineInfo.instNm = val.instNm;
      } else {
        this.outChrgrList[this.instPopupCase].instCd = val.instCd;
        this.outChrgrList[this.instPopupCase].instNm = val.instNm;
      }
      this.svrOnInstList = false;
    },
    turnOnSvrPopEaiList() {
      this.svrOnEaiList = true;
    },
    turOffSvrPopEaiList(val) {
      console.log(val);
      this.svrOnEaiList = false;
    },
    addDataEaiList(val) {
      this.onlineInfo.eaiIfId = val.eaiIfId;
      this.svrOnEaiList = false;
    },
    setOnlineInfoFromReqOnlineInfo() {
      this.onlineInfo.eaiIfId = this.reqOnlineInfo.eigwIfId;
      this.onlineInfo.instCd = this.reqOnlineInfo.instCd;
      this.onlineInfo.instNm = this.reqOnlineInfo.instNm;
    },
    addOnlineInfo() {
      console.log('addOnlineInfo()');
    },
    searchInChrgr(row) {
      this.row = row;
      this.addChrgrList(1);
    },
    addChrgrList(val) {
      this.serverPopupCase = val;
      if (val === 1) {
        this.svrOnChrgr = true;
      } else if (val === 2) {
        this.svrOnEigwChrgr = true;
      }
    },
    searchOutChrgr(row) {
      this.row = row;
      if (this.outChrgrList[row].chrgrTyp === '' || this.outChrgrList[row].chrgrTyp === undefined) {
        this.$gf.alertOn('구분을 선택하세요');
        return;
      }
      this.addChrgrRow(row);
    },
    addChrgrRow(row) {
      if (this.outChrgrList[row].chrgrTyp === 'out') {
        this.addChrgrList(2);
      } else {
        this.turnOnSvrPopInstList(row);
      }
    },
    turOffSvrPopChrgr(val) {
      console.log(val);
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    addDataChrgr(val) {
      if (this.serverPopupCase === 1) {
        this.inChrgrList[this.row].hanNm = val.hanNm;
        this.inChrgrList[this.row].userId = val.userId;
        this.inChrgrList[this.row].instCd = val.instCd;
        this.inChrgrList[this.row].instNm = val.instNm;
        this.inChrgrList[this.row].mblPhonNum = val.mblPhonNum;
        this.inChrgrList[this.row].emailAddr = val.emailAddr;
      } else {
        this.outChrgrList[this.row].hanNm = val.hanNm;
        this.outChrgrList[this.row].userId = val.userId;
        this.outChrgrList[this.row].instCd = val.instCd;
        this.outChrgrList[this.row].instNm = val.instNm;
        this.outChrgrList[this.row].ofcLvlCd = val.ofcLvlCd;
        this.outChrgrList[this.row].ofcLvlNm = val.ofcLvlNm;
        this.outChrgrList[this.row].mblPhonNum = val.mblPhonNum;
        this.outChrgrList[this.row].emailAddr = val.emailAddr;
      }
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    addInChrgrList(i) {
      this.inChrgrList.splice(i + 1, 0, {});
    },
    deleteInChrgrList(i) {
      if (this.inChrgrList.length > 1) {
        this.inChrgrList.splice(i, 1);
      } else {
        this.initInChrgrList();
      }
    },
    addOutChrgrList(i) {
      this.outChrgrList.splice(i + 1, 0, {});
    },
    deleteOutChrgrList(i) {
      if (this.outChrgrList.length > 1) {
        this.outChrgrList.splice(i, 1);
      } else {
        this.initOutChrgrList();
      }
    },
    initChrgrList() {
      this.initInChrgrList();
      this.initOutChrgrList();
    },
    initInChrgrList() {
      this.inChrgrList = [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          orgNm: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ];
    },
    initOutChrgrList() {
      this.outChrgrList = [
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
      ];
    },
    setOnlineChrgrFromReqChrgrList() {
      if (this.reqChrgrList === '' || this.reqChrgrList === undefined || this.reqChrgrList.length === 0) {
        return;
      }
      this.inChrgrList = [];
      this.outChrgrList = [];
      for (let i = 0; i < this.reqChrgrList.length; i++) {
        if (this.reqChrgrList[i].chrgrTyp === 'in') {
          this.inChrgrList.push({
            chrgrTyp: this.reqChrgrList[i].chrgrTyp,
            hanNm: this.reqChrgrList[i].hanNm,
            userId: this.reqChrgrList[i].userId,
            instCd: this.reqChrgrList[i].instCd,
            instNm: this.reqChrgrList[i].instNm,
            mblPhonNum: this.reqChrgrList[i].mblPhonNum,
            emailAddr: this.reqChrgrList[i].emailAddr,
          });
        } else if (this.reqChrgrList[i].chrgrTyp === 'out') {
          this.outChrgrList.push({
            chrgrTyp: this.reqChrgrList[i].chrgrTyp,
            hanNm: this.reqChrgrList[i].hanNm,
            userId: this.reqChrgrList[i].userId,
            instCd: this.reqChrgrList[i].instCd,
            instNm: this.reqChrgrList[i].instNm,
            mblPhonNum: this.reqChrgrList[i].mblPhonNum,
            emailAddr: this.reqChrgrList[i].emailAddr,
            ofcLvlCd: this.reqChrgrList[i].ofcLvlCd,
            orgCd: this.reqChrgrList[i].orgCd,
          });
        }
      }
      if (this.inChrgrList.length === 0) {
        this.initInChrgrList();
      }
      if (this.outChrgrlist.length === 0) {
        this.initOutChrgrList();
      }
    },
  },
};
</script>
