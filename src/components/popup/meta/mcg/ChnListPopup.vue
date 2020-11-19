<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      ref="chnListPop"
      class="layer_popup medium"
      tabindex="0"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />채널 정보 조회</h2>
      </section>
      <section class="form_area border_group">
        <h5 class="s_tit type-2">
          기본 정보
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="listing()"
            >
              조회
            </button>
          </div>
        </h5>
        <div class="row_contain type-3">
          <div class="column w-1">
            <label class="column_label">기관코드</label>
            <input
              v-model="mcgInstCd"
              type="text"
              value=""
            >
          </div>
          <div class="column w-1">
            <label class="column_label">업무코드</label>
            <input
              v-model="opCd"
              type="text"
              value=""
            >
          </div>
          <div class="column w-1">
            <label class="column_label tooltips ov top">채널ID
              <span class="tip_contn">
                <em class="tip_text">채널ID, 채널명으로 검색해보세요.
                </em></span></label>
            <input
              v-model="chnlId"
              type="text"
              value=""
            >
          </div>
          <div class="column w-1">
            <label class="column_label">채널명</label>
            <input
              v-model="chnlNm"
              type="text"
              value=""
            >
          </div>
          <div class="column w-1">
            <label class="column_label">채널유형</label>
            <select v-model="chnlTyp">
              <option
                v-for="(code, m) in ccCdList.mcgChnlTyp"
                :key="m"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
          </div>
          <div class="column w-1">
            <label class="column_label">연동방식</label>
            <select v-model="lnkMthd">
              <option
                v-for="(code, m) in ccCdList.mcgChnlLnkMthd"
                :key="m"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
          </div>
        </div>

        <div class="table_colgroup">
          <div class="table_grid radio_group">
            <div class="table_head w-auto">
              <ul>
                <li class="th_cell" />
                <li class="th_cell">
                  기관코드
                </li>
                <li class="th_cell">
                  업무코드
                </li>
                <li class="th_cell">
                  채널ID
                </li>
                <li class="th_cell">
                  채널명
                </li>
                <li class="th_cell">
                  채널유형
                </li>
                <li class="th_cell">
                  연동방식
                </li>
              </ul>
            </div>
            <div class="table_body">
              <ul
                v-for="chn in chnList"
                :key="chn.index"
                class="table_row  w-auto"
              >
                <li class="td_cell">
                  <span class="default_radio">
                    <label><input
                      v-model="radio_chk"
                      type="radio"
                      :value="chn"
                    ></label></span>
                </li>

                <li class="td_cell">
                  {{ chn.mcgInstCd }}
                </li>
                <li class="td_cell">
                  {{ chn.opCd }}
                </li>
                <li class="td_cell">
                  {{ chn.chnlId }}
                </li>
                <li class="td_cell">
                  {{ chn.chnlNm }}
                </li>
                <li class="td_cell">
                  {{ chn.chnlTyp }}
                </li>
                <li class="td_cell">
                  {{ chn.lnkMthd }}
                </li>
              </ul>
            </div>
          </div>
          <div class="pagination_space">
            <paginate
              v-model="pageSet.pageNo"
              :page-count="pageSet.pageCount"
              :page-range="3"
              :margin-pages="1"
              :click-handler="pageMove"
              :prev-text="'이전'"
              :next-text="'다음'"
              :container-class="'pagination'"
              :page-class="'page-item'"
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
          확인
        </button>
      </section>
    </article>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchGetMcgChnlList,
} from '@/api/mcgApi';

export default {
  data() {
    return {
      tgtUrl: '',
      chnList: [],
      userId: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 5 },
      pageMoveChk: 0,
      opCd: null,
      opCdr: '',
      svrTypr: '',
      instCd: '',
      mcgInstCd: '',
      chnlTyp: '',
      chnlGrp: '',
      lnkMthd: '',
      chnlId: '',
      chnlNm: '',
      containerNum: '',
      tcpgwNm: '',
      dvlpLang: '',
      chnlRmk: '',
      useYn: 'Y',
      svrTyp: '',
      svrIp: '',
      svrPort: '',
      mcgServerNum: '',
      ipTyp: '',
      sUserId: '',
      dealCd: '',
      chrgrTyp: '',
      hanNm: '',
      chrgrId: '',
      mblPhonNum: '',
      isStatusOn: '',
      chrgrpopupstate: '',
      chrgrn: '',
      chrgropCd: '',
      radio_chk: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'CHNL_GRP', allYn: 'Y', listNm: 'mcgChnlGrp',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'CHNL_TYP', allYn: 'Y', listNm: 'mcgChnlTyp',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNK_MTHD', allYn: 'Y', listNm: 'mcgChnlLnkMthd',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'LNK_MTHD', allYn: 'N', listNm: 'mcgChnlLnkMthdR',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'CHNL_GRP', allYn: 'N', listNm: 'mcgChnlGrpR',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'CHNL_TYP', allYn: 'N', listNm: 'mcgChnlTypR',
    });
    this.setCcCdList({
      opClCd: 'MCG', cdId: 'CONTAINER_NUM', allYn: 'N', listNm: 'mcgContainerNumR',
    });
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),
    ...mapActions('frameSet', ['setResetPopOn']),
    pageMove() {
      this.pageMoveChk = 1;
      this.listing();
      this.pageMoveChk = 0;
    },
    listing() {
      console.log('채널 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgChnlList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          opCd: this.opCd,
          instCd: this.instCd,
          mcgInstCd: this.mcgInstCd,
          chnlTyp: this.chnlTyp,
          chnlGrp: this.chnlGrp,
          lnkMthd: this.lnkMthd,
          chnlId: this.chnlId,
          chnlNm: this.chnlNm,
          containerNum: this.containerNum,
          tcpgwNm: this.tcpgwNm,
          dvlpLang: this.dvlpLang,
          chnlRmk: this.chnlRmk,
          useYn: this.useYn,
        },
      })

        .then((res) => {
          this.chnList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(res.data.rstData.searchList);
          console.log(this.chnList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    pageChanged() {
      console.log();
      this.searchList();
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
    addData() {
      this.$emit('addData', this.radio_chk);
    },
  },
};
</script>

<style scoped>
.popup {
  z-index: 13;
}
</style>
