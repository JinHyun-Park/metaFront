<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />EAI 인터페이스 등록</h2>
      </section>
      <section
        class="form_area border_group"
      >
        <h5 class="s_tit type-2">
          기본 정보
        </h5>
        <div class="row_contain">
          <div class="column w-2">
            <label class="column_label"> EAI 인터페이스ID</label>
            <input
              v-model="eaiIfDetail.eaiIfId"
              type="text"
              oninput="this.value = this.value.toUpperCase()"
              placeholder="신청 승인 후 발급되며 별도로 희망하는 ID가 있는 경우만 기입 바랍니다."
            >
          </div>
          <div class="column w-2">
            <label class="column_label">인터페이스명</label>
            <input
              v-model="eaiIfDetail.eaiIfNmKor"
              type="text"
              maxlength="80"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">인터페이스명 (영문 약자)</label>
            <input
              v-model="eaiIfDetail.eaiIfNmEng"
              type="text"
              maxlength="25"
              oninput="this.value = this.value.toUpperCase()"
              placeholder="CUST_ADDR_INFO  (예시)"
            >
          </div>
          <div class="column w-3">
            <label class="column_label">연동 목적</label>
            <input
              v-model="eaiIfDetail.ifDesc"
              type="text"
            >
          </div>
        </div>
        <div class="row_contain">
          <div class="column w-1">
            <label class="column_label">연동 방향</label>
            <div class="select_group">
              <select
                v-model="eaiIfDetail.drctnCd"
                @change="onChangeDrctnCd()"
              >
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
                v-model="eaiIfDetail.ifTypCd"
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
                v-model="eaiIfDetail.roundTypCd"
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
                v-model="eaiIfDetail.syncTypCd"
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
              <select v-model="eaiIfDetail.rcvOpCd">
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
              v-model="eaiIfDetail.rcvTr"
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
                v-model="eaiIfDetail.fileIfTypCd"
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
              v-model="eaiIfDetail.sndDir"
              type="text"
            >
          </div>
          <div class="column w-3">
            <label class="column_label">수신 디렉토리</label>
            <input
              ref="rcvDirInput"
              v-model="eaiIfDetail.rcvDir"
              type="text"
            >
          </div>
          <div class="column w-4">
            <label class="column_label">수신 실행 Shell</label>
            <input
              ref="rcvShNmInput"
              v-model="eaiIfDetail.rcvShNm"
              type="text"
              placeholder="파일 수신 후 자동 실행이 필요한 Shell 기입(경로 포함)"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">OP code</label>
            <input
              ref="fileOpCodeInput"
              v-model="eaiIfDetail.fileOpCode"
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
          <div class="column w-2">
            <label class="column_label">MID</label>
            <input
              v-model="eaiIfDetail.sndMid"
              type="text"
              placeholder="MID 없는 경우 시스템명 약자 입력"
              oninput="this.value = this.value.toUpperCase()"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">운영 담당자1</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrNm1"
                type="text"
                @click="turnOnSvrPopChrgr(1)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(1)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrOrgNm1"
                type="text"
                readonly
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">운영 담당자2</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrNm2"
                type="text"
                @click="turnOnSvrPopChrgr(2)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(2)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrOrgNm2"
                type="text"
                readonly
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">업무 담당 매니저</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrMngrNm"
                type="text"
                @click="turnOnSvrPopChrgr(3)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(3)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.sndChrgrMngrOrgNm"
                type="text"
                readonly
              >
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
              v-model="eaiIfDetail.rcvMid"
              type="text"
              placeholder="MID 없는 경우 시스템명 약자 입력"
              oninput="this.value = this.value.toUpperCase()"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">운영 담당자1</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrNm1"
                type="text"
                @click="turnOnSvrPopChrgr(4)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(4)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrOrgNm1"
                type="text"
                readonly
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">운영 담당자2</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrNm2"
                type="text"
                @click="turnOnSvrPopChrgr(5)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(5)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrOrgNm2"
                type="text"
                readonly
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">업무 담당 매니저</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrMngrNm"
                type="text"
                @click="turnOnSvrPopChrgr(6)"
              >
              <span class="search">
                <i
                  class="ico-search"
                  @click="turnOnSvrPopChrgr(6)"
                />
              </span>
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">소속</label>
            <div class="search_group">
              <input
                v-model="eaiIfDetail.rcvChrgrMngrOrgNm"
                type="text"
                readonly
              >
            </div>
          </div>
        </div>
        <div class="row_contain">
          <div class="column w-4">
            <label class="column_label">장애 영향도</label>
            <textarea
              v-model="eaiIfDetail.svcImpt"
              cols="20"
              rows="3"
              placeholder="연동 장애가 발생하였을 경우 서비스 영향도에 대해 최대한 상세하게 기술 바랍니다."
            />
          </div>
          <div class="column w-4">
            <label class="column_label">기타 요청사항</label>
            <textarea
              v-model="eaiIfDetail.eaiRmk"
              cols="20"
              rows="3"
            />
          </div>
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
          저장
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EaiIfDetailPopup',
  props: {
    eaiIfDetailProp: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      svrTypCd: '',
      ifTypCd: '',
      drctnCd: '',
      roundTypCd: '',
      syncTypCd: '',
      rcvOpCd: '',
      fileIfTypCd: '',
      sysTypCd: '',

      eaiIfDetail:
        {
          eaiIfId: '',
          eaiIfNmKor: '',
          eaiIfNmEng: '',
          ifDesc: '',
          drctnCd: '',
          ifTypCd: '',
          roundTypCd: '',
          syncTypCd: '',
          rcvOpCd: '',
          fileIfTypCd: '',
          sndDir: '',
          rcvDir: '',
          rcvShNm: '',
          fileOpCode: '',
          sndMid: '',
          sndChrgrNm1: '',
          sndChrgrOrgNm1: '',
          sndChrgrNm2: '',
          sndChrgrOrgNm2: '',
          sndChrgrMngrNm: '',
          sndChrgrMngrOrgNm: '',
          rcvMid: '',
          rcvChrgrNm1: '',
          rcvChrgrOrgNm1: '',
          rcvChrgrNm2: '',
          rcvChrgrOrgNm2: '',
          rcvChrgrMngrNm: '',
          rcvChrgrMngrOrgNm: '',
          svcImpt: '',
          eaiRmk: '',
        },


      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.eaiIfDetail = this.eaiIfDetailProp.eaiIfDetailProp;
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
    this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    onChangeDrctnCd() {
      for (let i = 0; i < this.ccCdList.drctnCd.length; i++) {
        if (this.ccCdList.drctnCd[i].cdDtlId === this.drctnCd) {
          this.drctnNm = this.ccCdList.drctnCd[i].cdNm;
        }
      }
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
      if (this.eaiIfDetail.eaiIfNmKor === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.eaiIfDetail.eaiIfNmEng === '') {
        this.$gf.alertOn('인터페이스 영문 약자를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.drctnCd === '') {
        this.$gf.alertOn('연동 방향을 선택하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 선택하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '1' && this.eaiIfDetail.roundTypCd === '') {
        this.$gf.alertOn('단/양방향을 선택하세요');
        return 0;
      } if (this.eaiIfDetail.roundTypCd === '2' && this.eaiIfDetail.syncTypCd === '') {
        this.$gf.alertOn('요청 처리 방식을 선택하세요');
        return 0;
      } if (this.eaiIfDetail.rcvOpCd === '') {
        this.$gf.alertOn('수신 전문 처리 주기를 선택하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '2' && this.eaiIfDetail.fileIfTypCd === '') {
        this.$gf.alertOn('파일 연동 방식을 선택하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '2' && this.eaiIfDetail.sndDir === '') {
        this.$gf.alertOn('송신 디렉토리를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '2' && this.eaiIfDetail.rcvDir === '') {
        this.$gf.alertOn('수신 디렉토리를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.ifTypCd === '2' && this.eaiIfDetail.rcvShNm !== '' && this.eaiIfDetail.fileOpCode === '') {
        this.$gf.alertOn('Shell을 매핑할 OP code를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.sndMid === '') {
        this.$gf.alertOn('송신 업무의 MID를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.sndChrgrId1 === '') {
        this.$gf.alertOn('송신 업무 운영 담당자1을 입력하세요');
        return 0;
      } if (this.eaiIfDetail.sndChrgrMngrId === '') {
        this.$gf.alertOn('송신 업무 담당 매니저를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.rcvMid === '') {
        this.$gf.alertOn('수신 업무의 MID를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.rcvChrgrId1 === '') {
        this.$gf.alertOn('수신 업무 운영 담당자1을 입력하세요');
        return 0;
      } if (this.eaiIfDetail.rcvChrgrMngrId === '') {
        this.$gf.alertOn('수신 업무 담당 매니저를 입력하세요');
        return 0;
      } if (this.eaiIfDetail.svcImpt === '') {
        this.$gf.alertOn('장애 시 서비스 영향도를 상세히 입력하세요');
        return 0;
      }

      return 1;
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkFields() === 0) {
        return;
      }
      this.$emit('addData', this.eaiIfDetail);
    },
  },
};
</script>
