<template>
  <div class="right_space">
    <EigwServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="setSvr"
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
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보(온라인)
        </div>
        <div class="breadcrumb">
          <span>EiGW</span><em class="on">메타정보(온라인)</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        조회 조건
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="addOnlineInfo()"
          >
            신규신청
          </button>
          <button
            type="button"
            class="default_button"
            @click="updateOnlineInfo()"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button on"
            @click="searchList(), initOnlineInfo(), initProcList(), initProcInfo()"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">EiGW구분</label>
          <div class="select_group">
            <select v-model="mqMngrNm">
              <option value="">
                전체
              </option>
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
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instNm"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
            @click="turnOnSvrPopInstList(-1)"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">프로그램</label>
          <input
            v-model="pgmId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">설정파일</label>
          <input
            v-model="confFile"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">IP</label>
          <input
            v-model="reqIp"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                I/F ID
              </li>
              <li class="th_cell">
                대외기관
              </li>
              <li class="th_cell">
                거래명
              </li>
              <li class="th_cell">
                서버
              </li>
              <!-- <li class="th_cell">
                삭제
              </li> -->
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="item in onlineList"
              :key="item.onlineMetaNum"
              class="table_row w-auto"
              @click="searchOnlineInfo(item.onlineMetaNum), initProcInfo(), initChrgrList()"
            >
              <li class="td_cell">
                {{ item.eaiIfId }}
              </li>
              <li class="td_cell">
                {{ item.instCd }}
              </li>
              <li class="td_cell">
                {{ item.onlineDealNm }}
              </li>
              <li class="td_cell">
                {{ item.mqMngrNm }}
              </li>
              <!--
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="deleteOnlineIf(row.onlineMetaNum)"
                />
              </li>
              -->
            </ul>
          </div>
        </div>
      </div>
      <div class="pagination_space">
        <paginate
          v-model="pageSet.pageNo"
          :page-count="pageSet.pageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="pageMove"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        인터페이스 정보
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
        <div class="column w-1">
          <input
            v-model="onlineInfo.instCd"
            type="hidden"
          >
        </div>
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
        <div class="column w-1">
          <input
            v-model="onlineInfo.onlineMetaNum"
            type="hidden"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        프로세스 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                프로그램명
              </li>
              <li class="th_cell">
                설정파일
              </li>
              <li class="th_cell">
                개발IP(NAT)
              </li>
              <li class="th_cell">
                개발 PORT
              </li>
              <li class="th_cell">
                운영IP(NAT)
              </li>
              <li class="th_cell">
                운영 PORT
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div
            v-if="!procList"
            class="table_body"
          >
            <ul class="table_row">
              <li class="td_cell">
                I/F목록에서 I/F를 선택해주세요.
              </li>
            </ul>
          </div>
          <div
            v-else-if="procList.length === 0"
            class="table_body"
          >
            <ul class="table_row">
              <li class="td_cell">
                프로세스를 생성해주세요.
              </li>
            </ul>
          </div>
          <div
            v-else
            class="table_body"
          >
            <ul
              v-for="(row, index) in procList"
              :key="row.procNum"
              class="table_row w-auto"
              @click="selectProcInfo(index)"
            >
              <li class="td_cell">
                {{ row.pgmId }}
              </li>
              <li class="td_cell">
                {{ row.confFile }}
              </li>
              <li class="td_cell">
                {{ row.dvpSvrRealIp }}<br>({{ row.dvpSvrNatIp }})
              </li>
              <li class="td_cell">
                {{ row.dvpSvrPort }}
              </li>
              <li class="td_cell">
                {{ row.prodSvrRealIp }}<br>({{ row.prodSvrNatIp }})
              </li>
              <li class="td_cell">
                {{ row.prodSvrPort }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="deleteProcInfo(row.procNum, index)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        프로세스 세부정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="addProcInfo()"
          >
            신규신청
          </button>
          <button
            type="button"
            class="default_button"
            @click="updateProcInfo()"
          >
            수정
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">프로그램</label>
          <input
            v-model="procInfo.pgmId"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로세스설명</label>
          <input
            v-model="procInfo.procDesc"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">프로그램유형</label>
          <select v-model="procInfo.pgmTyp">
            <option value="CLIENT">
              클라이언트
            </option>
            <option value="SERVER">
              서버
            </option>
          </select>
          <span class="select" />
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">설정파일</label>
          <input
            v-model="procInfo.confFile"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">세션수</label>
          <input
            v-model="procInfo.sesnCnt"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">소켓타임아웃</label>
          <input
            v-model="procInfo.socketTimeout"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">MQ타임아웃</label>
          <input
            v-model="procInfo.mqTimeout"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">연결유형</label>
          <select v-model="procInfo.linkTyp">
            <option value="CONN">
              연결형
            </option>
            <option value="DISCONN">
              비연결형
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-3">
          <label class="column_label">Log파일명</label>
          <input
            v-model="procInfo.logFileNm"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">Log파일경로</label>
          <input
            v-model="procInfo.logPath"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">사용유무</label>
          <select v-model="procInfo.useYn">
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
          <input
            v-model="procInfo.procNum"
            type="hidden"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">개발기 REAL Ip</label>
          <input
            v-model="procInfo.dvpSvrRealIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(1)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">개발기 NAT IP</label>
          <input
            v-model="procInfo.dvpSvrNatIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(1)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">개발기 Port</label>
          <input
            v-model="procInfo.dvpSvrPort"
            type="number"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <input
            v-model="procInfo.dvpSvrNum"
            type="hidden"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">운영기 REAL Ip</label>
          <input
            v-model="procInfo.prodSvrRealIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(2)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영기 NAT IP</label>
          <input
            v-model="procInfo.prodSvrNatIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(2)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영기 Port</label>
          <input
            v-model="procInfo.prodSvrPort"
            type="number"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <input
            v-model="procInfo.prodSvrNum"
            type="hidden"
            class="add_text"
          >
        </div>
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
import EigwServerListPopup from '@/components/popup/meta/eigw/EigwServerListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EigwChrgrListPopup from '@/components/popup/meta/eigw/EigwChrgrListPopup.vue';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';
import EaiListPopup from '@/components/popup/meta/eigw/EaiListPopup.vue';

export default {
  components: {
    EigwServerListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
    InstListPopup,
    EaiListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
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
      serverPopupCase: '',
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      svrOnEaiList: false,
      propsEaiList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      instNm: '',
      pgmId: '',
      confFile: '',
      reqIp: '',

      relInfo: {},

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

      // 추가
      onlineList: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
      onlineMetaNum: '',
      eaiIfId: '',
      mqMngrNm: '',
      onlineDealNm: '',
      useYn: '',
      creId: '',
      creDt: '',
      chgId: '',
      chgDt: '',
      mntgYn: '',
      onlineDealDesc: '',
      instCd: '',
      onlineInfo: {
        onlineMetaNum: 0,
        eaiIfId: '',
        mqMngrNm: '',
        onlineDealNm: '',
        useYn: '',
        creId: '',
        creDt: '',
        chgId: '',
        chgDt: '',
        mntgYn: '',
        onlineDealDesc: '',
        instCd: '',
      },
      procList: '',
      procInfo: {
        procNum: 0,
        pgmId: '',
        procDesc: '',
        useYn: '',
        sesnCnt: '',
        logPath: '',
        logFileNm: '',
        socketTimeout: '',
        mqTimeout: '',
        pgmTyp: '',
        linkTyp: '',
        confFile: '',
        dvpSvrNum: '',
        dvpSvrIp: '',
        prodSvrNum: '',
        prodSvrIp: '',
        dvpSvrPort: '',
        prodSvrPort: '',
      },
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
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    // 사용
    initOnlineInfo() {
      this.onlineInfo.onlineMetaNum = 0;
      this.onlineInfo.eaiIfId = '';
      this.onlineInfo.mqMngrNm = '';
      this.onlineInfo.onlineDealNm = '';
      this.onlineInfo.useYn = '';
      this.onlineInfo.creId = '';
      this.onlineInfo.creDt = '';
      this.onlineInfo.chgId = '';
      this.onlineInfo.chgDt = '';
      this.onlineInfo.mntgYn = '';
      this.onlineInfo.onlineDealDesc = '';
      this.onlineInfo.instCd = '';
    },
    initProcList() {
      this.procList = '';
    },
    initProcInfo() {
      this.procInfo.procNum = 0;
      this.procInfo.pgmId = '';
      this.procInfo.procDesc = '';
      this.procInfo.useYn = '';
      this.procInfo.sesnCnt = '';
      this.procInfo.logPath = '';
      this.procInfo.logFileNm = '';
      this.procInfo.socketTimeout = '';
      this.procInfo.mqTimeout = '';
      this.procInfo.pgmTyp = '';
      this.procInfo.linkTyp = '';
      this.procInfo.confFile = '';
      this.procInfo.dvpSvrNum = '';
      this.procInfo.dvpSvrIp = '';
      this.procInfo.dvpSvrRealIp = '';
      this.procInfo.dvpSvrNatIp = '';
      this.procInfo.prodSvrNum = '';
      this.procInfo.prodSvrIp = '';
      this.procInfo.prodSvrRealIp = '';
      this.procInfo.prodSvrNatIp = '';
      this.procInfo.dvpSvrPort = '';
      this.procInfo.prodSvrPort = '';
    },
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.initProcInfo();
      this.initProcList();
      this.initOnlineInfo();
      this.initChrgrList();
      this.pageMoveChk = 0;
    },
    searchList() {
      eigwApi.fetchGetEigwOnlineList({
        params: {
          onlineMetaNum: this.onlineMetaNum,
          eaiIfId: this.eaiIfId,
          mqMngrNm: this.mqMngrNm,
          onlineDealNm: this.onlineDealNm,
          useYn: this.useYn,
          creId: this.creId,
          creDt: this.creDt,
          chgId: this.chgId,
          chgDt: this.chgDt,
          mntgYn: this.mntgYn,
          onlineDealDesc: this.onlineDealDesc,
          instCd: this.instCd,
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,

          instNm: this.instNm,
          pgmId: this.pgmId,
          confFile: this.confFile,
          reqIp: this.reqIp,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    searchProcList(onlineMetaNum) {
      eigwApi.fetchGetEigwProcList({
        params: {
          onlineMetaNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.procList = res.data.rstData.procList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    searchOnlineInfo(onlineMetaNum) {
      eigwApi.fetchGetEigwOnlineInfo({
        params: {
          onlineMetaNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineInfo = res.data.rstData.onlineInfo;
            this.procList = res.data.rstData.procList;
            this.inChrgrList = res.data.rstData.inChrgrList;
            this.outChrgrList = res.data.rstData.outChrgrList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    selectProcInfo(i) {
      this.procInfo = this.procList[i];
    },
    addProcInfo() {
      if (this.onlineInfo === '' || this.onlineInfo.onlineMetaNum === 0) {
        this.$gf.alertOn('I/F를 선택해주세요.');
        return;
      }
      if (this.procInfo.pgmId === '' || this.procInfo.pgmId === undefined) {
        this.$gf.alertOn('프로그램 정보를 입력해주세요.');
        return;
      }
      eigwApi.fetchPostEigwProcInfo({
        onlineMetaNum: this.onlineInfo.onlineMetaNum,
        pgmId: this.procInfo.pgmId,
        confFile: this.procInfo.confFile,
        procDesc: this.procInfo.procDesc,
        useYn: this.procInfo.useYn,
        sesnCnt: this.procInfo.sesnCnt,
        logPath: this.procInfo.logPath,
        logFileNm: this.procInfo.logFileNm,
        socketTimeout: this.procInfo.socketTimeout,
        mqTimeout: this.procInfo.mqTimeout,
        pgmTyp: this.procInfo.pgmTyp,
        linkTyp: this.procInfo.linkTyp,
        dvpSvrNum: this.procInfo.dvpSvrNum,
        dvpSvrPort: this.procInfo.dvpSvrPort,
        prodSvrNum: this.procInfo.prodSvrNum,
        prodSvrPort: this.procInfo.prodSvrPort,
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.procInfo.procNum = res.data.rstData.procNum;
            this.searchProcList(this.onlineInfo.onlineMetaNum);
            this.initProcInfo();
            this.$gf.alertOn('프로세스가 추가되었습니다.');
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    updateProcInfo() {
      eigwApi.fetchPutEigwProcInfo({
        procNum: this.procInfo.procNum,
        pgmId: this.procInfo.pgmId,
        confFile: this.procInfo.confFile,
        procDesc: this.procInfo.procDesc,
        useYn: this.procInfo.useYn,
        sesnCnt: this.procInfo.sesnCnt,
        logPath: this.procInfo.logPath,
        logFileNm: this.procInfo.logFileNm,
        socketTimeout: this.procInfo.socketTimeout,
        mqTimeout: this.procInfo.mqTimeout,
        pgmTyp: this.procInfo.pgmTyp,
        linkTyp: this.procInfo.linkTyp,
        dvpSvrNum: this.procInfo.dvpSvrNum,
        dvpSvrPort: this.procInfo.dvpSvrPort,
        prodSvrNum: this.procInfo.prodSvrNum,
        prodSvrPort: this.procInfo.prodSvrPort,
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.initProcInfo();
            this.searchProcList(this.onlineInfo.onlineMetaNum);
            this.$gf.alertOn('프로세스 정보가 변경되었습니다.');
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    deleteProcInfo(procNum, index) {
      eigwApi.fetchDeleteEigwProcInfo({
        params: {
          procNum,
          onlineMetaNum: this.onlineInfo.onlineMetaNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('프로세스가 삭제되었습니다.');
            this.procList.splice(index, 1);
            this.initProcInfo();
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    // 사용 확인 필요
    addOnlineInfo() {
      if (this.onlineInfo.eaiIfId === '') {
        this.$gf.alertOn('I/F ID를 입력해주세요.');
      }
      if (this.onlineInfo.instCd === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
      }
      for (let i = 0; i < this.inChrgrList.length; i++) {
        if (this.inChrgrList[i].userId === '' || this.outChrgrList[i].userId === undefined) {
          this.$gf.alertOn('담당자 정보를 입력하세요');
          return;
        }
      }
      for (let i = 0; i < this.outChrgrList.length; i++) {
        if (this.outChrgrList[i].chrgrTyp === '' || this.outChrgrList[i].chrgrTyp === undefined) {
          this.$gf.alertOn('대외기관 담당자 구분을 선택하세요');
          return;
        } if (this.outChrgrList[i].chrgrTyp === 'new') {
          if (this.outChrgrList[i].ofcLvlCd === '' || this.outChrgrList[i].instNm === ''
          || this.outChrgrList[i].instCd === '' || this.outChrgrList[i].hanNm === ''
          || this.outChrgrList[i].instCd === undefined
          || this.outChrgrList[i].hanNm === undefined
          || this.outChrgrList[i].ofcLvlCd === undefined
          || this.outChrgrList[i].instNm === undefined
          || this.outChrgrList[i].mblPhonNum === undefined
          || this.outChrgrList[i].emailAddr === undefined
          || this.outChrgrList[i].mblPhonNum === '' || this.outChrgrList[i].emailAddr === '') {
            this.$gf.alertOn('대외기관 담당자 정보를 입력하세요');
            return;
          }
        } else if (this.outChrgrList[i].userId === undefined || this.outChrgrList[i].userId === '') {
          this.$gf.alertOn('대외기관 담당자 정보를 입력하세요');
          return;
        }
      }
      this.saveInfo = {
        onlineInfo: this.onlineInfo,
        inChrgrList: this.inChrgrList,
        outChrgrList: this.outChrgrList,
      };
      eigwApi.fetchPostEigwOnlineInfo(this.saveInfo)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('인터페이스가 등록되었습니다.');
          this.searchList();
          this.initProcInfo();
          this.initProcList();
          this.initOnlineInfo();
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    deleteOnlineIf(onlineMetaNum) {
      eigwApi.fetchDeleteEigwOnlineInfo({
        params: {
          onlineMetaNum,
        },
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('인터페이스가 삭제되었습니다.');
        })
        .catch((ex) => {
          console.log(`인터페이스 삭제 에러! : ${ex}`);
        });
    },
    updateOnlineInfo() {
      for (let i = 0; i < this.inChrgrList.length; i++) {
        if (this.inChrgrList[i].userId === '' || this.outChrgrList[i].userId === undefined) {
          this.$gf.alertOn('담당자 정보를 입력하세요');
          return;
        }
      }

      for (let i = 0; i < this.outChrgrList.length; i++) {
        if (this.outChrgrList[i].chrgrTyp === '' || this.outChrgrList[i].chrgrTyp === undefined) {
          this.$gf.alertOn('대외기관 담당자 구분을 선택하세요');
          return;
        } if (this.outChrgrList[i].chrgrTyp === 'new') {
          if (this.outChrgrList[i].ofcLvlCd === '' || this.outChrgrList[i].instNm === ''
          || this.outChrgrList[i].instCd === '' || this.outChrgrList[i].hanNm === ''
          || this.outChrgrList[i].instCd === undefined
          || this.outChrgrList[i].hanNm === undefined
          || this.outChrgrList[i].ofcLvlCd === undefined
          || this.outChrgrList[i].instNm === undefined
          || this.outChrgrList[i].mblPhonNum === undefined
          || this.outChrgrList[i].emailAddr === undefined
          || this.outChrgrList[i].mblPhonNum === '' || this.outChrgrList[i].emailAddr === '') {
            this.$gf.alertOn('대외기관 담당자 정보를 입력하세요');
            return;
          }
        } else if (this.outChrgrList[i].userId === undefined || this.outChrgrList[i].userId === '') {
          this.$gf.alertOn('대외기관 담당자 정보를 입력하세요');
          return;
        }
      }
      this.saveInfo = {
        onlineMetaNum: this.onlineInfo.onlineMetaNum,
        onlineInfo: this.onlineInfo,
        inChrgrList: this.inChrgrList,
        outChrgrList: this.outChrgrList,
      };
      eigwApi.fetchPutEigwOnlineInfo(this.saveInfo)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('수정되었습니다.');
          this.initProcInfo();
          this.initProcList();
          this.initOnlineInfo();
          this.searchList();
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    addInChrgrList(i) {
      this.inChrgrList.splice(i + 1, 0, {});
    },
    deleteInChrgrList(i) {
      if (this.inChrgrList.length > 1) {
        const idx = this.inChrgrList.indexOf(i);
        this.inChrgrList.splice(idx, 1);
      } else {
        this.inChrgrList[0].chrgrTyp = '';
        this.inChrgrList[0].userId = '';
        this.inChrgrList[0].instNm = '';
        this.inChrgrList[0].instCd = '';
        this.inChrgrList[0].orgNm = '';
        this.inChrgrList[0].hanNm = '';
        this.inChrgrList[0].mblPhonNum = '';
        this.inChrgrList[0].emailAddr = '';
      }
    },
    addOutChrgrList(i) {
      this.outChrgrList.splice(i + 1, 0, {});
    },
    deleteOutChrgrList(i) {
      if (this.outChrgrList.length > 1) {
        const idx = this.outChrgrList.indexOf(i);
        this.outChrgrList.splice(idx, 1);
      } else {
        this.outChrgrList[0].chrgrTyp = '';
        this.outChrgrList[0].userId = '';
        this.outChrgrList[0].category = '';
        this.outChrgrList[0].instNm = '';
        this.outChrgrList[0].instCd = '';
        this.outChrgrList[0].orgNm = '';
        this.outChrgrList[0].hanNm = '';
        this.outChrgrList[0].mblPhonNum = '';
        this.outChrgrList[0].emailAddr = '';
      }
    },
    initChrgrList() {
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
    searchInChrgr(row) {
      this.row = row;
      this.addChrgrList(1);
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
    turnOnSvrPop(val) {
      this.serverPopupCase = val;
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(val);
      this.svrOn = false;
    },
    addData(val) {
      if (this.serverPopupCase === 1) {
        this.procInfo.dvpSvrNum = val.svrNum;
        this.procInfo.dvpSvrRealIp = val.svrRealIp;
        this.procInfo.dvpSvrNatIp = val.svrNatIp;
      } else {
        this.procInfo.prodSvrNum = val.svrNum;
        this.procInfo.prodSvrRealIp = val.svrRealIp;
        this.procInfo.prodSvrNatIp = val.svrNatIp;
      }
      this.svrOn = false;
    },
    addChrgrList(val) {
      this.serverPopupCase = val;
      if (val === 1) {
        this.svrOnChrgr = true;
      } else if (val === 2) {
        this.svrOnEigwChrgr = true;
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
    setSvr(val) {
      if (this.serverPopupCase === 1) {
        this.procInfo.dvpSvrNum = val.svrNum;
        this.procInfo.dvpSvrRealIp = val.svrRealIp;
        this.procInfo.dvpSvrNatIp = val.svrNatIp;
      } else {
        this.procInfo.prodSvrNum = val.svrNum;
        this.procInfo.prodSvrRealIp = val.svrRealIp;
        this.procInfo.prodSvrNatIp = val.svrNatIp;
      }
      this.svrOn = false;
    },
  },
};
</script>
