<template>
  <div class="right_space">
    <MqMngrListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="addData"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />큐 목록
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="listing()"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column w-2">
          <label class="column_label">큐매니저</label>
          <div class="search_group">
            <input
              v-model="mqMngrNm"
              type="text"
              value=""
            >
            <span
              class="search"
              @click="turnOnSvrPop"
            ><i class="ico-search" /></span>
          </div>
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
            v-for="queue in qList"
            :key="queue.index"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ queue.mqMngrNm }}
            </li>
            <li class="td_cell">
              {{ queue.queueNm }}
            </li>
            <li class="td_cell">
              {{ queue.queueType }}
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
      >
        수정
      </button>
      <button
        type="button"
        class="default_button on"
      >
        추가
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MqMngrListPopup from '@/components/popup/meta/eai/MqMngrListPopup.vue';

export default {
  components: {
    MqMngrListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: 'Hi', // 사용방법 예시 데이터
      },

      index: 0,
      qList: [],
      queueNm: '',
      mqMngrNm: '',
      queueType: '',
      crtcVal: '',
      useYn: 'Y',
      qTypeCd: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'Q_TYP_CD', allYn: 'Y', listNm: 'qTypeCd',
    });
  },
  methods: {
    // ...mapActions('frameSet', ['resetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    listing() {
      console.log('큐 목록 조회!');
      this.$axios.get('/api/eai/queue', {
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
    turnOnSvrPop() {
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`가져온 데이터2 : ${val}`);
      this.svrOn = false;
      this.mqMngrNm = val.mqMngrNm;
    },
  },
};
</script>
