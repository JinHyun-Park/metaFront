<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="svrListPop"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />서버 정보 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain type-3">
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
                <li class="th_cell" />
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
                v-for="(server, index) in serverList"
                :key="server.svrNum"
                class="table_row w-auto"
              >
                <li class="td_cell w-auto">
                  <span class="default_radio on">
                    <input
                      id="radio_chk_1"
                      type="radio"
                      name="radio_chk_1"
                    ><label for="radio_chk_1"><span /></label>
                  </span>
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
                <li
                  class="td_cell"
                  @click="addData(index)"
                >
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
        <div class="pagination_space">
          <paginate
            v-model="pageSet.pageNo"
            :page-count="pageSet.pageCount"
            :page-range="3"
            :margin-pages="1"
            :click-handler="pageChanged"
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

export default {
  name: 'SvrListPopup',
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
      ipTyp: '',
      hostNm: '',
      userId: '',
      useYn: '',
    };
  },
  computed: {
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
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      this.tgtUrl = '/api/bizcomm/server';
      this.$axios.get(this.tgtUrl, {
        params: {
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          svrIp: this.svrIp,
          svrTypCd: this.svrTypCd,
          ipTyp: this.ipTyp,
          hostNm: this.hostNm,
          userId: this.userId,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.serverList;
            this.pageSet = res.data.rstData.pageSet;
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
