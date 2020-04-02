<template>
  <div>
    <InstListPopup
      v-if="svrOnInstList"
      v-bind="propsInstList"
      @closePop="turOffSvrPopInstList"
      @addData="addDataInstList"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 업무 요청서
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        온라인 인터페이스 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="addOnlineInfo()"
          >
            인터페이스 추가
          </button>
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
            @click="saveTest()"
          >
            임시저장 Test
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
                프로그램유형
              </li>
              <li class="th_cell">
                연결유형
              </li>
              <li class="th_cell">
                Test
              </li>
              <li class="th_cell">
                진행상태
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
                <input
                  v-model="row.eigwIfId"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.eigwIfNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.devRealIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.devPort"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.prodRealIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="row.prodPort"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <select v-model="row.pgmTyp">
                  <option
                    value="CLIENT"
                  >
                    Client
                  </option>
                  <option
                    value="SERVER"
                  >
                    Server
                  </option>
                </select>
              </li>
              <li class="td_cell">
                <select v-model="row.linkTyp">
                  <option
                    value="CONNECT"
                  >
                    연결유지형
                  </option>
                  <option
                    value="DISCONNECT"
                  >
                    비연결형
                  </option>
                </select>
              </li>
              <li class="td_cell">
                <input
                  v-model="row.outUserInfo"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <label class="label-default color-black">반려</label>
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- ONLINE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">I/F ID(명)</label>
          <div class="search_group">
            <input
              v-model="onlineInfo.eigwIfId"
              type="text"
              class="add_text on"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
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
                value="CONNECT"
                selected
              >
                연결유지형
              </option>
              <option value="DISCONNECT">
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
            type="text"
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
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-1" />
      </div>
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="addOnlineChrgrRow()"
          >
            추가
          </button>
        </div>
      </h5>
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
              v-for="(row, i) in userList"
              :key="row.userId"
              class="table_row form_type except w-auto"
            >
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="row.chrgrType">
                    <option value="in">
                      내부운영
                    </option>
                    <option value="out">
                      대외기관
                    </option>
                  </select>
                  <span class="select" />
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
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
                  class="ico-del"
                  @click="delOutList(i)"
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
                송수신
              </li>
              <li class="th_cell">
                진행상태
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
                {{ row.srFlag }}
              </li>
              <li class="td_cell">
                <label class="label-default color-black">반려</label>
              </li>
              <li class="td_cell">
                <i class="ico-del" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- FILE //-->

      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">I/F ID(명)</label>
          <div class="search_group">
            <input
              v-model="fileInfo.eigwIfId"
              type="text"
              class="add_text on"
            >
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
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
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <div class="search_group">
            <input
              v-model="fileInfo.instNm"
              type="text"
              class="add_text on"
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
        <div class="column w-3">
          <label class="column_label">파일경로</label>
          <input
            v-model="fileInfo.outPath"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">계정정보(ID/PW)</label>
          <input
            v-model="fileInfo.id"
            type="text"
            class="add_text on"
          >
        </div>
        <div class="column w-3">
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
      <div class="row_contain type-2">
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
            type="text"
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
            type="text"
            class="add_text on"
          >
        </div>
      </div>
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
          >
            내부운영 추가
          </button>
          <button
            type="button"
            class="default_button on"
          >
            대외기관 추가
          </button>
        </div>
      </h5>
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
                  <select v-model="row.chrgrType">
                    <option value="in">
                      내부운영
                    </option>
                    <option value="out">
                      대외기관
                    </option>
                  </select>
                  <span class="select" />
                </div>
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
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
                  class="ico-del"
                  @click="delOutList(i)"
                />
              </td>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="form_area border_group style-1">
      <h5 class="s_tit">
        비고
      </h5>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">추가요청사항</label>
          <textarea
            v-model="eigwRmk"
            cols="50"
            row="5"
            placeholder="위의 항목 외 추가 요청사항을 적어주시기바랍니다."
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InstListPopup from '@/components/popup/bizcomm/InstListPopup.vue';

export default {
  name: 'RegStep2EIGW',
  components: {
    InstListPopup,
  },
  data() {
    return {
      svrOnInstList: false,
      propsInstList: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      reqNum: 1,
      eigwReqNum: '',
      eigwType: '',
      eigwRmk: '',
      procSt: '',

      onlineSaveData: {},
      onlineList: [],
      fileList: [],
      userList: [
        {
          chrgrType: '',
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
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'EIGW', cdId: 'OFC_LVL_CD', allYn: 'Y', listNm: 'ofcLvlCd',
    });
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    searchList() {
      this.$axios.get('/api/eigw/ifReqList', {
        params: {
          reqNum: '1',
          procSt: '1',
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
    addOnlineInfo() {
      this.onlineList.push({
        reqNum: this.reqNum,
        eigwIfId: this.onlineInfo.eigwIfId,
        eigwIfNm: this.onlineInfo.eigwIfNm,
        instNm: this.onlineInfo.instNm,
        instCd: this.onlineInfo.instCd,
        eigwType: 'online',
        procSt: 1,
        eigwRmk: this.eigwRmk,
        pgmTyp: this.onlineInfo.pgmTyp,
        linkTyp: this.onlineInfo.linkTyp,
        devRealIp: this.onlineInfo.devRealIp,
        devPort: this.onlineInfo.devPort,
        prodRealIp: this.onlineInfo.prodRealIp,
        prodPort: this.onlineInfo.prodPort,
        userList: this.userList,
      });

      this.onlineSaveData = { onlineList: this.onlineList, reqNum: this.reqNum };
      console.log(this.onlineSaveData);

      this.emptyIfFields();
    },
    saveTest() {
      this.$axios.post('/api/eigw/ifReqInfo', this.onlineSaveData)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('저장 되었습니다');
        })
        .catch((ex) => {
          console.log(`오류가 발생하였습니다 : ${ex}`);
        });
    },
    addFileInfo() {
      this.fileList.push({
        eigwIfId: this.fileInfo.eigwIfId,
        eigwIfNm: this.fileInfo.eigwIfNm,
        instNm: this.fileInfo.instNm,
        instCd: this.fileInfo.instCd,
        eigwType: 'file',
        procSt: 1,
        eigwRmk: this.eigwRmk,
        srFlag: this.fileInfo.srFlag,
        outPath: this.fileInfo.outPath,
        devRealIp: this.fileInfo.devRealIp,
        devPort: this.fileInfo.devPort,
        prodRealIp: this.fileInfo.prodRealIp,
        prodPort: this.fileInfo.prodPort,
      });
    },
    emptyIfFields() {
      this.onlineInfo.eigwIfId = '';
      this.onlineInfo.eigwIfNm = '';
      this.onlineInfo.instNm = '';
      this.onlineInfo.instCd = '';
      this.eigwRmk = '';
      this.onlineInfo.pgmTyp = '';
      this.onlineInfo.linkTyp = '';
      this.onlineInfo.devRealIp = '';
      this.onlineInfo.devPort = '';
      this.onlineInfo.prodRealIp = '';
      this.onlineInfo.prodPort = '';
      this.userList = [
        {
          chrgrType: '',
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
    addOnlineChrgrRow(n) {
      console.log('행 추가!');
      this.userList.splice(n + 1, 0, {});
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
      if (this.instPopupCase === 1) {
        this.instCd = val.instCd;
        this.instNm = val.instNm;
      } else {
        this.fileIfMst.instCd = val.instCd;
        this.fileIfMst.instNm = val.instNm;
      }
      this.svrOnInstList = false;
    },
  },
};
</script>
