<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 신청 목록
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
            @click="searchList"
          >
            검색
          </button>
          <button
            type="button"
            class="default_button on"
            @click="newApply"
          >
            신규신청
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-2">
          <label class="column_label">조회기간</label>
          <div class="calander_group first_cal">
            <input
              v-model="startReqDtm"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="startReqDtm"
              min="2019-6-1"
              :max="endReqDtm"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="log"
            />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">&nbsp;</label>
          <div class="calander_group">
            <input
              v-model="endReqDtm"
              type="text"
              value=""
            >
            <span class="calander">
              <i class="ico-cal" />
            </span>
            <datepicker
              :value="endReqDtm"
              :min="startReqDtm"
              max="2022-01-01"
              :day-str="datePickerSet.dayStr"
              :popper-props="datePickerSet.popperProps"
              @input="log2"
            />
          </div>
        </div>
        <div class="column w-4">
          <label class="column_label">검색어</label>
          <div class="search_group">
            <input
              v-model="reqTitle"
              type="text"
              value="Searching"
            >
          </div>
        </div>
      </div>
      <div class="table_grid">
        <div class="table_head w-auto">
          <ul>
            <li class="th_cell">
              신청번호
            </li>
            <li class="th_cell">
              신청제목
            </li>
            <li class="th_cell">
              진행상태
            </li>
            <li class="th_cell">
              등록일
            </li>
            <li class="th_cell">
              신청자
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(row) in ifReqList"
            :key="row.reqMgmtNum"
            class="table_row w-auto"
          >
            <li
              class="td_cell"
            >
              {{ row.reqMgmtNum }}
            </li>
            <li
              class="td_cell"
            >
              {{ row.reqTitle }}
            </li>
            <li
              class="td_cell"
            >
              {{ row.procSt }}
            </li>
            <li
              class="td_cell"
            >
              {{ row.reqDtm }}
            </li>
            <li
              class="td_cell"
            >
              {{ row.reqrNm }}({{ row.reqrId }})
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
          :click-handler="pageChanged"
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
import { mapState, mapActions } from 'vuex';
import { fetchGetIfRegList } from '@/api/ifRegApi';

export default {
  /* eslint-disable */
  data() {
    return {
      ifReqList: [],
      tgtUrl: '',
      startReqDtm: '',
      endReqDtm: '',
      reqTitle: '',
      pageSet: {pageNo: 1, pageCount:0, size:10},

      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    
  },
  mounted() {
    this.startReqDtm = this.$gf.dateToString(new Date(), '-7d', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    searchList() {
      //this.tgtUrl = '/api/ifreq/list';
      //this.$axios.get(this.tgtUrl, {
      fetchGetIfRegList({
        params: {
          pageNo: this.pageSet.pageNo,
          size: this.pageSet.size,
          reqTitle: this.reqTitle,
          startReqDtm: this.startReqDtm.replace(/\-/g, ''),
          endReqDtm: this.endReqDtm.replace(/\-/g, ''),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            //this.ifReqList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.ifReqMstList, 'Y');
            this.ifReqList = res.data.rstData.ifReqMstList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    pageChanged(pageNum) { 
      console.log(pageNum);
    },
    log(val) {
      this.startReqDtm = val;
      console.log(val);
    },
    log2(val) {
      this.endReqDtm = val;
      console.log(val);
    },
    newApply() {
      //ifReg/applyIf
      this.$router.push({ name: 'applyIf' });
    }
  },
}

</script>