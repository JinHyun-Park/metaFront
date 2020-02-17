<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보
        </div>
        <div class="breadcrumb">
          <span>EIGW</span><em class="on">EAI</em>
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
          <label class="column_label">파일명</label>
          <input
            v-model="fileNm"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
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
                {{ row.dvpSvrRealIp }}<br/>({{ row.dvpSvrNatIp }})
              </li>
              <li class="td_cell">
                {{ row.dvpSvrPort }}
              </li>
              <li class="td_cell">
                {{ row.prodSvrRealIp }}<br/>({{row.prodSvrNatIp }})
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
        기본 정보
      </h5>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">파일명</label>
          <input
            v-model="fileMst.fileNm"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="fileMst.instNm"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
          <input
            v-model="fileMst.srFlag"
            type="text"
            class="add_text  on"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">I/F ID</label>
          <input
            v-model="fileSktConf.eaiIfId"
            type="text"
            class="add_text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">파일설명</label>
          <input
            v-model="fileMst.fileDesc"
            type="text"
            class="add_text"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        서버 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">개발기_REAL IP</label>
          <input
            v-model="fileAgencyConf.dvpSvrRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_NAT IP</label>
          <input
            v-model="fileAgencyConf.dvpSvrNatIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_PORT</label>
          <input
            v-model="fileAgencyConf.dvpSvrPort"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">운영기_REAL IP</label>
          <input
            v-model="fileAgencyConf.prodSvrRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_NAT IP</label>
          <input
            v-model="fileAgencyConf.prodSvrNatIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_PORT</label>
          <input
            v-model="fileAgencyConf.prodSvrPort"
            type="text"
            class="add_text on"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        접속 정보
      </h5>
      <div class="row_contain">
        <div
          class="column w-2"
        >
          <label class="column_label">송신 시작경로</label>
          <input
            v-model="fileSktConf.staPath"
            type="text"
          >
        </div>

        <div
          class="column w-2"
        >
          <label class="column_label">송신 최종경로</label>
          <input
            v-model="fileAgencyConf.endPath"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OPCODE</label>
          <input
            v-model="fileSktConf.opCode"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div
          class="column w-2"
        >
          <label class="column_label">수신 시작경로</label>
          <input
            v-model="fileAgencyConf.staPath"
            type="text"
          >
        </div>

        <div class="column w-2">
          <label class="column_label">수신 최종경로</label>
          <input
            v-model="fileSktConf.endPath"
            type="text"
          >
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area" />
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
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
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="inuser in inchrgrList"
            :key="inuser.userId"
            class="table_row form_type except w-auto"
          >
            <li
              v-for="(inUserInfo, j) in inuser"
              :key="j"
              class="td_cell"
            >
              {{ inUserInfo }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        대외기관 담당자 정보
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
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
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="outuser in outchrgrList"
            :key="outuser.userId"
            class="table_row form_type except w-auto"
          >
            <li
              v-for="(outUserInfo,k) in outuser"
              :key="k"
              class="td_cell"
            >
              {{ outUserInfo }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: '',
      fileNm: '',
      reqIp: '',
      instCd: '',
      fileMst: {},
      fileSktConf: {},
      fileEigwConf: {},
      fileAgencyConf: {},

      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/fileList', {
        params: {
          fileNm: this.fileNm,
          reqIp: this.reqIp,
          instCd: this.instCd,
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
            this.fileMst = res.data.rstData.rstData.fileMst;
            this.fileSktConf = res.data.rstData.rstData.fileSktConf;
            this.fileEigwConf = res.data.rstData.rstData.fileEigwConf;
            this.fileAgencyConf = res.data.rstData.rstData.fileAgencyConf;

            // 상세정보
            this.eaiIfId = res.data.rstData.fileDtlInfo[0].sktInfo.eaiIfId;
            this.sendStaPath = res.data.rstData.fileDtlInfo[0].sktInfo.staPath;
            this.sendEndPath = res.data.rstData.fileDtlInfo[0].agencyInfo.endPath;
            this.reStaPath = res.data.rstData.fileDtlInfo[0].agencyInfo.staPath;
            this.reEndPath = res.data.rstData.fileDtlInfo[0].sktInfo.endPath;
            this.opCode = res.data.rstData.fileDtlInfo[0].sktInfo.opCode;
            this.serveList = res.data.rstData.severList;
            this.inchrgrList = res.data.rstData.inchrgrList;
            this.outchrgrList = res.data.rstData.outchrgrList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};

</script>
