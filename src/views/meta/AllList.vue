<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 목록 조회
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
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
        <div class="column w-2" />
      </div>

      <div class="table_colgroup">
        <div class="table_grid radio_group extend-1">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell" />
              <li class="th_cell">
                IF ID
              </li>
              <li class="th_cell">
                인터페이스명
              </li>
              <li class="th_cell">
                기관코드
              </li>
              <li class="th_cell" />
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in allMetaList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ i+1 }}
              </li>
              <li class="td_cell">
                {{ row.eaiIfId }}
              </li>
              <li class="td_cell on">
                {{ row.eaiIfNmKor }}
              </li>
              <li class="td_cell on">
                {{ row.eigwInstCd }}
              </li>
              <li class="td_cell on">
                {{ row.eigwDvpSvrRealIp }} ({{ row.eigwDvpSvrPort }})
              </li>
              <li class="td_cell on">
                {{ row.eigwOprSvrRealIp }} ({{ row.eigwProdSvrPort }})
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetAllMetaList } from '@/api/bizCommApi';

export default {
  name: 'AllList',
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },

      ifKind: '',
      eaiIfId: '',
      hostNm: '',
      svrIp: '',
      opCode: '',
      dealCd: '',

      allMetaList: [],
    };
  },
  methods: {
    searchList() {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.get(this.tgtUrl, {
      fetchGetAllMetaList({
        params: {
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          pageCount: this.pageSet.pageCount,

          eaiIfId: this.eaiIfId,
          hostNm: this.hostNm,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.allMetaList = res.data.rstData.allMetaList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },

};
</script>
