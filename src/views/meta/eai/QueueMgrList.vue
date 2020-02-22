<template>
  <div class="right_space">
    <!-- 서버리스트 팝업 호출 -->
    <ServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="addData"
    />

    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />큐매니저 목록
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
            @click="searchList"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column w-4">
          <label class="column_label">큐매니저</label>
          <input
            v-model="mqMngrNm"
            type="text"
            value=""
          >
        </div>
        <div class="column w-3">
          <label class="column_label">호스트</label>
          <div class="search_group">
            <input
              v-mode="hostNm"
              type="text"
              value=""
            >
            <span
              class="search"
              @click="turnOnSvrPop('server')"
            ><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">IP</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search"><i class="ico-search" /></span>
          </div>
        </div>
        <div class="column on w-3">
          <label class="column_label">Port</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select>
              <option value="">
                전체
              </option>
              <option value="Y">
                사용
              </option>
              <option value="N">
                미사용
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
              큐매니저
            </li>
            <li class="th_cell">
              호스트명
            </li>
            <li class="th_cell">
              RIP
            </li>
            <li class="th_cell">
              VIP
            </li>
            <li class="th_cell">
              PORT
            </li>
            <li class="th_cell">
              사용
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(row, index) in queueList"
            :key="row.mqMngrNm"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ row.mqMngrNm }}
            </li>
            <li class="td_cell">
              {{ row.hostNm }}
            </li>
            <li class="td_cell">
              {{ row.svrIp }}
            </li>
            <li class="td_cell">
              {{ row.vip }}
            </li>
            <li class="td_cell">
              {{ row.qmPort }}
            </li>
            <li class="td_cell">
              {{ row.useYn }}
            </li>
          </ul>
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
import ServerListPopup from '@/components/popup/bizcomm/ServerListPopup.vue';

export default {
  name: 'QueueMgrList',
  components: {
    ServerListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: 'Hi', // 사용방법 예시 데이터
      },

      mqMngrNm: '',
      hostNm: '',
      qmPort: '',
      useYn: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },

      queueList: {},
      serverData: {},
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eai/mqMngr', {
        params: {
          mqMngrNm: this.mqMngrNm,
          hostNm: this.hostNm,
          useYn: this.useYn,

          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.queueList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('failed');
          }
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
      this.serverData = val;
      this.$gf.alertOn(`${this.serverData.svrIp}(${this.serverData.hostNm})`);
    },

  },
};
</script>
