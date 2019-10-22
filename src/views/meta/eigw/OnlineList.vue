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
      <div class="row_contain except">
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
            v-model="ifId"
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
                I/F ID<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                대외기관<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                REAL IP<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                NAT IP<i class="ico-sort-down" />
              </li>

              <li class="th_cell">
                PORT<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                거래명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                프로그램 유형<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                프로그램<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                설정파일<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Online meta Num<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Process Num<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                Server num<i class="ico-sort-up" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="onlineRow in this.onlineIfList"
              :key="onlineRow.onlineNum"
              class="table_row w-auto"
            >
              <li
                v-for="(onlineCol, i) in onlineRow"
                :key="i"
                class="td_cell"
                @click="detailInfo(i, onlineRow[0], onlineRow[1], onlineRow[9], onlineRow[10],onlineRow[11])"
              >
                {{ onlineCol }}
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
            v-model="eaiIfId"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">대외기관</label>
          <input
            v-model="instNm"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">프로그램 타입</label>
          <input
            v-model="pgmTyp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연결유형</label>
          <input
            v-model="linkTyp"
            type="text"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        서버 정보
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul class="table_row form_type except w-auto">
            <li class="th_cell">
              구분
            </li>
            <li class="th_cell">
              REAL IP
            </li>
            <li class="th_cell">
              NAT IP
            </li>
            <li class="th_cell">
              PORT
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="server in this.serverList"
            :key="server.svrNum"
            class="table_row form_type except w-auto"
          >
            <li class="td_cell">
              {{ server.svrTypCd }}
            </li>
            <li class="td_cell on">
              {{ server.svrRealIp }}
            </li>
            <li class="td_cell">
              {{ server.svrNatIp }}
            </li>
            <li class="td_cell">
              {{ server.svrPort }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="border_group">
      <h5 class="s_tit">
        담당자 정보
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto except">
          <ul class="table_row form_type except w-auto">
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
            v-for="inuser in this.inchrgrList"
            :key="inuser.userId"
            class="table_row form_type except w-auto"
          >
            <li
              v-for="(inUserInfo, i) in inuser"
              :key="i"
              class="td_cell"
            >
              {{ inUserInfo }}
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
          <ul class="table_row form_type except w-auto">
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
            v-for="outuser in this.outchrgrList"
            :key="outuser.userId"
            class="table_row form_type except w-auto"
          >
            <li
              v-for="(outUserInfo, i) in outuser"
              :key="i"
              class="td_cell"
            >
              {{ outUserInfo }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlineIfList: '',
      ifId: '',
      svrIp: '',
      instCd: '',
      userInfo: '',
      serverList: '',
      inchrgrList: '',
      outchrgrList: '',
      linkTyp: '',
      pgmTyp: '',
      instNm: '',
      eaiIfId: '',
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/online/mstlist', {
        params: {
          ifId: this.ifId,
          svrIp: this.svrIp,
          instCd: this.instCd,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd == 'S') {
            this.onlineIfList = res.data.rstData.onlineIfList;
          } else {
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    detailInfo(i, eaiIf, instNm, index1, index2, index3) {
      this.tgtUrl = '/api/eigw/online/mstDtlInfo/';
      if (index1 != null && index1 !== '') {
        this.tgtUrl = `${this.tgtUrl}/${index1}/${index2}/${index3}`;
      }
      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd == 'S') {
            this.userInfo = res.data.rstData.chrgrList;
            this.serverList = res.data.rstData.serverList;
            this.eaiIfId = eaiIf;
            this.instNm = instNm;
            this.pgmTyp = res.data.rstData.processList[0].pgmTyp;
            this.linkTyp = res.data.rstData.processList[0].linkTyp;
            this.inchrgrList = res.data.rstData.inchrgrList;
            this.outchrgrList = res.data.rstData.outchrgrList;
          } else {
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};

</script>
