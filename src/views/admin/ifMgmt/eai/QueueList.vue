<template>
  <div class="right_space">
    <MqMngrListPopup
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
    <EaiServerListPopup
      v-if="svrOnServer"
      v-bind="propsServer"
      @closePop="turOffSvrPopServer"
      @returnData="getData"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />큐 목록
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
            @click="searchList()"
          >
            조회
          </button>
        </div>
      </h5>
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
              style="width:30%;"
            >
              큐
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              유형
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              호스트명
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              담당자
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              최대 적체
            </li>
            <li
              class="th_cell"
            >
              사용 여부
            </li>
            <li
              class="th_cell"
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
                value=""
                @click="turnOnSvrPop"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="queueNm"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="qTypeCd">
                  <option
                    v-for="(code, n) in ccCdList.qTypeCd"
                    :key="n"
                    :value="code.cdDtlId"
                  >
                    {{ code.cdNm }}
                  </option>
                </select>
              </div>
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="hostNm"
                type="text"
                value=""
                @click="turnOnSvrPopServer(-1)"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="chrgrNm"
                type="text"
                value=""
                @click="turnOnSvrPopChrgr(-1)"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="crtcVal"
                type="number"
                min="0"
                oninput="this.value = Math.abs(this.value)"
                style="text-align:right"
              >
            </li>
            <li
              class="td_cell"
            >
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
              v-if="(adminYn ==='Y')"
            >
              <i
                class="ico-add"
                @click="saveQueue()"
              />
              <i
                class="ico-del"
                @click="resetField()"
              />
            </li>
          </ul>
          <ul
            v-for="(queue, i) in qList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ queue.mqMngrNm }}
            </li>
            <li class="td_cell">
              {{ queue.queueNm }}
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="queue.qTypeCd">
                  <option
                    v-for="(code, n) in ccCdList.qTypeCd"
                    :key="n"
                    :value="code.cdDtlId"
                  >
                    {{ code.cdNm }}
                  </option>
                </select>
              </div>
            </li>
            <li class="td_cell">
              <input
                v-model="queue.hostNm"
                type="text"
                value=""
                @click="turnOnSvrPopServer(i)"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="queue.chrgrNm"
                type="text"
                value=""
                @click="turnOnSvrPopChrgr(i)"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="queue.crtcVal"
                type="number"
                min="0"
                oninput="this.value = Math.abs(this.value)"
                style="text-align:right"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="queue.useYn">
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
                @click="editList(i)"
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
import { mapState, mapActions } from 'vuex';
import { fetchGetEaiQueueList } from '@/api/eaiApi';
import MqMngrListPopup from '@/components/popup/meta/eai/MqMngrListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EaiServerListPopup from '@/components/popup/meta/eai/EaiServerListPopup.vue';

export default {
  components: {
    MqMngrListPopup,
    ChrgrListPopup,
    EaiServerListPopup,
  },
  data() {
    return {
      svrOn: false,
      svrOnChrgr: false,
      svrOnServer: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: 'Hi', // 사용방법 예시 데이터
      },

      index: 0,
      qList: [],
      queueNm: '',
      mqMngrNm: '',
      chrgrNm: '',
      chrgrId: '',
      crtcVal: '',
      hostNm: '',
      useYn: '',
      qTypeCd: '',
      op: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
    ...mapState('login', ['adminYn']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'Q_TYP_CD', allYn: 'Y', listNm: 'qTypeCd',
    });
  },
  methods: {
    // ...mapActions('frameSet', ['resetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      console.log('큐 목록 조회!');
      // this.$axios.get('/api/eai/queue', {
      fetchGetEaiQueueList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          queueNm: this.queueNm,
          mqMngrNm: this.mqMngrNm,
          qTypeCd: this.qTypeCd,
          crtcVal: this.crtcVal,
          chrgrId: this.chrgrId,
          hostNm: this.hostNm,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          // this.qList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.searchList, 'Y');
          this.qList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveQueue() {
      if (this.mqMngrNm === '') {
        this.$gf.alertOn('큐 매니저를 선택하세요');
        return;
      } if (this.queueNm === '') {
        this.$gf.alertOn('큐명을 입력하세요');
        return;
      } if (this.qTypeCd === '') {
        this.$gf.alertOn('큐 유형을 선택하세요');
        return;
      } if (this.hostNm === '') {
        this.$gf.alertOn('호스트명을 선택하세요');
        return;
      } if (this.chrgrId === '') {
        this.$gf.alertOn('담당자를 선택하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.queueNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertData);
    },
    insertData() {
      console.log('큐 정보 등록!');
      this.qList = {
        queueNm: this.queueNm,
        mqMngrNm: this.mqMngrNm,
        qTypeCd: this.qTypeCd,
        crtcVal: this.crtcVal,
        hostNm: this.hostNm,
        chrgrId: this.chrgrId,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/queue', this.qList)
        .then((res) => {
          console.log(res);
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      if (this.qList[i].qTypeCd === '') {
        this.$gf.alertOn('큐 유형을 선택하세요');
        return;
      }
      const confirmText = `${this.qList[i].queueNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('큐 정보 갱신!');
      console.log(i);
      this.$axios.put('/api/eai/queue', this.qList[i])
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('반영되었습니다.');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPop() {
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`가져온 데이터2 : ${val}`);
      this.svrOn = false;
      this.mqMngrNm = val.mqMngrNm;
    },
    turnOnSvrPopChrgr(op) {
      this.op = op;
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      if (this.op === -1) {
        this.chrgrId = val.userId;
        this.chrgrNm = val.hanNm;
      } else {
        this.qList[this.op].chrgrId = val.userId;
        this.qList[this.op].chrgrNm = val.hanNm;
      }
    },
    turnOnSvrPopServer(op) {
      this.op = op;
      this.svrOnServer = true;
    },
    turOffSvrPopServer(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOnServer = false;
    },
    getData(val) {
      console.log(`가져온 데이터2 : ${val.hostNm}`);
      this.svrOnServer = false;

      if (this.op === -1) {
        this.hostNm = val.hostNm;
      } else {
        this.qList[this.op].hostNm = val.hostNm;
      }
    },
    resetField() {
      this.mqMngrNm = '';
      this.queueNm = '';
      this.qTypeCd = '';
      this.crtcVal = '';
      this.hostNm = '';
      this.chrgrId = '';
      this.chrgrNm = '';
      this.useYn = '';
    },
  },
};
</script>
