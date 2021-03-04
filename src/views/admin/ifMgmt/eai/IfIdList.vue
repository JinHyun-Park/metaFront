<template>
  <div class="right_space">
    <EaiServerListPopup
      v-if="svrOnServer"
      v-bind="propsServer"
      @closePop="turOffSvrPopServer"
      @returnData="getData"
    />
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-2">
      <h2>
        <div>
          <i class="ico-bar" />EAI 인터페이스 목록
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
            @click="searchList"
          >
            조회
          </button>
          <button
            type="button"
            class="default_button on"
            @click="clearSearchFields"
          >
            지우기
          </button>
        </div>
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">인터페이스ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            value=""
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">인터페이스명</label>
          <input
            v-model="eaiIfNmKor"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연동 방식</label>
          <div class="select_group">
            <select
              v-model="ifTypCd"
            >
              <option
                v-for="(code, i) in ccCdList.ifTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">단/양방향</label>
          <div class="select_group">
            <select
              v-model="roundTypCd"
            >
              <option
                v-for="(code, i) in ccCdList.roundTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">EAI HUB</label>
          <div class="select_group">
            <select
              v-model="eaiHub"
            >
              <option
                value=""
              >
                전체
              </option>
              <option
                value="1"
              >
                1
              </option>
              <option
                value="2"
              >
                2
              </option>
              <option
                value="3"
              >
                3
              </option>
              <option
                value="4"
              >
                4
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-1">
          <label class="column_label">큐매니저</label>
          <input
            v-model="mqMngrNm"
            type="text"
            value=""
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">큐</label>
          <input
            v-model="queueNm"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">수신TR (SWING)</label>
          <input
            ref="rcvTrInput"
            v-model="rcvTr"
            type="text"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">시스템</label>
          <div class="search_group">
            <input
              v-model="hostNm"
              type="text"
              value=""
              @click="turnOnSvrPopServer"
            >
            <span
              class="search"
              @click="turnOnSvrPopServer"
            ><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">담당자</label>
          <div class="search_group">
            <input
              v-model="chrgrNm"
              type="text"
              value=""
              @click="turnOnSvrPopChrgr"
            >
            <span
              class="search"
              @click="turnOnSvrPopChrgr"
            ><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">사용 여부</label>
          <div class="select_group">
            <select v-model="useYn">
              <option value="">
                전체
              </option>
              <option value="Y">
                사용
              </option>
              <option value="N">
                미사용
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li
              class="th_cell"
              style="width:30%"
            >
              인터페이스ID
            </li>
            <li
              class="th_cell"
              style="width:30%"
            >
              인터페이스명
            </li>
            <li class="th_cell">
              연동 방식
            </li>
            <li class="th_cell">
              단/양방향
            </li>
            <li class="th_cell">
              사용 여부
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(eaiIf, i) in ifList"
            :key="i"
            class="table_row w-auto"
            @click="getRowData(eaiIf);movePage('ifIdListDetailAdmin', 1)"
          >
            <li class="td_cell">
              {{ eaiIf.eaiIfId }}
            </li>
            <li class="td_cell">
              {{ eaiIf.eaiIfNmKor }}
            </li>
            <li class="td_cell">
              {{ eaiIf.ifTypNm }}
            </li>
            <li class="td_cell">
              {{ eaiIf.roundTypNm }}
            </li>
            <li class="td_cell">
              {{ eaiIf.useYn }}
            </li>
          </ul>
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
    <!--
    <div class="right_button_area">
      <button
        type="button"
        class="default_button on"
        @click="movePage('ifIdListDetailAdmin', 0)"
      >
        등록
      </button>
    </div>
    -->
  </div>
</template>

