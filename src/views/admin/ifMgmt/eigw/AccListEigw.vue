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
          <i class="ico-bar" />대외 담당자 조회
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
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
      <div class="row_contain type-2">
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
          <label class="column_label">이름</label>
          <input
            v-model="hanNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">직급</label>
          <div class="select_group">
            <select v-model="ofcLvlCd">
              <option
                v-for="(code, i) in ccCdList.ofcLvlCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">유선번호</label>
          <input
            v-model="offcPhonNum"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">휴대폰번호</label>
          <input
            v-model="mblPhonNum"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <label class="column_label">이메일</label>
          <input
            v-model="emailAddr"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-1">
          <div class="search_group">
            <input
              v-model="instCd"
              type="hidden"
              class="add_text on"
            >
          </div>
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                ID
              </li>
              <li class="th_cell">
                기관명
              </li>
              <li class="th_cell">
                한글명
              </li>
              <li class="th_cell">
                직급
              </li>
              <li class="th_cell">
                유선번호
              </li>
              <li class="th_cell">
                휴대번호
              </li>
              <li class="th_cell">
                이메일
              </li>
              <li class="th_cell">
                수정
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in eigwChrgrInfoList"
              :key="row.userId"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ row.userId }}
              </li>
              <li class="td_cell">
                <input
                  v-model="row.instNm"
                  type="text"
                  @click="turnOnSvrPopInstList(i)"
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
                  v-model="row.offcPhonNum"
                  type="text"
                >
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
import { fetchGetEigwChrgrInfo, fetchSaveEigwChrgrInfo, fetchPutEigwChrgrInfo } from '@/api/eigwApi';
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
      eigwChrgrInfoList: [],
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },

      tgtUrl: '',
      instCd: '',
      instNm: '',
      hanNm: '',
      ofcLvlCd: '',
      offcPhonNum: '',
      mblPhonNum: '',
      emailAddr: '',
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
      fetchGetEigwChrgrInfo({
        params: {
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          hanNm: this.hanNm,
          instCd: this.instCd,
          ofcLvlCd: this.ofcLvlCd,
          offcPhonNum: this.offcPhonNum,
          mblPhonNum: this.mblPhonNum,
          emailAddr: this.emailAddr,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.eigwChrgrInfoList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    save() {
      if (this.instCd === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
        return;
      }
      if (this.hanNm === '') {
        this.$gf.alertOn('이름을 입력해주세요.');
        return;
      }
      if (this.ofcLvlCd === '') {
        this.$gf.alertOn('직급을 선택해주세요.');
        return;
      }
      console.log('담당자 정보 등록');
      this.saveChrgrInfo = {
        instCd: this.instCd,
        hanNm: this.hanNm,
        ofcLvlCd: this.ofcLvlCd,
        offcPhonNum: this.offcPhonNum,
        mblPhonNum: this.mblPhonNum,
        emailAddr: this.emailAddr,
      };
      fetchSaveEigwChrgrInfo(this.saveChrgrInfo)
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
      const confirmText = `${this.eigwChrgrInfoList[i].userId} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('대외기관 담당자 정보 수정!');
      console.log(i);
      if (this.eigwChrgrInfoList[i].instCd === '') {
        this.$gf.alertOn('대외기관을 입력해주세요.');
        return;
      }
      if (this.eigwChrgrInfoList[i].hanNm === '') {
        this.$gf.alertOn('이름을 입력해주세요.');
        return;
      }
      if (this.eigwChrgrInfoList[i].ofcLvlCd === '') {
        this.$gf.alertOn('직급을 선택해주세요.');
        return;
      }
      fetchPutEigwChrgrInfo(this.eigwChrgrInfoList[i])
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
      this.hanNm = '';
      this.eaiIfNmEng = '';
      this.ofcLvlCd = '';
      this.offcPhonNum = '';
      this.mblPhonNum = '';
      this.emailAddr = '';
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
        this.eigwChrgrInfoList[this.instPopupCase].instNm = val.instNm;
        this.eigwChrgrInfoList[this.instPopupCase].instCd = val.instCd;
      }
      this.svrOnInstList = false;
    },
  },
};
</script>
