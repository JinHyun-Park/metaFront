<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />큐 조회</h2>
      </section>
      <section class="form_area border_group">
        <h5 class="s_tit type-2">
          기본 정보
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="listing"
            >
              조회
            </button>
          </div>
        </h5>
        <div class="row_contain type-3">
          <div class="column w-2">
            <label class="column_label">큐매니저</label>
            <input
              v-model="mqMngrNm"
              type="text"
              value=""
            >
          </div>
          <div class="column w-4">
            <label class="column_label">큐</label>
            <input
              v-model="queueNm"
              type="text"
              value=""
            >
          </div>
          <div class="column w-2">
            <label class="column_label">유형</label>
            <div class="select_group">
              <select v-model="qTypeCd">
                <option
                  v-for="(code, i) in ccCdList.qTypeCd"
                  :key="i"
                  :value="code.cdDtlId"
                >
                  {{ code.cdNm }}
                </option>
              </select>
              <span class="select" />
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">사용</label>
            <div class="select_group">
              <select v-model="useYn">
                <option value="Y">
                  Y
                </option>
                <option value="N">
                  N
                </option>
              </select>
              <span class="select" />
            </div>
          </div>
        </div>
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                큐매니저<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                큐<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                담당자<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                최대 적체<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                사용<i class="ico-sort-down" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(queue, i) in qList"
              :key="queue.index"
              class="table_row w-auto"
              style="cursor:pointer"
              @click="addData(i)"
            >
              <li class="td_cell">
                {{ queue.mqMngrNm }}
              </li>
              <li class="td_cell">
                {{ queue.queueNm }}
              </li>
              <li class="td_cell">
                {{ queue.qTypeCd }}
              </li>
              <li class="td_cell">
                {{ queue.chrgrNm }}
              </li>
              <li class="td_cell">
                {{ queue.crtcVal }}
              </li>
              <li class="td_cell">
                {{ queue.useYn }}
              </li><li />
            </ul>
          </div>
        </div>
        <div class="pagination_space">
          <paginate
            v-model="pageSet.pageNo"
            :page-count="pageSet.pageCount"
            :page-range="3"
            :margin-pages="1"
            :click-handler="listing"
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
          @click="addData"
        >
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetEaiQueueList } from '@/api/eaiApi';

export default {
  name: 'QueueListPopup',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      index: 0,
      qList: [],
      queueNm: '',
      mqMngrNm: '',
      queueType: '',
      crtcVal: '',
      useYn: 'Y',
      qTypeCd: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'Q_TYP_CD', allYn: 'Y', listNm: 'qTypeCd',
    });
    this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    listing() {
      console.log('큐 목록 조회!');
      // this.$axios.get('/api/eai/queue', {
      fetchGetEaiQueueList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          queueNm: this.queueNm,
          mqMngrNm: this.mqMngrNm,
          queueType: this.qTypeCd,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          // this.qList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.searchList, 'Y');
          this.qList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(this.qList[0].chrgr.hanNm);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData(i) {
      this.$emit('addData', this.qList[i]);
    },
  },
};
</script>
