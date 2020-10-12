<template>
  <div class="right_space">
    <NewIfRegChose
      v-if="newIfRegChosePopup"
      v-bind="popupProp"
      @closePop="turnOffNewIfRegChose"
      @addData="addNewIfRegChose"
    />
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />인터페이스 신청 목록
        </div>
        <div class="breadcrumb">
          <span>인터페이스 신청</span><em class="on">신청 목록</em>
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
            @click="searchList(1)"
          >
            검색
          </button>
          <button
            type="button"
            class="default_button on"
            @click="turnOnNewIfRegChose"
          >
            신규신청
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
              @keyup.enter="searchList(1)"
            >
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">관련 인터페이스</label>
          <div class="table_body">
            <ul class="table_row w-auto">
              <li class="td_cell">
                <input
                  v-model="boardIF"
                  type="checkbox"
                  name="interface"
                  value="EAI"
                > <label>EAI</label>
              </li>
              <li class="td_cell">
                <input
                  v-model="boardIF"
                  type="checkbox"
                  name="interface"
                  value="EiGW"
                > <label>EiGW</label>
              </li>
              <li class="td_cell">
                <input
                  v-model="boardIF"
                  type="checkbox"
                  name="interface"
                  value="MCG"
                > <label>MCG</label>
              </li>
            </ul>
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
              종류
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
            <li class="td_cell on">
              <label
                v-if="(row.ifKind === 'EAI')"
                class="label-default color-green on"
              >
                EAI
              </label>
              <label
                v-else-if="(row.ifKind === 'EIGW')"
                class="label-default color-blue on"
              >
                EiGW
              </label>
              <label
                v-else-if="(row.ifKind === 'MCG')"
                class="label-default color-yellow on"
              >
                MCG
              </label>
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
                class="tooltips right"
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
              v-if="row.aprvId !== null"
              class="td_cell"
            >
              {{ row.aprvNm }}({{ row.aprvId }})
            </li>
            <li
              v-else
              class="td_cell"
            />
          </ul>
        </div>
      </div>
      <div class="pagination_space">
        <paginate
          v-model="pageSet.pageNo"
          :page-count="pageSet.pageCount"
          :page-range="3"
          :margin-pages="1"
          :click-handler="searchList"
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
import NewIfRegChose from '@/components/popup/ifRegInfo/NewIfRegChose.vue';

export default {
  /* eslint-disable */
  components: {
    NewIfRegChose,
  },
  data() {
    return {
      ifReqList: [],
      procStCd: '',
      tgtUrl: '',
      tgtProcSt: '',
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

      boardIF: [],
      newIfRegChosePopup: false,
      popupProp: {
        procSt: 0,
      },
      ifKind: 'EAI',

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
    this.startReqDtm = this.$gf.dateToString(new Date(), '-90d', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'PROC_ST', allYn: 'Y', listNm: 'procStCd',
    });
    this.searchList(1);
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    ...mapActions('ccCdLst', ['setCcCdList']),

    tooltipYn(row) {
      console.log(row ,this.tooltip[row]);
      return this.tooltip[row];
    },
    setClass(procSt) {
      let rtnClass = "";
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
    searchList(pageNo) {
      //this.tgtUrl = '/api/ifreq/list';
      //this.$axios.get(this.tgtUrl, {
      fetchGetIfRegList({
        params: {
          pageNo: pageNo,
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
    newApply() {
      //ifReg/applyIf
      //this.$router.push({ name: 'applyIf', params: { reqNum: null, callType:'insert' }})
      this.$router.push({ name: 'newApplyIf', params: { reqNum: null, callType:'insert', ifKind: this.ifKind }})
    },
    detail(i) {
      //this.$router.push({ name: 'applyIf', params: { reqNum: this.ifReqList[i].reqNum, callType:'update', procSt: this.ifReqList[i].procSt }})
      this.$router.push({ name: 'newApplyIf', params: { reqNum: this.ifReqList[i].reqNum, callType:'update', procSt: this.ifReqList[i].procSt, ifKind:  this.ifReqList[i].ifKind }})
    },
    turnOnNewIfRegChose() {
      //this.popupProp.procSt = this.tgtProcSt;
      this.newIfRegChosePopup = true;
    },
    turnOffNewIfRegChose(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.newIfRegChosePopup = false;
    },
    addNewIfRegChose(val) {
      this.newIfRegChosePopup = false;
      this.ifKind = val;
      this.newApply();
    },
  },
}

</script>



<style scoped>
.td_cell {
  font-size: 16px;
  padding-right: 20px;
}
</style>
