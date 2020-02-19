<template>
  <div class="right_space">
    <EigwServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="addData"
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
            v-model="instCd"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">I/F ID(명)</label>
          <input
            v-model="eaiIfId"
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
            v-model="reqIp"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
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
                {{ row.mqMngrNm }}
              </li>
              <li class="td_cell">
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                {{ row.srFlag }}
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
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="fileIfMst.instCd"
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
        <div class="column w-2">
          <label class="column_label">파일설명</label>
          <input
            v-model="fileIfMst.fileDesc"
            type="text"
            class="add_text on"
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
        <div class="column w-1" />
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
            v-for="(inuser,i) in inchrgrList"
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

import EigwServerListPopup from '@/components/popup/meta/eigw/EigwServerListPopup.vue';

export default {
  components: {
    EigwServerListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      serverPopupCase: '',

      mqMngrNm: '',
      instCd: '',
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

      serveList: '',
      inchrgrList: '',
      outchrgrList: '',
      inuserIdList: '',
      outuserIdList: '',
      userIdList: '',
      saveChrgrInfo: '',
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/fileList', {
        params: {
          mqMngrNm: this.mqMngrNm,
          ifId: this.ifId,
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
      this.tgtUrl = '/api/eigw/fileDetail';
      this.$axios.get(this.tgtUrl, {
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
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      this.saveInfo = {
        mstFileNum: this.mstFileNum,
        fileIfMst: this.fileIfMst,
        fileSktConf: this.fileSktConf,
        fileEigwConf: this.fileEigwConf,
        fileAgencyConf: this.fileAgencyConf,
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

      if (this.inchrgrList != null || this.inchrgrList !== '') {
        this.parseInUserId();
      }

      if (this.outchrgrList != null || this.outchrgrList !== '') {
        this.parseOutUserId();
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
    delList(i) {
      if (this.$gf.confirmOn(`${this.serveList[i].svrRealIp} 서버 정보를 삭제하시겠습니까?`)) {
        // i 번째 행 리스트에서 제거
      }
    },
    editInchrgrList(i) {
      this.$gf.alertOn(this.inchrgrList[i]);
      const info = {
        0: '', 1: '', 2: '', 3: '', 4: '',
      };
      this.inchrgrList.push(info);
    },
    addInchrgrList() {
    },
    editOutchrgrList(i, index) {
      console.log(`i : ${i}, index : ${index}`);
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
      this.$gf.alertOn('시작222');
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
