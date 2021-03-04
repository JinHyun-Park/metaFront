<template>
  <div class="right_space">
    <!-- EAI 서버리스트 팝업 호출 -->
    <EaiServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @returnData="getData"
    />

    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />큐매니저 목록
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
            class="default_button on"
            @click="searchList"
          >
            조회
          </button>
        </div>
      </h5>
      <!--
      <div class="row_contain type-3">
        <div class="column w-4">
          <label class="column_label">큐매니저</label>
          <input
            v-model="mqMngrNm"
            type="text"
            value=""
          >
        </div>
        <div class="column w-3">
          <label class="column_label">서버</label>
          <div class="search_group">
            <input
              v-model="hostNm"
              type="text"
              value=""
            >
            <span
              class="search"
              @click="turnOnSvrPop"
            ><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column on w-3">
          <label class="column_label">VIP</label>
          <input
            v-model="vIp"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-3">
          <label class="column_label">NAT IP</label>
          <input
            v-model="natIp"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-3">
          <label class="column_label">IP(기타)</label>
          <input
            v-model="etcIp"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-3">
          <label class="column_label">Port</label>
          <input
            v-model="qmPort"
            type="number"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">사용</label>
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
      -->
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li
              class="th_cell"
              style="width:15%;"
            >
              큐매니저
            </li>
            <li
              class="th_cell"
              style="width:20%;"
            >
              호스트명
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              VIP
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              NAT IP
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              IP(기타)
            </li>
            <li
              class="th_cell"
              style="width:5%;"
            >
              PORT
            </li>
            <li
              class="th_cell"
              style="width:5%;"
            >
              사용 여부
            </li>
            <li
              class="th_cell"
              style="width:10%;"
              v-if="(adminYn ==='Y')"
            >
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              <input
                v-model="mqMngrNm"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="hostNm"
                type="text"
                value=""
                @click="turnOnSvrPop(-1)"
              >
            </li>
            <li class="td_cell">
              {{ vIp }}
            </li>
            <li class="td_cell">
              {{ natIp }}
            </li>
            <li class="td_cell">
              {{ etcIp }}
            </li>
            <li class="td_cell">
              <input
                v-model="qmPort"
                type="number"
                value=""
                min="0"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="useYn">
                  <option
                    value=""
                  >
                    전체
                  </option>
                  <option
                    value="Y"
                  >
                    사용
                  </option>
                  <option
                    value="N"
                  >
                    미사용
                  </option>
                </select>
              </div>
            </li>
            <li 
              class="td_cell"
              v-if="(adminYn ==='Y')">
              <i
                class="ico-add"
                @click="saveMqMngr()"
              />
              <i
                class="ico-del"
                @click="resetField()"
              />
            </li>
          </ul>
          <ul
            v-for="(row, index) in mqMngrList"
            :key="index"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ row.mqMngrNm }}
            </li>
            <li class="td_cell">
              <input
                v-model="row.hostNm"
                type="text"
                value=""
                @click="turnOnSvrPop(index)"
              >
            </li>
            <li class="td_cell">
              {{ row.vIp }}
            </li>
            <li class="td_cell">
              {{ row.natIp }}
            </li>
            <li class="td_cell">
              {{ row.etcIp }}
            </li>
            <li class="td_cell">
              <input
                v-model="row.qmPort"
                type="number"
                min="0"
                value=""
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="row.useYn">
                  <option
                    value="Y"
                  >
                    사용
                  </option>
                  <option
                    value="N"
                  >
                    미사용
                  </option>
                </select>
              </div>
            </li>
            <li 
              class="td_cell"
              v-if="(adminYn ==='Y')">
              <i
                class="ico-edit"
                @click="editList(index)"
              />
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EaiServerListPopup from '@/components/popup/meta/eai/EaiServerListPopup.vue';
import { fetchGetEaiMqMngrList } from '@/api/eaiApi';

export default {
  name: 'QueueMgrList',
  components: {
    EaiServerListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: 'Hi', // 사용방법 예시 데이터
      },

      mqMngrNm: '',
      svrNum: '',
      hostNm: '',
      vIp: '',
      natIp: '',
      etcIp: '',
      qmPort: '',
      useYn: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      mqMngrList: {},
      serverData: {},
      op: '',
    };
  },
  computed: {
    ...mapState('login', ['adminYn']),
  },
  methods: {
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      // this.$axios.get('/api/eai/mqMngr', {
      fetchGetEaiMqMngrList({
        params: {
          mqMngrNm: this.mqMngrNm,
          hostNm: this.hostNm,
          qmPort: this.qmPort,
          useYn: this.useYn,
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.mqMngrList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPop(op) {
      this.op = op;
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOn = false;
    },
    getData(val) {
      console.log(`가져온 데이터2 : ${val.hostNm}`);
      this.svrOn = false;
      if (this.op === -1) {
        this.serverData = val;
        this.hostNm = val.hostNm;
        this.vIp = val.vIp;
        this.natIp = val.natIp;
        this.etcIp = val.etcIp;
        this.svrNum = val.svrNum;
      } else {
        this.mqMngrList[this.op].hostNm = val.hostNm;
        this.mqMngrList[this.op].vIp = val.vIp;
        this.mqMngrList[this.op].natIp = val.natIp;
        this.mqMngrList[this.op].etcIp = val.etcIp;
        this.mqMngrList[this.op].svrNum = val.svrNum;
      }
    },
    saveMqMngr() {
      console.log(`사용 여부 : ${this.useYn}`);
      if (this.mqMngrNm === '') {
        this.$gf.alertOn('큐매니저를 입력하세요');
        return;
      } if (this.svrNum === '') {
        this.$gf.alertOn('서버를 선택하세요');
        return;
      } if (this.qmPort === '') {
        this.$gf.alertOn('Port를 입력하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.mqMngrNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertData);
    },
    insertData() {
      console.log('EAI 큐매니저 정보 등록!');
      this.mqMngrList = {
        mqMngrNm: this.mqMngrNm,
        svrNum: this.svrNum,
        hostNm: this.hostNm,
        qmPort: this.qmPort,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/mqMngr', this.mqMngrList)
        .then((res) => {
          console.log(res);
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      if (this.mqMngrList[i].svrNum === '') {
        this.$gf.alertOn('서버를 선택하세요');
        return;
      }
      const confirmText = `${this.mqMngrList[i].mqMngrNm} 를 수정하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('EAI 큐매니저 정보 갱신!');
      console.log(i);
      this.$axios.put('/api/eai/mqMngr', this.mqMngrList[i])
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('반영되었습니다.');
            this.searchList();
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    resetField() {
      this.mqMngrNm = '';
      this.svrNum = '';
      this.hostNm = '';
      this.vIp = '';
      this.natIp = '';
      this.etcIp = '';
      this.qmPort = '';
      this.useYn = '';
    },
  },
};
</script>
