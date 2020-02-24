<template>
  <div class="right_space">
    <section class="title style-2">
      <h2>
        <div>
          <i class="ico-bar" />대외기관 조회
        </div>
        <div class="breadcrumb">
          <span>EIGW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <div class="row_contain type-3 last">
        <div class="column on w-5">
          <label class="column_label">기관명(코드)</label>
          <input
            v-model="instCd"
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
              <li class="th_cell" />
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(instRow, i) in instList"
              :key="instRow.instCd"
              class="table_row w-auto"
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
              <li class="td_cell">
                {{ instRow.instRmk }}
              </li>
              <li class="td_cell">
                <input
                  type="text"
                  :value="instRow.instRmk"
                >
              </li>
              <li class="td_cell">
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
      >
        수정
      </button>
      <button
        type="button"
        class="default_button"
      >
        선택
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
import { fetchGetInstCdList, fetchDeleteInstCdList } from '@/api/bizCommApi';

export default {
  name: 'InstList',
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      instList: [],
      instCd: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    searchList() {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.get(this.tgtUrl, {
      fetchGetInstCdList({
        params: {
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          pageCount: this.pageSet.pageCount,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.instList = res.data.rstData.instCdLst;
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
    delList(i) {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.delete(this.tgtUrl, {
      fetchDeleteInstCdList({
        params: this.instList[i],
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
