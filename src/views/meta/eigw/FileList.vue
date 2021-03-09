<template>
  <div class="right_space">
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
          <span>EiGW</span><em class="on">메타정보(파일)</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
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
          <div class="search_group">
          <input
            v-model="instNm"
            type="text"
            class="add_text"
            @keyup.13="searchList()"
            disabled
          >
          <span
              class="search"
              @click="turnOnSvrPopInstList()"
            ><i class="ico-search" /></span>
          </div>
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
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                {{ row.srFlagNm }}
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
        기본 정보
      </h5>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">파일명</label>
          <input
            v-model="fileMst.fileNm"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="fileMst.instNm"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">송수신구분</label>
          <div class="select_group">
            <input
              v-model="fileMst.srFlagNm"
              type="text"
              class="add_text on"
              readonly
            >
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">I/F ID</label>
          <input
            v-model="fileSktConf.eaiIfId"
            type="text"
            class="add_text"
            readonly
          >
        </div>
        <div class="column w-3">
          <label class="column_label">파일설명</label>
          <input
            v-model="fileMst.fileDesc"
            type="text"
            class="add_text"
            readonly
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
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_NAT IP</label>
          <input
            v-model="fileAgencyConf.dvpSvrNatIp"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_PORT</label>
          <input
            v-model="fileAgencyConf.dvpSvrPort"
            type="text"
            class="add_text on"
            readonly
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
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_NAT IP</label>
          <input
            v-model="fileAgencyConf.prodSvrNatIp"
            type="text"
            class="add_text on"
            readonly
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_PORT</label>
          <input
            v-model="fileAgencyConf.prodSvrPort"
            type="text"
            class="add_text on"
            readonly
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
            readonly
          >
        </div>

        <div
          class="column w-2"
        >
          <label class="column_label">송신 최종경로</label>
          <input
            v-model="fileAgencyConf.endPath"
            type="text"
            readonly
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OPCODE</label>
          <input
            v-model="fileSktConf.opCode"
            type="text"
            readonly
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
            readonly
          >
        </div>

        <div class="column w-2">
          <label class="column_label">수신 최종경로</label>
          <input
            v-model="fileSktConf.endPath"
            type="text"
            readonly
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
            v-for="inchrgr in inChrgrList"
            :key="inchrgr.userId"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ inchrgr.instNm }}
            </li>
            <li class="td_cell">
              {{ inchrgr.orgCd }}
            </li>
            <li class="td_cell">
              {{ inchrgr.hanNm }}
            </li>
            <li class="td_cell">
              {{ inchrgr.mblPhonNum }}
            </li>
            <li class="td_cell">
              {{ inchrgr.emailAddr }}
            </li>
          </ul>
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
              v-for="outchrgr in outChrgrList"
              :key="outchrgr.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                {{ outchrgr.instNm }}
              </li>
              <li class="td_cell">
                {{ outchrgr.orgCd }}
              </li>
              <li class="td_cell">
                {{ outchrgr.hanNm }}
              </li>
              <li class="td_cell">
                {{ outchrgr.mblPhonNum }}
              </li>
              <li class="td_cell">
                {{ outchrgr.emailAddr }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchEigwAdFileList, fetchEigwFileDetail } from '@/api/eigwApi';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';

export default {
  components: {
    InstListPopup,
  },
  data() {
    return {
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      fileList: '',
      fileNm: '',
      reqIp: '',
      instCd: '',
      instNm: '',
      fileMst: {},
      fileSktConf: {},
      fileEigwConf: {},
      fileAgencyConf: {},
      inChrgrList: '',
      outChrgrList: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  methods: {
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      fetchEigwAdFileList({
        params: {
          fileNm: this.fileNm,
          reqIp: this.reqIp,
          instNm: this.instNm,
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
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
      fetchEigwFileDetail({
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
    turnOnSvrPopInstList() {
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.instCd = val.instCd;
      this.instNm = val.instNm;
      this.svrOnInstList = false;
    },
  },
};

</script>
