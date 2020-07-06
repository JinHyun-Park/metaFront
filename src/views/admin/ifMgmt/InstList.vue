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
        <div class="column on w-2">
          <label class="column_label">기관코드</label>
          <input
            v-model="instCd"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-3">
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
              @click="searchList(1)"
            >
              검색
            </button>
          </div>
        </div>
      </div>

      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%"
              />
              <li
                class="th_cell"
                style="width:20%"
              >
                기관코드
              </li>
              <li
                class="th_cell"
                style="width:30%"
              >
                기관명
              </li>
              <li
                class="th_cell"
                style="width:40%"
              >
                기관설명
              </li>
              <li
                class="th_cell"
                style="width:10%"
              />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(instRow, i) in instList"
              :key="instRow.instCd"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ (i+1)+((pageSet.pageNo-1)*pageSet.size) }}
              </li>
              <li class="td_cell">
                {{ instRow.instCd }}
              </li>
              <li class="td_cell on">
                <input
                  v-model="instRow.instNm"
                  type="text"
                >
              </li>
              <li class="td_cell on">
                <input
                  v-model="instRow.instRmk"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="editList(i)"
                />
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchGetInstCdList, fetchDeleteInstCdList, fetchPostInstCdList, fetchPutInstCdList,
} from '@/api/bizCommApi';

export default {
  name: 'InstList',
  data() {
    return {
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      instList: [],
      instCd: '',
      instNm: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    this.searchList(1);
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    searchList(page) {
      // this.tgtUrl = '/api/bizcomm/inst_cd';
      // this.$axios.get(this.tgtUrl, {
      fetchGetInstCdList({
        params: {
          pageNo: page,
          size: this.pageSet.size,
          pageCount: this.pageSet.pageCount,
          instCd: this.instCd,
          instNm: this.instNm,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.instList = res.data.rstData.instCdLst;
            this.pageSet = res.data.rstData.pageSet;
            if (this.instList.length === 0) {
              this.addList();
            }
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    addList() {
      const a = {
        instCd: this.instCd, instNm: this.instNm, useYn: 'Y', flag: 'I',
      };
      this.instList.push(a);
    },
    editList(i) {
      const confirmText = `${this.instList[i].instCd} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      this.tgtUrl = '/api/bizcomm/cccd';
      if (this.instList[i].flag != null && this.instList[i].flag === 'I') {
        fetchPostInstCdList(this.instList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn('반영되었습니다.');
              this.searchList(1);
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
      } else {
        // this.$axios.put(this.tgtUrl, this.ccCdLst[i])
        fetchPutInstCdList(this.instList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn('반영되었습니다.');
              this.searchList(1);
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
      }
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
            this.searchList(1);
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
