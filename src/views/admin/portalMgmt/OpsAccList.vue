<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />OPS 계정 정보 조회
        </div>
        <div class="breadcrumb">
          <span>포탈관리</span><em class="on">OPS계정 정보조회</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">사용자ID</label>
          <input
            v-model="userId"
            type="text"
            value=""
            @keyup.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">한글명</label>
          <input
            v-model="hanNm"
            type="text"
            value=""
            @keyup.enter="searchList()"
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
                한글명
              </li>
              <li class="th_cell">
                생년월일
              </li>
              <li class="th_cell">
                기관코드
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
            >
              <li class="td_cell">
                {{ (i+1)+((pageSet.pageNo-1)*pageSet.size) }}
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
                {{ chrgr.orgCd }}
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
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
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
      // this.tgtUrl = '/api/bizcomm/chrgr';
      // if (this.userId != null) {
      //   this.tgtUrl = `${this.tgtUrl}/${this.userId}/${this.hanNm}`;
      // }
      // if (this.chrgrList != null && this.userId == null) {
      //   this.tgtUrl = `${this.tgtUrl}//${this.hanNm}`;
      // }
      const param = {
        userId: this.userId,
        hanNm: this.hanNm,
        pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
        pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
        size: this.pageSet.size,
      };

      // this.$axios.get(this.tgtUrl, { params: param })
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
  },
};
</script>
