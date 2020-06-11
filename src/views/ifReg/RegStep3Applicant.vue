<template>
  <div>
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="aprvInfo"
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

    <section class="info_title small">
      <em class="sub_tit">EAI</em>
    </section>
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

    <section class="info_title small">
      <em class="sub_tit">EIGW</em>
    </section>
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

    <section class="info_title small">
      <em class="sub_tit">MCG</em>
      <i class="ico-remove" />
    </section>
    <section class="form_area border_group">
      <div class="row_contain odd type-1">
        <div class="column on w-1">
          <label class="column_label">업무코드</label>
          <input
            type="text"
            value="FILE_0945OIK2S"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">기관코드</label>
          <input
            type="text"
            value="JOP369"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널그룹</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널유형</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연동방식</label>
          <div class="select_group disabled">
            <select disabled>
              <option value="">
                Y
              </option>
              <option
                value=""
                selected
              >
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain odd type-3">
        <div class="column on w-1">
          <label class="column_label">채널담당자1</label>
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
          <label class="column_label">채널담당자2</label>
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
          <label class="column_label">채널담당자3</label>
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
          <label class="column_label">적용서버</label>
          <input
            type="text"
            value="OPGROUP"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발언어</label>
          <input
            type="text"
            value="channeltype_01"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Java Container</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                Y
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
    </section>

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
      reqNum: '',
      aprvInfo: [],

      eaiList: [],
      eigwList: [],
    };
  },
  created() {
    eventBus.$on('Step3GetAprvReqMst', (params) => {
      console.log(`event Bus 통해 Step3 조회 params: ${params.reqNum}`);
      this.getStep3AprvReqList(params.reqNum);
    });
    eventBus.$on('Step3AprvSave', (params) => {
      console.log('event Bus 통해 step3 저장');
      if (this.reqNum == null) {
        this.reqNum = params.reqNum;
      }
      this.saveStep3AprvId();
    });
    eventBus.$on('Step3AprvReq', (params) => {
      console.log('event Bus 통해 step3 승인요청');
      if (this.reqNum == null) {
        this.reqNum = params.reqNum;
      }
      this.saveStep3AprvReq();
    });
    console.log(`parent reqNum : ${this.$parent.reqNum}`);
  },
  destroyed() {
    eventBus.$off('Step3GetAprvReqMst');
    eventBus.$off('Step3AprvSave');
    eventBus.$off('Step3AprvReq');
  },
  methods: {
    getStep3AprvReqList(tgtReqNum) {
      // 승인번호3 데이터 조회
      this.reqNum = tgtReqNum;
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
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('승인 요청되었습니다');
          this.movePage('regList');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
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
