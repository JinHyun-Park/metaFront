<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />공통 코드 관리
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">코드구분</label>
          <select v-model="opClCd">
            <option
              v-for="(code, i) in ccCdList.opClCd"
              :key="i"
              :value="code.cdDtlId"
            >
              {{ code.cdNm }}
            </option>
          </select>
        </div>
        <div class="column on w-2">
          <label class="column_label">코드ID</label>
          <input
            v-model="cdId"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">코드상세ID</label>
          <input
            v-model="cdDtlId"
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
                코드구분
              </li>
              <li class="th_cell">
                코드ID
              </li>
              <li class="th_cell">
                코드상세ID
              </li>
              <li class="th_cell">
                코드명
              </li>
              <li class="th_cell">
                사용여부
              </li>
              <li class="th_cell">
                코드설명
              </li>
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(ccCd, i) in ccCdLst"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ (i+1)+((pageSet.pageNo-1)*pageSet.size) }}
              </li>
              <li class="td_cell">
                {{ ccCd.opClCd }}
              </li>
              <li class="td_cell">
                {{ ccCd.cdId }}
              </li>
              <li class="td_cell">
                {{ ccCd.cdDtlId }}
              </li>
              <li class="td_cell on">
                <input
                  v-model="ccCd.cdNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="ccCd.useYn">
                    <option
                      value="Y"
                    >
                      사용
                    </option>
                    <option
                      value="N"
                    >
                      미사용
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell on">
                <input
                  v-model="ccCd.cdDef"
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
import {
  fetchGetCcCdList, fetchPostCcCdList, fetchPutCcCdList, fetchDeleteCcCdList,
} from '@/api/bizCommApi';

export default {
  /* eslint-disable */
  data() {
    return {
      ccCdLst: [],
      tgtUrl: '',
      opClCd: '',
      cdId: '',
      cdDtlId: '',
      pageSet: {pageNo: 1, pageCount:0, size:10},
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'OP_CL_CD', allYn: 'Y', listNm: 'opClCd',
    });
    this.searchList();
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
      //this.tgtUrl = '/api/bizcomm/cccd';
      //this.$axios.get(this.tgtUrl, {
      fetchGetCcCdList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          opClCd: this.opClCd,
          cdId: this.cdId,
          cdDtlId: this.cdDtlId,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            //this.ccCdLst = this.$gf.parseRtnData(this.pageSet, res.data.rstData.ccCdLst, 'Y');
            this.ccCdLst = res.data.rstData.ccCdLst;
            this.pageSet = res.data.rstData.pageSet;
            if (this.ccCdLst.length === 0 && this.opClCd != "") {
              this.addList();
            }
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    addList() {
      const a = {
        opClCd: this.opClCd, cdId: this.cdId, cdDtlId: this.cdDtlId, useYn: 'Y', flag: 'I',
      };
      this.ccCdLst.push(a);
    },
    delList(i) {
      const confirmText = `${this.ccCdLst[i].cdId} > ${this.ccCdLst[i].cdDtlId} 를 삭제하십니까?`;
      this.$gf.confirmOn(confirmText, this.delCall, i);
    },
    delCall(i) {
      fetchDeleteCcCdList({
        params: {
          opClCd: this.ccCdLst[i].opClCd,
          cdId: this.ccCdLst[i].cdId,
          cdDtlId: this.ccCdLst[i].cdDtlId,
        }})
        .then((res) => {
              console.log(res);
              if (res.data.rstCd === 'S') {
                this.$gf.alertOn(`삭제되었습니다.`);
                this.searchList();
              }
            })
            .catch((ex) => {
              console.log(`error occur!! : ${ex}`);
            });
    },
    editList(i) {
      const confirmText = `${this.ccCdLst[i].cdId} > ${this.ccCdLst[i].cdDtlId} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      this.tgtUrl = '/api/bizcomm/cccd';
        if (this.ccCdLst[i].flag != null && this.ccCdLst[i].flag === 'I') {
          //this.$axios.post(this.tgtUrl, this.ccCdLst[i])
          fetchPostCcCdList(this.ccCdLst[i])
            .then((res) => {
              console.log(res);
              if (res.data.rstCd === 'S') {
                this.$gf.alertOn(`반영되었습니다.`);
                this.searchList();
              }
            })
            .catch((ex) => {
              console.log(`error occur!! : ${ex}`);
            });
        } else {
          //this.$axios.put(this.tgtUrl, this.ccCdLst[i])
          fetchPutCcCdList(this.ccCdLst[i])
            .then((res) => {
              console.log(res);
              if (res.data.rstCd === 'S') {
                this.$gf.alertOn(`반영되었습니다.`);
                this.searchList();
              }
            })
            .catch((ex) => {
              console.log(`error occur!! : ${ex}`);
            });
        }
    },
  },
};
</script>
