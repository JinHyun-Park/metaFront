<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />서버 정보 관리
        </div>
        <div class="breadcrumb">
          <span>메타정보 관리</span><em class="on">서버 정보 관리</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-1">
          <label class="column_label">서버타입</label>
          <select v-model="svrTypCd">
            <option
              v-for="(code, i) in ccCdList.syrTypCd"
              :key="i"
              :value="code.cdDtlId"
            >
              {{ code.cdNm }}
            </option>
          </select>
        </div>
        <div class="column on w-1">
          <label class="column_label">IP타입</label>
          <select v-model="ipTyp">
            <option
              v-for="(code, i) in ccCdList.ipTyp"
              :key="i"
              :value="code.cdDtlId"
            >
              {{ code.cdNm }}
            </option>
          </select>
        </div>
        <div class="column on w-1">
          <label class="column_label">호스트명</label>
          <input
            v-model="hostNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">Port</label>
          <input
            v-model="svrPort"
            type="number"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="searchList()"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                Num
              </li>
              <li class="th_cell">
                서버타입
              </li>
              <li class="th_cell">
                IP타입
              </li>
              <li class="th_cell">
                호스트명
              </li>
              <li class="th_cell">
                IP
              </li>
              <li class="th_cell">
                PORT
              </li>
              <li class="th_cell">
                담당자
              </li>
              <li class="th_cell">
                사용여부
              </li>
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(server, i) in serverList"
              :key="server.svrNum"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ server.svrNum }}
              </li>
              <li class="td_cell on">
                <div class="select_group">
                  <select v-model="server.svrTypCd">
                    <option
                      v-for="(code, j) in ccCdList.syrTypCd"
                      v-if="code.cdNm != '전체'"
                      :key="j"
                      :value="code.cdDtlId"
                    >
                      {{ code.cdNm }}
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell on">
                <div class="select_group">
                  <select v-model="server.ipTyp">
                    <option
                      v-for="(code, j) in ccCdList.ipTyp"
                      v-if="code.cdNm != '전체'"
                      :key="j"
                      :value="code.cdDtlId"
                    >
                      {{ code.cdNm }}
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell on">
                <input
                  v-model="server.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell on">
                <input
                  v-model="server.svrIp"
                  type="text"
                >
              </li>
              <li class="td_cell on">
                <input
                  v-model="server.svrPort"
                  type="number"
                >
              </li>
              <li class="td_cell on">
                <input
                  v-model="server.userId"
                  type="text"
                >
              </li>
              <li class="td_cell">
                {{ server.useYn }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="editList(i)"
                />
                <i
                  class="ico-del"
                  @click="delList(i)"
                />
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchServerList, fetchPostServer, fetchPutServer, fetchDeleteServer,
} from '@/api/bizCommApi';

export default {
  data() {
    return {
      serverList: '',
      svrTypCdList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      tgtUrl: '',
      svrIp: '',
      svrPort: '',
      svrTypCd: '',
      ipTyp: '',
      hostNm: '',
      userId: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'SVR_TYP_CD', allYn: 'Y', listNm: 'syrTypCd',
    });
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'IP_TYP', allYn: 'Y', listNm: 'ipTyp',
    });
    this.searchList();
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      // this.tgtUrl = '/api/bizcomm/server';
      // this.$axios.get(this.tgtUrl, {
      fetchServerList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          svrIp: this.svrIp,
          svrPort: this.svrPort,
          svrTypCd: this.svrTypCd,
          ipTyp: this.ipTyp,
          hostNm: this.hostNm,
          userId: this.userId,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.serverList;
            this.pageSet = res.data.rstData.pageSet;
            if (this.serverList.length === 0) {
              this.addList();
            }
          } else {
            // eslint-disable-next-line no-alert
            // alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    addList() {
      const a = {
        svrIp: this.svrIp,
        svrPort: this.svrPort,
        svrTypCd: this.svrTypCd,
        ipTyp: this.ipTyp,
        hostNm: this.hostNm,
      };
      this.serverList.push(a);
    },
    editList(i) {
      const confirmText = `${this.serverList[i].svrIp}:${this.serverList[i].svrPort} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      this.tgtUrl = '/api/bizcomm/cccd';
      if (this.serverList[i].svrNum == null || this.serverList[i].svrNum === '') {
        fetchPostServer(this.serverList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn('생성되었습니다.');
              this.searchList();
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
      } else {
        // this.$axios.put(this.tgtUrl, this.ccCdLst[i])
        fetchPutServer(this.serverList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn('수정되었습니다.');
              this.searchList();
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
      }
    },
    delList(i) {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.delete(this.tgtUrl, {
      fetchDeleteServer({
        params: this.serverList[i],
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('처리되었습니다.');
            this.searchList();
          } else {
            this.$gf.alertOn(res.data.rstMsg);
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
