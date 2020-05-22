<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="eaiListPopup"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />인퍼테이스 조회</h2>
      </section>
      <section class="form_area border_group">
        <div class="row_contain last">
          <div class="column on w-3">
            <label class="column_label">I/F ID</label>
            <input
              v-model="eaiIfId"
              type="text"
              value=""
            >
          </div>
          <div class="column w-3">
            <label class="column_label">I/F명</label>
            <input
              v-model="eaiIfNmKor"
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
          <div class="table_grid">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell">
                  인터페이스ID
                </li>
                <li class="th_cell">
                  인터페이스명
                </li>
                <li class="th_cell">
                  연동목적
                </li>
                <li class="th_cell">
                  연동방식
                </li>
                <li class="th_cell">
                  양방향/단방향
                </li>
                <li class="th_cell">
                  동기/비동기
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="(row, i) in eaiIfList"
                :key="row.eaiIfSeq"
                class="table_row w-auto"
              >
                <li
                  class="td_cell"
                  @click="addData(i)"
                >
                  {{ row.eaiIfId }}
                </li>
                <li class="td_cell">
                  {{ row.eaiIfNmKor }}
                </li>
                <li class="td_cell">
                  {{ row.ifDesc }}
                </li>
                <li class="td_cell">
                  <div class="select_group">
                    <select v-model="row.ifTypCd">
                      <option
                        v-for="(code, n) in ccCdList.ifTypCd"
                        :key="n"
                        :value="code.cdDtlId"
                      >
                        {{ code.cdNm }}
                      </option>
                    </select>
                    <span class="select" />
                  </div>
                </li>
                <li class="td_cell">
                  <div class="select_group">
                    <select v-model="row.roundTypCd">
                      <option
                        v-for="(code, n) in ccCdList.roundTypCd"
                        :key="n"
                        :value="code.cdDtlId"
                      >
                        {{ code.cdNm }}
                      </option>
                    </select>
                    <span class="select" />
                  </div>
                </li>
                <li class="td_cell">
                  <div class="select_group">
                    <select v-model="row.svrTypCd">
                      <option
                        v-for="(code, n) in ccCdList.svrTypCd"
                        :key="n"
                        :value="code.cdDtlId"
                      >
                        {{ code.cdNm }}
                      </option>
                    </select>
                    <span class="select" />
                  </div>
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
import { fetchGetEaiIfList } from '@/api/eaiApi';

export default {
  name: 'EaiListPopup',
  data() {
    return {
      eaiIfList: [],
      eaiIfId: '',
      eaiIfNmKor: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'ROUND_TYP_CD', allYn: 'N', listNm: 'roundTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'IF_TYP_CD', allYn: 'N', listNm: 'ifTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'SYNC_TYP_CD', allYn: 'N', listNm: 'syncTypCd',
    });
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      console.log('EAI I/F 목록 조회!');
      fetchGetEaiIfList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          eaiIfId: this.eaiIfId,
          eaiIfNmKor: this.eaiIfNmKor,
        },
      })
        .then((res) => {
          this.eaiIfList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(i) {
      this.$emit('addData', this.eaiIfList[i]);
    },
  },
};
</script>
