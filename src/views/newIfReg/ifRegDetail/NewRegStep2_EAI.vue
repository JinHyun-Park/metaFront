<template>
  <div>
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <EaiIfDetailPopup
      v-if="showDetailInfo"
      :prop-data="propsDetail"
      @closePop="turOffIfDetail"
      @addData="addDataIfDetail"
    />
    <section
      class="form_area border_group"
    >
      <h5 class="s_tit type-2">
        송신 시스템 정보
      </h5>

      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%"
              >
                서버 유형
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                시스템명
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                Hostname
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP  ( VIP/대표 IP )
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP ( NAT IP )
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP ( 추가 )
              </li>
              <li
                class="th_cell"
                style="width:8%"
              >
                OS
              </li>
              <li
                class="th_cell"
                style="width:8%"
              >
                담당 회사
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                Edit
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(sndRow, n) in sndRows"
              :key="n"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select
                    v-model="sndRow.svrTypCd"
                  >
                    <option
                      v-for="(code, i) in ccCdList.svrTypCd"
                      :key="i"
                      :value="code.cdDtlId"
                    >
                      {{ code.cdNm }}
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.sysNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addSndRow(n)"
                />
                <i
                  class="ico-del"
                  @click="removeSndRow(sndRow)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h5 class="s_tit type-2">
        수신 시스템 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%"
              >
                서버 유형
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                시스템명
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                Hostname
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP  ( VIP/대표 IP )
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP ( NAT IP )
              </li>
              <li
                class="th_cell"
                style="width:14%"
              >
                IP ( 추가 )
              </li>
              <li
                class="th_cell"
                style="width:8%"
              >
                OS
              </li>
              <li
                class="th_cell"
                style="width:8%"
              >
                담당 회사
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                Edit
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(rcvRow, i) in rcvRows"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="rcvRow.svrTypCd">
                    <option
                      v-for="(code, j) in ccCdList.svrTypCd"
                      :key="j"
                      :value="code.cdDtlId"
                    >
                      {{ code.cdNm }}
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.sysNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addRcvRow(i)"
                />
                <i
                  class="ico-del"
                  @click="removeRcvRow(rcvRow)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section
      class="form_area border_group"
    >
      <h5 class="s_tit type-2">
        인터페이스 신청 목록
        <div class="right_button_area">
          <button
            type="button"
            class="default_button extend"
            @click="addNewEmptyIf()"
          >
            인터페이스 추가
          </button>
          <!--<button
            type="button"
            class="default_button extend on"
            @click="saveEaiRegTemp()"
          >
            임시저장
          </button>-->
        </div>
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:15%"
              >
                EAI 인터페이스ID
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                인터페이스명
              </li>
              <li
                class="th_cell"
                style="width:15%"
              >
                인터페이스명(영문)
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                방향
              </li>
              <li
                class="th_cell"
                style="width:5%"
              >
                방식
              </li>
              <li
                class="th_cell"
                style="width:7%"
              >
                단/양방향
              </li>
              <li
                class="th_cell"
                style="width:8%"
              >
                요청 처리 방식
              </li>
              <li
                class="th_cell"
                style="width:5%"
              >
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(eaiIf, i) in eaiIfList"
              :key="i"
              class="table_row w-auto"
            >
              <li
                class="td_cell on"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.eaiIfId }}
              </li>
              <li
                class="td_cell on"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.eaiIfNmKor }}
              </li>
              <li
                class="td_cell on"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.eaiIfNmEng }}
              </li>
              <li
                class="td_cell"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.drctnNm }}
              </li>
              <li
                class="td_cell"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.ifTypNm }}
              </li>
              <li
                class="td_cell"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.roundTypNm }}
              </li>
              <li
                class="td_cell"
                @click="getDetailInfo(i)"
              >
                {{ eaiIf.syncTypNm }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="removeIf(eaiIf)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!--
    <button
      type="button"
      class="default_button extend on"
      @click="saveEaiRegTemp()"
    >
      EAI 임시저장 테스트
    </button>
    <button
      type="button"
      class="default_button extend on"
      @click="getEaiRegTempList()"
    >
      임시저장 불러오기
    </button>
    -->
  </div>
</template>
<style scoped>
ul:hover { background-color: #F9F9F9}
</style>
<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetEaiRegSvrList, fetchGetEaiRegIfList } from '@/api/eaiApi';

import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EaiIfDetailPopup from '@/components/popup/meta/eai/EaiInterfaceDetailPopup.vue';
import eventBus from '@/utils/eventBus';

export default {
  name: 'RegStep2EAI',
  components: {
    ChrgrListPopup,
    EaiIfDetailPopup,
  },
  data() {
    return {
      svrOnChrgr: false,
      showDetailInfo: false,
      propsChrgr: {
        message: '',
      },
      propsDetail: {
        message: {},
      },
      popupType: 'new',
      checkIfEng: '',
      checkIfKor: '',
      eaiSeqNum: '',
      callChrgr: '',
      svrTypCd: '',
      sysTypCd: '',
      sysNm: '',
      hostNm: '',
      vIp: '',
      natIp: '',
      etcIp: '',
      osNm: '',
      company: '',
      chrgrId: '',
      chrgrNm: '',

      procSt: '',
      bSndRows: [],
      bRcvRows: [],
      bEaiIfList: [],
      props: {},
      currRow: [],
      svrRows: [],
      regList: {},

      eaiIfDetail: {
        eaiIfId: '',
        eaiIfNmKor: '',
        eaiIfNmEng: '',
        ifDesc: '',
        drctnCd: '',
        ifTypCd: '',
        roundTypCd: '',
        syncTypCd: '',
        rcvOpCd: '',
        rcvTr: '',
        drctnNm: '',
        ifTypNm: '',
        roundTypNm: '',
        syncTypNm: '',
        fileIfTypCd: '',
        fileIfTypNm: '',
        sndDir: '',
        rcvDir: '',
        rcvShNm: '',
        fileOpCode: '',

        sndMid: '',
        sndChrgrId1: '',
        sndChrgrId2: '',
        sndChrgrMngrId: '',
        sndChrgrNm1: '',
        sndChrgrNm2: '',
        sndChrgrMngrNm: '',

        rcvMid: '',
        rcvChrgrId1: '',
        rcvChrgrId2: '',
        rcvChrgrMngrId: '',
        rcvChrgrNm1: '',
        rcvChrgrNm2: '',
        rcvChrgrMngrNm: '',
        sndChrgrOrgNm1: '',
        sndChrgrOrgNm2: '',
        sndChrgrMngrOrgNm: '',
        rcvChrgrOrgNm1: '',
        rcvChrgrOrgNm2: '',
        rcvChrgrMngrOrgNm: '',
        svcImpt: '',
        eaiRmk: '',
      },

      sndRows: [
        {
          reqNum: '',
          sndRcvCl: '',
          sysTypCd: '',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          etcIp: '',
          osNm: '',
          company: '',
          procSt: '',
        },
      ],
      rcvRows: [
        {
          reqNum: '',
          sndRcvCl: '',
          sysTypCd: '',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          etcIp: '',
          osNm: '',
          company: '',
          procSt: '',
        },
      ],
      eaiIfList: [
        {
          reqNum: '',
          eaiIfId: '',
          eaiIfNmKor: '',
          eaiIfNmEng: '',
          ifDesc: '',
          ifTypCd: '',
          drctnCd: '',
          roundTypCd: '',
          syncTypCd: '',
          rcvOpCd: '',
          rcvTr: '',
          drctnNm: '',
          ifTypNm: '',
          roundTypNm: '',
          syncTypNm: '',
          fileIfTypCd: '',
          fileIfTypNm: '',
          sndDir: '',
          rcvDir: '',
          rcvShNm: '',
          fileOpCode: '',
          sndMid: '',
          sndChrgrId1: '',
          sndChrgrNm1: '',
          sndChrgrId2: '',
          sndChrgrNm2: '',
          sndChrgrMngrId: '',
          sndChrgrMngrNm: '',
          rcvMid: '',
          rcvChrgrId1: '',
          rcvChrgrNm1: '',
          rcvChrgrId2: '',
          rcvChrgrNm2: '',
          rcvChrgrMngrId: '',
          rcvChrgrMngrNm: '',
          sndChrgrOrgNm1: '',
          sndChrgrOrgNm2: '',
          sndChrgrMngrOrgNm: '',
          rcvChrgrOrgNm1: '',
          rcvChrgrOrgNm2: '',
          rcvChrgrMngrOrgNm: '',
          svcImpt: '',
          eaiRmk: '',
          procSt: '',
        },
      ],
    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
    ...mapState('ifRegInfo', ['saveFlag', 'reqNum']),
  },

  created() {
    eventBus.$on('Step2EaiSave', () => {
      console.log('event Bus 통해 eai 저장');
      this.saveEaiRegTemp();
    });
  },
  destroyed() {
    eventBus.$off('Step2EaiSave');
  },

  mounted() {
    if (this.$route.params.callType === 'update') {
      if (this.$route.params.ifKind === 'EAI') {
        this.getEaiRegTempList(this.reqNum);
      }
    }
    this.eaiIfList.splice(this.eaiIfList.indexOf(0), 1);
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'SVR_TYP_CD', allYn: 'N', listNm: 'svrTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'ROUND_TYP_CD', allYn: 'N', listNm: 'roundTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'IF_TYP_CD', allYn: 'N', listNm: 'ifTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'DRCTN_CD', allYn: 'N', listNm: 'drctnCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'SYNC_TYP_CD', allYn: 'N', listNm: 'syncTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'RCV_OP_CD', allYn: 'N', listNm: 'rcvOpCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'FILE_IF_TYP_CD', allYn: 'N', listNm: 'fileIfTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'SYS_TYP_CD', allYn: 'N', listNm: 'sysTypCd',
    });
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    ...mapActions('ifRegInfo', ['setTempSaveFlag', 'setMovePossible']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP2EAI', rstCd: rtn,
      });
    },

    getEaiRegTempList(tgtReqNum) {
      console.log('EAI 신청 정보 조회');

      fetchGetEaiRegSvrList({
        params: {
          reqNum: tgtReqNum,
          procSt: 1,
        },
      })
        .then((res) => {
          this.svrRows = res.data.rstData.searchList;

          this.sndRows.splice(0, this.sndRows.length);
          this.rcvRows.splice(0, this.rcvRows.length);

          for (let i = 0; i < this.svrRows.length; i++) {
            if (this.svrRows[i].sndRcvCl === 'S') {
              this.sndRows.push(this.svrRows[i]);
            } else {
              this.rcvRows.push(this.svrRows[i]);
            }
          }

          if (this.sndRows.length === 0) {
            this.sndRows.push({ sysNm: '', hostNm: '' });
          }
          if (this.rcvRows.length === 0) {
            this.rcvRows.push({ sysNm: '', hostNm: '' });
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });

      fetchGetEaiRegIfList({
        params: {
          reqNum: tgtReqNum,
          procSt: 1,
        },
      })
        .then((res) => {
          this.eaiIfList = res.data.rstData.searchList;

          console.log(this.eaiIfList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    checkAddedInfo() {
      this.checkIfEng = 0;
      this.checkIfEng = 0;

      if (this.eaiIfNmEng.length > 0 || this.eaiIfNmKor.length > 0) {
        console.log(` 인터페이스 추가 목록 길이 : ${this.eaiIfList.length}`);
        if (this.eaiIfList.length > 0) {
          for (let i = 0; i < this.eaiIfList.length; i++) {
            if (this.eaiIfList[i].eaiIfNmEng !== this.eaiIfNmEng) {
              this.checkIfEng = 1;
            }
            if (this.eaiIfList[i].eaiIfNmKor !== this.eaiIfNmKor) {
              this.checkIfKor = 1;
            }
          }
        } else {
          console.log(' 추가 된 인터페이스가 없음 ');
          this.checkIfEng = 1;
          this.checkIfEng = 1;
        }
      }

      if (this.checkIfEng === 1 || this.checkIfKor === 1) {
        console.log(' 여기 안 들어오나? ');
        this.$gf.alertOn('작성 중 추가하지 않은 인터페이스 정보가 있습니다.\n정보 입력 후 반드시 인터페이스 추가 버튼을 누르고 저장하시기 바랍니다.');
      }
    },

    saveEaiRegTemp() {
      console.log('eai 임시저장 함수 시작');
      this.svrRows.splice(0, this.svrRows.length);

      for (let i = 0; i < this.eaiIfList.length; i++) {
        if (this.$gf.isEmpty(this.eaiIfList[i].eaiIfNmKor)
            || this.$gf.isEmpty(this.eaiIfList[i].eaiIfNmEng)) {
          this.$gf.alertOn('미입력된 신청 건이 있습니다. 삭제하시거나 재 등록 후에 다시 저장 부탁드립니다.');
          return 0;
        }
        this.eaiIfList[i].reqNum = this.reqNum;
        this.eaiIfList[i].procSt = '1';
      }

      if (this.sndRows[0].sysNm.length > 0 && this.sndRows[0].hostNm.length > 0) {
        for (let i = 0; i < this.sndRows.length; i++) {
          this.sndRows[i].sndRcvCl = 'S';
          this.sndRows[i].reqNum = this.reqNum;
          this.sndRows[i].procSt = '1';
          this.svrRows.push(this.sndRows[i]);
        }
      }

      if (this.rcvRows[0].sysNm.length > 0 && this.rcvRows[0].hostNm.length > 0) {
        for (let i = 0; i < this.rcvRows.length; i++) {
          this.rcvRows[i].sndRcvCl = 'R';
          this.rcvRows[i].reqNum = this.reqNum;
          this.rcvRows[i].procSt = '1';
          this.svrRows.push(this.rcvRows[i]);
        }
      }

      this.regList = { reqNum: this.reqNum, svrList: this.svrRows, ifList: this.eaiIfList };

      this.$axios.post('/api/eai/regTemp', this.regList)
        .then((res) => {
          console.log(res);
          if (res.rstCd === 'E') {
            this.setTempSave('F');
            this.$gf.alertOn('저장에 실패하였습니다.');
          } else {
            this.setTempSave('S');
            this.$gf.alertOn('저장하였습니다.');
          }
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
          this.$gf.alertOn('저장에 실패하였습니다.');
          this.setTempSave('F');
        });

      return 1;
    },
    addSndRow(n) {
      console.log('행 추가!');
      this.sndRows.splice(n + 1, 0, {});
    },
    removeSndRow(sndRow) {
      if (this.sndRows.length > 1) {
        console.log('행 삭제!');
        console.log(sndRow);
        const idx = this.sndRows.indexOf(sndRow);
        this.sndRows.splice(idx, 1);
      } else {
        this.sndRows[0].reqNum = '';
        this.sndRows[0].sndRcvCl = '';
        this.sndRows[0].sysTypCd = '';
        this.sndRows[0].svrTypCd = '';
        this.sndRows[0].sysNm = '';
        this.sndRows[0].hostNm = '';
        this.sndRows[0].vIp = '';
        this.sndRows[0].natIp = '';
        this.sndRows[0].etcIp = '';
        this.sndRows[0].osNm = '';
        this.sndRows[0].company = '';
        this.sndRows[0].procSt = '';
      }
    },
    addRcvRow(i) {
      console.log('행 추가!');
      this.rcvRows.splice(i + 1, 0, {});
    },
    removeRcvRow(rcvRow) {
      if (this.rcvRows.length > 1) {
        console.log('행 삭제!');
        console.log(rcvRow);
        const idx = this.rcvRows.indexOf(rcvRow);
        this.rcvRows.splice(idx, 1);
      } else {
        this.rcvRows[0].reqNum = '';
        this.rcvRows[0].sndRcvCl = '';
        this.rcvRows[0].sysTypCd = '';
        this.rcvRows[0].svrTypCd = '';
        this.rcvRows[0].sysNm = '';
        this.rcvRows[0].hostNm = '';
        this.rcvRows[0].vIp = '';
        this.rcvRows[0].natIp = '';
        this.rcvRows[0].etcIp = '';
        this.rcvRows[0].osNm = '';
        this.rcvRows[0].company = '';
        this.rcvRows[0].procSt = '';
      }
    },
    checkFields() {
      if (this.eaiIfNmKor === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.eaiIfNmEng === '') {
        this.$gf.alertOn('인터페이스 영문 약자를 입력하세요');
        return 0;
      } if (this.drctnCd === '') {
        this.$gf.alertOn('연동 방향을 선택하세요');
        return 0;
      } if (this.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 선택하세요');
        return 0;
      } if (this.ifTypCd === '1' && this.roundTypCd === '') {
        this.$gf.alertOn('단/양방향을 선택하세요');
        return 0;
      } if (this.roundTypCd === '2' && this.syncTypCd === '') {
        this.$gf.alertOn('요청 처리 방식을 선택하세요');
        return 0;
      } if (this.rcvOpCd === '') {
        this.$gf.alertOn('수신 전문 처리 주기를 선택하세요');
        return 0;
      } if (this.ifTypCd === '2' && this.fileIfTypCd === '') {
        this.$gf.alertOn('파일 연동 방식을 선택하세요');
        return 0;
      } if (this.ifTypCd === '2' && this.sndDir === '') {
        this.$gf.alertOn('송신 디렉토리를 입력하세요');
        return 0;
      } if (this.ifTypCd === '2' && this.rcvDir === '') {
        this.$gf.alertOn('수신 디렉토리를 입력하세요');
        return 0;
      } if (this.ifTypCd === '2' && this.rcvShNm !== '' && this.fileOpCode === '') {
        this.$gf.alertOn('Shell을 매핑할 OP code를 입력하세요');
        return 0;
      } if (this.sndMid === '') {
        this.$gf.alertOn('송신 업무의 MID를 입력하세요');
        return 0;
      } if (this.sndChrgrId1 === '') {
        this.$gf.alertOn('송신 업무 운영 담당자1을 입력하세요');
        return 0;
      } if (this.sndChrgrMngrId === '') {
        this.$gf.alertOn('송신 업무 담당 매니저를 입력하세요');
        return 0;
      } if (this.rcvMid === '') {
        this.$gf.alertOn('수신 업무의 MID를 입력하세요');
        return 0;
      } if (this.rcvChrgrId1 === '') {
        this.$gf.alertOn('수신 업무 운영 담당자1을 입력하세요');
        return 0;
      } if (this.rcvChrgrMngrId === '') {
        this.$gf.alertOn('수신 업무 담당 매니저를 입력하세요');
        return 0;
      } if (this.svcImpt === '') {
        this.$gf.alertOn('장애 시 서비스 영향도를 상세히 입력하세요');
        return 0;
      }

      return 1;
    },
    addNewEmptyIf() {
      // this.eaiIfList.push({});
      this.emptyIfFields();
      this.popupType = 'new';
      this.showDetailInfo = true;
    },
    getDetailInfo(i) {
      this.emptyIfFields();
      this.popupType = 'update';
      this.showDetailInfo = true;

      this.eaiIfDetail.eaiIfId = this.eaiIfList[i].eaiIfId;
      this.eaiIfDetail.eaiIfNmKor = this.eaiIfList[i].eaiIfNmKor;
      this.eaiIfDetail.eaiIfNmEng = this.eaiIfList[i].eaiIfNmEng;
      this.eaiIfDetail.ifDesc = this.eaiIfList[i].ifDesc;
      this.eaiIfDetail.drctnCd = this.eaiIfList[i].drctnCd;
      this.eaiIfDetail.ifTypCd = this.eaiIfList[i].ifTypCd;
      this.eaiIfDetail.roundTypCd = this.eaiIfList[i].roundTypCd;
      this.eaiIfDetail.syncTypCd = this.eaiIfList[i].syncTypCd;
      this.eaiIfDetail.rcvOpCd = this.eaiIfList[i].rcvOpCd;
      this.eaiIfDetail.rcvTr = this.eaiIfList[i].rcvTr;
      this.eaiIfDetail.drctnNm = this.eaiIfList[i].drctnNm;
      this.eaiIfDetail.ifTypNm = this.eaiIfList[i].ifTypNm;
      this.eaiIfDetail.roundTypNm = this.eaiIfList[i].roundTypNm;
      this.eaiIfDetail.syncTypNm = this.eaiIfList[i].syncTypNm;
      this.eaiIfDetail.fileIfTypCd = this.eaiIfList[i].fileIfTypCd;
      this.eaiIfDetail.fileIfTypNm = this.eaiIfList[i].fileIfTypNm;
      this.eaiIfDetail.sndDir = this.eaiIfList[i].sndDir;
      this.eaiIfDetail.rcvDir = this.eaiIfList[i].rcvDir;
      this.eaiIfDetail.rcvShNm = this.eaiIfList[i].rcvShNm;
      this.eaiIfDetail.fileOpCode = this.eaiIfList[i].fileOpCode;

      this.eaiIfDetail.sndMid = this.eaiIfList[i].sndMid;
      this.eaiIfDetail.sndChrgrId1 = this.eaiIfList[i].sndChrgrId1;
      this.eaiIfDetail.sndChrgrNm1 = this.eaiIfList[i].sndChrgrNm1;
      this.eaiIfDetail.sndChrgrId2 = this.eaiIfList[i].sndChrgrId2;
      this.eaiIfDetail.sndChrgrNm2 = this.eaiIfList[i].sndChrgrNm2;
      this.eaiIfDetail.sndChrgrMngrId = this.eaiIfList[i].sndChrgrMngrId;
      this.eaiIfDetail.sndChrgrMngrNm = this.eaiIfList[i].sndChrgrMngrNm;

      this.eaiIfDetail.rcvMid = this.eaiIfList[i].rcvMid;
      this.eaiIfDetail.rcvChrgrId1 = this.eaiIfList[i].rcvChrgrId1;
      this.eaiIfDetail.rcvChrgrNm1 = this.eaiIfList[i].rcvChrgrNm1;
      this.eaiIfDetail.rcvChrgrId2 = this.eaiIfList[i].rcvChrgrId2;
      this.eaiIfDetail.rcvChrgrNm2 = this.eaiIfList[i].rcvChrgrNm2;
      this.eaiIfDetail.rcvChrgrMngrId = this.eaiIfList[i].rcvChrgrMngrId;
      this.eaiIfDetail.rcvChrgrMngrNm = this.eaiIfList[i].rcvChrgrMngrNm;

      this.eaiIfDetail.sndChrgrOrgNm1 = this.eaiIfList[i].sndChrgrOrgNm1;
      this.eaiIfDetail.sndChrgrOrgNm2 = this.eaiIfList[i].sndChrgrOrgNm2;
      this.eaiIfDetail.sndChrgrMngrOrgNm = this.eaiIfList[i].sndChrgrMngrOrgNm;
      this.eaiIfDetail.rcvChrgrOrgNm1 = this.eaiIfList[i].rcvChrgrOrgNm1;
      this.eaiIfDetail.rcvChrgrOrgNm2 = this.eaiIfList[i].rcvChrgrOrgNm2;
      this.eaiIfDetail.rcvChrgrMngrOrgNm = this.eaiIfList[i].rcvChrgrMngrOrgNm;

      this.eaiIfDetail.svcImpt = this.eaiIfList[i].svcImpt;
      this.eaiIfDetail.eaiRmk = this.eaiIfList[i].eaiRmk;

      this.currRow = i;

      this.propsDetail = this.eaiIfDetail;
    },
    updateIf(val) {
      if (this.currRow.length === 0) {
        this.$gf.alertOn('인터페이스 신청 목록에서 수정할 대상을 선택하세요');
        return;
      }
      // if (this.checkFields() === 0) {
      //   return;
      // }
      this.eaiIfList[this.currRow].eaiIfId = val.eaiIfId;
      this.eaiIfList[this.currRow].eaiIfNmKor = val.eaiIfNmKor;
      this.eaiIfList[this.currRow].eaiIfNmEng = val.eaiIfNmEng;
      this.eaiIfList[this.currRow].ifDesc = val.ifDesc;
      this.eaiIfList[this.currRow].drctnCd = val.drctnCd;
      this.eaiIfList[this.currRow].ifTypCd = val.ifTypCd;
      this.eaiIfList[this.currRow].roundTypCd = val.roundTypCd;
      this.eaiIfList[this.currRow].syncTypCd = val.syncTypCd;
      this.eaiIfList[this.currRow].rcvOpCd = val.rcvOpCd;
      this.eaiIfList[this.currRow].rcvTr = val.rcvTr;
      this.eaiIfList[this.currRow].syncTypCd = val.syncTypCd;
      this.eaiIfList[this.currRow].rcvOpCd = val.rcvOpCd;
      this.eaiIfList[this.currRow].rcvTr = val.rcvTr;
      this.eaiIfList[this.currRow].drctnNm = val.drctnNm;
      this.eaiIfList[this.currRow].ifTypNm = val.ifTypNm;
      this.eaiIfList[this.currRow].roundTypNm = val.roundTypNm;
      this.eaiIfList[this.currRow].syncTypNm = val.syncTypNm;
      this.eaiIfList[this.currRow].fileIfTypCd = val.fileIfTypCd;
      this.eaiIfList[this.currRow].fileIfTypNm = val.fileIfTypNm;
      this.eaiIfList[this.currRow].sndDir = val.sndDir;
      this.eaiIfList[this.currRow].rcvDir = val.rcvDir;
      this.eaiIfList[this.currRow].rcvShNm = val.rcvShNm;
      this.eaiIfList[this.currRow].fileOpCode = val.fileOpCode;
      this.eaiIfList[this.currRow].sndMid = val.sndMid;
      this.eaiIfList[this.currRow].sndChrgrId1 = val.sndChrgrId1;
      this.eaiIfList[this.currRow].sndChrgrNm1 = val.sndChrgrNm1;
      this.eaiIfList[this.currRow].sndChrgrId2 = val.sndChrgrId2;
      this.eaiIfList[this.currRow].sndChrgrNm2 = val.sndChrgrNm2;
      this.eaiIfList[this.currRow].sndChrgrMngrId = val.sndChrgrMngrId;
      this.eaiIfList[this.currRow].sndChrgrMngrNm = val.sndChrgrMngrNm;
      this.eaiIfList[this.currRow].rcvMid = val.rcvMid;
      this.eaiIfList[this.currRow].rcvChrgrId1 = val.rcvChrgrId1;
      this.eaiIfList[this.currRow].rcvChrgrNm1 = val.rcvChrgrNm1;
      this.eaiIfList[this.currRow].rcvChrgrId2 = val.rcvChrgrId2;
      this.eaiIfList[this.currRow].rcvChrgrNm2 = val.rcvChrgrNm2;
      this.eaiIfList[this.currRow].rcvChrgrMngrId = val.rcvChrgrMngrId;
      this.eaiIfList[this.currRow].rcvChrgrMngrNm = val.rcvChrgrMngrNm;

      this.eaiIfList[this.currRow].sndChrgrOrgNm1 = val.sndChrgrOrgNm1;
      this.eaiIfList[this.currRow].sndChrgrOrgNm2 = val.sndChrgrOrgNm2;
      this.eaiIfList[this.currRow].sndChrgrMngrOrgNm = val.sndChrgrMngrOrgNm;
      this.eaiIfList[this.currRow].rcvChrgrOrgNm1 = val.rcvChrgrOrgNm1;
      this.eaiIfList[this.currRow].rcvChrgrOrgNm2 = val.rcvChrgrOrgNm2;
      this.eaiIfList[this.currRow].rcvChrgrMngrOrgNm = val.rcvChrgrMngrOrgNm;

      this.eaiIfList[this.currRow].svcImpt = val.svcImpt;
      this.eaiIfList[this.currRow].eaiRmk = val.eaiRmk;

      // this.emptyIfFields();
      // this.showDetailInfo = false;
    },

    addNewIf() {
      // if (this.checkFields() === 0) {
      //   return;
      // }
      this.eaiIfList.push({
        eaiIfId: this.eaiIfId,
        eaiIfNmKor: this.eaiIfNmKor,
        eaiIfNmEng: this.eaiIfNmEng,
        drctnCd: this.drctnCd,
        ifTypCd: this.ifTypCd,
        ifDesc: this.ifDesc,
        roundTypCd: this.roundTypCd,
        syncTypCd: this.syncTypCd,
        rcvOpCd: this.rcvOpCd,
        rcvTr: this.rcvTr,
        drctnNm: this.drctnNm,
        ifTypNm: this.ifTypNm,
        roundTypNm: this.roundTypNm,
        syncTypNm: this.syncTypNm,
        fileIfTypCd: this.fileIfTypCd,
        fileIfTypNm: this.fileIfTypNm,
        sndDir: this.sndDir,
        rcvDir: this.rcvDir,
        rcvShNm: this.rcvShNm,
        fileOpCode: this.fileOpCode,
        sndMid: this.sndMid,
        sndChrgrId1: this.sndChrgrId1,
        sndChrgrNm1: this.sndChrgrNm1,
        sndChrgrId2: this.sndChrgrId2,
        sndChrgrNm2: this.sndChrgrNm2,
        sndChrgrMngrId: this.sndChrgrMngrId,
        sndChrgrMngrNm: this.sndChrgrMngrNm,
        rcvMid: this.rcvMid,
        rcvChrgrId1: this.rcvChrgrId1,
        rcvChrgrNm1: this.rcvChrgrNm1,
        rcvChrgrId2: this.rcvChrgrId2,
        rcvChrgrNm2: this.rcvChrgrNm2,
        rcvChrgrMngrId: this.rcvChrgrMngrId,
        rcvChrgrMngrNm: this.rcvChrgrMngrNm,
        svcImpt: this.svcImpt,
        eaiRmk: this.eaiRmk,
      });

      // this.currRow = this.eaiIfList[this.eaiIfList.length - 1];

      this.emptyIfFields();
      this.showDetailInfo = false;
    },
    removeIf(eaiIf) {
      console.log('행 삭제!');

      const idx = this.eaiIfList.indexOf(eaiIf);
      this.eaiIfList.splice(idx, 1);

      this.emptyIfFields();

      // this.$gf.alertOn(`인터페이스명 : ${this.eaiIfNmKor}`);
    },


    changeRoundStatus(x) {
      if (x === 1) {
        if (this.ifTypCd === '1') {
          this.$refs.selectRound.disabled = false;
          this.$refs.selectSync.disabled = false;
          this.$refs.rcvTrInput.disabled = false;

          this.$refs.selectFileIfTypCd.disabled = true;
          this.$refs.sndDirInput.disabled = true;
          this.$refs.rcvDirInput.disabled = true;
          this.$refs.rcvShNmInput.disabled = true;
          this.$refs.fileOpCodeInput.disabled = true;
        } if (this.ifTypCd === '2') {
          this.$refs.selectRound.disabled = true;
          this.$refs.selectSync.disabled = true;
          this.$refs.rcvTrInput.disabled = true;

          this.$refs.selectFileIfTypCd.disabled = false;
          this.$refs.sndDirInput.disabled = false;
          this.$refs.rcvDirInput.disabled = false;
          this.$refs.rcvShNmInput.disabled = false;
          this.$refs.fileOpCodeInput.disabled = false;
        }
      } else {
        if (this.ifTypCd === '1') {
          this.roundTypCd = '';
          this.roundTypNm = '';
          this.syncTypCd = '';
          this.syncTypNm = '';
          this.rcvTr = '';
          this.rcvOpCd = '';
          this.fileIfTypCd = '';
          this.fileIfTypNm = '';
          this.sndDir = '';
          this.rcvDir = '';
          this.rcvShNm = '';
          this.fileOpCode = '';

          this.$refs.selectRound.disabled = false;
          this.$refs.selectSync.disabled = false;
          this.$refs.rcvTrInput.disabled = false;

          this.$refs.selectFileIfTypCd.disabled = true;
          this.$refs.sndDirInput.disabled = true;
          this.$refs.rcvDirInput.disabled = true;
          this.$refs.rcvShNmInput.disabled = true;
          this.$refs.fileOpCodeInput.disabled = true;
        } if (this.ifTypCd === '2') {
          this.roundTypCd = '';
          this.roundTypNm = '';
          this.syncTypCd = '';
          this.syncTypNm = '';
          this.rcvTr = '';
          this.rcvOpCd = '';
          this.fileIfTypCd = '';
          this.fileIfTypNm = '';
          this.sndDir = '';
          this.rcvDir = '';
          this.rcvShNm = '';
          this.fileOpCode = '';

          this.$refs.selectRound.disabled = true;
          this.$refs.selectSync.disabled = true;
          this.$refs.rcvTrInput.disabled = true;

          this.$refs.selectFileIfTypCd.disabled = false;
          this.$refs.sndDirInput.disabled = false;
          this.$refs.rcvDirInput.disabled = false;
          this.$refs.rcvShNmInput.disabled = false;
          this.$refs.fileOpCodeInput.disabled = false;
        }
        console.log(`방향 값 : ${this.roundTypCd}`);
      }
    },
    changeSyncStatus(x) {
      if (x === 1) {
        if (this.roundTypCd === '1') {
          this.$refs.selectSync.disabled = true;
        } if (this.roundTypCd === '2') {
          this.$refs.selectSync.disabled = false;
        }
      } else {
        if (this.roundTypCd === '1') {
          this.syncTypCd = '';
          this.syncTypNm = '';

          this.$refs.selectSync.disabled = true;
        } if (this.roundTypCd === '2') {
          this.syncTypCd = '';
          this.syncTypNm = '';

          this.$refs.selectSync.disabled = false;
        }
      }
    },
    emptyIfFields() {
      this.eaiIfDetail.eaiIfId = '';
      this.eaiIfDetail.eaiIfNmKor = '';
      this.eaiIfDetail.eaiIfNmEng = '';
      this.eaiIfDetail.ifDesc = '';
      this.eaiIfDetail.drctnCd = '';
      this.eaiIfDetail.ifTypCd = '';
      this.eaiIfDetail.roundTypCd = '';
      this.eaiIfDetail.syncTypCd = '';
      this.eaiIfDetail.rcvOpCd = '';
      this.eaiIfDetail.rcvTr = '';
      this.eaiIfDetail.drctnNm = '';
      this.eaiIfDetail.ifTypNm = '';
      this.eaiIfDetail.roundTypNm = '';
      this.eaiIfDetail.syncTypNm = '';
      this.eaiIfDetail.fileIfTypCd = '';
      this.eaiIfDetail.fileIfTypNm = '';
      this.eaiIfDetail.sndDir = '';
      this.eaiIfDetail.rcvDir = '';
      this.eaiIfDetail.rcvShNm = '';
      this.eaiIfDetail.fileOpCode = '';
      this.eaiIfDetail.sndMid = '';
      this.eaiIfDetail.sndChrgrId1 = '';
      this.eaiIfDetail.sndChrgrNm1 = '';
      this.eaiIfDetail.sndChrgrId2 = '';
      this.eaiIfDetail.sndChrgrNm2 = '';
      this.eaiIfDetail.sndChrgrMngrId = '';
      this.eaiIfDetail.sndChrgrMngrNm = '';
      this.eaiIfDetail.rcvMid = '';
      this.eaiIfDetail.rcvChrgrId1 = '';
      this.eaiIfDetail.rcvChrgrNm1 = '';
      this.eaiIfDetail.rcvChrgrId2 = '';
      this.eaiIfDetail.rcvChrgrNm2 = '';
      this.eaiIfDetail.rcvChrgrMngrId = '';
      this.eaiIfDetail.rcvChrgrMngrNm = '';
      this.eaiIfDetail.svcImpt = '';
      this.eaiIfDetail.eaiRmk = '';

      this.currRow = [];
    },
    turnOnSvrPopChrgr(callChrgr) {
      this.callChrgr = callChrgr;
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    turnOnIfDetail(callDetail) {
      this.callChrgr = callDetail;
      this.svrOnChrgr = true;
    },
    turOffIfDetail(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showDetailInfo = false;
    },
    addDataIfDetail(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showDetailInfo = false;
      if (this.popupType === 'update') {
        this.updateIf(val);
      } else {
        this.eaiIfList.push(val);
      }
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;

      // this.chrgrId = val.userId;
      if (this.callChrgr === 1) {
        this.sndChrgrId1 = val.userId;
        this.sndChrgrNm1 = val.hanNm;
        this.sndChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 2) {
        this.sndChrgrId2 = val.userId;
        this.sndChrgrNm2 = val.hanNm;
        this.sndChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 3) {
        this.sndChrgrMngrId = val.userId;
        this.sndChrgrMngrNm = val.hanNm;
        this.sndChrgrMngrOrgNm = val.orgNm;
      }
      if (this.callChrgr === 4) {
        this.rcvChrgrId1 = val.userId;
        this.rcvChrgrNm1 = val.hanNm;
        this.rcvChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 5) {
        this.rcvChrgrId2 = val.userId;
        this.rcvChrgrNm2 = val.hanNm;
        this.rcvChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 6) {
        this.rcvChrgrMngrId = val.userId;
        this.rcvChrgrMngrNm = val.hanNm;
        this.rcvChrgrMngrOrgNm = val.orgNm;
      }
    },
  },
};
</script>
