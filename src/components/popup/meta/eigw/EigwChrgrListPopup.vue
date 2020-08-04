<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="eigwChrgrListPopup"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />대외 담당자 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain last">
          <div class="column on w-3">
            <label class="column_label">이름</label>
            <input
              v-model="hanNm"
              type="text"
              value=""
            >
          </div>
          <div class="column w-3">
            <label class="column_label">대외기관</label>
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
                @click="searchList"
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
                  ID
                </li>
                <li class="th_cell">
                  기관코드
                </li>
                <li class="th_cell">
                  한글명
                </li>
                <li class="th_cell">
                  직급
                </li>
                <li class="th_cell">
                  유선번호
                </li>
                <li class="th_cell">
                  휴대번호
                </li>
                <li class="th_cell">
                  이메일
                </li>
                <li class="th_cell">
                  비고
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(row, i) in eigwChrgrInfoList"
                :key="row.userId"
                class="table_row w-auto"
                style="cursor:pointer"
                @click="addData(i)"
              >
                <li class="td_cell">
                  {{ row.userId }}
                </li>
                <li class="td_cell">
                  {{ row.instCd }}
                </li>
                <li class="td_cell">
                  {{ row.hanNm }}
                </li>
                <li class="td_cell">
                  {{ row.ofcLvlNm }}
                </li>
                <li class="td_cell">
                  {{ row.offcPhonNum }}
                </li>
                <li class="td_cell">
                  {{ row.mblPhonNum }}
                </li>
                <li class="td_cell">
                  {{ row.emailAddr }}
                </li>
                <li class="td_cell">
                  {{ row.opDtl }}
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
        <button
          type="button"
          class="default_button on"
        >
          선택
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetEigwChrgrInfo } from '@/api/eigwApi';

export default {
  data() {
    return {
      eigwChrgrInfoList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
      tgtUrl: '',
      instCd: '',
      hanNm: '',
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
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      fetchGetEigwChrgrInfo({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          hanNm: this.hanNm,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.eigwChrgrInfoList = res.data.rstData.searchList;
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
    pageChanged() {
      console.log();
      this.searchList();
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(i) {
      this.$emit('addData', this.eigwChrgrInfoList[i]);
    },
  },
};
</script>
