<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EAI 서버 정보 조회
        </div>
        <div class="breadcrumb">
          <span>EIGW</span><em class="on">EAI</em>
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
      <div class="row_contain type-3 last">
        <div class="column on w-1">
          <label class="column_label">서버타입</label>
          <select v-model="svrTypCd">
            <option
              v-for="(code, i) in ccCdList.syrTypCd"
              :key="i"
              :value="code.cdDtlId"
            >
              {{ code.cdNm }}
            </option>
          </select>
        </div>
        <div class="column on w-1">
          <label class="column_label">시스템명</label>
          <input
            v-model="sysNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">호스트명</label>
          <input
            v-model="hostNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
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
              조회
            </button>
          </div>
        </div>
      </div>
      -->
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                #
              </li>
              <li
                style="width:15%; "
                class="th_cell"
              >
                시스템명
              </li>
              <li
                style="width:10%; "
                class="th_cell"
              >
                서버 유형
              </li>
              <li
                style="width:15%; "
                class="th_cell"
              >
                Hostname
              </li>
              <li
                style="width:10%; "
                class="th_cell"
              >
                VIP (대표 IP)
              </li>
              <li
                style="width:10%; "
                class="th_cell"
              >
                NAT IP
              </li>
              <li
                style="width:10%; "
                class="th_cell"
              >
                IP (추가)
              </li>
              <li
                style="width:8%; "
                class="th_cell"
              >
                OS (운영체제)
              </li>
              <li
                style="width:8%; "
                class="th_cell"
              >
                담당 회사
              </li>
              <li
                style="width:5%; "
                class="th_cell"
              >
                사용 여부
              </li>
              <li class="th_cell">
                EDIT
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell" />
              <li class="td_cell">
                <input
                  v-model="sysNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="svrTypCd">
                    <option
                      v-for="(code, n) in ccCdList.svrTypCd"
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
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="company"
                  type="text"
                >
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
                  @click="saveEaiServer()"
                />
                <i
                  class="ico-del"
                  @click="resetField()"
                />
              </li>
            </ul>
            <ul
              v-for="(svr, i) in serverList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ svr.svrNum }}
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.sysNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="svr.svrTypCd">
                    <option
                      v-for="(code, n) in ccCdList.svrTypCd"
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
                  v-model="svr.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="svr.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="svr.useYn">
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
          :click-handler="searchList"
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
import { fetchEaiServerList } from '@/api/eaiApi';

export default {
  data() {
    return {
      serverList: [],
      svrTypCdList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      tgtUrl: '',
      svrNum: '',
      sysNm: '',
      svrIp: '',
      svrTypCd: '',
      vIp: '',
      natIp: '',
      etcIp: '',
      hostNm: '',
      osNm: '',
      company: '',
      useYn: '',
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
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      // this.tgtUrl = '/api/bizcomm/server';
      // this.$axios.get(this.tgtUrl, {
      fetchEaiServerList({
        params: {
          // pageSet: this.pageSet,
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          svrTypCd: this.svrTypCd,
          sysNm: this.sysNm,
          hostNm: this.hostNm,
          vIp: this.vIp,
          natIp: this.natIp,
          etcIp: this.etcIp,
          osNm: this.osNm,
          company: this.company,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
            console.log(this.serverList);
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveEaiServer() {
      if (this.sysNm === '') {
        this.$gf.alertOn('시스템명을 입력하세요');
        return;
      } if (this.svrTypCd === '') {
        this.$gf.alertOn('서버 유형을 선택하세요');
        return;
      } if (this.hostNm === '') {
        this.$gf.alertOn('Hostname을 입력하세요');
        return;
      } if (this.vIp === '') {
        this.$gf.alertOn('VIP(대표 IP)를 입력하세요');
        return;
      } if (this.osNm === '') {
        this.$gf.alertOn('OS(운영체제)를 입력하세요');
        return;
      } if (this.company === '') {
        this.$gf.alertOn('담당회사를 입력하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.sysNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertData);
    },
    insertData() {
      console.log('EAI 서버 정보 등록!');
      this.serverList = {
        sysNm: this.sysNm,
        svrTypCd: this.svrTypCd,
        hostNm: this.hostNm,
        vIp: this.vIp,
        natIp: this.natIp,
        etcIp: this.etcIp,
        osNm: this.osNm,
        company: this.company,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/server', this.serverList)
        .then((res) => {
          console.log(res);
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      if (this.serverList[i].svrTypCd === '') {
        this.$gf.alertOn('서버 유형을 선택하세요');
      } else {
        const confirmText = `${this.serverList[i].sysNm} 를 수정하십니까?`;
        this.$gf.confirmOn(confirmText, this.editCall, i);
      }
    },
    editCall(i) {
      console.log('EAI 서버 정보 갱신!');
      console.log(i);
      this.$axios.put('/api/eai/server', this.serverList[i])
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
      this.sysNm = '';
      this.svrTypCd = '';
      this.hostNm = '';
      this.vIp = '';
      this.natIp = '';
      this.etcIp = '';
      this.osNm = '';
      this.company = '';
      this.useYn = '';
    },
  },
};
</script>
