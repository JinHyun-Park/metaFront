<template>
  <div class="right_space">
    <!-- 서버리스트 팝업 호출 -->
    <SvrListPopup
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
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-4">
          <label class="column_label">큐매니저</label>
          <input
            type="text"
            value="QMGR"
          >
        </div>
        <div
          class="column w-3"
          @click="turnOnSvrPop"
        >
          <label class="column_label">호스트</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search"><i class="ico-search" /></span>
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
                Y
              </option>
              <option value="">
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
              큐매니저<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              호스트<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              RIP<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              VIP<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              PORT<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              Y
            </li><li />
          </ul>
          <ul class="table_row w-auto">
            <li class="td_cell">
              QMGR
            </li>
            <li class="td_cell">
              EAI01
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              150.1.1.1
            </li>
            <li class="td_cell">
              1414
            </li>
            <li class="td_cell">
              N
            </li><li />
          </ul>
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
        class="default_button on"
      >
        추가
      </button>
    </section>
  </div>
</template>

<script>
import SvrListPopup from '@/components/popup/meta/mcg/SvrListPopup.vue';

export default {
  name: 'QueueMgrList',
  components: {
    SvrListPopup,
  },
  data() {
    return {
      svrOn: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: 'Hi', // 사용방법 예시 데이터
      },
    };
  },
  methods: {
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
    },
  },
};
</script>
