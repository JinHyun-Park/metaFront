<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="reset()"
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
              <option value="eigw1">
                1호기
              </option>
              <option value="eigw2">
                2호기
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instCd"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">I/F ID(명)</label>
          <input
            v-model="ifId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
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
        <div class="column w-1">
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
        <div class="column w-1">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1" />
      </div>

      <div class="table_grid">
        <div class="table_head">
          <ul>
            <li class="th_cell">
              파일명<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              대외기관<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              I/F ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              송수신<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              Real Ip<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              Nat Ip<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              Port<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              mstFileNum<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="fileRow in this.fileList"
            :key="fileRow.mstFileNum"
            class="table_row w-auto"
          >
            <li
              v-for="(fileCol, i) in fileRow"
              :key="i"
              class="td_cell"
              @click="detailInfo(i, fileRow[7])"
            >
              {{ fileCol }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        상세정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">파일명</label>
          <input
            v-model="fileHead"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            v-model="fileTail"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            v-model="fileDate"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instNm"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
          <select v-model="mqMngrNm">
            <option value="eigw1">
              1호기
            </option>
            <option value="eigw2">
              2호기
            </option>
          </select>
          <span class="select" />
        </div>
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
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
        <div class="column w-1">
          <label class="column_label">파일설명</label>
          <input
            v-model="fileDesc"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용유무</label>
          <input
            v-model="useYn"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">mstFileNum</label>
          <input
            v-model="mstFileNum"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        SKT_EIGW 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID &amp; 명</label>
          <input
            v-model="eaiIfId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="skt_svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">실행프로그램</label>
          <input
            v-model="skt_execPgm"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">OPCODE</label>
          <input
            v-model="opCode"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="skt_staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="skt_endPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            v-model="skt_sussPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            v-model="skt_failPath"
            type="text"
            class="add_text"
          >
        </div>

        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            v-model="skt_hstPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">재시도건수</label>
          <input
            v-model="skt_retrmsCnt"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">재시도주기</label>
          <input
            v-model="skt_retrmsGap"
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
        <div class="column on w-2">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="eigw_svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">실행프로그램</label>
          <input
            v-model="eigw_execPgm"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="eigw_staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="eigw_endPath"
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
          <label class="column_label">실행프로그램</label>
          <input
            v-model="agency_svcId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로세스ID</label>
          <input
            v-model="agency_execPgm"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">User ID</label>
          <input
            v-model="usrId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Password</label>
          <input
            v-model="pwd"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시작경로</label>
          <input
            v-model="agency_staPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">최종경로</label>
          <input
            v-model="agency_endPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">성공경로</label>
          <input
            v-model="agency_sussPath"
            type="text"
            class="add_text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">실패경로</label>
          <input
            v-model="agency_failPath"
            type="text"
            class="add_text"
          >
        </div>

        <div class="column w-2">
          <label class="column_label">History경로</label>
          <input
            v-model="agency_hstPath"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">재시도건수</label>
          <input
            v-model="agency_retrmsCnt"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">재시도주기</label>
          <input
            v-model="agency_retrmsGap"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">서버정보</label>
          <input
            v-model="svrNum"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">Real Ip</label>
          <input
            v-model="svrRealIp"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Nat Ip</label>
          <input
            v-model="svrNatIp"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">Port</label>
          <input
            v-model="svrPort"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-2" />
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        서버 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="turnOnSvrPop()"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul class="table_row form_type except w-auto">
            <li class="th_cell">
              구분
            </li>
            <li class="th_cell">
              REAL IP
            </li>
            <li class="th_cell">
              NAT IP
            </li>
            <li class="th_cell">
              PORT
            </li>
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(serve, i) in this.serveList"
            :key="serve.svrNum"
            class="table_row form_type except w-auto"
          >
            <li class="td_cell">
              {{ serve.svrTypCd }}
            </li>
            <li class="td_cell on">
              {{ serve.svrRealIp }}
            </li>
            <li class="td_cell">
              {{ serve.svrNatIp }}
            </li>
            <li class="td_cell">
              {{ serve.svrPort }}
            </li>
            <li class="td_cell">
              <i
                class="ico-del"
                @click="delList(i)"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="addInchrgrList()"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
            <li class="th_cell" />
            <li class="th_cell">
              사용자 Id
            </li>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              부서
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
            <li class="th_cell" />
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(inuser,i) in this.inchrgrList"
            :key="inuser.UserId"
            class="table_row form_type except w-auto"
          >
            <li class="td_cell">
              {{ i+1 }}
            </li>
            <li
              v-for="(inUserInfo, j) in inuser"
              :key="j"
              class="td_cell"
            >
              {{ inUserInfo }}
            </li>
            <li class="td_cell">
              <i
                class="ico-edit"
                @click="editInchrgrList(i)"
              />
              <i
                class="ico-del"
                @click="inuserdelList(i)"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        대외기관 담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="addOutchrgrList()"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
            <li class="th_cell" />
            <li class="th_cell">
              사용자 Id
            </li>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              부서
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(outuser, i) in outchrgrList"
            :key="outuser.userId"
            class="table_row form_type except w-auto"
          >
            <li class="td_cell">
              {{ i+1 }}
            </li>
            <li
              v-for="(outUserInfo,k) in outuser"
              :key="k"
              class="td_cell"
            >
              {{ outUserInfo }}
            </li>
            <li class="td_cell">
              <i
                class="ico-edit"
                @click="editOutchrgrList(i)"
              />
              <i
                class="ico-del"
                @click="outuserdelList(i)"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
        @click="save()"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>

import SvrListPopup from '@/components/popup/meta/eigw/SvrListPopup.vue';

export default {
  data() {
    return {
      fileList: '',
      mqMngrNm: '',
      ifId: '',
      fileNm: '',
      svrIp: '',
      instCd: '',
      srFlag: '',
      serveList: '',
      inchrgrList: '',
      outchrgrList: '',
      fileHead: '',
      fileTail: '',
      fileDate: '',
      instNm: '',
      useYn: '',
      fileDesc: '',
      eaiIfId: '',
      skt_svcId: '',
      skt_execPgm: '',
      opCode: '',
      skt_staPath: '',
      skt_endPath: '',
      skt_sussPath: '',
      skt_failPath: '',
      skt_hstPath: '',
      skt_retrmsCnt: '',
      skt_retrmsGap: '',
      eigw_svcId: '',
      eigw_execPgm: '',
      eigw_staPath: '',
      eigw_endPath: '',
      agency_svcId: '',
      agency_execPgm: '',
      usrId: '',
      pwd: '',
      agency_staPath: '',
      agency_endPath: '',
      agency_sussPath: '',
      agency_failPath: '',
      agency_hstPath: '',
      agency_retrmsCnt: '',
      agency_retrmsGap: '',
      inuserIdList: '',
      outuserIdList: '',
      userIdList: '',
      saveChrgrInfo: '',
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/admin/fileList', {
        params: {
          mqMngrNm: this.mqMngrNm,
          ifId: this.ifId,
          fileNm: this.fileNm,
          svrIp: this.svrIp,
          instCd: this.instCd,
          srFlag: this.srFlag,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd == 'S') {
            this.fileList = res.data.rstData.fileList;
          } else {
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    detailInfo(i, index) {
      this.tgtUrl = '/api/eigw/fileDtlInfo/';
      if (index != null && index !== '') {
        this.tgtUrl = `${this.tgtUrl}/${index}`;
      }
      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd == 'S') {
            this.mstFileNum = res.data.rstData.fileDtlInfo[0].mstFileNum;
            this.fileHead = res.data.rstData.fileDtlInfo[0].fileHead;
            this.fileTail = res.data.rstData.fileDtlInfo[0].fileTail;
            this.fileDate = res.data.rstData.fileDtlInfo[0].fileDate;
            this.mqMngrNm = res.data.rstData.fileDtlInfo[0].mqMngrNm;
            this.instNm = res.data.rstData.fileDtlInfo[0].instCd;
            this.srFlag = res.data.rstData.fileDtlInfo[0].srFlag;
            this.useYn = res.data.rstData.fileDtlInfo[0].useYn;
            this.fileDesc = res.data.rstData.fileDtlInfo[0].fileDesc;

            this.eaiIfId = res.data.rstData.fileDtlInfo[0].sktInfo.eaiIfId;
            this.skt_svcId = res.data.rstData.fileDtlInfo[0].sktInfo.svcId;
            this.skt_execPgm = res.data.rstData.fileDtlInfo[0].sktInfo.execPgm;
            this.opCode = res.data.rstData.fileDtlInfo[0].sktInfo.opCode;
            this.skt_staPath = res.data.rstData.fileDtlInfo[0].sktInfo.staPath;
            this.skt_endPath = res.data.rstData.fileDtlInfo[0].sktInfo.endPath;
            this.skt_sussPath = res.data.rstData.fileDtlInfo[0].sktInfo.sussPath;
            this.skt_failPath = res.data.rstData.fileDtlInfo[0].sktInfo.failPath;
            this.skt_hstPath = res.data.rstData.fileDtlInfo[0].sktInfo.hstPath;
            this.skt_retrmsCnt = res.data.rstData.fileDtlInfo[0].sktInfo.retrmsCnt;
            this.skt_retrmsGap = res.data.rstData.fileDtlInfo[0].sktInfo.retrmsGap;
            this.eigw_svcId = res.data.rstData.fileDtlInfo[0].eigwInfo.svcId;
            this.eigw_execPgm = res.data.rstData.fileDtlInfo[0].eigwInfo.execPgm;
            this.eigw_staPath = res.data.rstData.fileDtlInfo[0].eigwInfo.staPath;
            this.eigw_endPath = res.data.rstData.fileDtlInfo[0].eigwInfo.endPath;
            this.agency_svcId = res.data.rstData.fileDtlInfo[0].agencyInfo.svcId;
            this.agency_execPgm = res.data.rstData.fileDtlInfo[0].agencyInfo.execPgm;
            this.usrId = res.data.rstData.fileDtlInfo[0].agencyInfo.userId;
            this.pwd = res.data.rstData.fileDtlInfo[0].agencyInfo.pwd;
            this.agency_staPath = res.data.rstData.fileDtlInfo[0].agencyInfo.staPath;
            this.agency_endPath = res.data.rstData.fileDtlInfo[0].agencyInfo.endPath;
            this.agency_sussPath = res.data.rstData.fileDtlInfo[0].agencyInfo.sussPath;
            this.agency_failPath = res.data.rstData.fileDtlInfo[0].agencyInfo.failPath;
            this.agency_hstPath = res.data.rstData.fileDtlInfo[0].agencyInfo.hstPath;
            this.agency_retrmsCnt = res.data.rstData.fileDtlInfo[0].agencyInfo.retrmsCnt;
            this.agency_retrmsGap = res.data.rstData.fileDtlInfo[0].agencyInfo.retrmsGap;
            this.inchrgrList = res.data.rstData.inchrgrList;
            this.outchrgrList = res.data.rstData.outchrgrList;
            this.serveList = res.data.rstData.severList;
            this.svrNum = res.data.rstData.severList[0].svrNum;
            this.svrRealIp = res.data.rstData.severList[0].svrRealIp;
            this.svrNatIp = res.data.rstData.severList[0].svrNatIp;
            this.svrPort = res.data.rstData.severList[0].svrPort;
          } else {
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      this.saveInfo = {
        mstFileNum: this.mstFileNum,
        mqMngrNm: this.mqMngrNm,
        fileNm: this.fileHead + this.fileDate + this.fileTail,
        fileHead: this.fileHead,
        fileTail: this.fileTail,
        fileDesc: this.fileDesc,
        instCd: this.instCd,
        fileDate: this.fileDate,
        srFlag: this.srFlag,
        svrNum: this.svrNum,
        sktInfo: {
          mstFileSeq: this.mstFileNum,
          eaiIfId: this.eaiIfId,
          svcId: this.skt_svcId,
          execPgm: this.skt_execPgm,
          opCode: this.opCode,
          staPath: this.skt_staPath,
          endPath: this.skt_endPath,
          sussPath: this.skt_sussPath,
          failPath: this.skt_failPath,
          hstPath: this.skt_hstPath,
          retrmsCnt: this.skt_retrmsCnt,
          retrmsGap: this.skt_retrmsGap,
        },
        eigwInfo: {
          mstFileSeq: this.mstFileNum,
          svcId: this.eigw_svcId,
          execPgm: this.eigw_execPgm,
          staPath: this.eigw_staPath,
          endPath: this.eigw_endPath,
        },
        agencyInfo: {
          mstFileSeq: this.mstFileNum,
          svcId: this.agency_svcId,
          execPgm: this.agency_execPgm,
          userId: this.userId,
          pwd: this.pwd,
          staPath: this.agency_staPath,
          endPath: this.agency_endPath,
          sussPath: this.agency_sussPath,
          failPath: this.agency_failPath,
          hstPath: this.agency_hstPath,
          retrmsCnt: this.agency_retrmsCnt,
          retrmsGap: this.agency_retrmsGap,
        },
      };
      this.$axios.post('/api/eigw/file/MetaInfo/save', this.saveInfo)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });
      this.$axios.post('/api/eigw/file/MetaInfo/servesave', this.serveList)
        .then((res) => {
          console.log('meta data save!');
          console.log(res);
        })
        .catch((ex) => {
          console.log(`metainfo save error occur!! : ${ex}`);
        });

      if (this.inchrgrList != null || this.inchrgrList != '') {
        this.parseInUserId();
      }

      if (this.outchrgrList != null || this.outchrgrList != '') {
        this.parseOutUserId();
      }
    },
    turnOnSvrPop() {
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOn = false;
    },
    delList(i) {
      if (confirm(`${this.serveList[i].svrRealIp} 서버 정보를 삭제하시겠습니까?`)) {
        // i 번째 행 리스트에서 제거
      }
    },
    editInchrgrList(i) {
      alert(this.inchrgrList[i]);
      const info = {
        0: '', 1: '', 2: '', 3: '', 4: '',
      };
      this.inchrgrList.push(info);
    },
    addInchrgrList() {
    },
    editOutchrgrList(i, index) {
      // for (let i = 1; i < this.outchrgrList.length; i++) {
      this.parseUserId();
      // this.saveChrgrInfo = {
      //   mstFileNum: '1',
      //   fileChrgrNum: '1',
      //   userId: 'KTOA0102',
      //   chrgrTyp: 'out',
      // };
      // alert(this.saveChrgrInfo);
      this.$axios.post('/api/eigw/file/MetaInfo/chrgrsave', this.userIdList)
        .then((res) => {
          console.log('meta data save');
          console.log(res);
          this.listing();
        })
        .catch((ex) => {
          console.log(`chrgr save error occur!! : ${ex}`);
        });
    //  }
    },
    addOutchrgrList() {
    },
    parseUserId() {
      this.userIdList = [];
      for (let i = 0; i < this.outchrgrList.length; i++) {
        this.userIdList.push({
          mstFileNum: this.mstFileNum,
          fileChrgrNum: this.outchrgrList[i][6],
          userId: this.outchrgrList[i][0],
          chrgrTyp: 'out',
        });
      }
    },
    parseOutUserId() {
      alert('시작222');
      this.outuserIdList = [];
      for (let i = 0; i < this.outchrgrList.length; i++) {
        this.outuserIdList.push({
          mstFileNum: this.mstFileNum,
          fileChrgrNum: this.outchrgrList[i][6],
          userId: this.outchrgrList[i][0],
          chrgrTyp: 'out',
        });
      }
      this.$axios.post('/api/eigw/file/MetaInfo/chrgrsave', this.outuserIdList)
        .then((res) => {
          console.log('meta data save');
          console.log(res);
          this.listing();
        })
        .catch((ex) => {
          console.log(`chrgr save error occur!! : ${ex}`);
        });
    },
    parseInUserId() {
      this.inuserIdList = [];
      for (let i = 0; i < this.inchrgrList.length; i++) {
        this.inuserIdList.push({
          mstFileNum: this.mstFileNum,
          fileChrgrNum: this.inchrgrList[i][6],
          userId: this.inchrgrList[i][0],
          chrgrTyp: 'in',
        });
      }
      this.$axios.post('/api/eigw/file/MetaInfo/chrgrsave', this.inuserIdList)
        .then((res) => {
          console.log('meta data save');
          console.log(res);
          this.listing();
        })
        .catch((ex) => {
          console.log(`chrgr save error occur!! : ${ex}`);
        });
    },
    parseServe() {
      this.serveSaveInfo = [];
      for (let i = 0; i < this.serveList.length; i++) {
        this.serveSaveInfo.push({
          svrNum: this.mstFileNum,
          svrTypCd: this.inchrgrList[i][6],
          svrRealIp: this.inchrgrList[i][0],
          svrNatIp: 'in',
          svrPort: '',
          // useYn : '',
          // instCd : '',
        });
      }
      this.$axios.post('/api/eigw/file/MetaInfo/servesave', this.serveSaveInfo)
        .then((res) => {
          console.log('meta data save');
          console.log(res);
          this.listing();
        })
        .catch((ex) => {
          console.log(`chrgr save error occur!! : ${ex}`);
        });
    },
  },
};

</script>
