<template>
  <section class="form_area border_group dashboard">
    <h5 class="s_tit type-2">
      신청 목록
      <i class="ico-set" />
    </h5>
    <div class="table_colgroup">
      <div class="table_grid radio_group">
        <div class="table_head w-auto">
          <tr>
            <td class="th_cell">
              번호
            </td>
            <td class="th_cell">
              신청제목
            </td>
            <td class="th_cell">
              진행상태
            </td>
            <td class="th_cell">
              등록일
            </td>
            <td class="th_cell">
              신청자
            </td>
          </tr>
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
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchGetIfRegList } from '@/api/ifRegApi';

export default {
  data() {
    return {
      ifReqList: [],
      tgtUrl: '',
      startReqDtm: '',
      endReqDtm: '',
      reqTitle: '',
      pageSet: { pageNo: 1, pageCount: 0, size: 10 },
    };
  },
  mounted() {
    this.startReqDtm = this.$gf.dateToString(new Date(), '-7d', 'Y');
    this.endReqDtm = this.$gf.dateToString(new Date(), '', 'Y');
    this.searchList(1);
  },
  methods: {
    setClass(procSt) {
      let rtnClass = '';
      console.log(`set class!! : ${procSt}`);
      switch (procSt) {
        case '1':
          rtnClass = 'label-default color-blue';
          break;
        case '2':
          rtnClass = 'label-default color-yellow';
          break;
        case '3':
          rtnClass = 'label-default color-gray';
          break;
        default:
          rtnClass = 'label-default color-black';
      }
      return rtnClass;
    },
    searchList(pageNo) {
      // this.tgtUrl = '/api/ifreq/list';
      // this.$axios.get(this.tgtUrl, {
      fetchGetIfRegList({
        params: {
          pageNo,
          size: this.pageSet.size,
          reqTitle: this.reqTitle,
          startReqDtm: this.startReqDtm.replace(/\-/g, ''),
          endReqDtm: this.endReqDtm.replace(/\-/g, ''),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            // this.ifReqList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.ifReqMstList, 'Y');
            this.ifReqList = res.data.rstData.ifReqMstList;
            this.pageSet = res.data.rstData.pageSet;
          } else {
            // eslint-disable-next-line no-alert
            // alert('failed');
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
      // ifReg/applyIf
      this.$router.push({ name: 'applyIf', params: { reqNum: null, callType: 'insert' } });
    },
    detail(i) {
      this.$router.push({ name: 'applyIf', params: { reqNum: this.ifReqList[i].reqNum, callType: 'update', procSt: this.ifReqList[i].procSt } });
    },
  },
};
</script>