<style scoped>
ul:hover { background-color: #F9F9F9}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import EaiServerListPopup from '@/components/popup/meta/eai/EaiServerListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import { fetchGetEaiIfList } from '@/api/eaiApi';

export default {
  components: {
    EaiServerListPopup,
    ChrgrListPopup,
  },
  data() {
    return {
      svrOnServer: false,
      svrOnChrgr: false,

      propsServer: {
        message: '',
      },
      propsChrgr: {
        message: '',
      },

      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      eaiIfSeq: '',
      eaiIfId: '',
      eaiIfNmKor: '',
      mqMngrNm: '',
      queueNm: '',
      useYn: '',
      eaiHub: '',
      ifTypCd: '',
      roundTypCd: '',
      hostNm: '',
      chrgrId: '',
      chrgrNm: '',
      rcvTr: '',
      ifTypNm: '',
      roundTypNm: '',

      ifList: [],

    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
  },
  created() {
    // EAI 상세 정보 화면에서 목록으로 다시 돌아올때 바로 조회
    if (this.$route.params.callType === 'goList') {
      this.eaiIfId = this.$route.params.eaiIfId;
      this.eaiIfNmKor = this.$route.params.eaiIfNmKor;
      this.ifTypCd = this.$route.params.ifTypCd;
      this.roundTypCd = this.$route.params.roundTypCd;
      this.eaiHub = this.$route.params.eaiHub;
      this.mqMngrNm = this.$route.params.mqMngrNm;
      this.queueNm = this.$route.params.queueNm;
      this.rcvTr = this.$route.params.rcvTr;
      this.hostNm = this.$route.params.hostNm;
      this.chrgrId = this.$route.params.chrgrId;
      this.useYn = this.$route.params.useYn;

      this.searchList();
    }
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'ROUND_TYP_CD', allYn: 'Y', listNm: 'roundTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'IF_TYP_CD', allYn: 'Y', listNm: 'ifTypCd',
    });
  },
  methods: {

    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      fetchGetEaiIfList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          eaiIfId: this.eaiIfId,
          eaiIfNmKor: this.eaiIfNmKor,
          ifTypCd: this.ifTypCd,
          roundTypCd: this.roundTypCd,
          eaiHub: this.eaiHub,
          mqMngrNm: this.mqMngrNm,
          queueNm: this.queueNm,
          rcvTr: this.rcvTr,
          hostNm: this.hostNm,
          chrgrId: this.chrgrId,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.ifList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('오류가 발생하였습니다. 관리자에게 문의 하세요.');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    turnOnSvrPopChrgr(callChrgr) {
      this.callChrgr = callChrgr;
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      this.chrgrId = val.userId;
      this.chrgrNm = val.hanNm;
    },
    turnOnSvrPopServer(op, idx) {
      this.op = op;
      this.idx = idx;
      this.svrOnServer = true;
    },
    turOffSvrPopServer(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOnServer = false;
    },
    getData(val) {
      console.log(`가져온 데이터2 : ${val.hostNm}`);
      this.svrOnServer = false;
      this.hostNm = val.hostNm;
    },

    getRowData(eaiIf) {
      console.log(eaiIf.eaiIfId);
      this.eaiIfSeq = eaiIf.eaiIfSeq;
    },

    clearSearchFields() {
      this.eaiIfId = '';
      this.eaiIfNmKor = '';
      this.ifTypCd = '';
      this.roundTypCd = '';
      this.eaiHub = '';
      this.mqMngrNm = '';
      this.queueNm = '';
      this.rcvTr = '';
      this.hostNm = '';
      this.chrgrId = '';
      this.chrgrNm = '';
      this.useYn = '';
    },

    movePage(page, type) { // 페이지 이동
      // type == 0 : 신규 등록 화면 / type == 1 : 수정 화면
      if (type === 0) {
        this.$router.push({ name: page, params: { callType: 'new' } });
      } else if (type === 1) {
        this.$router.push({
          name: page,
          params: {
            eaiIfSeq: this.eaiIfSeq,
            callType: 'update',
            eaiIfId: this.eaiIfId,
            eaiIfNmKor: this.eaiIfNmKor,
            ifTypCd: this.ifTypCd,
            roundTypCd: this.roundTypCd,
            eaiHub: this.eaiHub,
            mqMngrNm: this.mqMngrNm,
            queueNm: this.queueNm,
            rcvTr: this.rcvTr,
            hostNm: this.hostNm,
            chrgrId: this.chrgrId,
            useYn: this.useYn,
          },
        });
      }
    },
  },
};

</script>
