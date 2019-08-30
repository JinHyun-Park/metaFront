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
        <div class="table_grid radio_group extend">
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
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(instRow, i) in this.instList"
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
                 <i class="ico-del" @click="delList(i)" />
              </li>
            </ul>
          </div>
        </div>
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

export default {
  data() {
    return {
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
      this.tgtUrl = '/api/bizcomm/inst_cd';
      if (this.instCd != null && this.instCd !== '') {
        this.tgtUrl = `${this.tgtUrl}/${this.instCd}`;
      }
      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.instList = res.data.rstData.instCdLst;
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
      alert(this.instList[i].instCd);
    }
  },
};
</script>