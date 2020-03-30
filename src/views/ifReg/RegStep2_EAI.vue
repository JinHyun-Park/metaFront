<template>
  <div>
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EAI 업무 요청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        송신 시스템 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                서버 유형
              </li>
              <li class="th_cell">
                시스템명
              </li>
              <li class="th_cell">
                Hostname
              </li>
              <li class="th_cell">
                IP  ( VIP or 대표 IP )
              </li>
              <li class="th_cell">
                IP ( NAT IP )
              </li>
              <li class="th_cell">
                IP ( 추가 )
              </li>
              <li class="th_cell">
                OS
              </li>
              <li class="th_cell">
                담당 회사
              </li>
              <li class="th_cell">
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
                  <select v-model="sndRow.svrTypCd">
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
                  v-model="sndRow.addIp"
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
              <li class="th_cell">
                서버 유형
              </li>
              <li class="th_cell">
                시스템명
              </li>
              <li class="th_cell">
                Hostname
              </li>
              <li class="th_cell">
                IP ( VIP or 대표 IP )
              </li>
              <li class="th_cell">
                IP ( NAT IP )
              </li>
              <li class="th_cell">
                IP ( 추가 )
              </li>
              <li class="th_cell">
                OS
              </li>
              <li class="th_cell">
                담당 회사
              </li>
              <li class="th_cell">
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
                  v-model="rcvRow.addIp"
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

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        인터페이스 신청 목록
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:30%"
              >
                인터페이스명
              </li>
              <li
                class="th_cell"
                style="width:30%"
              >
                인터페이스명(영문)
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                연동 방식
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                단/양방향
              </li>
              <li
                class="th_cell"
                style="width:10%"
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
              @click="getDetailInfo(eaiIf)"
            >
              <li class="td_cell on">
                {{ eaiIf.ifNmKor }}
              </li>
              <li class="td_cell on">
                {{ eaiIf.ifNmEng }}
              </li>
              <li class="td_cell">
                {{ eaiIf.ifTypNm }}
              </li>
              <li class="td_cell">
                {{ eaiIf.roundTypNm }}
              </li>
              <li class="td_cell">
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

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
            @click="updateIf()"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button extend on"
            @click="addNewIf()"
          >
            인터페이스 추가
          </button>
        </div>
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">인터페이스명</label>
          <input
            v-model="ifNmKor"
            type="text"
            maxlength="80"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">인터페이스명 (영문 약자)</label>
          <input
            v-model="ifNmEng"
            type="text"
            maxlength="25"
            oninput="this.value = this.value.toUpperCase()"
            placeholder="CUST_ADDR_INFO  (예시)"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">연동 목적</label>
          <input
            v-model="ifDesc"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-1">
          <label class="column_label">연동 방향</label>
          <div class="select_group">
            <select v-model="drctnCd">
              <option
                v-for="(code, i) in ccCdList.drctnCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">연동 방식</label>
          <div class="select_group">
            <select
              v-model="ifTypCd"
              @click="checkDrctn()"
              @change="onChangeIfTypCd()"
            >
              <option
                v-for="(code, i) in ccCdList.ifTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">단/양방향</label>
          <div class="select_group">
            <select
              ref="selectRound"
              v-model="roundTypCd"
              @click="checkIfTyp()"
              @change="onChangeRoundTypCd()"
            >
              <option
                v-for="(code, i) in ccCdList.roundTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">요청 처리 방식</label>
          <div class="select_group">
            <select
              ref="selectSync"
              v-model="syncTypCd"
              @click="checkRoundTyp()"
              @change="onChangeSyncTypCd()"
            >
              <option
                v-for="(code, i) in ccCdList.syncTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">수신 전문 처리 주기</label>
          <div class="select_group">
            <select v-model="rcvOpCd">
              <option
                v-for="(code, i) in ccCdList.rcvOpCd"
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
          <label class="column_label">수신TR (SWING만 해당)</label>
          <input
            ref="rcvTrInput"
            v-model="rcvTr"
            type="text"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
      </div>
      <h5 class="s_tit type-2">
        파일 연동 정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일 연동 방식</label>
          <div class="select_group">
            <select
              ref="selectFileIfTypCd"
              v-model="fileIfTypCd"
            >
              <option
                v-for="(code, i) in ccCdList.fileIfTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">송신 디렉토리</label>
          <input
            ref="sndDirInput"
            v-model="sndDir"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">수신 디렉토리</label>
          <input
            ref="rcvDirInput"
            v-model="rcvDir"
            type="text"
          >
        </div>
        <div class="column w-4">
          <label class="column_label">수신 실행 Shell</label>
          <input
            ref="rcvShNmInput"
            v-model="rcvShNm"
            type="text"
            placeholder="파일 수신 후 자동 실행이 필요한 Shell 기입(경로 포함)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OP code</label>
          <input
            ref="fileOpCodeInput"
            v-model="fileOpCode"
            type="text"
            maxlength="10"
            oninput="this.value = this.value.toUpperCase()"
            placeholder="Shell 등록을 위한 구분 값 (영문/숫자)"
          >
        </div>
      </div>
      <h5 class="s_tit type-3">
        송신 업무/담당자 정보
      </h5>
      <div class="row_contain">
        <div style="float:left;width:48%">
          <div class="row_contain">
            <div class="column w-2">
              <label class="column_label">MID</label>
              <input
                v-model="sndMid"
                type="text"
                placeholder="MID 없는 경우 시스템명 약자 입력"
                oninput="this.value = this.value.toUpperCase()"
              >
            </div>
            <div class="column w-2">
              <label class="column_label">운영 담당자1</label>
              <div class="search_group">
                <input
                  v-model="sndChrgrNm1"
                  type="text"
                  @click="turnOnSvrPopChrgr(1)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
            <div class="column w-2">
              <label class="column_label">운영 담당자2</label>
              <div class="search_group">
                <input
                  v-model="sndChrgrNm2"
                  type="text"
                  @click="turnOnSvrPopChrgr(2)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
            <div class="column w-2">
              <label class="column_label">업무 담당 매니저</label>
              <div class="search_group">
                <input
                  v-model="sndChrgrMngrNm"
                  type="text"
                  @click="turnOnSvrPopChrgr(3)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
          </div>
          <h5 class="s_tit type-3">
            수신 업무/담당자 정보
          </h5>
          <div class="row_contain">
            <div class="column w-2">
              <label class="column_label">MID</label>
              <input
                v-model="rcvMid"
                type="text"
                placeholder="MID 없는 경우 시스템명 약자 입력"
                oninput="this.value = this.value.toUpperCase()"
              >
            </div>
            <div class="column w-2">
              <label class="column_label">운영 담당자1</label>
              <div class="search_group">
                <input
                  v-model="rcvChrgrNm1"
                  type="text"
                  @click="turnOnSvrPopChrgr(4)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
            <div class="column w-2">
              <label class="column_label">운영 담당자2</label>
              <div class="search_group">
                <input
                  v-model="rcvChrgrNm2"
                  type="text"
                  @click="turnOnSvrPopChrgr(5)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
            <div class="column w-2">
              <label class="column_label">업무 담당 매니저</label>
              <div class="search_group">
                <input
                  v-model="rcvChrgrMngrNm"
                  type="text"
                  @click="turnOnSvrPopChrgr(6)"
                >
                <span class="search">
                  <i class="ico-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style="float:right;width:4%" />
        <div style="float:right;width:48%">
          <div class="row_contain">
            <div class="column w-6">
              <label class="column_label">장애 영향도</label>
              <textarea
                v-model="svcImpt"
                cols="20"
                row="5"
                placeholder="연동 장애가 발생하였을 경우 서비스 영향도에 대해 최대한 상세하게 기술 바랍니다."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <button
      type="button"
      class="default_button extend on"
      @click="saveEaiRegTemp()"
    >
      EAI 임시저장 테스트
    </button>
  </div>
