<template>
  <div>
    <ChrgrListPopup
      v-if="svrOnChrgr"
      :prop-data="propsData"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />신청 최종 요청 (신청자용)
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="border_group border-none">
      <h5 class="s_tit">
        신청내역
      </h5>
    </section>
    <div v-if="ifKind==='EAI'">
      <section class="form_area border_group">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                인터페이스명(영문)
              </li>
              <li class="th_cell">
                인터페이스명(한글)
              </li>
              <li class="th_cell">
                송신업무
              </li>
              <li class="th_cell">
                수신업무
              </li>
              <li class="th_cell">
                연동방식
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in eaiList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ row.eaiIfNmEng }}
              </li>
              <li class="td_cell">
                {{ row.eaiIfNmKor }}
              </li>
              <li class="td_cell">
                {{ row.sndMid }}
              </li>
              <li class="td_cell">
                {{ row.rcvMid }}
              </li>
              <li class="td_cell">
                {{ row.ifTypNm }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div v-if="ifKind==='EIGW'">
      <section class="form_area border_group">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                연동구분
              </li>
              <li class="th_cell">
                인터페이스ID
              </li>
              <li class="th_cell">
                인터페이스명
              </li>
              <li class="th_cell">
                대외기관
              </li>
              <li class="th_cell">
                -
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in eigwList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ row.eigwType }}
              </li>
              <li class="td_cell">
                {{ row.eigwIfId }}
              </li>
              <li class="td_cell">
                {{ row.eigwIfNm }}
              </li>
              <li class="td_cell">
                {{ row.instNm }}({{ row.instCd }})
              </li>
              <li class="td_cell" />
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div v-if="ifKind==='MCG'">
      <section class="form_area border_group">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                구분
              </li>
              <li class="th_cell">
                채널ID
              </li>
              <li class="th_cell">
                연동방식
              </li>
              <li class="th_cell">
                채널유형
              </li>
              <li class="th_cell">
                거래명
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, i) in mcgList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ row.mcgType }}
              </li>
              <li class="td_cell">
                {{ row.chnlId }}
              </li>
              <li class="td_cell">
                {{ row.lnkMthd }}
              </li>
              <li class="td_cell">
                {{ row.chnlTyp }}
              </li>
              <li class="td_cell">
                {{ row.tp }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <section class="table_grid border_group">
      <div class="table_head">
        <h5 class="s_tit">
          승인자(파트장) 지정
        </h5>
        <ul>
          <li class="th_cell">
            이름
          </li>
          <li class="th_cell">
            조직
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
          <!--                            <li class="th_cell"></li>-->
        </ul>
      </div>
      <div class="table_body">
        <ul class="table_row form_type">
          <li
            class="td_cell on"
          >
            <div
              class="search_group"
              @click="turnOnSvrPopChrgr"
            >
              <input
                v-model="aprvInfo.aprvNm"
                type="text"
                value=""
              >
              <span class="search">
                <i class="ico-search" />
              </span>
            </div>
          </li>
          <li class="td_cell">
            <input
              v-model="aprvInfo.orgNm"
              type="text"
              value=""
              disabled
            >
          </li>
          <li class="td_cell">
            <input
              v-model="aprvInfo.ofcLvlNm"
              type="text"
              value=""
              disabled
            >
          </li>
          <li class="td_cell">
            <input
              v-model="aprvInfo.mblPhonNum"
              type="text"
              value=""
              disabled
            >
          </li>
          <li class="td_cell">
            <input
              v-model="aprvInfo.emailAddr"
              type="text"
              value=""
              disabled
            >
          </li>
          <!--<li class="td_cell"><i class="ico-edit"></i><i class="ico-del"></i></li>-->
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';

import {
  fetchPostIfStep3AprvId, fetchPutIfStepAprvReq, fetchGetIfStep3Reg, fetchGetIfReqDetailInfo,
} from '@/api/ifRegApi';
import eventBus from '@/utils/eventBus';

export default {
  name: 'RegStep3Applicant',
  components: {
    ChrgrListPopup,
  },
  data() {
    return {
      svrOnChrgr: false,
      ifKind: '',

      propsData: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },

      aprvInfo: [],

      eaiList: [],
      eigwList: [],
      mcgList: [],
    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum']),
  },
  created() {
    eventBus.$on('Step3AprvSave', () => {
      console.log('event Bus 통해 step3 저장');
      this.saveStep3AprvId();
    });
    eventBus.$on('Step3AprvReq', (params) => {
      console.log('event Bus 통해 step3 승인요청');
      this.hstRmk = params.hstRmk;
      this.saveStep3AprvReq();
    });
  },
  mounted() {
    if (this.$route.params.ifKind !== null) {
      this.ifKind = this.$route.params.ifKind;
    }
    this.getStep3AprvReqList();
  },
  destroyed() {
    eventBus.$off('Step3AprvSave');
    eventBus.$off('Step3AprvReq');
  },
  methods: {
    getStep3AprvReqList() {
      // 승인번호3 데이터 조회
      fetchGetIfStep3Reg({
        params: {
          reqNum: this.reqNum,
        },
      })
        .then((res) => {
          if (res.data.rstData.aprvInfo != null) {
            console.log(res);
            this.aprvInfo = res.data.rstData.aprvInfo;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });

      fetchGetIfReqDetailInfo({
        params: {
          reqNum: this.reqNum,
        },
      })
        .then((res) => {
          console.log(res);
          this.eaiList = res.data.rstData.ifReqEaiList;
          this.eigwList = res.data.rstData.ifReqEigwList;
          this.mcgList = res.data.rstData.ifReqMcgList;
          console.log(this.eaiList.length);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveStep3AprvId() {
      // 승인자 정보 등록
      if (this.aprvInfo.aprvId === '') {
        this.$gf.alertOn('승인자 지정은 필수입니다.');
        return;
      }
      fetchPostIfStep3AprvId({
        reqNum: this.reqNum,
        aprvId: this.aprvInfo.aprvId,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('저장 되었습니다');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveStep3AprvReq() {
      // 승인요청
      if (this.aprvInfo.aprvId === '') {
        this.$gf.alertOn('승인자 지정은 필수입니다.');
        return;
      }

      fetchPutIfStepAprvReq({
        reqNum: this.reqNum,
        aprvId: this.aprvInfo.aprvId,
        procSt: '2', // 승인요청
        hstRmk: this.hstRmk,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('승인 요청되었습니다');
          this.movePage('newIfRegList');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    turnOnSvrPopChrgr(callChrgr) {
      this.callChrgr = callChrgr;
      // 파트내 인원만 조회(IN_PART)
      this.propsData.searchType = 'IN_PART';
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;

      this.aprvInfo.aprvId = val.userId;
      this.aprvInfo.aprvNm = val.hanNm;
      this.aprvInfo.orgNm = val.orgNm;
      this.aprvInfo.ofcLvlNm = val.ofcLvlNm;
      this.aprvInfo.mblPhonNum = val.mblPhonNum;
      this.aprvInfo.emailAddr = val.emailAddr;
    },
    movePage(page) { // 페이지 이동
      this.activeItem = page; // 헤더에서 내려오는 바에 현 위치 표시
      this.$router.push({ name: page });
    },
  },
};
</script>
