<template>
  <div class="contents popup">
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
    <i class="dim" />
    <article
      ref="queueListPop"
      class="layer_popup"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <!--<section class="title style-2">
        <h2><i class="ico-bar" />EAI 인터페이스 등록</h2>
      </section>-->
      <section
        class="form_area border_group"
      >
        <h5 class="s_tit type-2">
          기본 정보
        </h5>

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
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import EigwChrgrListPopup from '@/components/popup/meta/eigw/EigwChrgrListPopup.vue';

export default {
  name: 'EigwOnlineDetailPopup',
  components: {
    InstListPopup,
    ChrgrListPopup,
    EigwChrgrListPopup,
  },
  props: {
    propData: {
      type: Object,
      default: null,
    },
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

      fileInfo: {
        eigwIfId: '',
        eigwIfNm: '',
        eigwType: 'file',
        dablInflu: '',
        procSt: 1,
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

      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
    this.fileInfo = this.propData;
    this.fileUserList = this.propData.fileUserList;
    // this.$refs.queueListPop.focus(); // keyup 이벤트가 바로 적용될 수 있도록 focusing
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      if (this.checkFileFields() === 0) {
        return;
      }
      this.fileInfo.fileUserList = this.fileUserList;
      this.$emit('addData', this.fileInfo);
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

      if (this.fileUserList == null) {
        this.$gf.alertOn('담당자 정보를 입력하세요');
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
      if (this.instPopupCase === -2) {
        this.fileInfo.instCd = val.instCd;
        this.fileInfo.instNm = val.instNm;
      } else {
        this.fileUserList[this.instPopupCase].instCd = val.instCd;
        this.fileUserList[this.instPopupCase].instNm = val.instNm;
      }
      this.svrOnInstList = false;
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

      this.fileUserList[this.row].hanNm = val.hanNm;
      this.fileUserList[this.row].userId = val.userId;
      this.fileUserList[this.row].instCd = val.instCd;
      this.fileUserList[this.row].instNm = val.instNm;
      this.fileUserList[this.row].ofcLvlCd = val.ofcLvlCd;
      this.fileUserList[this.row].ofcLvlNm = val.ofcLvlNm;
      this.fileUserList[this.row].mblPhonNum = val.mblPhonNum;
      this.fileUserList[this.row].emailAddr = val.emailAddr;

      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
      this.svrOnEigwChrgr = false;
    },
  },
};
</script>
