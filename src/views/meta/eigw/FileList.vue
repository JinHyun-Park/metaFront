<template>
  <div
    class="
  right_space"
  >
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
              REAL IP<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              NAT IP<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              PORT<i class="ico-sort-up" />
            </li>
            <li
              class="th_cell"
            >
              MST-FILE-NUM<i class="ico-sort-up" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="fileRow in fileList"
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
        <div class="row_contain type-2">
          <div class="column w-1">
            <label class="column_label">I/F ID</label>
            <input
              v-model="eaiIfId"
              type="text"
              class="add_text"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">파일설명</label>
            <input
              v-model="fileDesc"
              type="text"
              class="add_text"
            >
          </div>
          <div class="column w-1">
            <label class="column_label">송수신구분</label>
            <input
              v-model="srFlag"
              type="text"
              class="add_text  on"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        서버 정보
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
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="serve in serveList"
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
          </ul>
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
            v-model="sendStaPath"
            type="text"
          >
        </div>

        <div
          class="column w-2"
        >
          <label class="column_label">송신 최종경로</label>
          <input
            v-model="sendEndPath"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OPCODE</label>
          <input
            v-model="opCode"
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
            v-model="reStaPath"
            type="text"
          >
        </div>

        <div class="column w-2">
          <label class="column_label">수신 최종경로</label>
          <input
            v-model="reEndPath"
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
      svrIp: '',
      instCd: '',
      userInfo: '',
      serveList: '',
      inchrgrList: '',
      outchrgrList: '',
      fileHead: '',
      fileTail: '',
      fileDate: '',
      instNm: '',
      eaiIfId: '',
      fileDesc: '',
      srFlag: '',
      sendStaPath: '',
      sendEndPath: '',
      opCode: '',
      reStaPath: '',
      reEndPath: '',
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/fileList', {
        params: {
          fileNm: this.fileNm,
          svrIp: this.svrIp,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.fileList = res.data.rstData.fileList;
          } else {
            this.$gf.alertOn('failed');
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
          if (res.data.rstCd === 'S') {
            this.userInfo = res.data.rstData.fileDtlInfo[0].chrRelList;
            this.fileHead = res.data.rstData.fileDtlInfo[0].fileHead;
            this.fileTail = res.data.rstData.fileDtlInfo[0].fileTail;
            this.fileDate = res.data.rstData.fileDtlInfo[0].fileDate;
            this.instNm = res.data.rstData.fileDtlInfo[0].instCd;
            this.srFlag = res.data.rstData.fileDtlInfo[0].srFlag;
            this.fileDesc = res.data.rstData.fileDtlInfo[0].fileDesc;
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
