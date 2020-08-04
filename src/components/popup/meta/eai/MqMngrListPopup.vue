<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="mqMngrListPop"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />큐매니저 조회</h2>
      </section>
      <section class="form_area border_group">
        <h5 class="s_tit type-2">
          기본 정보
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="listing"
            >
              조회
            </button>
          </div>
        </h5>
        <div class="row_contain type-3">
          <div class="column w-4">
            <label class="column_label">큐매니저</label>
            <input
              v-model="mqMngrNm"
              type="text"
              value=""
            >
          </div>
          <div class="column w-3">
            <label class="column_label">호스트</label>
            <input
              v-model="hostNm"
              type="text"
              value=""
            >
          </div>
          <div class="column on w-3">
            <label class="column_label">Port</label>
            <input
              v-model="qmPort"
              type="number"
              value=""
            >
          </div>
          <div class="column w-2">
            <label class="column_label">사용</label>
            <div class="select_group">
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
          </div>
        </div>
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                큐매니저
              </li>
              <li class="th_cell">
                호스트명
              </li>
              <li class="th_cell">
                PORT
              </li>
              <li class="th_cell">
                사용
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in mqMngrList"
              :key="index"
              class="table_row w-auto"
              style="cursor:pointer"
              @click="addData(index)"
            >
              <li class="td_cell">
                {{ row.mqMngrNm }}
              </li>
              <li class="td_cell">
                {{ row.hostNm }}
              </li>
              <li class="td_cell">
                {{ row.qmPort }}
              </li>
              <li class="td_cell">
                {{ row.useYn }}
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
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetEaiMqMngrList } from '@/api/eaiApi';

export default {
  name: 'MqMngrListPopup',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mqMngrNm: '',
      hostNm: '',
      qmPort: '',
      useYn: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
      mqMngrList: {},
      serverData: {},
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'Q_TYP_CD', allYn: 'Y', listNm: 'qTypeCd',
    });
    this.$refs.mqMngrListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.listing();
      this.pageMoveChk = 0;
    },
    listing() {
      // this.$axios.get('/api/eai/mqMngr', {
      fetchGetEaiMqMngrList({
        params: {
          mqMngrNm: this.mqMngrNm,
          hostNm: this.hostNm,
          qmPort: this.qmPort,
          useYn: this.useYn,
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.mqMngrList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(i) {
      this.$emit('addData', this.mqMngrList[i]);
    },
  },
};
</script>
