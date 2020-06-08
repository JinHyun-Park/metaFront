<template>
  <div>
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 업무 요청서
        </div>
        <div class="breadcrumb">
          <span>신청</span><em class="on">MCG </em>
        </div>
      </h2>
    </section>
    <section class="small_tabs">
      <ul>
        MCG 채널 신규 연동이 필요하신가요?
        <li
          class="on"
          @click="tabChange(1)"
        >
          예
        </li>
        <li
          @click="tabChange(2)"
        >
          아니오 - 거래 추가 요청
        </li>
      </ul>
    </section>
    <!-- <section class="form_area border_group several_table">
      <h5 class="s_tit type-2">
        MCG 신청 목록
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
              >
                구분
              </li>
              <li
                class="th_cell"
              >
                채널ID
              </li>
              <li
                class="th_cell"
              >
                연동방식
              </li>
              <li
                class="th_cell"
              >
                채널유형
              </li>
              <li
                class="th_cell"
              >
                TP명
              </li>
              <li class="th_cell">
                삭제
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="req in reqList"
              :key="req.index"
              class="table_row w-auto"
              @click="dtlReq(req)"
            >
              <li
                class="td_cell"
              >
                {{ req.mcgType }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.chnlId }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.lnkMthd }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.chnlTyp }}
              </li>
              <li
                class="td_cell"
              >
                {{ req.tp }}
              </li>
              <li class="td_cell">
                <i
                  class="ico-del"
                  @click="remove(req)"
                />
              </li>
            </ul>
          </div>

          |
        </div> -->
    <!-- </div>
  </section> -->
    <reg-step2-ch-mcg v-if="step2Mcg1" />
    <reg-step2-deal-mcg v-if="step2Mcg2" />
  </div>
</template>

<script>
import RegStep2ChMcg from '@/views/ifReg/RegStep2ApplyCh_MCG.vue'; // 2단계 MCG 채널
import RegStep2DealMcg from '@/views/ifReg/RegStep2ApplyDeal_MCG.vue'; // 2단계 MCG 거래
// import {
//   fetchGetMcgReqList,
// } from '@/api/mcgApi';
import eventBus from '@/utils/eventBus';

export default {
  name: 'ApplyFrame',
  components: {
    RegStep2ChMcg,
    RegStep2DealMcg,
  },
  data() {
    return {
      step2Mcg1: false,
      step2Mcg2: true,
      reqList: [],
      reqdtl: [],
      useYn: '',
      reqNum: '',
      procSt: '',
      mcgReqNum: '',
      mcgType: '',
      chnlId: '',
      lnkMthd: '',
      chnlTyp: '',
      tp: '',

    };
  },
  created() {
    // eventBus.$on('Step2GetMCGReqMst', (params) => {
    //   console.log(`event Bus 통해 Step1 조회 params: ${params.reqNum}`);
    //   this.listing(params.reqNum);
    // });
    eventBus.$on('MCGTEMPREQ', (params) => {
      console.log(`추가: ${params}`);
      this.reqList.push(params);
    });
  },
  // mounted() {
  //   eventBus.$emit('MCGREQDTL', this.reqdtl);
  // },
  methods: {
    tabChange(val) {
      if (val === 1) {
        this.step2Mcg1 = true;
        this.step2Mcg2 = false;
      } else if (val === 2) {
        this.step2Mcg1 = false;
        this.step2Mcg2 = true;
      }
    },
    // listing(req) {
    //   console.log('채널 신청 목록 조회!');
    //   // this.$axios.get('/api/mcg/chnl', {
    //   fetchGetMcgReqList({
    //     params: {
    //       reqNum: req,
    //       procSt: 1,
    //       // useYn: 'Y',
    //     },
    //   })
    //     .then((res) => {
    //       this.reqList = res.data.rstData.searchReqList;
    //       // this.svrList = res.data.rstData.searchSvrList;
    //       // this.chrgrList = res.data.rstData.searchChrgrList;
    //       console.log(res.data.rstData.searchReqList);
    //       console.log(this.reqList);
    //     })
    //     .catch((ex) => {
    //       console.log(`error occur!! : ${ex}`);
    //     });
    // },
    // dtlReq(req) {
    //   // let svrinfotemp = [];
    //   console.log('상세신청정보조회!');
    //   this.reqdtl = req;
    //   console.log(this.reqdtl);
    // },

    //     remove(req) {
    // console.log('신청삭제완료!');

    //     },
  },
};
</script>
