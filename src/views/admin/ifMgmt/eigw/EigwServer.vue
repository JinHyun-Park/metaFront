<template>
  <div class="right_space">
    <InstListPopup
      v-if="svrOnInstList"
      v-bind="propsInstList"
      @closePop="turOffSvrPopInstList"
      @addData="addDataInstList"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />대외기관 서버 정보(EiGW)
        </div>
        <div class="breadcrumb">
          <span>EiGW</span><em class="on">대외기관 서버</em>
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
          <button
            type="button"
            class="default_button on"
            @click="save()"
          >
            추가
          </button>
        </div>
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-1">
          <label class="column_label">서버타입</label>
          <select v-model="svrTypCd">
            <option
              v-for="(code, i) in ccCdList.svrTypCd"
              :key="i"
              :value="code.cdDtlId"
            >
              {{ code.cdNm }}
            </option>
          </select>
        </div>
        <div class="column on w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instNm"
            type="text"
            value=""
            @click="turnOnSvrPopInstList(-1)"
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">REAL IP</label>
          <input
            v-model="svrRealIp"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">NAT IP</label>
          <input
            v-model="svrNatIp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
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
          <div class="column on w-1">
            <div class="search_group">
              <input
                v-model="instCd"
                type="hidden"
                class="add_text on"
                @keyup.13="searchList()"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                Num
              </li>
              <li class="th_cell">
                서버타입
              </li>
              <li class="th_cell">
                대외기관
              </li>
              <li class="th_cell">
                REAL IP
              </li>
              <li class="th_cell">
                NAT IP
              </li>
              <li class="th_cell">
                사용여부
              </li>
              <li class="th_cell">
                수정
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(server, i) in serverList"
              :key="server.svrNum"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ server.svrNum }}
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="server.svrTypCd">
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
              <li class="td_cell">
                <input
                  v-model="server.instNm"
                  type="text"
                  @click="turnOnSvrPopInstList(i)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="server.svrRealIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="server.svrNatIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <select v-model="server.useYn">
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
              </li>
              <li class="td_cell">
                <i
                  class="ico-edit"
                  @click="editList(i)"
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
import { fetchGetEigwServerList, fetchSaveEigwServerInfo, fetchPutEigwServerInfo } from '@/api/eigwApi';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';

export default {
  components: {
    InstListPopup,
  },
  data() {
    return {
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      serverList: '',
      svrTypCdList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
      tgtUrl: '',
      svrTypCd: '',
      useYn: '',
      instCd: '',
      instNm: '',
      svrRealIp: '',
      svrNatIp: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'SVR_TYP_CD', allYn: 'Y', listNm: 'svrTypCd',
    });
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'IP_TYP', allYn: 'Y', listNm: 'ipTyp',
    });
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
      fetchGetEigwServerList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          svrTypCd: this.svrTypCd,
          useYn: this.useYn,
          svrRealIp: this.svrRealIp,
          svrNatIp: this.svrNatIp,
          instNm: this.instNm,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      if (this.svrTypCd === '') {
        this.$gf.alertOn('서버타입을 선택해주세요.');
        return;
      }
      if (this.instCd === '' || this.instNm === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
        return;
      }
      console.log('서버 정보 등록');
      this.saveServerInfo = {
        svrTypCd: this.svrTypCd,
        instCd: this.instCd,
        svrRealIp: this.svrRealIp,
        svrNatIp: this.svrNatIp,
        useYn: this.useYn,
      };
      fetchSaveEigwServerInfo(this.saveServerInfo)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('등록되었습니다.');
          this.emptyFields();
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      console.log(`i값 : ${i}`);
      const confirmText = `${this.serverList[i].svrNum} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('서버 정보 수정!');
      console.log(i);
      if (this.serverList[i].svrTypCd === '') {
        this.$gf.alertOn('서버타입을 선택해주세요.');
        return;
      }
      fetchPutEigwServerInfo(this.serverList[i])
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.$gf.alertOn('반영되었습니다.');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    emptyFields() {
      this.instCd = '';
      this.instNm = '';
      this.svrTypCd = '';
      this.svrRealIp = '';
      this.svrNatIp = '';
      this.useYn = '';
    },
    turnOnSvrPopInstList(val) {
      this.instPopupCase = val;
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.instPopupCase === -1) {
        this.instCd = val.instCd;
        this.instNm = val.instNm;
      } else {
        this.serverList[this.instPopupCase].instNm = val.instNm;
        this.serverList[this.instPopupCase].instCd = val.instCd;
      }
      this.svrOnInstList = false;
    },
  },
};
</script>
