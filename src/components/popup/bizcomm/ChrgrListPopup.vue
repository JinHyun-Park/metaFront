<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup medium">
      <section class="title style-2">
        <h2><i class="ico-bar" />담당자 정보 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain type-3 last">
          <div class="column on w-2">
            <label class="column_label">사용자ID</label>
            <input
              v-model="userId"
              type="text"
              value=""
            >
          </div>
          <div class="column on w-2">
            <label class="column_label">사용자명</label>
            <input
              v-model="hanNm"
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
                <li class="th_cell" />
                <li class="th_cell">
                  사용자ID
                </li>
                <li class="th_cell">
                  사용자구분
                </li>
                <li class="th_cell">
                  기관코드
                </li>
                <li class="th_cell">
                  사용자명
                </li>
                <li class="th_cell">
                  생년월일
                </li>
                <li class="th_cell">
                  기관명
                </li>
                <li class="th_cell">
                  직급
                </li>
                <li class="th_cell">
                  연락처
                </li>
                <li class="th_cell">
                  핸드폰
                </li>
                <li class="th_cell">
                  이메일
                </li>
                <li class="th_cell">
                  OPSID
                </li>
                <li class="th_cell">
                  고객구분
                </li>
                <li class="th_cell">
                  삭제여부
                </li>
                <li class="th_cell">
                  생성일자
                </li>
                <li class="th_cell">
                  수정일자
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(chrgr, i) in chrgrList"
                :key="chrgr.userId"
                class="table_row w-auto"
                style="cursor:pointer"
                @click="addData(i)"
              >
                <li class="td_cell">
                  {{ i+1 }}
                </li>
                <li class="td_cell">
                  {{ chrgr.userId }}
                </li>
                <li class="td_cell">
                  {{ chrgr.userGb }}
                </li>
                <li class="td_cell">
                  {{ chrgr.instCd }}
                </li>
                <li class="td_cell">
                  {{ chrgr.hanNm }}
                </li>
                <li class="td_cell">
                  {{ chrgr.juminNo }}
                </li>
                <li class="td_cell">
                  {{ chrgr.orgNm }}
                </li>
                <li class="td_cell">
                  {{ chrgr.ofcLvlNm }}
                </li>
                <li class="td_cell">
                  {{ chrgr.offcPhonNum }}
                </li>
                <li class="td_cell">
                  {{ chrgr.mblPhonNum }}
                </li>
                <li class="td_cell">
                  {{ chrgr.emailAddr }}
                </li>
                <li class="td_cell">
                  {{ chrgr.opsId }}
                </li>
                <li class="td_cell">
                  {{ chrgr.customerGb }}
                </li>
                <li class="td_cell">
                  {{ chrgr.delYn }}
                </li>
                <li class="td_cell">
                  {{ chrgr.creDt }}
                </li>
                <li class="td_cell">
                  {{ chrgr.chgDt }}
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
          추가
        </button>
      </section>
    </article>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetChrgrInfo } from '@/api/bizCommApi';

export default {
  data() {
    return {
      chrgrList: [],
      tgtUrl: '',
      userId: '',
      hanNm: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      const param = {
        userId: this.userId,
        hanNm: this.hanNm,
        pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
        pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
        size: this.pageSet.size,
      };

      fetchGetChrgrInfo({ params: param })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.chrgrList = res.data.rstData.chrgrInfo;
            this.pageSet = res.data.rstData.pageSet;
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
      this.$emit('addData', this.chrgrList[i]);
    },
  },
};
</script>

<style scoped>
.popup {
  z-index: 13;
}
</style>
