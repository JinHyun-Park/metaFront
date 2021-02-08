<template>
  <div class="right_space">
    <!-- EAI 서버리스트 팝업 호출 -->
    <EaiServerListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @returnData="getData"
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
            @click="searchList()"
          >
            조회
          </button>
        </div>
      </h5>
      <!--
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
      -->
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              노드
            </li>
            <li class="th_cell">
              유형
            </li>
            <li class="th_cell">
              Hostname
            </li>
            <li class="th_cell">
              VIP
            </li>
            <li class="th_cell">
              NAT IP
            </li>
            <li class="th_cell">
              IP(기타)
            </li>
            <li class="th_cell">
              사용 여부
            </li>
            <li class="th_cell">
              EDIT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul class="table_row w-auto">
            <li class="td_cell">
              <input
                v-model="nodeNm"
                type="text"
                oninput="this.value = this.value.toUpperCase()"
              >
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="nodeType">
                  <option
                    v-for="(code, n) in ccCdList.nodeTypeCd"
                    :key="n"
                    :value="code.cdDtlId"
                  >
                    {{ code.cdNm }}
                  </option>
                </select>
              </div>
            </li>
            <li class="td_cell">
              <input
                v-model="hostNm"
                type="text"
                value=""
                @click="turnOnSvrPop(-1)"
              >
            </li>
            <li class="td_cell">
              {{ vIp }}
            </li>
            <li class="td_cell">
              {{ natIp }}
            </li>
            <li class="td_cell">
              {{ etcIp }}
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="useYn">
                  <option
                    value=""
                  >
                    전체
                  </option>
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
            <li class="td_cell">
              <i
                class="ico-add"
                @click="saveNode()"
              />
              <i
                class="ico-del"
                @click="resetField()"
              />
            </li>
          </ul>
          <ul
            v-for="(node, k) in nodeList"
            :key="k"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ node.nodeNm }}
            </li>
            <li class="td_cell">
              <div class="select_group">
                <select v-model="node.nodeType">
                  <option
                    v-for="(code, m) in ccCdList.nodeTypeCd"
                    :key="m"
                    :value="code.cdDtlId"
                  >
                    {{ code.cdNm }}
                  </option>
                </select>
              </div>
            </li>
            <li class="td_cell">
              <input
                v-model="node.hostNm"
                type="text"
                value=""
                @click="turnOnSvrPop(k)"
              >
            </li>
            <li class="td_cell">
              {{ node.vIp }}
            </li>
            <li class="td_cell">
              {{ node.natIp }}
            </li>
            <li class="td_cell">
              {{ node.etcIp }}
            </li>
            <li class="td_cell">
              <div class="select_group">
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
              </div>
            </li>
            <li class="td_cell">
              <i
                class="ico-edit"
                @click="editList(k)"
              />
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
import EaiServerListPopup from '@/components/popup/meta/eai/EaiServerListPopup.vue';

export default {
  components: {
    EaiServerListPopup,
  },
  data() {
    return {
      index: 0,
      nodeList: [],
      size: 10,
      nodeNm: '',
      svrNum: '',
      hostNm: '',
      vIp: '',
      natIp: '',
      etcIp: '',
      nodeType: '',
      useYn: '',
      nodeTypeCd: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      svrOn: false,
      props: {
        message: 'Hi',
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
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      console.log('노드 목록 조회!');
      this.$axios.get('/api/eai/node', {
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          nodeNm: this.nodeNm,
          svrNum: this.svrNum,
          nodeType: this.nodeType,
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
    saveNode() {
      if (this.nodeNm === '') {
        this.$gf.alertOn('노드명을 입력하세요');
        return;
      } if (this.nodeType === '') {
        this.$gf.alertOn('노드 유형을 선택하세요');
        return;
      } if (this.svrNum === '') {
        this.$gf.alertOn('서버를 선택하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.nodeNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertData);
    },
    insertData() {
      console.log('EAI 노드 정보 등록!');
      this.nodeList = {
        nodeNm: this.nodeNm,
        svrNum: this.svrNum,
        nodeType: this.nodeType,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/node', this.nodeList)
        .then((res) => {
          console.log(res);
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPop(op) {
      this.op = op;
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOn = false;
    },
    getData(val) {
      console.log(`가져온 데이터2 : ${val.hostNm}`);
      this.svrOn = false;
      if (this.op === -1) {
        this.hostNm = val.hostNm;
        this.vIp = val.vIp;
        this.natIp = val.natIp;
        this.etcIp = val.etcIp;
        this.svrNum = val.svrNum;
      } else {
        this.nodeList[this.op].hostNm = val.hostNm;
        this.nodeList[this.op].vIp = val.vIp;
        this.nodeList[this.op].natIp = val.natIp;
        this.nodeList[this.op].etcIp = val.etcIp;
        this.nodeList[this.op].svrNum = val.svrNum;
      }
    },
    editList(i) {
      if (this.nodeList[i].nodeType === '') {
        this.$gf.alertOn('노드 유형을 선택하세요');
        return;
      } if (this.nodeList[i].svrNum === '') {
        this.$gf.alertOn('서버를 선택하세요');
        return;
      }
      const confirmText = `${this.nodeList[i].nodeNm} 를 수정하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('EAI 노드 정보 갱신!');
      this.$axios.put('/api/eai/node', this.nodeList[i])
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('반영되었습니다.');
            this.searchList();
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    resetField() {
      this.nodeNm = '';
      this.svrNum = '';
      this.nodeType = '';
      this.hostNm = '';
      this.vIp = '';
      this.natIp = '';
      this.etcIp = '';
      this.useYn = '';
    },
  },
};
</script>
