<template>
  <div class="contents popup">
    <i class="dim" />
    <article
      class="layer_popup medium"
      @keydown.prevent.esc="closePop"
    >
      <section class="title style-2">
        <h2><i class="ico-bar" />가상 사용자 등록</h2>
      </section>
      <section class="form_area border_group">
        <h5 class="s_tit type-2">
          기본 정보
        </h5>
        <div class="row_contain type-2">
          <div class="column on w-2">
            <label class="column_label">채널ID</label>
            <div class="search_group">
              <input
                v-model="chnlId"
                type="text"
              >
            </div>
          </div>
          <div class="column w-2">
            <label class="column_label">채널명</label>
            <input
              v-model="chnlNm"
              type="text"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">소속팀명</label>
            <input
              v-model="vTeam"
              type="text"
            >
          </div>
        </div>
        <div class="row_contain type-2">
          <div class="column w-2">
            <label class="column_label">담당자</label>
            <input
              v-model="vHanNm"
              type="text"
            >
          </div>
          <div class="column w-2">
            <label class="column_label">상위조직</label>
            <input
              v-model="vOrg"
              type="text"
            >
          </div>
          <div class="column w-2" />
        </div>
      </section>

      <section class="btm_button_area">
        <button
          type="button"
          class="default_button"
          @click="closePop"
        >
          닫기
        </button>
        <button
          type="button"
          class="default_button on"
          @click="save()"
        >
          등록
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  fetchPutMcgReqVirtual,
} from '@/api/mcgApi';

export default {
  data() {
    return {
      chnlId: '',
      chnlNm: '',
      vTeam: '',
      vHanNm: '',
      vOrg: '',
    };
  },
  computed: {
    // ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
  },
  methods: {
    ...mapActions('ccCdLst', ['setCcCdList']),

    save() {
      console.log('가상사용자 정보 등록!');
      // this.$axios.post('/api/mcg/chnl/post', {
      fetchPutMcgReqVirtual({
        chnlId: this.chnlId,
        chnlNm: this.chnlNm,
        vTeam: this.vTeam,
        vHanNm: this.vHanNm,
        vOrg: this.vOrg,
      })
        .then((res) => {
          console.log(res);
          this.$gf.alertOn('가상사용자 추가 완료!');
          this.$emit('closePop', 'OK, Hellos');
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    closePop() {
      this.$emit('closePop', 'Hellos');
    },
  },
};
</script>
