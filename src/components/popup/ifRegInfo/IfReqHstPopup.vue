<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="ifReqHstPopup"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />승인이력 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="table_colgroup">
          <div class="table_grid radio_group extend-1">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell" />
                <li class="th_cell">
                  처리일시
                </li>
                <li class="th_cell">
                  처리상태
                </li>
                <li class="th_cell">
                  처리자
                </li>
                <li class="th_cell">
                  처리내용(comment)
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(row, i) in ifReqHstList"
                :key="i+1"
                class="table_row w-auto"
                style="cursor:pointer"
              >
                <li class="td_cell">
                  {{ row.hstSeq }}
                </li>
                <li class="td_cell">
                  {{ row.procChgDt }}
                </li>
                <li class="td_cell">
                  <label
                    class="tooltips right"
                    :class="setClass(row.procSt)"
                  >
                    {{ row.procStNm }}
                  </label>
                </li>
                <li class="td_cell">
                  {{ row.procIdNm }}({{ row.procId }})
                </li>
                <li
                  class="td_cell"
                >
                  {{ row.hstRmk }}
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

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetIfReqHst } from '@/api/ifRegApi';

export default {
  props: {
    propData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      ifReqHstList: [],
      instNm: '',
      pageMoveChk: 0,

      reqNum: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    console.log(`this.reqNum : ${this.propData.reqNum}`);
    this.reqNum = this.propData.reqNum;
    this.searchList();
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      fetchGetIfReqHst({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          reqNum: this.reqNum,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.ifReqHstList = res.data.rstData.ifReqHstList;
            this.pageSet = res.data.rstData.pageSet;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    setClass(procSt) {
      let rtnClass = '';
      switch (procSt) {
        case '1':
          rtnClass = 'label-default color-gray';
          break;
        case '2':
          rtnClass = 'label-default color-yellow';
          break;
        case '3':
          rtnClass = 'label-default color-green';
          break;
        case '4':
          rtnClass = 'label-default color-black';
          break;
        default:
          rtnClass = 'label-default color-blue';
      }
      return rtnClass;
    },
    pageChanged() {
      console.log();
      this.searchList();
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
  },
};
</script>

<style scoped>
.popup {
  z-index: 13;
}
</style>
