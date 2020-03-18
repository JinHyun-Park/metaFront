<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="eaiSvrListPop"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-1">
        <h2>
          <div>
            <i class="ico-bar" />EAI 서버 정보 조회
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
            <label class="column_label">시스템명</label>
            <input
              v-model="sysNm"
              type="text"
              value=""
            >
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
                  #
                </li>
                <li class="th_cell">
                  시스템명
                </li>
                <li
                  style="width:50px; "
                  class="th_cell"
                >
                  서버유형
                </li>
                <li class="th_cell">
                  Hostname
                </li>
                <li class="th_cell">
                  VIP
                </li>
                <li class="th_cell">
                  NAT IP
                </li>
                <li class="th_cell">
                  IP(기타)
                </li>
                <li
                  style="width:50px; "
                  class="th_cell"
                >
                  담당회사
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(svr, i) in serverList"
                :key="i"
                class="table_row w-auto"
              >
                <li class="td_cell">
                  <input
                    type="radio"
                    @click="addData(i)"
                  >
                </li>
                <li class="td_cell">
                  {{ svr.sysNm }}
                </li>
                <li class="td_cell">
                  {{ svr.cdNm }}
                </li>
                <li class="td_cell">
                  {{ svr.hostNm }}
                </li>
                <li class="td_cell">
                  {{ svr.vIp }}
                </li>
                <li class="td_cell">
                  {{ svr.natIp }}
                </li>
                <li class="td_cell">
                  {{ svr.etcIp }}
                </li>
                <li class="td_cell">
                  {{ svr.company }}
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

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
        <button
          type="button"
          class="default_button on"
          @click="addData"
        >
          추가
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchEaiServerList } from '@/api/eaiApi';

export default {
  name: 'EaiSvrListPopup',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      serverList: [],
      svrTypCdList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      tgtUrl: '',
      sysNm: '',
      svrIp: '',
      svrTypCd: '',
      vIp: '',
      natIp: '',
      etcIp: '',
      hostNm: '',
      osNm: '',
      company: '',
      useYn: 'Y',
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
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      // this.tgtUrl = '/api/bizcomm/server';
      // this.$axios.get(this.tgtUrl, {
      fetchEaiServerList({
        params: {
          // pageSet: this.pageSet,
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          svrTypCd: this.svrTypCd,
          sysNm: this.sysNm,
          hostNm: this.hostNm,
          svrIp: this.svrIp,
          useYn: 'Y',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
            console.log(this.serverList);
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Close Popup');
    },
    addData(i) {
      console.log(this.serverList);
      this.$gf.alertOn(`[ ${this.serverList[i].hostNm} ] [ ${this.serverList[i].vIp} ] 를 선택 하셨습니다.`);
      this.$emit('returnData', this.serverList[i]);
    },
  },
};
</script>
