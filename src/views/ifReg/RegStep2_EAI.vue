<template>
  <div>
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
                IP (VIP)
              </li>
              <li class="th_cell">
                IP (NAT)
              </li>
              <li class="th_cell">
                IP (추가)
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
                  v-model="sndRow.os"
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
                IP (VIP)
              </li>
              <li class="th_cell">
                IP (NAT)
              </li>
              <li class="th_cell">
                IP (추가)
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
                  v-model="rcvRow.os"
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
        기본정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button extend on"
          >
            인터페이스 추가
          </button>
        </div>
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">인터페이스명</label>
          <input
            v-model="ifNmHan"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">인터페이스명 (영문 약자)</label>
          <input
            v-model="ifNmEng"
            type="text"
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
        <div class="column w-2">
          <label class="column_label">인터페이스 방식</label>
          <div class="select_group">
            <select
              v-model="ifTypCd"
              @change="setOtherField()"
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
        <div class="column w-2">
          <label class="column_label">방향</label>
          <div class="select_group">
            <select
              ref="selectDrctn"
              v-model="drctnTypCd"
              @click="checkIfTyp()"
              @change="setSync()"
            >
              <option
                v-for="(code, i) in ccCdList.drctnTypCd"
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
          <label class="column_label">Async/Sync</label>
          <div class="select_group">
            <select
              ref="selectSync"
              v-model="syncTypCd"
              @click="checkDrctnTyp()"
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
        <div class="column w-2">
          <label class="column_label">수신 전문 처리 방식</label>
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
        <div class="column w-3">
          <label class="column_label">수신TR (SWING만 해당)</label>
          <input
            ref="rcvTrInput"
            v-model="rcvTr"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일 전송 유형</label>
          <div class="select_group">
            <select v-model="fileIfTypCd">
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
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">수신 디렉토리</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">송신 큐매니저</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">수신 큐매니저</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">담당자</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SKT
              </option>
              <option value="">
                SKB
              </option>
              <option value="">
                SKP
              </option>
              <option value="">
                SKTX
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">수신 호출 쉘</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OP code</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-3" />
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">장애 시 영향도(상세)</label>
          <textarea
            cols="50"
            row="5"
            placeholder="이러한 영향도 입니다."
          />
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        시스템 정보
        <section class="right_button_area">
          <button
            type="button"
            class="default_button"
          >
            삭제
          </button>
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
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">시스템명</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                운영
              </option>
              <option value="">
                개발
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">SWING</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SWING
              </option>
              <option value="">
                Non-SWING
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">구분</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                송신
              </option>
              <option value="">
                수신
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">연동방식</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                OS
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain">
        <div class="column on w-3">
          <label class="column_label">시스템명</label>
          <input
            type="text"
            value="시스템명시스템명시스템명"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">&nbsp;</label>
          <input
            type="text"
            value="Interface1Interface1Interface1Interface1Interface1"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">MID</label>
          <div class="search_group">
            <input
              type="text"
              value="MID"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">운영 담당</label>
          <div class="search_group">
            <input
              type="text"
              value="유영준"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">담당 매니저</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">회사</label>
          <div class="select_group disabled">
            <select disabled>
              <option
                value=""
                selected
              >
                SK Telesys
              </option>
              <option value="">
                SK C&amp;C
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">호스트명</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(RIP)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(VIP)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP(NAT)</label>
          <input
            type="text"
            value="10.10.4.10"
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  name: 'RegStep2EAI',
  data() {
    return {
      svrTypCd: '',
      ifTypCd: '',
      drctnTypCd: '',
      syncTypCd: '',
      rcvOpCd: '',
      fileIfTypCd: '',
      sysTypCd: '',
      ifNmEng: '',
      ifNmHan: '',
      ifDesc: '',
      rcvTr: '',
      sysNm: '',
      hostNm: '',
      vIp: '',
      natIp: '',
      addIp: '',
      os: '',
      company: '',
      sndRows: [
        {
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          addIp: '',
          os: '',
          company: '',
        },
      ],
      rcvRows: [
        {
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          addIp: '',
          os: '',
          company: '',
        },
      ],
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'SVR_TYP_CD', allYn: 'N', listNm: 'svrTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'IF_TYP_CD', allYn: 'N', listNm: 'ifTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'DRCTN_CD', allYn: 'N', listNm: 'drctnTypCd',
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
    resetField() {
    },
    setOtherField() {
      if (this.ifTypCd === '1') {
        this.drctnTypCd = '';
        this.$refs.selectDrctn.disabled = false;
        this.syncTypCd = '';
        this.$refs.selectSync.disabled = false;
        this.rcvTr = '';
        this.$refs.rcvTrInput.disabled = false;
      } if (this.ifTypCd === '2') {
        this.drctnTypCd = '';
        this.$refs.selectDrctn.disabled = true;
        this.syncTypCd = '';
        this.$refs.selectSync.disabled = true;
        this.rcvTr = '';
        this.$refs.rcvTrInput.disabled = true;
      }
    },
    setSync() {
      if (this.drctnTypCd === '1') {
        this.syncTypCd = '';
        this.$refs.selectSync.disabled = true;
      } if (this.drctnTypCd === '2') {
        this.syncTypCd = '';
        this.$refs.selectSync.disabled = false;
      }
    },
    checkIfTyp() {
      if (this.ifTypCd === '') {
        this.$gf.alertOn('인터페이스 방식을 먼저 선택하세요');
      }
    },
    checkDrctnTyp() {
      if (this.ifTypCd === '') {
        this.$gf.alertOn('인터페이스 방식을 먼저 선택하세요');
        return;
      }
      if (this.drctnTypCd === '') {
        this.$gf.alertOn('방향을 먼저 선택하세요');
      }
    },
  },
};
</script>
