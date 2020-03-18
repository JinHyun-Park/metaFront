
<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />MCG 채널 조회
        </div>
        <div class="breadcrumb">
          <span>MCG</span><em class="on">채널 조회</em>
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
            @click="save()"
          >
            추가
          </button>
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
          <label class="column_label">업무코드</label>
          <input
            v-model="opCd"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">기관코드</label>
          <input
            v-model="mcgInstCd"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널그룹</label>
          <input
            v-model="chnlGrp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널타입</label>
          <input
            v-model="chnlTyp"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연동방식</label>
          <input
            v-model="lnkgMthd"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널ID</label>
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
          <label class="column_label">대표담당자</label>
          <input
            v-model="chrgrnm"
            type="text"
            value=""
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select v-model="useYn">
              <option value="Y">
                Y
              </option>
              <option value="N">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                업무코드<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                기관코드<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                채널그룹<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                채널타입<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                연동방식<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                채널ID<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                채널명<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                대표담당자<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                사용여부<i class="ico-sort-down" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="chn in chnList"
              :key="chn.index"
              class="table_row w-auto"
              @click="dtlChnl(chn, chn.opCd)"
            >
              <li class="td_cell">
                {{ chn.opCd }}
              </li>
              <li class="td_cell">
                {{ chn.mcgInstCd }}
              </li>
              <li class="td_cell">
                {{ chn.chnlGrp }}
              </li>
              <li class="td_cell">
                {{ chn.chnlTyp }}
              </li>
              <li class="td_cell">
                {{ chn.lnkgMthd }}
              </li>
              <li class="td_cell">
                {{ chn.chnlId }}
              </li>
              <li class="td_cell">
                {{ chn.chnlNm }}
              </li>
              <li class="td_cell">
                {{ chn.chrgrnm }}
              </li>
              <li class="td_cell">
                {{ chn.useYn }}
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
          :click-handler="listing"
          :prev-text="'이전'"
          :next-text="'다음'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        />
      </div>
    </section>


    <section
      v-if="isStatusOn"
      class="info_title"
    >
      <em class="sub_tit">채널명:   {{ chnldtl.chnlNm }}    채널ID:   {{ chnldtl.chnlId }}</em>
      <i
        class="ico-remove"
        @click="noshow()"
      />
    </section>
    <section
      v-if="isStatusOn"
      class="form_area border_group"
    >
      <div class="row_contain">
        <div class="column on w-1">
          <label class="column_label">업무코드</label>
          <input
            v-model="chnldtl.opCd"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">기관코드</label>
          <input
            v-model="chnldtl.mcgInstCd"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널그룹</label>
          <input
            v-model="chnldtl.chnlGrp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">채널유형</label>
          <input
            v-model="chnldtl.chnlTyp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">연동방식</label>
          <div class="select_group disabled">
            <select
              v-model="chnldtl.lnkgMthd"
              disabled
            >
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
        <div class="column w-1" />
      </div>
      <div class="row_contain">
        <div class="column w-1">
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
          <label class="column_label">TCP Gateway 명</label>
          <input
            v-model="chnldtl.tcpgwNm"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발언어</label>
          <input
            v-model="chnldtl.dvlpLang"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Java Container</label>
          <div class="select_group">
            <select :value="chnldtl.containerNum">
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
        <div class="column w-1" />
      </div>
      <div class="row_contain type-3">
        <div
          class="column w-1"
          style="width : 200px "
        >
          <label class="column_label"> 개발기 IP</label>
          <input
            v-model="svrinfo0.svrIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">개발기 Port</label>
          <input
            v-model="svrinfo0.svrPort"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Backup 개발기 IP</label>
          <input
            v-model="svrinfo1.svrIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Backup 개발기 Port</label>
          <input
            v-model="svrinfo1.svrPort"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain type-3">
        <div class="column w-1">
          <label class="column_label">운영기 IP</label>
          <input
            v-model="svrinfo2.svrIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">운영기 Port</label>
          <input
            v-model="svrinfo2.svrPort"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Backup 운영기 IP</label>
          <input
            v-model="svrinfo3.svrIp"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">Backup 운영기 Port</label>
          <input
            v-model="svrinfo3.svrPort"
            type="text"
          >
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-6">
          <label class="column_label">비고</label>
          <input
            v-model="chnldtl.chnlRmk"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용여부</label>
          <div class="select_group">
            <select v-model="chnldtl.useYn">
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
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <button
            type="button"
            class="default_button on"
            @click="modify(chnldtl)"
          >
            수정
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  fetchGetMcgChnlList,
  fetchGetMcgServerList,
  // fetchGetMcgChrgrList,
  fetchPostMcgChnlList,
  // fetchPostMcgServerList,
  // fetchPostMcgChrgrList,
  fetchPutMcgChnlList,
