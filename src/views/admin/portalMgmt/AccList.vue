<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />사용자 계정 관리
        </div>
        <div class="breadcrumb">
          <span>포탈관리</span><em class="on">사용자 계정 관리</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">사용자ID</label>
          <input
            v-model="userId"
            type="text"
            value=""
            @keyup.enter="searchList()"
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">사용자명</label>
          <input
            v-model="hanNm"
            type="text"
            value=""
            @keyup.enter="searchList()"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">&nbsp;</label>
          <div class="right_button_area">
            <button
              type="button"
              class="default_button on"
              @click="searchList()"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div class="table_colgroup">
        <div class="table_grid radio_group">
          <div class="table_head w-auto">
            <tr>
              <td class="th_cell" />
              <td class="th_cell">
                사용자ID
              </td>
              <td class="th_cell">
                사용자명
              </td>
              <td class="th_cell">
                직급
              </td>
              <td class="th_cell">
                생년월일
              </td>
              <td class="th_cell">
                권한
              </td>
              <td class="th_cell">
                연락처
              </td>
              <td class="th_cell">
                핸드폰
              </td>
              <td class="th_cell">
                이메일
              </td>
              <td class="th_cell" />
            </tr>
          </div>
          <div class="table_body">
            <template v-if="userList === [] ||userList.length === 0">
              <tr class="table_row w-auto">
                <td
                  colspan="10"
                  class="td_cell"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(user, i) in userList"
                :key="user.userId"
                class="table_row w-auto"
              >
                <td class="td_cell">
                  {{ (i+1)+((pageSet.pageNo-1)*pageSet.size) }}
                </td>
                <td class="td_cell">
                  {{ user.userId }}
                </td>
                <td class="td_cell">
                  {{ user.hanNm }}
                </td>
                <td class="td_cell">
                  {{ user.ofcLvlNm }}
                </td>
                <td class="td_cell">
                  {{ user.juminNo }}
                </td>
                <td class="td_cell">
                  <div class="select_group">
                    <select v-model="user.userAuth">
                      <option
                        value="USER"
                      >
                        사용자
                      </option>
                      <option
                        value="ADMIN"
                      >
                        관리자
                      </option>
                    </select>
                  </div>
                </td>
                <td class="td_cell">
                  {{ user.offcPhonNum }}
                </td>
                <td class="td_cell">
                  {{ user.mblPhonNum }}
                </td>
                <td class="td_cell">
                  {{ user.emailAddr }}
                </td>
                <td class="td_cell">
                  <i
                    class="ico-edit"
                    @click="editList(i)"
                  />
                  <i
                    class="ico-del"
                    @click="resetPw(i)"
                  />
                </td>
              </tr>
            </template>
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
import { mapState, mapActions } from 'vuex';
import { fetchGetUserInfoList, fetchResetPasswdAdmin } from '@/api/loginApi';

export default {
  /* eslint-disable */
  data() {
    return {
      userList: [],
      tgtUrl: '',
      userId: '',
      hanNm: '',
      pageSet: {pageNo: 1, pageCount:0, size:10},
      pageMoveChk: 0,
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  mounted() {
    this.searchList();
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    pageMove(){
      this.pageMoveChk = 1;
      this.searchList();
      this.pageMoveChk = 0;
    },
    searchList() {
      //this.tgtUrl = '/api/user';
      //this.$axios.get(this.tgtUrl, {
      fetchGetUserInfoList({  
        params: {
          pageNo: this.pageMoveChk === 1 ? this.pageSet.pageNo : 1,
          pageCount: this.pageMoveChk === 1 ? this.pageSet.pageCount : 0,
          size: this.pageSet.size,
          userId: this.userId,
          hanNm: this.hanNm,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            //this.userList = this.$gf.parseRtnData(this.pageSet, res.data.rstData.userList, 'Y');
            this.userList = res.data.rstData.userList;
            this.pageSet = res.data.rstData.pageSet;
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      let confirmText = `[${this.userList[i].hanNm}]님 권한을 [${this.userList[i].userAuth}]로 변경할래요?`;
      this.$gf.confirmOn(confirmText, this.editCall, i);
    },
    editCall(i) {
      this.tgtUrl = `/api/user/auth/${this.userList[i].userId}`;
        this.$axios.put(this.tgtUrl, this.userList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
              this.$gf.alertOn(`반영되었습니다.`);
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
    },
    resetPw(i) {
      let confirmText = `${this.userList[i].hanNm}님 비밀번호 초기화를 하시겠습니까?`;
      this.$gf.confirmOn(confirmText, this.resetPwCall, i);
    },
    resetPwCall(i) {
      const reqData = {
        userId: this.userList[i].userId,
      };
      // 비밀번호 초기화;
      fetchResetPasswdAdmin(reqData)
      .then((res) => {
        if (res.data.rstCd === 'S') {
          console.log(res.headers);
          this.$gf.alertOn(`초기화되었습니다.`);
        } else {
          // eslint-disable-next-line no-alert
          // alert(res.data.rstMsg);
        }
      })
      .catch((ex) => {
        console.log(`error occur!! : ${ex}`);
      });
    },
    pageChanged(pageNum) { 
      console.log(pageNum);
    },
  },
};
</script>