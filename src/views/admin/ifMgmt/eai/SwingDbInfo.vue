<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />SWING 인터페이스 DB 관리
        </div>
        <div class="breadcrumb">
          <span>EAI</span><em class="on">SWING 인터페이스 DB</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SWING 수신 인터페이스 DB
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="searchRcvList()"
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
              style="width:20%;"
            >
              인터페이스ID
            </li>
            <li
              class="th_cell"
              style="width:13%;"
            >
              수신 테이블
            </li>
            <li
              class="th_cell"
              style="width:15%;"
            >
              수신 TR
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              MQ UCS
            </li>
            <li
              class="th_cell"
              style="width:10%;"
            >
              TP UCS
            </li>
            <li
              class="th_cell"
              style="width:12%;"
            >
              수신큐
            </li>
            <li
              class="th_cell"
              style="width:5%;"
            >
              사용 여부
            </li>
            <li
              class="th_cell"
              style="width:5%;"
              v-if="(adminYn === 'Y')"
            >
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li
              class="td_cell"
            >
              <input
                v-model="rEaiIfId"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="rcvTbl"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="rcvTr"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="mqUcs"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="tpUcs"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li
              class="td_cell"
            >
              <input
                v-model="rcvQueue"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="rUseYn">
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
              v-if="(adminYn === 'Y')">
              <i
                class="ico-add"
                @click="saveRcv()"
              />
              <i
                class="ico-del"
                @click="resetRcvField()"
              />
            </li>
          </ul>
          <ul
            v-for="(rcv, i) in rcvList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ rcv.eaiIfId }}
            </li>
            <li class="td_cell">
              <input
                v-model="rcv.rcvTbl"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="rcv.tr"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="rcv.swgmq"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="rcv.swgtp"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="rcv.rcvQueue"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="rcv.useYn">
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
              v-if="(adminYn === 'Y')">
              <i
                class="ico-edit"
                @click="editList(i, 'r')"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="pagination_space">
        <paginate
          v-model="rPageSet.pageNo"
          :page-count="rPageSet.pageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="pageMoveRcvList"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        SWING 송신 인터페이스 DB
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="searchSndList()"
          >
            조회
          </button>
        </div>
      </h5>
      <!--
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">인터페이스ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">테이블</label>
          <input
            v-model="sndTbl"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">송신ADT</label>
          <input
            v-model="sndAdt"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select v-model="useYn">
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
            <li class="th_cell">
              인터페이스ID
            </li>
            <li class="th_cell">
              송신 테이블
            </li>
            <li class="th_cell">
              송신ADT
            </li>
            <li class="th_cell">
              사용 여부
            </li>
            <li 
              class="th_cell"
              v-if="(adminYn === 'Y')">
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              <input
                v-model="eaiIfId"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="sndTbl"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="sndAdt"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
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
              v-if="(adminYn === 'Y')">
              <i
                class="ico-add"
                @click="saveSnd()"
              />
              <i
                class="ico-del"
                @click="resetSndField()"
              />
            </li>
          </ul>
          <ul
            v-for="(snd, i) in sndList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ snd.eaiIfId }}
            </li>
            <li class="td_cell">
              <input
                v-model="snd.sndTbl"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <input
                v-model="snd.sndAdt"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="snd.useYn">
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
              v-if="(adminYn === 'Y')">
              <i
                class="ico-edit"
                @click="editList(i, 's')"
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
          :click-handler="pageMoveSndList"
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
import { fetchGetEaiSwgSndList, fetchGetEaiSwgRcvList } from '@/api/eaiApi';

