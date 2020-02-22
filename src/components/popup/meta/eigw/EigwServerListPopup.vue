<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup medium">
      <section class="title style-2">
        <h2><i class="ico-bar" />EIGW 서버 조회</h2>
      </section>
      <section class="form_area border_group">
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
            <label class="column_label">대외기관</label>
            <input
              v-model="instCd"
              type="text"
              value=""
            >
          </div>
          <div class="column on w-1">
            <label class="column_label">IP</label>
            <input
              v-model="reqIp"
              type="text"
              value=""
            >
          </div>
          <div class="column on w-1">
            <label class="column_label">사용여부</label>
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
                  기관코드
                </li>
                <li class="th_cell">
                  서버타입
                </li>
                <li class="th_cell">
                  REAL IP
                </li>
                <li class="th_cell">
                  NAT IP
                </li>
                <li class="th_cell">
                  생성일자
                </li>
                <li class="th_cell">
                  변경일자
                </li>
                <li class="th_cell">
                  사용여부
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(server, index) in serverList"
                :key="server.svrNum"
                class="table_row w-auto"
              >
                <li class="td_cell">
                  {{ server.svrNum }}
                </li>
                <li class="td_cell">
                  {{ server.instCd }}
                </li>
                <li class="td_cell">
                  {{ server.svrTypCd }}
                </li>
                <li
                  class="td_cell"
                  @click="addData(index)"
                >
                  {{ server.svrRealIp }}
                </li>
                <li
                  class="td_cell"
                  @click="addData(index)"
                >
                  {{ server.svrNatIp }}
                </li>
                <li class="td_cell">
                  {{ server.creDt }}
                </li>
                <li class="td_cell">
                  {{ server.chgDt }}
                </li>
                <li class="td_cell">
                  {{ server.useYn }}
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
          선택
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EigwServerListPopup',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      serverList: '',
      svrTypCdList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      tgtUrl: '',
      svrIp: '',
      svrTypCd: '',
      useYn: '',
      instCd: '',
      reqIp: this.message,
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
    this.$refs.svrListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      this.tgtUrl = '/api/eigw/serverList';
      this.$axios.get(this.tgtUrl, {
        params: {
          // pageSet: this.pageSet,
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          svrTypCd: this.svrTypCd,
          reqIp: this.reqIp,
          useYn: this.useYn,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.searchList;
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
    pageChanged() {
      console.log();
      this.searchList();
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(i) {
      this.$emit('addData', this.serverList[i]);
    },
  },
};
</script>
