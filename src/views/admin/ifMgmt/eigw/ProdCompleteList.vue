<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보(온라인)
        </div>
        <div class="breadcrumb">
          <span>EiGW</span><em class="on">메타정보(온라인)</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        조회 조건
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="searchProdCompleteList"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                연동구분
              </li>
              <li class="th_cell">
                인터페이스 ID
              </li>
              <li class="th_cell">
                인터페이스명
              </li>
              <li class="th_cell">
                대외기관
              </li>
            </ul>
          </div>
          <div
            v-if="!prodCompleteList"
            class="table_body"
          >
            <ul class="table_row">
              <li class="td_cell">
                목록을 조회해 주십시오.
              </li>
            </ul>
          </div>
          <div
            v-else-if="prodCompleteList.length === 0"
            class="table_body"
          >
            <ul class="table_row">
              <li class="td_cell">
                해당 조건을 가진 목록이 없습니다.
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="item in prodCompleteList"
              :key="item.eigwReqNum"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ item.eigwType }}
              </li>
              <li class="td_cell">
                {{ item.eigwIfId }}
              </li>
              <li class="td_cell">
                {{ item.eigwIfNm }}
              </li>
              <li class="td_cell">
                {{ item.instCd }}
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

import * as eigwApi from '@/api/eigwApi';

export default {
  components: {
  },
  data() {
    return {
      prodCompleteList: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  methods: {
    pageMove() {
      this.pageMoveChk = 1;
      this.searchProdCompleteList();
      this.pageMoveChk = 0;
    },
    searchProdCompleteList() {
      eigwApi.fetchGetEigwProdCompleteList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.prodCompleteList = res.data.rstData.prodCompleteList;
          } else {
            this.$gf.alertOn('운영기 반영 목록 조회 실패');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    }
  },
};
</script>
