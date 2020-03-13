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
            @click="listingRcv()"
          >
            조회
          </button>
          <button
            type="button"
            class="default_button on"
            @click="saveRcv()"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">인터페이스ID</label>
          <input
            v-model="rEaiIfId"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">테이블</label>
          <input
            v-model="rcvTbl"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">수신TR</label>
          <input
            v-model="tr"
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">MQ UCS</label>
          <input
            v-model="swgMq"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">TP UCS</label>
          <input
            v-model="swgTp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">수신큐</label>
          <input
            v-model="rcvQ"
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
        <div class="column w-1" />
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              인터페이스ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              테이블<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              수신TR<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              MQ UCS<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              TP UCS<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              수신큐 <i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(rcv, i) in rcvList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ rcv.eaiIfId }}
            </li>
            <li class="td_cell on">
              <input
                v-model="rcv.rcvTbl"
                type="text"
              >
            </li>
            <li class="td_cell on">
              <input
                v-model="rcv.tr"
                type="text"
              >
            </li>
            <li class="td_cell on">
              <input
                v-model="rcv.swgmq"
                type="text"
              >
            </li>
            <li class="td_cell on">
              <input
                v-model="rcv.swgtp"
                type="text"
              >
            </li>
            <li class="td_cell on">
              <input
                v-model="rcv.rcvQueue"
                type="text"
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
            <li class="td_cell">
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
          :click-handler="listingRcv"
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
            @click="listingSnd()"
          >
            조회
          </button>
          <button
            type="button"
            class="default_button on"
            @click="saveSnd()"
          >
            추가
          </button>
        </div>
      </h5>
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
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              인터페이스ID<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              테이블<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              송신ADT<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(snd, i) in sndList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ snd.eaiIfId }}
            </li>
            <li class="td_cell on">
              <input
                v-model="snd.sndTbl"
                type="text"
              >
            </li>
            <li class="td_cell on">
              <input
                v-model="snd.sndAdt"
                type="text"
              >
            </li>
            <li class="td_cell on">
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
            <li class="td_cell">
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
          :click-handler="listingSnd"
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
import { fetchGetEaiSwgSndList, fetchGetEaiSwgRcvList, fetchPostEaiSwgSnd } from '@/api/eaiApi';

export default {
  data() {
    return {
      index: 0,
      sndList: [],
      saveSndTbl: {},
      sndTbl: '',
      eaiIfId: '',
      sndAdt: '',
      useYn: 'Y',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      rPageSet: { pageNo: 1, pageCount: 0, size: 10 },
      totalPages: 0,
      totalRows: 0,
      rcvList: [],
      saveRcvTbl: {},
      rcvTbl: '',
      rEaiIfId: '',
      tr: '',
      swgMq: '',
      swgTp: '',
      rcvQ: '',
      rUseYn: 'Y',
    };
  },
  methods: {
    listingSnd() {
      console.log('SWING 송신 정보 조회!');
      // this.$axios.get('/api/eai/swg/snd', {
      fetchGetEaiSwgSndList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
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
    listingRcv() {
      console.log('SWING 수신 정보 조회!');
      // /this.$axios.get('/api/eai/swg/rcv', {
      fetchGetEaiSwgRcvList({
        params: {
          pageNo: this.rPageSet.pageNo,
          pageCount: this.rPageSet.pageCount,
          rcvTbl: this.rcvTbl,
          eaiIfId: this.rEaiIfId,
          tr: this.tr,
          swgMq: this.swgMq,
          swgTp: this.swgTp,
          rcvQ: this.rcvQ,
          useYn: this.useYn,
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
      console.log('송신 정보 등록!');
      this.saveSndTbl = {
        sndTbl: this.sndTbl,
        eaiIfId: this.eaiIfId,
        sndAdt: this.sndAdt,
        useYn: this.useYn,
      };
      // this.$axios.post('/api/eai/swg/snd', this.saveSndTbl)
      fetchPostEaiSwgSnd(this.saveSndTbl)
        .then((res) => {
          console.log(res);
          this.listingRcv();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveRcv() {
      console.log('수신 정보 등록!');
      this.saveRcvTbl = {
        rcvTbl: this.rcvTbl,
        eaiIfId: this.rEaiIfId,
        tr: this.tr,
        swgmq: this.swgMq,
        swgtp: this.swgTp,
        rcvQueue: this.rcvQ,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/swg/rcv', this.saveRcvTbl)
        .then((res) => {
          console.log(res);
          this.listingSnd();
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
  },
};
</script>
