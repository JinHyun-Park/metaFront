<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="instListPopup"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />대외기관 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain type-3 last">
          <div class="column on w-5">
            <label class="column_label">기관명</label>
            <input
              v-model="instNm"
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
          <div class="table_grid radio_group extend-1">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell" />
                <li class="th_cell">
                  기관코드
                </li>
                <li class="th_cell">
                  기관명
                </li>
                <li class="th_cell">
                  기관설명
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(instRow, i) in instList"
                :key="instRow.instCd"
                class="table_row w-auto"
                style="cursor:pointer"
                @click="addData(i)"
              >
                <li class="td_cell">
                  {{ i+1 }}
                </li>
                <li class="td_cell">
                  {{ instRow.instCd }}
                </li>
                <li class="td_cell">
                  {{ instRow.instNm }}
                </li>
                <li
                  class="td_cell"
                >
                  {{ instRow.instRmk }}
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
import { fetchGetInstCdList } from '@/api/bizCommApi';

export default {
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      instList: [],
      instNm: '',
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    console.log('팝업리스트');
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      fetchGetInstCdList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          instNm: this.instNm,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.instList = res.data.rstData.instCdLst;
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
      this.$emit('addData', this.instList[i]);
    },
  },
};
</script>

<style scoped>
.popup {
  z-index: 13;
}
</style>
