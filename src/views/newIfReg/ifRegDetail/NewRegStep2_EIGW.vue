<template>
  <div>
    <InstListPopup
      v-if="svrOnInstList"
      v-bind="propsInstList"
      @closePop="turOffSvrPopInstList"
      @addData="addDataInstList"
    />
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <EigwChrgrListPopup
      v-if="svrOnEigwChrgr"
      v-bind="propsEigwChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        온라인 인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="updateOnlineInfo()"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button on"
            @click="addOnlineInfo()"
          >
            인터페이스 추가
          </button>
        </div>
      </h5>

      <!-- ONLINE -->
      <div class="table_colgroup first">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                인터페이스ID
              </li>
              <li class="th_cell">
                인터페이스명
              </li>
              <li class="th_cell">
                대외기관명
              </li>
              <li class="th_cell">
                개발REAL IP
              </li>
              <li class="th_cell">
                개발포트
              </li>
              <li class="th_cell">
                운영REAL IP
              </li>
              <li class="th_cell">
                운영포트
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in onlineList"
              :key="row.eigwReqNum"
              class="table_row w-auto"
              @click="detailOnlineInfo(index)"
            >
              <li class="td_cell">
                {{ row.eigwIfId }}
              </li>
              <li class="td_cell">
                {{ row.eigwIfNm }}
              </li>
              <li class="td_cell">
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                {{ row.devRealIp }}
              </li>
              <li class="td_cell">
                {{ row.devPort }}
              </li>
              <li class="td_cell">
                {{ row.prodRealIp }}
              </li>
              <li class="td_cell">
                {{ row.prodPort }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="delOnlineInfo(row)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- ONLINE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">I/F ID</label>
          <div class="search_group">
            <input
              v-model="onlineInfo.eigwIfId"
              type="text"
              class="add_text on"
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">I/F명</label>
          <div class="search_group">
            <input
              v-model="onlineInfo.eigwIfNm"
              type="text"
              class="add_text on"
            >
            <span class="tooltips right ov">
              <i class="tip_contn"><em class="tip_text">신규 I/F의 경우, EAI에서 등록 후 신청바랍니다.</em></i>
            </span>
          </div>
        </div>
      </div>

      <!-- ONLINE -->
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <div class="search_group">
            <input
              v-model="onlineInfo.instNm"
              type="text"
              class="add_text on"
              @click="turnOnSvrPopInstList(-1, 'on')"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">프로그램유형</label>
          <div class="select_group">
            <select v-model="onlineInfo.pgmTyp">
              <option
                value="CLIENT"
                selected
              >
                Client
              </option>
              <option value="SERVER">
                Server
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <div class="select_group">
            <select v-model="onlineInfo.linkTyp">
              <option
                value="CONN"
                selected
              >
                연결유지형
              </option>
              <option value="DISCONN">
                비연결형
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <div class="search_group">
            <input
              v-model="onlineInfo.instCd"
              type="hidden"
              class="add_text on"
            >
          </div>
        </div>
        <div class="column w-1" />
      </div>
      <!-- ONLINE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">개발 REAL IP</label>
          <input
            v-model="onlineInfo.devRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발 Port</label>
          <input
            v-model="onlineInfo.devPort"
            type="number"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label tooltips ov top">운영 REAL IP</label>
          <input
            v-model="onlineInfo.prodRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 Port</label>
          <input
            v-model="onlineInfo.prodPort"
            type="number"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">기타 요청사항</label>
          <input
            v-model="onlineInfo.eigwRmk"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <h5 class="s_tit type-2">
        담당자 정보
      </h5>
      <label class="column_label">검색이 되지 않는 신규인력은 구분에 '입력'을 선택하고 정보를 기입해주세요.</label>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto except">
            <ul>
              <li class="th_cell">
                구분
              </li>
              <li class="th_cell">
                기관
              </li>
              <li class="th_cell">
                이름
              </li>
              <li class="th_cell">
                직급
              </li>
              <li class="th_cell">
                연락처
              </li>
              <li class="th_cell">
                E-mail
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in onlineUserList"
              :key="row.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="row.chrgrTyp">
                    <option value="">
                      전체
                    </option>
                    <option value="in">
                      내부운영
                    </option>
                    <option value="out">
                      대외기관
                    </option>
                    <option value="new">
                      입력
                    </option>
                  </select>
                  <span class="select" />
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
                  @click="searchOnChrgr(i)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.hanNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="row.ofcLvlCd">
                    <option
                      v-for="(code, n) in ccCdList.ofcLvlCd"
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
                  v-model="row.mblPhonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.emailAddr"
                  type="text"
                >
              </li>
              <td class="td_cell">
                <i
                  class="ico-add"
                  @click="addOnlineUser(i)"
                />
                <i
                  class="ico-del"
                  @click="delOnlineUser(i)"
                />
              </td>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        파일 인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="updateFileInfo()"
          >
            수정
          </button>
          <button
            type="button"
            class="default_button on"
            @click="addFileInfo()"
          >
            인터페이스 추가
          </button>
        </div>
      </h5>

      <!-- FILE -->
      <div class="table_colgroup first">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                파일명
              </li>
              <li class="th_cell">
                대외기관명
              </li>
              <li class="th_cell">
                인터페이스ID
              </li>
              <li class="th_cell">
                개발REAL IP
              </li>
              <li class="th_cell">
                개발포트
              </li>
              <li class="th_cell">
                운영REAL IP
              </li>
              <li class="th_cell">
                운영포트
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in fileList"
              :key="row.eigwReqNum"
              class="table_row w-auto"
              @click="detailFileInfo(index)"
            >
              <li class="td_cell">
                {{ row.fileNm }}
              </li>
              <li class="td_cell">
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                {{ row.eigwIfId }}
              </li>
              <li class="td_cell">
                {{ row.devRealIp }}
              </li>
              <li class="td_cell">
                {{ row.devPort }}
              </li>
              <li class="td_cell">
                {{ row.prodRealIp }}
              </li>
              <li class="td_cell">
                {{ row.prodPort }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="delFileInfo(row)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- FILE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">I/F ID</label>
          <div class="search_group">
            <input
              v-model="fileInfo.eigwIfId"
              type="text"
              class="add_text on"
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">I/F명</label>
          <div class="search_group">
            <input
              v-model="fileInfo.eigwIfNm"
              type="text"
              class="add_text on"
            >
            <span class="tooltips right ov">
              <i class="tip_contn"><em class="tip_text">신규 I/F의 경우, EAI에서 등록 후 신청바랍니다.</em></i>
            </span>
          </div>
        </div>
      </div>
      <div class="row_contain type-1">
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <div class="search_group">
            <input
              v-model="fileInfo.instNm"
              type="text"
              class="add_text on"
              @click="turnOnSvrPopInstList(-2, 'file')"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">파일명</label>
          <input
            v-model="fileInfo.fileNm"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">송수신</label>
          <select v-model="fileInfo.srFlag">
            <option value="S">
              송신
            </option>
            <option value="R">
              수신
            </option>
          </select>
        </div>
        <div class="column w-1">
          <input
            v-model="fileInfo.instCd"
            type="hidden"
            class="add_text on"
          >
        </div>
      </div>
      <!-- FILE -->
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일경로</label>
          <input
            v-model="fileInfo.outPath"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">계정정보(ID/PW)</label>
          <input
            v-model="fileInfo.id"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            v-model="fileInfo.pwd"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <!-- FILE //-->
      <div class="row_contain type-1">
        <div class="column w-1">
          <label class="column_label">개발 REAL IP</label>
          <input
            v-model="fileInfo.devRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발 Port</label>
          <input
            v-model="fileInfo.devPort"
            type="number"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 REAL IP</label>
          <input
            v-model="fileInfo.prodRealIp"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영 Port</label>
          <input
            v-model="fileInfo.prodPort"
            type="number"
            class="add_text on"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-4">
          <label class="column_label">기타 요청사항</label>
          <input
            v-model="fileInfo.eigwRmk"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <h5 class="s_tit type-2">
        담당자 정보
      </h5>
      <label class="column_label">검색이 되지 않는 신규인력은 구분에 '입력'을 선택하고 정보를 기입해주세요.</label>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto except">
            <ul>
              <li class="th_cell">
                구분
              </li>
              <li class="th_cell">
                기관
              </li>
              <li class="th_cell">
                이름
              </li>
              <li class="th_cell">
                직급
              </li>
              <li class="th_cell">
                연락처
              </li>
              <li class="th_cell">
                E-mail
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in fileUserList"
              :key="row.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="row.chrgrTyp">
                    <option value="">
                      전체
                    </option>
                    <option value="in">
                      내부운영
                    </option>
                    <option value="out">
                      대외기관
                    </option>
                    <option value="new">
                      입력
                    </option>
                  </select>
                  <span class="select" />
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
                  @click="searchFileChrgr(i)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.hanNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="row.ofcLvlCd">
                    <option
                      v-for="(code, n) in ccCdList.ofcLvlCd"
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
                  v-model="row.mblPhonNum"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.emailAddr"
                  type="text"
                >
              </li>
              <td class="td_cell">
                <i
                  class="ico-add"
                  @click="addFileUser(i)"
                />
                <i
                  class="ico-del"
                  @click="delFileUser(i)"
                />
              </td>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EigwChrgrListPopup from '@/components/popup/meta/eigw/EigwChrgrListPopup.vue';
import eventBus from '@/utils/eventBus';
import { fetchEigwReqList, fetchEigwReqSave } from '@/api/eigwApi';


export default {
  name: 'RegStep2EIGW',
  components: {
    InstListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
  },
  data() {
    return {
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      svrOnChrgr: false,
      svrOnEigwChrgr: false,
      propsChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      propsEigwChrgr: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      eigwReqNum: '',
      eigwType: '',
      procSt: '',

      currRow: '',

      saveData: {},
      onlineList: [],
      fileList: [],
      onlineUserList: [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ],
      fileUserList: [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ],
      onlineInfo: {
        eigwIfId: '',
        eigwIfNm: '',
        eigwType: '',
        dablInflu: '',
        procSt: '',
        eigwRmk: '',
        instCd: '',
        pgmTyp: '',
        linkTyp: '',
        srFlag: '',
        instNm: '',
        devRealIp: '',
        devPort: '',
        prodRealIp: '',
        prodPort: '',
      },
      fileInfo: {
        eigwIfId: '',
        eigwIfNm: '',
        eigwType: '',
        dablInflu: '',
        procSt: '',
        eigwRmk: '',
        instCd: '',
        srFlag: '',
        instNm: '',
        devRealIp: '',
        devPort: '',
        prodRealIp: '',
        prodPort: '',
        fileNm: '',
        inPath: '',
        outPath: '',
        id: '',
        pwd: '',
      },
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
    ...mapState('ifRegInfo', ['reqNum']),
  },
  created() {
    if (this.$route.params.callType === 'update') {
      this.searchList(this.reqNum);
    }

    eventBus.$on('Step2EigwSave', () => {
      this.saveEigwTemp();
    });
  },
  destroyed() {
    eventBus.$off('Step2EigwSave');
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
    console.log('step2eigw mounted');
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    ...mapActions('ifRegInfo', ['setTempSaveFlag']),

    setTempSave(rtn) {
      this.setTempSaveFlag({
        step: 'STEP2EIGW', rstCd: rtn,
      });
    },

    searchList(paramReqNum) {
      fetchEigwReqList({
        params: {
          reqNum: paramReqNum,
          procSt: 1,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.fileList = res.data.rstData.fileList;
            this.onlineList = res.data.rstData.onlineList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    detailOnlineInfo(i) {
      this.currRow = i;
      this.onlineInfo.eigwIfNm = this.onlineList[i].eigwIfNm;
      this.onlineInfo.eigwIfId = this.onlineList[i].eigwIfId;
      this.onlineInfo.instNm = this.onlineList[i].instNm;
      this.onlineInfo.instCd = this.onlineList[i].instCd;
      this.onlineInfo.pgmTyp = this.onlineList[i].pgmTyp;
      this.onlineInfo.linkTyp = this.onlineList[i].linkTyp;
      this.onlineInfo.devRealIp = this.onlineList[i].devRealIp;
      this.onlineInfo.devPort = this.onlineList[i].devPort;
      this.onlineInfo.prodRealIp = this.onlineList[i].prodRealIp;
      this.onlineInfo.prodPort = this.onlineList[i].prodPort;
      this.onlineInfo.eigwRmk = this.onlineList[i].eigwRmk;
      this.onlineUserList = this.onlineList[i].onlineUserList;
    },
    updateOnlineInfo() {
      if (this.currRow === '') {
        this.$gf.alertOn('인터페이스 목록에서 수정할 대상을 선택하세요');
        return;
      }

      if (this.checkOnlineFields() === 0) {
        return;
      }

      this.onlineList[this.currRow].eigwIfNm = this.onlineInfo.eigwIfNm;
      this.onlineList[this.currRow].eigwIfId = this.onlineInfo.eigwIfId;
      this.onlineList[this.currRow].instNm = this.onlineInfo.instNm;
      this.onlineList[this.currRow].instCd = this.onlineInfo.instCd;
      this.onlineList[this.currRow].pgmTyp = this.onlineInfo.pgmTyp;
      this.onlineList[this.currRow].linkTyp = this.onlineInfo.linkTyp;
      this.onlineList[this.currRow].eigwRmk = this.onlineInfo.eigwRmk;
      this.onlineList[this.currRow].devRealIp = this.onlineInfo.devRealIp;
      this.onlineList[this.currRow].devPort = this.onlineInfo.devPort;
      this.onlineList[this.currRow].prodRealIp = this.onlineInfo.prodRealIp;
      this.onlineList[this.currRow].prodPort = this.onlineInfo.prodPort;
      this.onlineList[this.currRow].onlineUserList = this.onlineUserList;

      this.emptyOnlineIfFields();
    },
    addOnlineInfo() {
      if (this.checkOnlineFields() === 0) {
        return;
      }
      console.log(`인터페이스 추가: ${this.reqNum}`);

      this.onlineList.push({
        reqNum: this.reqNum,
        eigwIfId: this.onlineInfo.eigwIfId,
        eigwIfNm: this.onlineInfo.eigwIfNm,
        instNm: this.onlineInfo.instNm,
        instCd: this.onlineInfo.instCd,
        eigwType: 'online',
        procSt: 1,
        eigwRmk: this.onlineInfo.eigwRmk,
        pgmTyp: this.onlineInfo.pgmTyp,
        linkTyp: this.onlineInfo.linkTyp,
        devRealIp: this.onlineInfo.devRealIp,
        devPort: this.onlineInfo.devPort,
        prodRealIp: this.onlineInfo.prodRealIp,
        prodPort: this.onlineInfo.prodPort,
        onlineUserList: this.onlineUserList,
      });

      /* this.onlineSaveData = { onlineList: this.onlineList, reqNum: this.reqNum }; */
      console.log(this.saveData);

      this.emptyOnlineIfFields();
    },
    saveEigwTemp() {
      this.saveData = {
        reqNum: this.reqNum,
        onlineList: this.onlineList,
        fileList: this.fileList,
      };

      fetchEigwReqSave(this.saveData)
        .then((res) => {
          console.log(res);
          this.setTempSave('T');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
          this.setTempSave('F');
        });
    },
    addOnlineUser(i) {
      console.log('행 추가!');
      this.onlineUserList.splice(i + 1, 0, {});
    },
    delOnlineUser(i) {
      console.log('행 삭제!');
      if (this.onlineUserList.length > 1) {
        console.log('행 삭제!');
        const idx = this.onlineUserList.indexOf(i);
        this.onlineUserList.splice(idx, 1);
      } else {
        this.onlineUserList[0].chrgrTyp = '';
        this.onlineUserList[0].userId = '';
        this.onlineUserList[0].instNm = '';
        this.onlineUserList[0].instCd = '';
        this.onlineUserList[0].hanNm = '';
        this.onlineUserList[0].mblPhonNum = '';
        this.onlineUserList[0].emailAddr = '';
      }
    },
    delOnlineInfo(row) {
      console.log('행 삭제!');
      const idx = this.onlineList.indexOf(row);
      this.onlineList.splice(idx, 1);

      this.emptyOnlineIfFields();
    },
    emptyOnlineIfFields() {
      this.onlineInfo.eigwIfId = '';
      this.onlineInfo.eigwIfNm = '';
      this.onlineInfo.instNm = '';
      this.onlineInfo.instCd = '';
      this.onlineInfo.eigwRmk = '';
      this.onlineInfo.pgmTyp = '';
      this.onlineInfo.linkTyp = '';
      this.onlineInfo.devRealIp = '';
      this.onlineInfo.devPort = '';
      this.onlineInfo.prodRealIp = '';
      this.onlineInfo.prodPort = '';
      this.onlineUserList = [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ];
    },
    checkOnlineFields() {
      if (this.onlineInfo.eigwIfNm === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.onlineInfo.eigwIfId === '') {
        this.$gf.alertOn('인터페이스 영문 약자를 입력하세요');
        return 0;
      } if (this.onlineInfo.instNm === '') {
        this.$gf.alertOn('대외기관을 입력하세요');
        return 0;
      } if (this.onlineInfo.pgmTyp === '') {
        this.$gf.alertOn('프로그램 유형을 선택하세요');
        return 0;
      } if (this.onlineInfo.linkTyp === '') {
        this.$gf.alertOn('연결 유형을 선택하세요');
        return 0;
      } if (this.onlineInfo.devRealIp === '' || this.onlineInfo.devPort === '' || this.onlineInfo.prodRealIp === '' || this.onlineInfo.prodPort === '') {
        this.$gf.alertOn('서버정보를 입력하세요');
        return 0;
      }

      for (let i = 0; i < this.onlineUserList.length; i++) {
        if (this.onlineUserList[i].chrgrTyp === '' || this.onlineUserList[i].chrgrTyp === undefined) {
          this.$gf.alertOn('담당자 구분을 선택하세요');
          return 0;
        } if (this.onlineUserList[i].chrgrTyp === 'new') {
          if (this.onlineUserList[i].ofcLvlCd === '' || this.onlineUserList[i].instNm === ''
          || this.onlineUserList[i].instCd === '' || this.onlineUserList[i].hanNm === ''
          || this.onlineUserList[i].instCd === undefined
          || this.onlineUserList[i].hanNm === undefined
          || this.onlineUserList[i].ofcLvlCd === undefined
          || this.onlineUserList[i].instNm === undefined
          || this.onlineUserList[i].mblPhonNum === undefined
          || this.onlineUserList[i].emailAddr === undefined
          || this.onlineUserList[i].mblPhonNum === '' || this.onlineUserList[i].emailAddr === '') {
            this.$gf.alertOn('담당자 정보를 입력하세요');
            return 0;
          }
        } else if (this.onlineUserList[i].userId === undefined || this.onlineUserList[i].userId === '') {
          this.$gf.alertOn('담당자 정보를 입력하세요');
          return 0;
        }
      }
      return 1;
    },
    detailFileInfo(i) {
      this.currRow = i;
      this.fileInfo.eigwIfNm = this.fileList[i].eigwIfNm;
      this.fileInfo.eigwIfId = this.fileList[i].eigwIfId;
      this.fileInfo.instNm = this.fileList[i].instNm;
      this.fileInfo.instCd = this.fileList[i].instCd;
      this.fileInfo.fileNm = this.fileList[i].fileNm;
      this.fileInfo.outPath = this.fileList[i].outPath;
      this.fileInfo.id = this.fileList[i].id;
      this.fileInfo.pwd = this.fileList[i].pwd;
      this.fileInfo.srFlag = this.fileList[i].srFlag;
      this.fileInfo.devRealIp = this.fileList[i].devRealIp;
      this.fileInfo.devPort = this.fileList[i].devPort;
      this.fileInfo.prodRealIp = this.fileList[i].prodRealIp;
      this.fileInfo.prodPort = this.fileList[i].prodPort;
      this.fileInfo.eigwRmk = this.fileList[i].eigwRmk;
      this.fileUserList = this.fileList[i].fileUserList;
    },
    updateFileInfo() {
      if (this.currRow === '') {
        this.$gf.alertOn('인터페이스 목록에서 수정할 대상을 선택하세요');
        return;
      }

      if (this.checkFileFields() === 0) {
        return;
      }

      this.fileList[this.currRow].eigwIfNm = this.fileInfo.eigwIfNm;
      this.fileList[this.currRow].eigwIfId = this.fileInfo.eigwIfId;
      this.fileList[this.currRow].instNm = this.fileInfo.instNm;
      this.fileList[this.currRow].instCd = this.fileInfo.instCd;
      this.fileList[this.currRow].fileNm = this.fileInfo.fileNm;
      this.fileList[this.currRow].outPath = this.fileInfo.outPath;
      this.fileList[this.currRow].id = this.fileInfo.id;
      this.fileList[this.currRow].pwd = this.fileInfo.pwd;
      this.fileList[this.currRow].srFlag = this.fileInfo.srFlag;
      this.fileList[this.currRow].eigwRmk = this.fileInfo.eigwRmk;
      this.fileList[this.currRow].devRealIp = this.fileInfo.devRealIp;
      this.fileList[this.currRow].devPort = this.fileInfo.devPort;
      this.fileList[this.currRow].prodRealIp = this.fileInfo.prodRealIp;
      this.fileList[this.currRow].prodPort = this.fileInfo.prodPort;
      this.fileList[this.currRow].fileUserList = this.fileUserList;

      this.emptyFileIfFields();
    },
    addFileInfo() {
      if (this.checkFileFields() === 0) {
        return;
      }

      this.fileList.push({
        reqNum: this.reqNum,
        eigwIfId: this.fileInfo.eigwIfId,
        eigwIfNm: this.fileInfo.eigwIfNm,
        instNm: this.fileInfo.instNm,
        instCd: this.fileInfo.instCd,
        fileNm: this.fileInfo.fileNm,
        eigwType: 'file',
        procSt: 1,
        srFlag: this.fileInfo.srFlag,
        eigwRmk: this.fileInfo.eigwRmk,
        outPath: this.fileInfo.outPath,
        devRealIp: this.fileInfo.devRealIp,
        devPort: this.fileInfo.devPort,
        prodRealIp: this.fileInfo.prodRealIp,
        prodPort: this.fileInfo.prodPort,
        fileUserList: this.fileUserList,
      });
      this.emptyFileIfFields();
    },
    addFileUser(i) {
      console.log('행 추가!');
      this.fileUserList.splice(i + 1, 0, {});
    },
    delFileUser(i) {
      console.log('행 삭제!');
      if (this.fileUserList.length > 1) {
        console.log('행 삭제!');
        const idx = this.fileUserList.indexOf(i);
        this.fileUserList.splice(idx, 1);
      } else {
        this.fileUserList[0].chrgrTyp = '';
        this.fileUserList[0].instNm = '';
        this.fileUserList[0].instCd = '';
        this.fileUserList[0].hanNm = '';
        this.fileUserList[0].mblPhonNum = '';
        this.fileUserList[0].emailAddr = '';
      }
    },
    delFileInfo(row) {
      console.log('행 삭제!');

      const idx = this.fileList.indexOf(row);
      this.fileList.splice(idx, 1);
      this.emptyFileIfFields();
    },
    emptyFileIfFields() {
      this.fileInfo.eigwIfId = '';
      this.fileInfo.eigwIfNm = '';
      this.fileInfo.instNm = '';
      this.fileInfo.instCd = '';
      this.fileInfo.fileNm = '';
      this.fileInfo.srFlag = '';
      this.fileInfo.outPath = '';
      this.fileInfo.devRealIp = '';
      this.fileInfo.devPort = '';
      this.fileInfo.prodRealIp = '';
      this.fileInfo.prodPort = '';
      this.fileInfo.eigwRmk = '';
      this.fileInfo.id = '';
      this.fileInfo.pwd = '';
      this.fileUserList = [
        {
          chrgrTyp: '',
          userId: '',
          instNm: '',
          instCd: '',
          hanNm: '',
          ofcLvlCd: '',
          mblPhonNum: '',
          emailAddr: '',
        },
      ];
    },
    checkFileFields() {
      if (this.fileInfo.eigwIfNm === '') {
        this.$gf.alertOn('인터페이스명을 입력하세요');
        return 0;
      } if (this.fileInfo.eigwIfId === '') {
        this.$gf.alertOn('인터페이스 영문 약자를 입력하세요');
        return 0;
      } if (this.fileInfo.instNm === '') {
        this.$gf.alertOn('대외기관을 입력하세요');
        return 0;
      } if (this.fileInfo.fileNm === '') {
        this.$gf.alertOn('파일명을 입력하세요');
        return 0;
      } if (this.fileInfo.srFlag === '') {
        this.$gf.alertOn('송수신 유형을 선택하세요');
        return 0;
      } if (this.fileInfo.devRealIp === '' || this.fileInfo.devPort === '' || this.fileInfo.prodRealIp === '' || this.fileInfo.prodPort === '') {
        this.$gf.alertOn('서버정보를 입력하세요');
        return 0;
      }

      for (let i = 0; i < this.fileUserList.length; i++) {
        if (this.fileUserList[i].chrgrTyp === '' || this.fileUserList[i].chrgrTyp === undefined) {
          this.$gf.alertOn('담당자 구분을 선택하세요');
          return 0;
        } if (this.fileUserList[i].chrgrTyp === 'new') {
          if (this.fileUserList[i].ofcLvlCd === '' || this.fileUserList[i].instNm === ''
          || this.fileUserList[i].instCd === '' || this.fileUserList[i].hanNm === ''
          || this.fileUserList[i].instCd === undefined
          || this.fileUserList[i].hanNm === undefined
          || this.fileUserList[i].ofcLvlCd === undefined
          || this.fileUserList[i].instNm === undefined
          || this.fileUserList[i].mblPhonNum === undefined
          || this.fileUserList[i].emailAddr === undefined
          || this.fileUserList[i].mblPhonNum === '' || this.fileUserList[i].emailAddr === '') {
            this.$gf.alertOn('담당자 정보를 입력하세요');
            return 0;
          }
        } else if (this.fileUserList[i].userId === undefined || this.fileUserList[i].userId === '') {
          this.$gf.alertOn('담당자 정보를 입력하세요');
          return 0;
        }
      }
      return 1;
    },
    searchOnChrgr(row) {
      this.row = row;
      if (this.onlineUserList[row].chrgrTyp === '' || this.onlineUserList[row].chrgrTyp === undefined) {
        this.$gf.alertOn('구분을 선택하세요');
        return;
      }
      console.log('담당자 추가!');
      this.addOnlineChrgrRow(row);
    },
    addOnlineChrgrRow(row) {
      this.type = 'on';
      console.log('행 추가!');
      if (this.onlineUserList[row].chrgrTyp === 'in') {
        this.svrOnChrgr = true;
      } else if (this.onlineUserList[row].chrgrTyp === 'out') {
        this.svrOnEigwChrgr = true;
      } else {
        this.turnOnSvrPopInstList(row, 'on');
      }
    },
    searchFileChrgr(row) {
      this.row = row;
      if (this.fileUserList[row].chrgrTyp === '' || this.fileUserList[row].chrgrTyp === undefined) {
        this.$gf.alertOn('구분을 선택하세요');
        return;
      }
      console.log('담당자 추가!');
      this.addFileChrgrRow(row);
    },
    addFileChrgrRow(row) {
      this.type = 'file';
      console.log('행 추가!');
      if (this.fileUserList[row].chrgrTyp === 'in') {
        this.svrOnChrgr = true;
      } else if (this.fileUserList[row].chrgrTyp === 'out') {
        this.svrOnEigwChrgr = true;
      } else {
        this.turnOnSvrPopInstList(row, 'file');
      }
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.type === 'on') {
        this.onlineUserList[this.row].hanNm = val.hanNm;
        this.onlineUserList[this.row].userId = val.userId;
        this.onlineUserList[this.row].instCd = val.instCd;
        this.onlineUserList[this.row].instNm = val.instNm;
        this.onlineUserList[this.row].ofcLvlCd = val.ofcLvlCd;
        this.onlineUserList[this.row].ofcLvlNm = val.ofcLvlNm;
        this.onlineUserList[this.row].mblPhonNum = val.mblPhonNum;
        this.onlineUserList[this.row].emailAddr = val.emailAddr;
      } else {
        this.fileUserList[this.row].hanNm = val.hanNm;
        this.fileUserList[this.row].userId = val.userId;
        this.fileUserList[this.row].instCd = val.instCd;
        this.fileUserList[this.row].instNm = val.instNm;
        this.fileUserList[this.row].ofcLvlCd = val.ofcLvlCd;
        this.fileUserList[this.row].ofcLvlNm = val.ofcLvlNm;
        this.fileUserList[this.row].mblPhonNum = val.mblPhonNum;
        this.fileUserList[this.row].emailAddr = val.emailAddr;
      }
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    turnOnSvrPopInstList(val, type) {
      this.instPopupCase = val;
      this.typeCase = type;
      this.svrOnInstList = true;
    },
    turOffSvrPopInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnInstList = false;
    },
    addDataInstList(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      if (this.typeCase === 'on') {
        if (this.instPopupCase === -1) {
          this.onlineInfo.instCd = val.instCd;
          this.onlineInfo.instNm = val.instNm;
        } else {
          this.onlineUserList[this.instPopupCase].instCd = val.instCd;
          this.onlineUserList[this.instPopupCase].instNm = val.instNm;
        }
      }
      if (this.typeCase === 'file') {
        if (this.instPopupCase === -2) {
          this.fileInfo.instCd = val.instCd;
          this.fileInfo.instNm = val.instNm;
        } else {
          this.fileUserList[this.instPopupCase].instCd = val.instCd;
          this.fileUserList[this.instPopupCase].instNm = val.instNm;
        }
      }
      this.svrOnInstList = false;
    },
  },
};
</script>
