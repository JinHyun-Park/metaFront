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
          <i class="ico-bar" />노드 목록
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
          <button
            type="button"
            class="default_button on"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-4">
          <label class="column_label">노드</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">유형</label>
          <div class="select_group">
            <select v-model="nodeTypeCd">
              <option
                v-for="(code, i) in ccCdList.nodeTypeCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
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
        <div class="column w-2">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select v-model="useYn">
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
              노드<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              유형<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              호스트<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              IP<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(node, i) in nodeList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ node.nodeNm }}
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="node.nodeType">
                  <option
                    v-for="(code, n) in ccCdList.nodeTypeCd"
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
              {{ node.mqMngrNm }}
            </li>
            <li class="td_cell">
              127.0.0.1
            </li>
            <li class="td_cell">
              <select v-model="node.useYn">
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
            </li><li />
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SvrListPopup from '@/components/popup/meta/mcg/SvrListPopup.vue';

export default {
  components: {
    SvrListPopup,
  },
  data() {
    return {
      index: 0,
      nodeList: [],
      size: 10,
      nodeNm: '',
      svrNum: '',
      hostNm: '',
      svrIp: '',
      nodeType: '',
      useYn: '',
      saveNode: {},
      nodeTypeCd: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      svrOn: false,
      props: {
        message: 'Hiww',
      },
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'QMGR_TYP_CD', allYn: 'Y', listNm: 'nodeTypeCd',
    });
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    listing() {
      console.log('노드 목록 조회!');
      this.$axios.get('/api/eai/node', {
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          nodeNm: this.nodeNm,
          mqMngrNm: this.mqMngrNm,
          nodeType: this.nodeTypeCd,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          this.nodeList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(this.nodeList[0].Nm);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPop() {
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`가져온 데이터222 : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`가져온 데이터222 : ${val}`);
      this.svrOn = false;
    },
  },
};
</script>
