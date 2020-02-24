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
            @click="listing()"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-3">
          <label class="column_label">채널</label>
          <input
            v-model="chnlNm"
            type="text"
            value=""
          >
        </div>
        <div class="column w-6">
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
              <option value="">
                전체
              </option>
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
        <div class="column w-1" />
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              채널<i class="ico-sort-up" />
            </li>
            <li class="th_cell">
              인터페이스ID<i class="ico-sort-down" />
            </li>
            <li class="th_cell">
              사용<i class="ico-sort-down" />
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="chn in chnList"
            :key="chn.index"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ chn.chnlNm }}
            </li>
            <li class="td_cell">
              {{ chn.eaiIfId }}
            </li>
            <li class="td_cell">
              {{ chn.useYn }}
            </li><li />
          </ul>
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

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
        @click="save()"
      >
        수정
      </button>
      <button
        type="button"
        class="default_button on"
        @click="save()"
      >
        추가
      </button>
    </section>
  </div>
</template>

<script>
import { fetchGetEaiChannelList, fetchPostEaiChannelList } from '@/api/eaiApi';

export default {
  data() {
    return {
      index: 0,
      chnList: [],
      pageNo: 1,
      size: 10,
      chnlNm: '',
      eaiIfId: '',
      useYn: 'Y',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
    };
  },
  methods: {
    listing() {
      console.log('채널 목록 조회!');
      // this.$axios.get('/api/eai/channel', {
      fetchGetEaiChannelList({
        params: {
          pageNo: this.pageSet.pageNo,
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
    save() {
      console.log('채널 정보 등록!');
      console.log(this.chnlNm);
      // this.$axios.post('/api/eai/channel/post', {  })
      fetchPostEaiChannelList({
        params: {
          chnlNm: this.chnlNm,
          eaiIfId: this.eaiIfId,
          useYn: this.useYn,
        },
      })
        .then((res) => {
          console.log(res);
          this.listing();
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
  },
};
</script>
