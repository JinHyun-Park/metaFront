<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />서버 정보 조회
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <div class="right_button_area">
          <div class="select_group">
            <label class="column_label">Role</label>
            <select>
              <option
                value=""
                selected
              >
                수신서버
              </option>
              <option value="">
                송신서버
              </option>
              <option value="">
                개발
              </option>
              <option value="">
                운영
              </option>
            </select>
            <span class="select" />
          </div>
          <button
            type="button"
            class="default_button"
          >
            임시추가
          </button>
          <button
            type="button"
            class="default_button on"
            @click="searchList()"
          >
            조회
          </button>
        </div>
      </h5>
      <div class="add_info">
        <input
          v-model="svrIp"
          type="text"
          class="add_text on"
          value="IP주소"
          @on:keyup.13="searchList()"
        >
        <input
          type="text"
          class="add_text"
          value="채널양식 업무 담당추가 채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="채널양식 업무 거래코드 채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="거래 업무 담당 조회추가채널업무"
        >
        <input
          type="text"
          class="add_text"
          value="거래 연동 담당 ID추가 채널 업무"
        >
        <input
          type="text"
          class="add_text"
          value="채널 ID 조회 담당추가 채널 업무"
        >
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <ul>
              <li class="th_cell">
                Num
              </li>
              <li class="th_cell">
                서버타입<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP타입<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                호스트명<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                IP<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                PORT<i class="ico-sort-up" />
              </li>
              <li class="th_cell">
                담당자<i class="ico-sort-down" />
              </li>
              <li class="th_cell">
                사용여부<i class="ico-sort-down" />
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="server in serverList"
              :key="server.svrNum"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ server.svrNum }}
              </li>
              <li class="td_cell">
                {{ server.svrTypCd }}
              </li>
              <li class="td_cell">
                {{ server.ipTyp }}
              </li>
              <li class="td_cell">
                {{ server.hostNm }}
              </li>
              <li class="td_cell">
                {{ server.svrIp }}
              </li>
              <li class="td_cell">
                {{ server.svrPort }}
              </li>
              <li class="td_cell">
                {{ server.userId }}
              </li>
              <li class="td_cell">
                {{ server.useYn }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        type="button"
        class="default_button"
      >
        수정
      </button>
      <button
        type="button"
        class="default_button"
      >
        추가
      </button>
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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      serverList: '',
      tgtUrl: '',
      svrIp: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    searchList() {
      this.tgtUrl = '/api/bizcomm/server';
      if (this.svrIp != null && this.svrIp !== '') {
        this.tgtUrl = `${this.tgtUrl}/ip/${this.svrIp}`;
      }
      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.serverList = res.data.rstData.serverList;
          } else {
            // eslint-disable-next-line no-alert
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
