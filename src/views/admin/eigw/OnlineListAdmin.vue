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
            class="default_button"
          >
            추가
          </button>
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
        <div class="column on w-1">
          <label class="column_label">EIGW구분</label>
          <div class="select_group">
            <select v-model="mqMngrNm">
              <option value="eigw1">
                1호기
              </option>
              <option value="eigw2">
                2호기
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
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
          <label class="column_label">I/F ID(명)</label>
          <input
            v-model="ifId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">프로그램</label>
          <input
            v-model="pgmId"
            type="text"
            class="add_text on"
            @keyup.13="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">설정파일</label>
          <input
            v-model="confFile"
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
                EIGW 구분<i class="ico-sort-down" />
              </li>
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
                @click="detailInfo(i, onlineRow[0], onlineRow[1], onlineRow[2], onlineRow[6], onlineRow[10], onlineRow[11],onlineRow[12])"
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
        접속정보
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-1">
          <label class="column_label">I/F ID &amp; 명</label>
          <input
            v-model="eaiIfId"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <input
            v-model="eaiIfNm"
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
        <div class="column w-1">
          <label class="column_label">EIGW구분</label>
          <input
            v-model="mqMngrNm"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">프로그램명</label>
          <input
            v-model="pgmId"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">설정파일명</label>
          <input
            v-model="confFile"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">프로그램유형</label>
          <input
            v-model="pgmTyp"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">세션수</label>
          <input
            v-model="sesnCnt"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">소켓타임아웃</label>
          <input
            v-model="socketTimeout"
            type="text"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">연결유형</label>
          <input
            v-model="linkTyp"
            type="text"
          >
        </div>
      </div>

      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">MQ 타임아웃</label>
          <input
            v-model="mqTimeout"
            type="text"
          >
        </div>
        <div class="column w-4" />
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
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
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
            <li class="td_cell">
              <i class="ico-add" /><i class="ico-edit" /><i class="ico-del" />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="form_area border_group style-1">
      <h5 class="s_tit">
        비고
      </h5>
      <div class="row_contain">
        <div class="column w-6">
          <textarea
            cols="50"
            rows="5"
            placeholder="비고란 입니다."
          />
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button on"
      >
        등록
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlineIfList: '',
      mqMngrNm: '',
      svrIp: '',
      instNm: '',
      pgmId: '',
      confFile: '',
      eaiIfId: '',
      ifId: '',
      instCd: '',
      onlineDealNum: '',
      prmDesc: '',
      pgmTyp: '',
      sesnCnt: '',
      socketTimeout: '',
      linkTyp: '',
      mqTimeout: '',
      serverList: '',
      inchrgrList: '',
      outchrgrList: '',
    };
  },
  methods: {
    searchList() {
      this.$axios.get('/api/eigw/admin/online/mstlist', {
        params: {
          mqMngrNm: this.mqMngrNm,
          ifId: this.ifId,
          svrIp: this.svrIp,
          instCd: this.instCd,
          pgmId: this.pgmId,
          confFile: this.confFile,
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
    detailInfo(i, mqMngrNm, eaiIf, instNm, ifNm, index1, index2, index3) {
      this.tgtUrl = '/api/eigw/online/mstDtlInfo/';
      if (index1 != null && index1 !== '') {
        this.tgtUrl = `${this.tgtUrl}/${index1}/${index2}/${index3}`;
      }
      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd == 'S') {
            this.serverList = res.data.rstData.serverList;
            this.eaiIfId = eaiIf;
            this.instNm = instNm;
            this.mqMngrNm = mqMngrNm;
            this.eaiIfNm = ifNm;
            this.pgmId = res.data.rstData.processList[0].pgmId;
            this.confFile = res.data.rstData.processList[0].confFile;
            this.sesnCnt = res.data.rstData.processList[0].sesnCnt;
            this.socketTimeout = res.data.rstData.processList[0].socketTimeout;
            this.linkTyp = res.data.rstData.processList[0].linkTyp;
            this.mqTimeout = res.data.rstData.processList[0].mqTimeout;
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
