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
          <!-- <button
            type="button"
            class="default_button"
            @click="initSearchCondition()"
          >
            검색조건 초기화
          </button> -->
          <button
            type="button"
            class="default_button"
            @click="save()"
          >
            신규신청
          </button>
          <button
            type="button"
            class="default_button"
            @click="update()"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button on"
            @click="searchList2(), initOnlineIfListItem(), initProcList(), initProcDetail()"
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
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in onlineIfList2"
              :key="row.onlineMetaNum"
              class="table_row w-auto"
              @click="onlineDetailInfo(index), initProcDetail()"
            >
              <li class="td_cell">
                {{ row.eaiIfId }}
              </li>
              <li class="td_cell">
                {{ row.instCd }}
              </li>
              <li class="td_cell">
                {{ row.onlineDealNm }}
              </li>
              <li class="td_cell">
                {{ row.mqMngrNm }}
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
          :click-handler="pageMove"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>
    <!-- <section class="form_area border_group">
      <h5 class="s_tit">
        인터페이스 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="onlineMst.eaiIfId"
            type="text"
            @click="turnOnSvrPopEaiList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="onlineMst.instNm"
            type="text"
            @click="turnOnSvrPopInstList(-2)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">EiGW구분</label>
          <select v-model="onlineMst.mqMngrNm">
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
            v-model="onlineMst.onlineDealNm"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">거래설명</label>
          <input
            v-model="onlineMst.onlineDealDesc"
            type="text"
          >
        </div>
        <div class="column w-1">
          <input
            v-model="onlineMst.instCd"
            type="hidden"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">사용유무</label>
          <select v-model="onlineMst.useYn">
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
          <select v-model="onlineMst.useYn">
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
            v-model="onlineMst.onlineMetaNum"
            type="hidden"
          >
        </div>
      </div>
    </section> -->
    <section class="form_area border_group">
      <h5 class="s_tit">
        인터페이스 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="onlineIfListItem.eaiIfId"
            type="text"
            @click="turnOnSvrPopEaiList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="onlineIfListItem.instNm"
            type="text"
            @click="turnOnSvrPopInstList(-2)"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">EiGW구분</label>
          <select v-model="onlineIfListItem.mqMngrNm">
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
            v-model="onlineIfListItem.onlineDealNm"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">거래설명</label>
          <input
            v-model="onlineIfListItem.onlineDealDesc"
            type="text"
          >
        </div>
        <div class="column w-1">
          <input
            v-model="onlineIfListItem.instCd"
            type="hidden"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">사용유무</label>
          <select v-model="onlineIfListItem.useYn">
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
          <select v-model="onlineIfListItem.useYn">
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
            v-model="onlineIfListItem.onlineMetaNum"
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
          <!-- <div
            v-else-if="porcList.length == 0"
            class="table_body"
          >
            <ul class="table_row">
              <li class="td_cell">
                해당 I/F의 프로세스가 없습니다.
              </li>
            </ul>
          </div> -->
          <div
            v-else
            class="table_body"
          >
            <ul
              v-for="(row, index) in procList"
              :key="row.onlineMetaNum"
              class="table_row w-auto"
              @click="procDetailInfo(index)"
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
                  @click="deleteProc(row.procNum, onlineIfListItem.onlineMetaNum, index)"
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
          <!-- <button
            type="button"
            class="default_button"
            @click="initProcDetail()"
          >
            초기화
          </button> -->
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
            @click="updateProc()"
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
                  @click="addInList(i)"
                />
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
                  @click="addOutList(i)"
                />
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
      onlineIfList: '',
      onlineMst: {
        onlineMetaNum: '',
        eaiIfId: '',
        mqMngrNm: '',
        onlineDealNm: '',
        useYn: '',
        onlineDealDesc: '',
        instCd: '',
        instNm: '',
      },
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
      onlineIfList2: '',
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
      onlineIfListItem: {
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
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList2();
      this.pageMoveChk = 0;
    },
    searchList() {
      eigwApi.fetchEigwAdOnlineList({
        params: {
          mqMngrNm: this.mqMngrNm,
          eaiIfId: this.eaiIfId,
          reqIp: this.reqIp,
          instNm: this.instNm,
          pgmId: this.pgmId,
          confFile: this.confFile,
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineIfList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    searchList2() {
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
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineIfList2 = res.data.rstData.searchList2;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    // detailInfo(i) {
    //   eigwApi.fetchEigwOnlineDetail({
    //     params: {
    //       onlineMetaNum: this.onlineIfList[i].onlineMetaNum,
    //       procNum: this.onlineIfList[i].procNum,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.rstCd === 'S') {
    //         this.onlineMst = res.data.rstData.rstData.onlineMst;
    //         this.procInfo = res.data.rstData.rstData.procInfo;
    //         this.inChrgrList = res.data.rstData.rstData.inChrgrList;
    //         this.outChrgrList = res.data.rstData.rstData.outChrgrList;
    //       } else {
    //         this.$gf.alertOn('failed');
    //       }
    //     })
    //     .catch((ex) => {
    //       console.log(`error occur!! : ${ex}`);
    //     });
    // },
    searchProcListByOnlineMetaNum(onlineMetaNum) {
      eigwApi.fetchGetEigwProcListByOnlineMetaNum({
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
    onlineDetailInfo(i) {
      this.onlineIfListItem = (this.onlineIfList2[i]);
      this.searchProcListByOnlineMetaNum(this.onlineIfList2[i].onlineMetaNum);
    },
    procDetailInfo(i) {
      this.procInfo = this.procList[i];
    },
    initOnlineIfListItem() {
      this.onlineIfListItem.onlineMetaNum = 0;
      this.onlineIfListItem.eaiIfId = '';
      this.onlineIfListItem.mqMngrNm = '';
      this.onlineIfListItem.onlineDealNm = '';
      this.onlineIfListItem.useYn = '';
      this.onlineIfListItem.creId = '';
      this.onlineIfListItem.creDt = '';
      this.onlineIfListItem.chgId = '';
      this.onlineIfListItem.chgDt = '';
      this.onlineIfListItem.mntgYn = '';
      this.onlineIfListItem.onlineDealDesc = '';
      this.onlineIfListItem.instCd = '';
    },
    initProcList() {
      this.procList = '';
    },
    initProcDetail() {
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
    addProcInfo() {
      if (this.onlineIfListItem === '' || this.onlineIfListItem.onlineMetaNum === 0) {
        this.$gf.alertOn('I/F를 선택해주세요.');
        return;
      }
      if (this.procInfo.pgmId === '' || this.procInfo.pgmId === undefined) {
        this.$gf.alertOn('프로그램 정보를 입력해주세요.');
        return;
      }
      eigwApi.fetchPostProcInfo({
        onlineMetaNum: this.onlineIfListItem.onlineMetaNum,
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
            this.searchProcListByOnlineMetaNum(this.onlineIfListItem.onlineMetaNum);
            this.initProcDetail();
            this.$gf.alertOn('프로세스가 추가되었습니다.');
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    updateProc() {
      eigwApi.fetchPutProcInfo({
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
            this.searchProcListByOnlineMetaNum(this.onlineIfListItem.onlineMetaNum);
            this.initProcDetail();
            this.$gf.alertOn('프로세스 정보가 변경되었습니다.');
            console.log(this.procList);
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    deleteProc(procNum, onlineMetaNum, index) {
      eigwApi.fetchDeleteProcInfo({
        params: {
          onlineMetaNum,
          procNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('프로세스가 삭제되었습니다.');
            this.procList.splice(index, 1);
            this.initProcDetail();
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      if (this.onlineMst.eaiIfId === '') {
        this.$gf.alertOn('I/F ID를 입력해주세요.');
      }
      if (this.onlineMst.instCd === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
      }
      if (this.procInfo.pgmId === '') {
        this.$gf.alertOn('프로그램 정보를 입력해주세요.');
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

      console.log('I/F 정보 등록');
      this.saveInfo = {
        onlineMst: this.onlineMst,
        procInfo: this.procInfo,
        relInfo: this.relInfo,
        inChrgrList: this.inChrgrList,
        outChrgrList: this.outChrgrList,
      };
      eigwApi.fetchEigwOnlineSaveInfo(this.saveInfo)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('등록되었습니다.');
          this.emptyFields();
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    update() {
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
        onlineMetaNum: this.onlineMst.onlineMetaNum,
        procNum: this.procInfo.procNum,
        onlineMst: this.onlineMst,
        procInfo: this.procInfo,
        inChrgrList: this.inChrgrList,
        outChrgrList: this.outChrgrList,
      };
      eigwApi.fetchEigwOninePutInfo(this.saveInfo)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
          this.$gf.alertOn('수정되었습니다.');
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
    },
    addInList(i) {
      console.log('행 추가!');
      this.inChrgrList.splice(i + 1, 0, {});
    },
    delInList(i) {
      console.log('행 삭제!');
      if (this.inChrgrList.length > 1) {
        console.log('행 삭제!');
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
    addOutList(i) {
      console.log('행 추가!');
      this.outChrgrList.splice(i + 1, 0, {});
    },
    delOutList(i) {
      console.log('행 삭제!');
      if (this.outChrgrList.length > 1) {
        console.log('행 삭제!');
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
    emptyFields() {
      this.onlineMst = '';
      this.procInfo = '';
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
      console.log('담당자 추가!');
      this.addchrgrList(1);
    },
    searchOutChrgr(row) {
      this.row = row;
      if (this.outChrgrList[row].chrgrTyp === '' || this.outChrgrList[row].chrgrTyp === undefined) {
        this.$gf.alertOn('구분을 선택하세요');
        return;
      }
      console.log('담당자 추가!');
      this.addChrgrRow(row);
    },
    addChrgrRow(row) {
      console.log('행 추가!');
      if (this.outChrgrList[row].chrgrTyp === 'out') {
        this.addchrgrList(2);
      } else {
        this.turnOnSvrPopInstList(row);
      }
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
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.instPopupCase === -1) {
        this.instCd = val.instCd;
        this.instNm = val.instNm;
      } else if (this.instPopupCase === -2) {
        this.onlineMst.instCd = val.instCd;
        this.onlineMst.instNm = val.instNm;
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
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnEaiList = false;
    },
    addDataEaiList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.onlineMst.eaiIfId = val.eaiIfId;
      this.svrOnEaiList = false;
    },

    setSvr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
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
