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
            @click="searchList()"
          >
            검색
          </button>
        </div>
      </h5>
      <div class="row_contain type-3">
        <div class="column on w-1">
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
        <div class="column w-1">
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
        <div class="column w-2">
          <label class="column_label">진행상태</label>
          <div class="select_group">
            <select v-model="tgtProcSt">
              <option
                v-for="(code, i) in ccCdList.procStCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
          </div>
        </div>
        <div class="column w-4">
          <label class="column_label">신청제목</label>
          <div class="search_group">
            <input
              v-model="reqTitle"
              type="text"
              value=""
              @keyup.enter="searchList()"
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
            <li class="th_cell">
              승인자
            </li>
            <li class="th_cell" />
          </ul>
        </div>
        <div class="table_body">
          <ul
            v-for="(row, i) in ifReqList"
            :key="row.reqNum"
            class="table_row w-auto"
          >
            <li
              class="td_cell"
            >
              {{ row.reqNum }}
            </li>
            <li
              class="td_cell"
            >
              <label
                style="cursor:pointer;text-decoration: underline; width:40%;"
                @click="detail(i)"
              >
                {{ row.reqTitle }}

              </label>
            </li>
            <li class="td_cell">
              <label
                :class="setClass(row.procSt)"
              >
                {{ row.procNm }}
              </label>
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
            <li
              class="td_cell"
            >
              {{ row.aprvNm }}({{ row.aprvId }})
            </li>
            <li class="td_cell">
              <label
                class="tooltips right"
                :class="setIfBtnClass(row.eaiCnt, row.eaiProcSt)"
                @click="detail('EAI',i)"
              >
                EAI({{ row.eaiCnt }})
                <span
                  v-if="(row.eaiCnt > 0)"
                  class="tip_contn"
                >
                  <em class="tip_text">
                    {{ procNmList[row.eaiProcSt] }}
                  </em></span>
              </label>&nbsp;
              <label
                class="tooltips right"
                :class="setIfBtnClass(row.eigwCnt, row.eigwProcSt)"
                @click="detail('EIGW',i)"
              >
                EIGW({{ row.eigwCnt }})
                <span
                  v-if="(row.eigwCnt > 0)"
                  class="tip_contn"
                >
                  <em class="tip_text">
                    {{ procNmList[row.eigwProcSt] }}
                  </em></span>
              </label>&nbsp;
              <label
                class="tooltips right"
                :class="setIfBtnClass(row.mcgCnt, row.mcgProcSt)"
                @click="detail('MCG',i)"
              >
                MCG({{ row.mcgCnt }})
                <span
                  v-if="(row.mcgCnt > 0)"
                  class="tip_contn"
                >
                  <em class="tip_text">
                    {{ procNmList[row.mcgProcSt] }}
                  </em></span>
              </label>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { fetchGetIfRegListAdmin } from '@/api/ifRegApi';

export default {
  /* eslint-disable */
  data() {
    return {
      ifReqList: [],
      procStCd: '',
      tgtUrl: '',
      tgtProcSt: '3',
      startReqDtm: '',
      endReqDtm: '',
      reqTitle: '',
      pageSet: {pageNo: 1, pageCount:0, size:10},
      pageMoveChk: 0,
      datePickerSet: {
        dayStr: this.$gf.getCalDaySet(),
        popperProps: {
          type: Object,
        },
      },

      procNmList: {
        '1': '임시저장',
        '2': '승인요청',
        '3': '접수중',
        '4': '개발적용완료',
        '5': '운영반영완료', 
      }
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
    ...mapState('ccCdLst', ['ccCdList']),
    
  },
  mounted() {
    this.startReqDtm = this.$gf.dateToString(new Date(), '-7d', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'PROC_ST', allYn: 'Y', listNm: 'procStCd',
    });
    this.searchList();
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),
    setClass(procSt) {
      let rtnClass = "";
      console.log(`set class!! : ${procSt}`);
      switch(procSt) {
        case '1':
          rtnClass = 'label-default color-gray';
          break;
        case '2':
          rtnClass = 'label-default color-yellow';
          break;
        case '3':
          rtnClass = 'label-default color-green';
          break;
        case '4':
          rtnClass = 'label-default color-black';
          break;
        default:
          rtnClass = 'label-default color-blue';
      }
      return rtnClass;
    },
    setIfBtnClass(cnt, procSt) {
      let rtnClass = "";
      if (cnt > 0) {
        rtnClass = 'label-default color-gray';
      } else {
        switch(procSt) {
          case '1':
            rtnClass = 'label-default color-gray';
            break;
          case '2':
            rtnClass = 'label-default color-yellow';
            break;
          case '3':
            rtnClass = 'label-default color-green';
            break;
          case '4':
            rtnClass = 'label-default color-black';
            break;
          default:
            rtnClass = 'label-default color-blue';
        }
      }

      return rtnClass;
    },
    pageMove(){
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      //this.tgtUrl = '/api/ifreq/list';
      //this.$axios.get(this.tgtUrl, {
      fetchGetIfRegListAdmin({
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          reqTitle: this.reqTitle,
          procSt: this.tgtProcSt,
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
            //alert('failed');
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
    detail(option,i) {
      if (option === 'EAI') {
        if (this.ifReqList[i].eaiCnt > 0) {
          this.$router.push({ name: 'regStepAdminEai', params: { reqNum: this.ifReqList[i].reqNum, procSt: this.ifReqList[i].procSt }})
        }
      } else if (option === 'EIGW') {
        if (this.ifReqList[i].eigwCnt > 0) {
          this.$router.push({ name: 'regStepAdminEigw', params: { reqNum: this.ifReqList[i].reqNum, procSt: this.ifReqList[i].procSt }})
        }
      } else if (option === 'MCG') {
        if (this.ifReqList[i].mcgCnt > 0) {
          this.$router.push({ name: 'regStepAdminMcg', params: { reqNum: this.ifReqList[i].reqNum, procSt: this.ifReqList[i].procSt }})
        }
      } else {
        this.$router.push({ name: 'regStepAdminAll', params: { reqNum: this.ifReqList[i].reqNum, procSt: this.ifReqList[i].procSt }})
      } 
    }
  },
}

</script>