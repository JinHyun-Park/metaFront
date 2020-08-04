<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />채널 목록
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
        </div>
      </h5>
      <!--
      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">채널</label>
          <input
            v-model="chnlNm"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-6">
          <label class="column_label">인터페이스ID</label>
          <input
            v-model="eaiIfId"
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">사용</label>
          <div class="select_group">
            <select v-model="useYn">
              <option
                value="Y"
              >
                사용
              </option>
              <option
                value="N"
              >
                미사용
              </option>
            </select>
          </div>
        </div>
      </div>
      -->
      <div class="table_colgroup">
        <div class="table_grid">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                채널
              </li>
              <li class="th_cell">
                인터페이스ID
              </li>
              <li class="th_cell">
                사용 여부
              </li>
              <li class="th_cell">
                EDIT
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="chnlNm"
                  type="text"
                  oninput="this.value = this.value.toUpperCase()"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="eaiIfId"
                  type="text"
                  oninput="this.value = this.value.toUpperCase()"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="useYn">
                    <option
                      value=""
                    >
                      전체
                    </option>
                    <option
                      value="Y"
                    >
                      사용
                    </option>
                    <option
                      value="N"
                    >
                      미사용
                    </option>
                  </select>
                </div>
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="saveChannel()"
                />
                <i
                  class="ico-del"
                  @click="resetField()"
                />
              </li>
            </ul>
            <ul
              v-for="(chn, i) in chnList"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ chn.chnlNm }}
              </li>
              <li class="td_cell">
                <input
                  v-model="chn.eaiIfId"
                  type="text"
                  oninput="this.value = this.value.toUpperCase()"
                >
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="chn.useYn">
                    <option
                      value="Y"
                    >
                      사용
                    </option>
                    <option
                      value="N"
                    >
                      미사용
                    </option>
                  </select>
                </div>
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
          :click-handler="pageMove"
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
import { fetchGetEaiChannelList } from '@/api/eaiApi';

export default {
  data() {
    return {
      index: 0,
      chnList: [],
      pageNo: 1,
      size: 10,
      chnlNm: '',
      eaiIfId: '',
      useYn: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,
    };
  },
  methods: {
    pageMove() {
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      console.log('채널 목록 조회!');
      // this.$axios.get('/api/eai/channel', {
      fetchGetEaiChannelList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.size,
          chnlNm: this.chnlNm,
          eaiIfId: this.eaiIfId,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          this.chnList = res.data.rstData.searchList;
          this.pageSet = res.data.rstData.pageSet;
          console.log(this.chnList);
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    saveChannel() {
      if (this.chnlNm === '') {
        this.$gf.alertOn('채널명을 입력하세요');
        return;
      } if (this.eaiIfId === '') {
        this.$gf.alertOn('인터페이스ID를 입력 하세요');
        return;
      } if (this.useYn === '') {
        this.$gf.alertOn('사용 여부를 선택하세요');
        return;
      }
      const confirmText = `${this.chnlNm} 를 저장하십니까?`;
      this.$gf.confirmOn(confirmText, this.insertData);
    },
    insertData() {
      console.log('채널 정보 등록!');
      console.log(this.chnlNm);
      this.chnList = {
        chnlNm: this.chnlNm,
        eaiIfId: this.eaiIfId,
        useYn: this.useYn,
      };
      this.$axios.post('/api/eai/channel', this.chnList)
        .then((res) => {
          console.log(res);
          this.searchList();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      console.log(`i값 : ${i}`);
      const confirmText = `${this.chnList[i].chnlNm} 를 수정하십니까?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      console.log('채널 정보 갱신!');
      console.log(i);
      this.$axios.put('/api/eai/channel', this.chnList[i])
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
    resetField() {
      this.chnlNm = '';
      this.eaiIfId = '';
      this.useYn = '';
    },
  },
};
</script>
