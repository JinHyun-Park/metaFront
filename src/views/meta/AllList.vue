<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 목록 조회
        </div>
        <div class="breadcrumb">
          <span>메타정보 조회</span><em class="on">인터페이스 통합 조회</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        조회 정보
      </h5>
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">조회기준</label>
          <div class="select_group">
            <select v-model="ifKind">
              <option value="EAI">
                EAI
              </option>
              <option value="EIGW">
                EIGW
              </option>
              <option value="MCG">
                MCG
              </option>
            </select>
          </div>
        </div>
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="searchList()"
          >
            조회
          </button>
        </div>
      </div>

      <div
        v-if="ifKind==='MCG'"
        class="row_contain"
      >
        <div class="column on w-2">
          <label class="column_label">채널코드</label>
          <input
            v-model="opCode"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">거래코드</label>
          <input
            v-model="dealCd"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">HOSTNAME</label>
          <input
            v-model="hostNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1" />
      </div>
      <div
        v-else
        class="row_contain"
      >
        <div class="column on w-3">
          <label class="column_label">인터페이스 ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            value=""
            @keydown.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">업무구분(MID)</label>
          <input
            v-model="reqMid"
            type="text"
            value=""
            @keydown.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">HOSTNAME</label>
          <input
            v-model="hostNm"
            type="text"
            value=""
            @keydown.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
            type="text"
            value=""
            @keydown.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">수신TR</label>
          <input
            v-model="rcvTr"
            type="text"
            value=""
            @keydown.enter="searchList()"
          >
        </div>
        <div class="column w-2" />
      </div>

      <div class="table_colgroup">
        <div class="table_grid radio_group extend-2">
          <div class="table_head w-auto">
            <tr>
              <td class="th_cell" />
              <td class="th_cell on">
                IF ID
              </td>
              <td class="th_cell">
                인터페이스명
              </td>
              <td class="th_cell">
                단/양방향
              </td>
              <td class="th_cell">
                송신MID
              </td>
              <td class="th_cell">
                송신담당
              </td>
              <td class="th_cell">
                수신MID
              </td>
              <td class="th_cell">
                수신담당
              </td>
              <td class="th_cell">
                수신TR(SWING)
              </td>
              <td class="th_cell">
                기관코드
              </td>
              <td class="th_cell">
                대외개발
              </td>
              <td class="th_cell">
                대외운영
              </td>
            </tr>
          </div>
          <div class="table_body">
            <tr
              v-for="(row, i) in allMetaList"
              :key="i"
              class="table_row w-auto"
              @dblclick="movePage(i)"
            >
              <td class="td_cell on">
                {{ (i+1)+((pageSet.pageNo-1)*pageSet.size) }}
              </td>
              <td class="td_cell on">
                {{ row.eaiIfId }}
              </td>
              <td class="td_cell on">
                {{ row.eaiIfNmKor }}
              </td>
              <td class="td_cell on">
                {{ row.roundTypNm }}
              </td>
              <td class="td_cell on">
                {{ row.sndMid }}
              </td>
              <td class="td_cell on">
                {{ row.sndChrgrNm1 }}
              </td>
              <td class="td_cell on">
                {{ row.rcvMid }}
              </td>
              <td class="td_cell on">
                {{ row.rcvChrgrNm1 }}
              </td>
              <td class="td_cell on">
                {{ row.rcvTr }}
              </td>
              <td class="td_cell on">
                {{ row.eigwInstCd }}
              </td>
              <td
                v-if="row.eigwInstCd != null && row.eigwInstCd != ''"
                class="td_cell on"
              >
                {{ row.eigwDvpSvrRealIp }} ({{ row.eigwDvpSvrPort }})
              </td>
              <td
                v-else
                class="td_cell on"
              />
              <td
                v-if="row.eigwInstCd != null && row.eigwInstCd != ''"
                class="td_cell on"
              >
                {{ row.eigwOprSvrRealIp }} ({{ row.eigwProdSvrPort }})
              </td>
              <td
                v-else
                class="td_cell on"
              />
            </tr>
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
import { fetchGetAllMetaList } from '@/api/bizCommApi';

export default {
  name: 'AllList',
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,

      ifKind: '',
      eaiIfId: '',
      hostNm: '',
      svrIp: '',
      opCode: '',
      dealCd: '',
      reqMid: '',
      rcvTr: '',

      allMetaList: [],
    };
  },
  mounted() {
    this.searchList();
  },
  methods: {
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.get(this.tgtUrl, {
      fetchGetAllMetaList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,

          eaiIfId: this.eaiIfId,
          hostNm: this.hostNm,
          reqMid: this.reqMid,
          rcvTr: this.rcvTr,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.allMetaList = res.data.rstData.allMetaList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            // alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    movePage(index) {
      this.$router.push({
        name: 'ifIdListAdmin',
        params: {
          eaiIfSeq: this.allMetaList[index].eaiIfSeq,
          callType: 'update',
        },
      });
    },
  },

};
</script>
