<template>
  <div class="right_space">
    <EigwServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="addData"
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
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보(파일)
        </div>
        <div class="breadcrumb">
          <span>EIGW</span><em class="on">EAI</em>
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
            @click="save()"
          >
            신규신청
          </button>
          <button
            type="button"
            class="default_button on"
            @click="searchList()"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
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
            value=""
            @click="turnOnSvrPopInstList(1)"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">I/F ID(명)</label>
          <input
            v-model="eaiIfId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">파일명</label>
          <input
            v-model="fileNm"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">송수신구분</label>
          <div class="select_group">
            <select v-model="srFlag">
              <option value="S">
                송신
              </option>
              <option value="R">
                수신
              </option>
            </select>
            <span class="select" />
          </div>
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
        <div class="column on w-1">
          <input
            v-model="instCd"
            type="hidden"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                서버
              </li>
              <li class="th_cell">
                대외기관
              </li>
              <li class="th_cell">
                송수신
              </li>
              <li class="th_cell">
                파일명
              </li>
              <li class="th_cell">
                I/F ID
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
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in fileList"
              :key="row.mstFileNum"
              class="table_row w-auto"
              @click="detailInfo(index)"
            >
              <li class="td_cell">
                <select v-model="row.mqMngrNm">
                  <option
                    value="EIGW1P"
                  >
                    1호기
                  </option>
                  <option
                    value="EIGW2P"
                  >
                    2호기
                  </option>
                </select>
              </li>
              <li class="td_cell">
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                <select v-model="row.srFlag">
                  <option
                    value="S"
                  >
                    송신
                  </option>
                  <option
                    value="R"
                  >
                    수신
                  </option>
                </select>
              </li>
              <li class="td_cell">
                {{ row.fileNm }}
              </li>
              <li class="td_cell">
                {{ row.eaiIfId }}
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
          :click-handler="searchList"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        기본정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일명</label>
          <input
            v-model="fileIfMst.fileNm"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">파일명_Head</label>
          <input
            v-model="fileIfMst.fileHead"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">파일명_Date</label>
          <select v-model="fileIfMst.fileDate">
            <option value="A">
              A
            </option>
            <option value="today">
              당일
            </option>
            <option value="yesterday">
              전송전날
            </option>
            <option value="this_month">
              당월
            </option>
            <option value="last_month">
              전월
            </option>
          </select>
        </div>
        <div class="column w-1">
          <label class="column_label">파일명_Tail</label>
          <input
            v-model="fileIfMst.fileTail"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
          <select v-model="fileIfMst.mqMngrNm">
            <option value="EIGW1P">
              1호기
            </option>
            <option value="EIGW2P">
              2호기
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
          <select v-model="fileIfMst.srFlag">
            <option value="S">
              송신
            </option>
            <option value="R">
              수신
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관&amp;명</label>
          <input
            v-model="fileIfMst.instNm"
            type="text"
            class="add_text on"
            @click="turnOnSvrPopInstList(2)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용유무</label>
          <select v-model="fileIfMst.useYn">
            <option value="Y">
              Y
            </option>
            <option value="N">
              N
            </option>
          </select>
        </div>
        <div class="column w-1">
          <input
            v-model="fileIfMst.instCd"
            type="hidden"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <input
            v-model="fileIfMst.mstFileNum"
            type="hidden"
            class="add_text on"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        SKT_EIGW 정보
      </h5>
      <div class="row_contain">
        <div class="column w-1">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="fileSktConf.svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">I/F ID &amp; 명</label>
          <input
            v-model="fileSktConf.eaiIfId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실행프로그램</label>
          <input
            v-model="fileSktConf.execPgm"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">OPCODE</label>
          <input
            v-model="fileSktConf.opCode"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="fileSktConf.staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="fileSktConf.endPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            v-model="fileSktConf.hstPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            v-model="fileSktConf.sussPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            v-model="fileSktConf.failPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">재시도건수</label>
          <input
            v-model="fileSktConf.retrmsCnt"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">재시도주기</label>
          <input
            v-model="fileSktConf.retrmsGap"
            type="text"
            class="add_text"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        EIGW_EIGW 정보
      </h5>
      <div class="row_contain">
        <div class="column on w-1">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="fileEigwConf.svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">실행프로그램</label>
          <input
            v-model="fileEigwConf.execPgm"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="fileEigwConf.staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="fileEigwConf.endPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        EIGW_AGENCY 정보
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="fileAgencyConf.svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실행프로그램</label>
          <input
            v-model="fileAgencyConf.execPgm"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="fileAgencyConf.staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="fileAgencyConf.endPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            v-model="fileAgencyConf.sussPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            v-model="fileAgencyConf.failPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            v-model="fileAgencyConf.hstPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">재시도건수</label>
          <input
            v-model="fileAgencyConf.retrmsCnt"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">재시도주기</label>
          <input
            v-model="fileAgencyConf.retrmsGap"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">User ID</label>
          <input
            v-model="fileAgencyConf.userId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Password</label>
          <input
            v-model="fileAgencyConf.pwd"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">개발기 Real IP</label>
          <input
            v-model="fileAgencyConf.dvpSvrRealIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(1)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">개발기 NAT IP</label>
          <input
            v-model="fileAgencyConf.dvpSvrNatIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(1)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기 Port</label>
          <input
            v-model="fileAgencyConf.dvpSvrPort"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <input
            v-model="fileAgencyConf.dvpSvrNum"
            type="hidden"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">운영기 Real IP</label>
          <input
            v-model="fileAgencyConf.prodSvrRealIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(2)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영기 NAT IP</label>
          <input
            v-model="fileAgencyConf.prodSvrNatIp"
            type="text"
            class="add_text"
            @click="turnOnSvrPop(2)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기 Port</label>
          <input
            v-model="fileAgencyConf.prodSvrPort"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <input
            v-model="fileAgencyConf.prodSvrNum"
            type="hidden"
            class="add_text"
          >
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="addchrgrList(1)"
          >
            추가
          </button>
          <button
            type="button"
            class="default_button on"
            @click="saveInChrgr()"
          >
            등록
          </button>
        </div>
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
                {{ inchrgr.instNm }}
              </li>
              <li class="td_cell">
                {{ inchrgr.hanNm }}
              </li>
              <li class="td_cell">
                {{ inchrgr.orgCd }}
              </li>
              <li class="td_cell">
                {{ inchrgr.mblPhonNum }}
              </li>
              <li class="td_cell">
                {{ inchrgr.emailAddr }}
              </li>
              <td class="td_cell">
                <i
                  class="ico-del"
                  @click="delInList(i)"
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
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="addchrgrList(2)"
          >
            추가
          </button>
          <button
            type="button"
            class="default_button on"
            @click="saveOutChrgr()"
          >
            등록
          </button>
        </div>
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
                {{ outchrgr.instNm }}
              </li>
              <li class="td_cell">
                {{ outchrgr.hanNm }}
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
                {{ outchrgr.mblPhonNum }}
              </li>
              <li class="td_cell">
                {{ outchrgr.emailAddr }}
              </li>
              <td class="td_cell">
                <i
                  class="ico-del"
                  @click="delOutList(i)"
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
        class="default_button on"
        @click="update()"
      >
        수정
      </button>
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

