<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />EiGW 메타 정보(실시간)
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
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instCd"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">IP</label>
          <input
            v-model="svrIp"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head">
            <ul>
              <li class="th_cell">
                대외기관<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                I/F ID<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                거래명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                프로그램 유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                개발IP(NAT)
              </li>
              <li class="th_cell">
                개발 PORT
              </li>
              <li class="th_cell">
                운영IP(NAT)
              </li>
              <li class="th_cell">
                운영 PORT
              </li>
              <li class="th_cell">
                Online meta Num<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Process Num<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Dvp Server num<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Prod Server num<i class="ico-sort-up" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(row, index) in onlineIfList"
              :key="row.onlineMetaNum"
              class="table_row w-auto"
              @click="detailInfo(index)"
            >
              <li class="td_cell">
                {{ row.instNm }}
              </li>
              <li class="td_cell">
                {{ row.eaiIfId }}
              </li>
              <li class="td_cell">
                {{ row.pgmTyp }}
              </li>
              <li class="td_cell">
                {{ row.dvpSvrRealIp }}<br>({{ row.dvpSvrNatIp }})
              </li>
              <li class="td_cell">
                {{ row.dvpSvrPort }}
              </li>
              <li class="td_cell">
                {{ row.prodSvrRealIp }}<br>({{ row.prodSvrNatIp }})
              </li>
              <li class="td_cell">
                {{ row.prodSvrPort }}
              </li>
              <li class="td_cell">
                {{ row.onlineMetaNum }}
              </li>
              <li class="td_cell">
                {{ row.procNum }}
              </li>
              <li class="td_cell">
                {{ row.dvpSvrNum }}
              </li>
              <li class="td_cell">
                {{ row.prodSvrNum }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        상세정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID</label>
          <input
            v-model="onlineMst.eaiIfId"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="onlineMst.instNm"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">프로그램 타입</label>
          <input
            v-model="procInfo.pgmTyp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <input
            v-model="procInfo.linkTyp"
            type="text"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        서버정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">개발기_REAL IP</label>
          <input
            v-model="procInfo.dvpSvrRealIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_NAT IP</label>
          <input
            v-model="procInfo.dvpSvrNatIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기_PORT</label>
          <input
            v-model="procInfo.dvpSvrPort"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-1">
          <label class="column_label">운영기_REAL IP</label>
          <input
            v-model="procInfo.prodSvrRealIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_NAT IP</label>
          <input
            v-model="procInfo.prodSvrNatIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기_PORT</label>
          <input
            v-model="procInfo.prodSvrPort"
            type="text"
          >
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        담당자 정보
        <div class="right_button_area" />
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
            <li class="th_cell">
              userId
            </li>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              부서
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="inchrgr in inChrgrList"
            :key="inchrgr.userId"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ inchrgr.userId }}
            </li>
            <li class="td_cell">
              {{ inchrgr.instNm }}
            </li>
            <li class="td_cell">
              {{ inchrgr.orgCd }}
            </li>
            <li class="td_cell">
              {{ inchrgr.hanNm }}
            </li>
            <li class="td_cell">
              {{ inchrgr.mblPhonNum }}
            </li>
            <li class="td_cell">
              {{ inchrgr.emailAddr }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        대외기관 담당자 정보
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul>
            <li class="th_cell">
              userId
            </li>
            <li class="th_cell">
              기관
            </li>
            <li class="th_cell">
              부서
            </li>
            <li class="th_cell">
              이름
            </li>
            <li class="th_cell">
              연락처
            </li>
            <li class="th_cell">
              E-mail
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="outchrgr in outChrgrList"
            :key="outchrgr.userId"
            class="table_row form_type except w-auto"
          >
            <li class="td_cell">
              {{ outchrgr.userId }}
            </li>
            <li class="td_cell">
              {{ outchrgr.instNm }}
            </li>
            <li class="td_cell">
              {{ outchrgr.orgCd }}
            </li>
            <li class="td_cell">
              {{ outchrgr.hanNm }}
            </li>
            <li class="td_cell">
              {{ outchrgr.mblPhonNum }}
            </li>
            <li class="td_cell">
              {{ outchrgr.emailAddr }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchEigwAdOnlineList, fetchEigwOnlineDetail } from '@/api/eigwApi';
export default {
  data() {
    return {
      onlineIfList: '',
      eaiIfId: '',
      svrIp: '',
      instCd: '',
      inChrgrList: '',
      outChrgrList: '',
      onlineMst: {},
      procInfo: {},
    };
  },
  methods: {
    searchList() {
      //this.$axios.get('/api/eigw/online/mstlist', {
      fetchEigwAdOnlineList({
        params: {
          eaiIfId: this.eaiIfId,
          svrIp: this.svrIp,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineIfList = res.data.rstData.searchList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    detailInfo(i) {
      //this.tgtUrl = '/api/eigw/online/mstDtlInfo/';
      fetchEigwOnlineDetail({
        params: {
          onlineMetaNum: this.onlineIfList[i].onlineMetaNum,
          procNum: this.onlineIfList[i].procNum,
         },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.onlineMst = res.data.rstData.rstData.onlineMst;
            this.procInfo = res.data.rstData.rstData.procInfo;
            this.inChrgrList = res.data.rstData.rstData.inChrgrList;
            this.outChrgrList = res.data.rstData.rstData.outChrgrList;
          } else {
            this.$gf.alertOn('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};

</script>
