<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />서버 정보 조회
        </div>
        <div class="breadcrumb">
          <span>EIGW</span><em class="on">EAI</em>
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
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="server in serverList"
              :key="server.svrNum"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ server.svrNum }}
              </li>
              <li class="td_cell">
                {{ server.svrTypCd }}
              </li>
              <li class="td_cell">
                {{ server.ipTyp }}
              </li>
              <li class="td_cell">
                {{ server.hostNm }}
              </li>
              <li class="td_cell">
                {{ server.svrIp }}
              </li>
              <li class="td_cell">
                {{ server.svrPort }}
              </li>
              <li class="td_cell">
                {{ server.userId }}
              </li>
              <li class="td_cell">
                {{ server.useYn }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
      >
        수정
      </button>
      <button
        type="button"
        class="default_button"
      >
        추가
      </button>
      <button
        type="button"
        class="default_button on"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      serverList: '',
      svrTypCdList: [],
      pageNo: '',
      size: '',
      tgtUrl: '',
      svrIp: '',
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
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      this.tgtUrl = '/api/bizcomm/server';
      this.$axios.get(this.tgtUrl, {
        params: {
          pageNo: this.pageNo,
          size: this.size,
          svrIp: this.svrIp,
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
