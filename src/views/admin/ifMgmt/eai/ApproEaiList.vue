<template>
  <div class="right_space">
    <section class="title style-2">
      <h2>
        <div>
          <i class="ico-bar" />EAI 승인 완료 목록
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
        <!--
        <div class="right_button_area">
          <button
            type="button"
            class="default_button on"
            @click="getApproList"
          >
            승인 완료 조회
          </button>
        </div>
        -->
      </h5>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li
              class="th_cell"
              style="width:10%"
            >
              신청 번호
            </li>
            <li
              class="th_cell"
              style="width:30%"
            >
              인터페이스ID
            </li>
            <li
              class="th_cell"
              style="width:30%"
            >
              인터페이스명
            </li>
            <li class="th_cell">
              연동 방식
            </li>
            <li class="th_cell">
              단/양방향
            </li>
            <li class="th_cell">
              등록
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(eaiIf, i) in approList"
            :key="i"
            class="table_row w-auto"
          >
            <li class="td_cell">
              {{ eaiIf.reqNum }}
            </li>
            <li class="td_cell">
              {{ eaiIf.eaiIfId }}
            </li>
            <li class="td_cell">
              {{ eaiIf.eaiIfNmKor }}
            </li>
            <li class="td_cell">
              {{ eaiIf.ifTypNm }}
            </li>
            <li class="td_cell">
              {{ eaiIf.roundTypNm }}
            </li>
            <li class="td_cell">
              <button
                type="button"
                class="default_button on"
                @click="getRowData(eaiIf);movePage('ifIdListAdminMgmt', 1)"
              >
                등록
              </button>
            </li>
          </ul>
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
    <div class="right_button_area">
      <button
        type="button"
        class="default_button on"
        @click="movePage('ifIdListAdminMgmt', 0)"
      >
        신규 등록
      </button>
    </div>
  </div>
</template>

<style scoped>
ul:hover { background-color: #F9F9F9}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetEaiApproList } from '@/api/eaiApi';


export default {
  components: {
  },
  data() {
    return {

      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
      pageMoveChk: 0,

      reqNum: '',
      eaiIfSeq: '',
      eaiIfId: '',
      eaiIfNmKor: '',
      mqMngrNm: '',
      queueNm: '',
      useYn: '',
      eaiHub: '',
      ifTypCd: '',
      roundTypCd: '',
      hostNm: '',
      chrgrId: '',
      chrgrNm: '',
      rcvTr: '',
      ifTypNm: '',
      roundTypNm: '',

      ifList: [],
      approList: [],
      ifData: {},

    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
  },
  created() {
    this.getApproList();
  },
  mounted() {
  },
  methods: {

    ...mapActions('ccCdLst', ['setCcCdList']),
    pageMove() {
      this.pageMoveChk = 1;
      this.getApproList();
      this.pageMoveChk = 0;
    },
    getApproList() {
      fetchGetEaiApproList({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
        },

      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.approList = res.data.rstData.searchList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            this.$gf.alertOn('오류가 발생하였습니다. 관리자에게 문의 하세요.');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },

    getRowData(eaiIf) {
      this.ifData = eaiIf;
      console.log(this.ifData);
    },

    movePage(page, type) { // 페이지 이동
      // type == 0 : 신규 등록 화면 / type == 1 : 수정 화면
      if (type === 0) {
        this.$router.push({ name: page, params: { callType: 'new' } });
      } else if (type === 1) {
        this.$router.push({
          name: page,
          params: {
            callType: 'appro',
            approData: this.ifData,
          },
        });
      }
    },
  },
};

</script>