export default {
  components: {
    EigwServerListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
    InstListPopup,
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

      mqMngrNm: '',
      instCd: '',
      instNm: '',
      eaiIfId: '',
      fileNm: '',
      srFlag: '',
      reqIp: '',

      fileList: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      fileIfMst: {
        mstFileNum: '',
        mqMngrNm: '',
        fileNm: '',
        fileDesc: '',
        fileHead: '',
        fileDate: '',
        fileTail: '',
        srFlag: '',
        useYn: '',
        instCd: '',
        instNm: '',
      },
      fileSktConf: {
        mstFileSeq: '',
        eaiIfId: '',
        titile: '',
        svcId: '',
        execPgm: '',
        opCode: '',
        staPath: '',
        endPath: '',
        sussPath: '',
        failPath: '',
        hstPath: '',
        retrmsCnt: '',
        retrmsGap: '',
        chgYn: '',
      },
      fileEigwConf: {
        mstFileSeq: '',
        svcId: '',
        execPgm: '',
        title: '',
        staPath: '',
        endPath: '',
        chgYn: '',
      },
      fileAgencyConf: {
        mstFileSeq: '',
        svcId: '',
        agencyRmk: '',
        execPgm: '',
        fileTail: '',
        staPath: '',
        endPath: '',
        sussPath: '',
        failPath: '',
        hstPath: '',
        retrmsCnt: '',
        retrmsGap: '',
        userId: '',
        pwd: '',
        dvpSvrNum: '',
        dvpSvrIp: '',
        prodSvrNum: '',
        prodSvrIp: '',
        dvpSvrPort: '',
        prodSvrPort: '',
      },

      inChrgrList: [],
      outChrgrList: [],
      saveInfo: {},
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
    searchList() {
      eigwApi.fetchEigwAdFileList({
        params: {
          mqMngrNm: this.mqMngrNm,
          eaiIfId: this.eaiIfId,
          fileNm: this.fileNm,
          svrIp: this.svrIp,
          instCd: this.instCd,
          srFlag: this.srFlag,
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.fileList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    detailInfo(i) {
      eigwApi.fetchEigwFileDetail({
        params: {
          mstFileSeq: this.fileList[i].mstFileNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.fileIfMst = res.data.rstData.rstData.fileMst;
            this.fileSktConf = res.data.rstData.rstData.fileSktConf;
            this.fileEigwConf = res.data.rstData.rstData.fileEigwConf;
            this.fileAgencyConf = res.data.rstData.rstData.fileAgencyConf;
            this.inChrgrList = res.data.rstData.rstData.inChrgrList;
            this.outChrgrList = res.data.rstData.rstData.outChrgrList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      if (this.fileIfMst.fileNm === '') {
        this.$gf.alertOn('프로그램 정보를 입력해주세요.');
      }
      if (this.fileSktConf.eaiIfId === '') {
        this.$gf.alertOn('I/F ID를 입력해주세요.');
      }
      if (this.fileIfMst.instCd === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
      }
      console.log('I/F 정보 등록');
      this.saveInfo = {
        fileIfMst: this.fileIfMst,
        fileSktConf: this.fileSktConf,
        fileEigwConf: this.fileEigwConf,
        fileAgencyConf: this.fileAgencyConf,
      };
      eigwApi.fetchEigwMetaSaveInfo(this.saveInfo)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('등록되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    update() {
      this.saveInfo = {
        fileIfMst: this.fileIfMst,
        fileSktConf: this.fileSktConf,
        fileEigwConf: this.fileEigwConf,
        fileAgencyConf: this.fileAgencyConf,
      };
      eigwApi.fetchEigwMetaPutInfo(this.saveInfo)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('수정되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    saveInChrgr() {
      this.inuserList = {
        inChrgrList: this.inChrgrList,
        mstFileNum: this.fileIfMst.mstFileNum,
        chrgrTyp: 'in',
      };
      eigwApi.fetchEigwMetaSaveChrgr(this.inuserList)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('등록되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    saveOutChrgr() {
      this.outuserList = {
        outChrgrList: this.outChrgrList,
        mstFileNum: this.fileIfMst.mstFileNum,
        chrgrTyp: 'out',
      };
      eigwApi.fetchEigwMetaSaveChrgr(this.outuserList)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('등록되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    delInList(i) {
      eigwApi.fetchDeleteChrgrInfo({
        params: this.inChrgrList[i],
      })
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('삭제되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    delOutList(i) {
      eigwApi.fetchDeleteChrgrInfo({
        params: this.outChrgrList[i],
      })
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('삭제되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    turnOnSvrPop(val) {
      this.serverPopupCase = val;
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.serverPopupCase === 1) {
        this.fileAgencyConf.dvpSvrNum = val.svrNum;
        this.fileAgencyConf.dvpSvrRealIp = val.svrRealIp;
        this.fileAgencyConf.dvpSvrNatIp = val.svrNatIp;
      } else {
        this.fileAgencyConf.prodSvrNum = val.svrNum;
        this.fileAgencyConf.prodSvrRealIp = val.svrRealIp;
        this.fileAgencyConf.prodSvrNatIp = val.svrNatIp;
      }
      this.svrOn = false;
    },
    addchrgrList(val) {
      this.serverPopupCase = val;
      if (val === 1) {
        this.svrOnChrgr = true;
      } else if (val === 2) {
        this.svrOnEigwChrgr = true;
      }
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.serverPopupCase === 1) {
        this.inChrgrList.push(val);
      } else {
        this.outChrgrList.push(val);
      }
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    turnOnSvrPopInstList(val) {
      this.instPopupCase = val;
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.instPopupCase === 1) {
        this.instCd = val.instCd;
        this.instNm = val.instNm;
      } else {
        this.fileIfMst.instCd = val.instCd;
        this.fileIfMst.instNm = val.instNm;
      }
      this.svrOnInstList = false;
    },
  },
};
</script>