</template>
<style scoped>
ul:hover { background-color: #F9F9F9}
</style>
<script>
import { mapState, mapActions } from 'vuex';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';

export default {
  name: 'RegStep2EAI',
  components: {
    ChrgrListPopup,
  },
  data() {
    return {
      reqNum: 1,
      eaiSeqNum: '',
      svrOnChrgr: false,
      callChrgr: '',
      svrTypCd: '',
      ifTypCd: '',
      drctnCd: '',
      roundTypCd: '',
      syncTypCd: '',
      rcvOpCd: '',
      fileIfTypCd: '',
      sysTypCd: '',
      fileIfTypNm: '',
      sndDir: '',
      rcvDir: '',
      rcvShNm: '',
      fileOpCode: '',
      ifTypNm: '',
      roundTypNm: '',
      syncTypNm: '',
      ifNmEng: '',
      ifNmKor: '',
      ifDesc: '',
      rcvTr: '',
      sysNm: '',
      hostNm: '',
      vIp: '',
      natIp: '',
      addIp: '',
      osNm: '',
      company: '',
      chrgrId: '',
      chrgrNm: '',
      sndChrgrId1: '',
      sndChrgrId2: '',
      sndChrgrMngrId: '',
      rcvChrgrId1: '',
      rcvChrgrId2: '',
      rcvChrgrMngrId: '',
      sndChrgrNm1: '',
      sndChrgrNm2: '',
      sndChrgrMngrNm: '',
      rcvChrgrNm1: '',
      rcvChrgrNm2: '',
      rcvChrgrMngrNm: '',
      sndMid: '',
      rcvMid: '',
      svcImpt: '',
      props: {},
      currRow: [],
      svrRows: [],
      svrList: {},
      sndRows: [
        {
          reqNum: '1',
          sndRcvCl: 'S',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          addIp: '',
          osNm: '',
          company: '',
        },
      ],
      rcvRows: [
        {
          reqNum: '',
          sndRcvCl: 'R',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          addIp: '',
          osNm: '',
          company: '',
        },
      ],
      eaiIfList: [
        {
          ifNmKor: '',
          ifNmEng: '',
          ifTypCd: '',
          drctnCd: '',
          roundTypCd: '',
          syncTypCd: '',
          rcvOpCd: '',
          rcvTr: '',
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
          svcImpt: '',
        },
      ],
    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
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
      opClCd: 'EAI', cdId: 'SYNC_CD', allYn: 'N', listNm: 'syncTypCd',
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
    saveEaiRegTemp() {
      console.log(this.sndRows);
      console.log(this.rcvRows);

      for (let i = 0; i < this.sndRows.length; i++) {
        this.sndRows[i].sndRcvCl = 'S';
        this.sndRows[i].reqNum = this.reqNum;
        this.svrRows.push(this.sndRows[i]);
      }

      for (let i = 0; i < this.rcvRows.length; i++) {
        this.rcvRows[i].sndRcvCl = 'R';
        this.rcvRows[i].reqNum = this.reqNum;
        this.svrRows.push(this.rcvRows[i]);
      }

      this.svrList = { svrList: this.svrRows };

      this.$axios.post('/api/eai/regTemp', this.svrList)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('작성하신 내용이 임시저장 되었습니다');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
        });
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
      }
    },
    resetFields() {
    },
    onChangeIfTypCd() {
      for (let i = 0; i < this.ccCdList.ifTypCd.length; i++) {
        if (this.ccCdList.ifTypCd[i].cdDtlId === this.ifTypCd) {
          this.ifTypNm = this.ccCdList.ifTypCd[i].cdNm;
        }
      }

      this.changeRoundStatus();
    },
    onChangeRoundTypCd() {
      for (let i = 0; i < this.ccCdList.roundTypCd.length; i++) {
        if (this.ccCdList.roundTypCd[i].cdDtlId === this.roundTypCd) {
          this.roundTypNm = this.ccCdList.roundTypCd[i].cdNm;
        }
      }
      this.changeSyncStatus();
    },
    onChangeSyncTypCd() {
      console.log(this.syncTypCd);
      for (let i = 0; i < this.ccCdList.syncTypCd.length; i++) {
        if (this.ccCdList.syncTypCd[i].cdDtlId === this.syncTypCd) {
          this.syncTypNm = this.ccCdList.syncTypCd[i].cdNm;
        }
      }
      console.log(this.syncTypNm);
    },
    checkDrctn() {
      if (this.drctnCd === '') {
        this.$gf.alertOn('연동 방향을 먼저 선택하세요');
      }
    },
    checkIfTyp() {
      if (this.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 먼저 선택하세요');
      }
    },
    checkRoundTyp() {
      if (this.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 먼저 선택하세요');
        return;
      }
      if (this.roundTypCd === '') {
        this.$gf.alertOn('단/양방향을 먼저 선택하세요');
      }
    },
    checkFields() {
      if (this.ifNmKor === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.ifNmEng === '') {
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
    addNewIf() {
      if (this.checkFields() === 0) {
        return;
      }

      this.eaiIfList.push({
        ifNmKor: this.ifNmKor,
        ifNmEng: this.ifNmEng,
        drctnCd: this.drctnCd,
        ifTypCd: this.ifTypCd,
        ifDesc: this.ifDesc,
        roundTypCd: this.roundTypCd,
        syncTypCd: this.syncTypCd,
        rcvOpCd: this.rcvOpCd,
        rcvTr: this.rcvTr,
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

      });

      // this.currRow = this.eaiIfList[this.eaiIfList.length - 1];

      this.emptyFields();
    },
    removeIf(eaiIf) {
      console.log('행 삭제!');

      const idx = this.eaiIfList.indexOf(eaiIf);
      this.eaiIfList.splice(idx, 1);

      this.emptyFields();
    },
    updateIf() {
      if (this.currRow.length === 0) {
        this.$gf.alertOn('인터페이스 신청 목록에서 수정할 대상을 선택하세요');
        return;
      }
      if (this.checkFields() === 0) {
        return;
      }
      this.currRow.ifNmKor = this.ifNmKor;
      this.currRow.ifNmEng = this.ifNmEng;
      this.currRow.ifDesc = this.ifDesc;
      this.currRow.drctnCd = this.drctnCd;
      this.currRow.ifTypCd = this.ifTypCd;
      this.currRow.roundTypCd = this.roundTypCd;
      this.currRow.syncTypCd = this.syncTypCd;
      this.currRow.rcvOpCd = this.rcvOpCd;
      this.currRow.rcvTr = this.rcvTr;
      this.currRow.syncTypCd = this.syncTypCd;
      this.currRow.rcvOpCd = this.rcvOpCd;
      this.currRow.rcvTr = this.rcvTr;
      this.currRow.ifTypNm = this.ifTypNm;
      this.currRow.roundTypNm = this.roundTypNm;
      this.currRow.syncTypNm = this.syncTypNm;
      this.currRow.fileIfTypCd = this.fileIfTypCd;
      this.currRow.fileIfTypNm = this.fileIfTypNm;
      this.currRow.sndDir = this.sndDir;
      this.currRow.rcvDir = this.rcvDir;
      this.currRow.rcvShNm = this.rcvShNm;
      this.currRow.fileOpCode = this.fileOpCode;
      this.currRow.sndMid = this.sndMid;
      this.currRow.sndChrgrId1 = this.sndChrgrId1;
      this.currRow.sndChrgrNm1 = this.sndChrgrNm1;
      this.currRow.sndChrgrId2 = this.sndChrgrId2;
      this.currRow.sndChrgrNm2 = this.sndChrgrNm2;
      this.currRow.sndChrgrMngrId = this.sndChrgrMngrId;
      this.currRow.sndChrgrMngrNm = this.sndChrgrMngrNm;
      this.currRow.rcvMid = this.rcvMid;
      this.currRow.rcvChrgrId1 = this.rcvChrgrId1;
      this.currRow.rcvChrgrNm1 = this.rcvChrgrNm1;
      this.currRow.rcvChrgrId2 = this.rcvChrgrId2;
      this.currRow.rcvChrgrNm2 = this.rcvChrgrNm2;
      this.currRow.rcvChrgrMngrId = this.rcvChrgrMngrId;
      this.currRow.rcvChrgrMngrNm = this.rcvChrgrMngrNm;
      this.currRow.svcImpt = this.svcImpt;

      this.emptyFields();
    },
    getDetailInfo(eaiIf) {
      this.ifNmKor = eaiIf.ifNmKor;
      this.ifNmEng = eaiIf.ifNmEng;
      this.ifDesc = eaiIf.ifDesc;
      this.drctnCd = eaiIf.drctnCd;
      this.ifTypCd = eaiIf.ifTypCd;
      this.roundTypCd = eaiIf.roundTypCd;
      this.syncTypCd = eaiIf.syncTypCd;
      this.rcvOpCd = eaiIf.rcvOpCd;
      this.rcvTr = eaiIf.rcvTr;
      this.ifTypNm = eaiIf.ifTypNm;
      this.roundTypNm = eaiIf.roundTypNm;
      this.syncTypNm = eaiIf.syncTypNm;
      this.fileIfTypCd = eaiIf.fileIfTypCd;
      this.fileIfTypNm = eaiIf.fileIfTypNm;
      this.sndDir = eaiIf.sndDir;
      this.rcvDir = eaiIf.rcvDir;
      this.rcvShNm = eaiIf.rcvShNm;
      this.fileOpCode = eaiIf.fileOpCode;
      this.sndMid = eaiIf.sndMid;
      this.sndChrgrId1 = eaiIf.sndChrgrId1;
      this.sndChrgrNm1 = eaiIf.sndChrgrNm1;
      this.sndChrgrId2 = eaiIf.sndChrgrId2;
      this.sndChrgrNm2 = eaiIf.sndChrgrNm2;
      this.sndChrgrMngrId = eaiIf.sndChrgrMngrId;
      this.sndChrgrMngrNm = eaiIf.sndChrgrMngrNm;
      this.rcvMid = eaiIf.rcvMid;
      this.rcvChrgrId1 = eaiIf.rcvChrgrId1;
      this.rcvChrgrNm1 = eaiIf.rcvChrgrNm1;
      this.rcvChrgrId2 = eaiIf.rcvChrgrId2;
      this.rcvChrgrNm2 = eaiIf.rcvChrgrNm2;
      this.rcvChrgrMngrId = eaiIf.rcvChrgrMngrId;
      this.rcvChrgrMngrNm = eaiIf.rcvChrgrMngrNm;
      this.svcImpt = eaiIf.svcImpt;

      this.currRow = eaiIf;

      this.changeRoundStatus(1);
      this.changeSyncStatus(1);
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
    emptyFields() {
      this.ifNmKor = '';
      this.ifNmEng = '';
      this.ifDesc = '';
      this.drctnCd = '';
      this.ifTypCd = '';
      this.roundTypCd = '';
      this.syncTypCd = '';
      this.rcvOpCd = '';
      this.rcvTr = '';
      this.ifTypNm = '';
      this.roundTypNm = '';
      this.syncTypNm = '';
      this.fileIfTypCd = '';
      this.fileIfTypNm = '';
      this.sndDir = '';
      this.rcvDir = '';
      this.rcvShNm = '';
      this.fileOpCode = '';
      this.sndMid = '';
      this.sndChrgrId1 = '';
      this.sndChrgrNm1 = '';
      this.sndChrgrId2 = '';
      this.sndChrgrNm2 = '';
      this.sndChrgrMngrId = '';
      this.sndChrgrMngrNm = '';
      this.rcvMid = '';
      this.rcvChrgrId1 = '';
      this.rcvChrgrNm1 = '';
      this.rcvChrgrId2 = '';
      this.rcvChrgrNm2 = '';
      this.rcvChrgrMngrId = '';
      this.rcvChrgrMngrNm = '';
      this.svcImpt = '';

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
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;

      // this.chrgrId = val.userId;
      if (this.callChrgr === 1) {
        this.sndChrgrId1 = val.userId;
        this.sndChrgrNm1 = val.hanNm;
      }
      if (this.callChrgr === 2) {
        this.sndChrgrId2 = val.userId;
        this.sndChrgrNm2 = val.hanNm;
      }
      if (this.callChrgr === 3) {
        this.sndChrgrMngrId = val.userId;
        this.sndChrgrMngrNm = val.hanNm;
      }
      if (this.callChrgr === 4) {
        this.rcvChrgrId1 = val.userId;
        this.rcvChrgrNm1 = val.hanNm;
      }
      if (this.callChrgr === 5) {
        this.rcvChrgrId2 = val.userId;
        this.rcvChrgrNm2 = val.hanNm;
      }
      if (this.callChrgr === 6) {
        this.rcvChrgrMngrId = val.userId;
        this.rcvChrgrMngrNm = val.hanNm;
      }
    },
  },
};
</script>
