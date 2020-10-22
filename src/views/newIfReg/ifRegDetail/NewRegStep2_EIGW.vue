<template>
  <div>
    <EigwOnlineDetailPopup
      v-if="showOnlineDetail"
      :prop-data="propsOnline"
      @closePop="turOffSvrPopOnline"
      @addData="addDataOnline"
    />
    <EigwFileDetailPopup
      v-if="showFileDetail"
      :prop-data="propsFile"
      @closePop="turOffSvrPopFile"
      @addData="addDataFile"
    />

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        온라인 인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="turOnSvrPopOnline()"
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
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        파일 인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="turOnSvrPopFile()"
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
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EigwOnlineDetailPopup from '@/components/popup/meta/eigw/EigwOnlineDetailPopup.vue';
import EigwFileDetailPopup from '@/components/popup/meta/eigw/EigwFileDetailPopup.vue';
import eventBus from '@/utils/eventBus';
import { fetchEigwReqList, fetchEigwReqSave } from '@/api/eigwApi';


export default {
  name: 'RegStep2EIGW',
  components: {
    EigwOnlineDetailPopup,
    EigwFileDetailPopup,
  },
  data() {
    return {
      showOnlineDetail: false,
      propsOnline: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      showFileDetail: false,
      propsFile: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      popupType: '',

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
      if (this.$route.params.ifKind === 'EIGW') {
        this.searchList(this.reqNum);
      }
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
      this.onlineInfo.onlineUserList = this.onlineList[i].onlineUserList;

      this.propsOnline = this.onlineInfo;
      this.popupType = 'update';
      this.showOnlineDetail = true;
    },
    updateOnlineInfo(val) {
      if (this.currRow === '') {
        this.$gf.alertOn('인터페이스 목록에서 수정할 대상을 선택하세요');
        return;
      }

      // if (this.checkOnlineFields() === 0) {
      //   return;
      // }

      this.onlineList[this.currRow].eigwIfNm = val.eigwIfNm;
      this.onlineList[this.currRow].eigwIfId = val.eigwIfId;
      this.onlineList[this.currRow].instNm = val.instNm;
      this.onlineList[this.currRow].instCd = val.instCd;
      this.onlineList[this.currRow].pgmTyp = val.pgmTyp;
      this.onlineList[this.currRow].linkTyp = val.linkTyp;
      this.onlineList[this.currRow].eigwRmk = val.eigwRmk;
      this.onlineList[this.currRow].devRealIp = val.devRealIp;
      this.onlineList[this.currRow].devPort = val.devPort;
      this.onlineList[this.currRow].prodRealIp = val.prodRealIp;
      this.onlineList[this.currRow].prodPort = val.prodPort;
      this.onlineList[this.currRow].onlineUserList = val.onlineUserList;

      // this.emptyOnlineIfFields();
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
          this.$gf.alertOn('저장되었습니다.');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
          this.setTempSave('F');
          this.$gf.alertOn('실패하였습니다.');
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
      this.onlineInfo.onlineUserList = [
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
      this.fileInfo.fileUserList = this.fileList[i].fileUserList;

      this.propsFile = this.fileInfo;
      this.popupType = 'update';
      this.showFileDetail = true;
    },
    updateFileInfo(val) {
      if (this.currRow === '') {
        this.$gf.alertOn('인터페이스 목록에서 수정할 대상을 선택하세요');
        return;
      }
      this.fileList[this.currRow].eigwIfNm = val.eigwIfNm;
      this.fileList[this.currRow].eigwIfId = val.eigwIfId;
      this.fileList[this.currRow].instNm = val.instNm;
      this.fileList[this.currRow].instCd = val.instCd;
      this.fileList[this.currRow].fileNm = val.fileNm;
      this.fileList[this.currRow].outPath = val.outPath;
      this.fileList[this.currRow].id = val.id;
      this.fileList[this.currRow].pwd = val.pwd;
      this.fileList[this.currRow].srFlag = val.srFlag;
      this.fileList[this.currRow].eigwRmk = val.eigwRmk;
      this.fileList[this.currRow].devRealIp = val.devRealIp;
      this.fileList[this.currRow].devPort = val.devPort;
      this.fileList[this.currRow].prodRealIp = val.prodRealIp;
      this.fileList[this.currRow].prodPort = val.prodPort;
      this.fileList[this.currRow].fileUserList = val.fileUserList;

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
      this.fileInfo.fileUserList = [
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
    turOnSvrPopOnline() {
      this.popupType = 'new';
      this.emptyOnlineIfFields();
      this.propsOnline = this.onlineInfo;
      this.showOnlineDetail = true;
    },
    turOffSvrPopOnline(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showOnlineDetail = false;
    },
    addDataOnline(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      val.reqNum = this.reqNum;
      if (this.popupType === 'update') {
        this.updateOnlineInfo(val);
      } else {
        this.onlineList.push(val);
      }
      // this.onlineInfo = val;
      // this.addOnlineInfo();
      this.showOnlineDetail = false;
    },
    turOnSvrPopFile() {
      this.popupType = 'new';
      this.emptyFileIfFields();
      this.propsFile = this.fileInfo;
      this.showFileDetail = true;
    },
    turOffSvrPopFile(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.showFileDetail = false;
    },
    addDataFile(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      val.reqNum = this.reqNum;
      if (this.popupType === 'update') {
        this.updateFileInfo(val);
      } else {
        this.fileList.push(val);
      }

      // this.onlineInfo = val;
      // this.addOnlineInfo();
      this.showFileDetail = false;
    },
  },
};
</script>