export default {
  data() {
    return {
      index: 0,
      sndList: [],
      saveSndTbl: {},
      sndTbl: '',
      eaiIfId: '',
      sndAdt: '',
      useYn: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveRcvListChk: 0,
      rPageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveSndListChk: 0,
      totalPages: 0,
      totalRows: 0,
      rcvList: [],
      saveRcvTbl: {},
      rcvTbl: '',
      rEaiIfId: '',
      rcvTr: '',
      mqUcs: '',
      tpUcs: '',
      rcvQueue: '',
      rUseYn: '',
    };
  },
  computed: {
    ...mapState('login', ['adminYn']),
  },
  methods: {
    pageMoveSndList() {
      this.pageMoveSndListChk = 1;
      this.searchSndList();
      this.pageMoveSndListChk = 0;
    },
    searchSndList() {
      console.log('SWING 송신 정보 조회!');
      // this.$axios.get('/api/eai/swg/snd', {
      fetchGetEaiSwgSndList({
        params: {
          pageNo: this.pageMoveSndListChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveSndListChk === 1 ? this.pageSet.pageCount : 0,
          sndTbl: this.sndTbl,
          eaiIfId: this.eaiIfId,
          sndAdt: this.sndAdt,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          // this.sndList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.searchList, 'Y');
          this.sndList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(this.sndList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    pageMoveRcvList() {
      this.pageMoveRcvListChk = 1;
      this.searchRcvList();
      this.pageMoveRcvListChk = 0;
    },
    searchRcvList() {
      console.log('SWING 수신 정보 조회!');
      // /this.$axios.get('/api/eai/swg/rcv', {
      fetchGetEaiSwgRcvList({
        params: {
          pageNo: this.pageMoveRcvListChk === 1 ? this.rPageSet.pageNo : 1,
          pageCount: this.pageMoveRcvListChk === 1 ? this.rPageSet.pageCount : 0,
          rcvTbl: this.rcvTbl,
          eaiIfId: this.rEaiIfId,
          tr: this.rcvTr,
          swgmq: this.mqUcs,
          swgtp: this.tpUcs,
          rcvQueue: this.rcvQueue,
          useYn: this.rUseYn,
        },
      })
        .then((res) => {
          // this.rcvList = this.$gf.parseRtnData(this.rPageSet, res.data.rstData.searchList, 'Y');
          this.rcvList = res.data.rstData.searchList;
          this.rPageSet = res.data.rstData.pageSet;
          console.log(this.rcvList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveSnd() {
      if (this.eaiIfId === '') {
        this.$gf.alertOn('인터페이스ID를 입력하세요');
        return;
      } if (this.sndTbl === '') {
        this.$gf.alertOn('송신 테이블명을 입력하세요');
        return;
      } if (this.sndAdt === '') {
        this.$gf.alertOn('송신 ADT 정보를 입력하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.eaiIfId} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertSnd);
    },
    insertSnd() {
      console.log('송신 정보 등록!');
      this.saveSndTbl = {
        sndTbl: this.sndTbl,
        eaiIfId: this.eaiIfId,
        sndAdt: this.sndAdt,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/swg/snd', this.saveSndTbl)
        .then((res) => {
          console.log(res);
          this.searchSndList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveRcv() {
      if (this.rEaiIfId === '') {
        this.$gf.alertOn('인터페이스ID를 입력하세요');
        return;
      } if (this.rcvTbl === '') {
        this.$gf.alertOn('수신 테이블명을 입력하세요');
        return;
      } if (this.rcvTr === '') {
        this.$gf.alertOn('수신 TR 정보를 입력하세요');
        return;
      } if (this.mqUcs === '') {
        this.$gf.alertOn('MQ UCS 정보를 입력하세요');
        return;
      } if (this.tpUcs === '') {
        this.$gf.alertOn('TP UCS 정보를 입력하세요');
        return;
      } if (this.rcvQueue === '') {
        this.$gf.alertOn('수신 큐를 입력하세요');
        return;
      } if (this.rUseYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.rEaiIfId} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertRcv);
    },
    insertRcv() {
      console.log('수신 정보 등록!');
      this.saveRcvTbl = {
        rcvTbl: this.rcvTbl,
        eaiIfId: this.rEaiIfId,
        tr: this.rcvTr,
        swgmq: this.mqUcs,
        swgtp: this.tpUcs,
        rcvQueue: this.rcvQueue,
        useYn: this.rUseYn,
      };
      this.$axios.post('/api/eai/swg/rcv', this.saveRcvTbl)
        .then((res) => {
          console.log(res);
          this.searchRcvList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i, n) {
      if (n === 'r') {
        const confirmText = `${this.rcvList[i].eaiIfId} 를 저장하십니까?`;
        this.$gf.confirmOn(confirmText, this.editRcvCall, i);
      } else {
        const confirmText = `${this.sndList[i].eaiIfId} 를 저장하십니까?`;
        this.$gf.confirmOn(confirmText, this.editSndCall, i);
      }
    },
    editRcvCall(i) {
      console.log('SWING 수신 인터페이스 정보 갱신!');

      this.$axios.put('/api/eai/swg/rcv', this.rcvList[i])
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
    editSndCall(i) {
      console.log('SWING 송신 인터페이스 정보 갱신!');

      this.$axios.put('/api/eai/swg/snd', this.sndList[i])
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
    resetRcvField() {
      this.rEaiIfId = '';
      this.rcvTbl = '';
      this.rcvTr = '';
      this.mqUcs = '';
      this.tpUcs = '';
      this.rcvQueue = '';
      this.rUseYn = '';
    },
    resetSndField() {
      this.eaiIfId = '';
      this.sndTbl = '';
      this.sndAdt = '';
      this.useYn = '';
    },
  },
};
</script>