// fetchPutMcgServerList,
// fetchPutMcgChrgrList,
} from '@/api/mcgApi';

export default {
  data() {
    return {
      index: 0,
      chnList: [],
      chnldtl: [],
      svrinfo: [],
      svrinfo0: [],
      svrinfo1: [],
      svrinfo2: [],
      svrinfo3: [],
      chrgrnm: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      opCd: null,
      opCdr: '',
      svrTypr: '',
      instCd: '',
      mcgInstCd: '',
      chnlTyp: '',
      chnlGrp: '',
      lnkgMthd: '',
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
      chrgrNum: '',
      isStatusOn: '',
    };
  },
  methods: {
    listing() {
      console.log('채널 목록 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgChnlList({
        params: {
          pageNo: this.pageSet.pageNo,
          pageCount: this.pageSet.pageCount,
          size: this.pageSet.size,
          opCd: this.opCd,
          instCd: this.instCd,
          mcgInstCd: this.mcgInstCd,
          chnlTyp: this.chnlTyp,
          chnlGrp: this.chnlGrp,
          lnkgMthd: this.lnkgMthd,
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
          console.log('대표 담당자 조회!');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    async Serverinfo(opCdr) {
      console.log('서버조회시작');

      this.svrinfo0 = await this.Serverinfodtl(opCdr, '0');
      this.svrinfo1 = await this.Serverinfodtl(opCdr, '1');
      this.svrinfo2 = await this.Serverinfodtl(opCdr, '2');
      this.svrinfo3 = await this.Serverinfodtl(opCdr, '3');
    },

    Serverinfodtl(opCdr, svrTypr) {
      console.log('채널 서버 조회!');
      // this.$axios.get('/api/mcg/chnl', {
      fetchGetMcgServerList({
        params: {
          svrTyp: svrTypr,
          svrIp: this.svrIp,
          svrPort: this.svrPort,
          mcgServerNum: this.mcgServerNum,
          svrNum: this.svrNum,
          dealCd: this.dealCd,
          opCd: opCdr,
        },
      })

        .then((res) => {
          console.log('서버 조회!');
          this.svrinfo = res.data.rstData.searchList;
          console.log('서버 조회 완료!');
          console.log(this.svrinfo);
          // console.log(res.data.rstData.searchList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
      return this.svrinfo;
    },


    noshow() {
      this.isStatusOn = false;
      console.log(this.isStatusOn);
    },

    dtlChnl(chn, opCdr) {
      // let svrinfotemp = [];
      console.log('상세채널조회!');
      this.chnldtl = chn;
      console.log(this.chnldtl);
      this.isStatusOn = true;
      console.log(this.isStatusOn);
      this.Serverinfo(opCdr);
      // setTimeout(function sleep() {
      // 1초 후 작동해야할 코드
      // console.log(this.svrinfo0);
      // console.log(this.svrinfo1);
      // console.log(this.svrinfo2);
      // console.log(this.svrinfo3);


      //  }, 2000);


      // svrinfotemp = this.Serverinfo(opCdr, '0');
      // this.svrinfo0 = svrinfotemp;
      // svrinfotemp = this.Serverinfo(opCdr, '1');
      // this.svrinfo1 = svrinfotemp;
      // svrinfotemp = this.Serverinfo(opCdr, '2');
      // this.svrinfo2 = svrinfotemp;
      // svrinfotemp = this.Serverinfo(opCdr, '3');
      // this.svrinfo3 = svrinfotemp;
      // console.log('서버조회시작!');
      // this.serverinfo(opCdr, '0');
      // this.svrinfo0 = this.svrinfo;
      // console.log('서버조회0');
      // this.serverinfo(opCdr, '1');
      // this.svrinfo1 = this.svrinfo;
      // console.log('서버조회1');
      // this.serverinfo(opCdr, '2');
      // this.svrinfo2 = this.svrinfo;
      // console.log('서버조회2');
      // this.serverinfo(opCdr, '3');
      // this.svrinfo3 = this.svrinfo;
      // console.log('서버조회3');
    },


    save() {
      console.log('채널 정보 등록!');
      console.log(this.chnlNm, this.opCd);
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgChnlList({
        opCd: this.opCd,
        mcgInstCd: this.mcgInstCd,
        chnlTyp: this.chnlTyp,
        chnlGrp: this.chnlGrp,
        lnkgMthd: this.lnkgMthd,
        chnlId: this.chnlId,
        chnlNm: this.chnlNm,
        useYn: this.useYn,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('채널 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    modify(chn) {
      console.log('채널 정보 수정!');
      console.log(this.chnlNm, this.opCd);
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPostMcgChnlList(chn)
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('채널 수정 완료!');
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
