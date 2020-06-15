<template>
  <div>
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
              {{ row.ifTypNm }}
            </li>
            <li class="td_cell">
              {{ row.sndMid }}
            </li>
            <li class="td_cell">
              {{ row.rcvMid }}
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
    </section>
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
            class="td_cell"
          >
            <div class="search_group">
              <input
                v-model="aprvInfo.aprvNm"
                type="text"
                value=""
                disabled
              >
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
import { mapState, mapActions } from 'vuex';
import {
  fetchPutIfStepAprvReq, fetchGetIfStep3Reg, fetchGetIfReqDetailInfo,
} from '@/api/ifRegApi';
import eventBus from '@/utils/eventBus';

export default {
  name: 'RegStep4Applicant',
  data() {
    return {
      svrOnChrgr: false,
      procSt: 1,
      aprvInfo: [],

      eaiList: [],
      eigwList: [],
      mcgList: [],

      hstRmk: '',
    };
  },
  computed: {
    ...mapState('ifRegInfo', ['reqNum']),
  },
  created() {
    eventBus.$on('Step4AprvReq', (params) => {
      console.log('event Bus 통해 step4 승인');
      this.hstRmk = params.hstRmk;
      this.saveStep4AprvReq();
    });
  },
  mounted() {
    this.getStep4AprvReqList();
  },
  destroyed() {
    eventBus.$off('Step4AprvReq');
  },
  methods: {
    getStep4AprvReqList() {
      // 승인4 데이터 조회
      fetchGetIfStep3Reg({
        params: {
          reqNum: this.reqNum,
          hstRmk: this.hstRmk,
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
    saveStep4AprvReq() {
      fetchPutIfStepAprvReq({
        reqNum: this.reqNum,
        procSt: this.procSt,
        hstRmk: this.hstRmk,
      })
        .then((res) => {
          console.log(res);
          let rstMsg = '';
          if (this.procSt === '3') {
            rstMsg = '승인되었습니다.';
          } else {
            rstMsg = '반려되었습니다.';
          }
          this.$gf.alertOn(rstMsg);
          this.movePage('regList');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    movePage(page) { // 페이지 이동
      this.activeItem = page; // 헤더에서 내려오는 바에 현 위치 표시
      this.$router.push({ name: page });
    },
  },
};
</script>
