<template>
  <div class="right_space">
    <section class="title style-1">
      <h2>
        <div>
          <i class="ico-bar" />공통 코드 관리
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        기본 정보
      </h5>
      <div class="row_contain type-3 last">
        <div class="column on w-2">
          <label class="column_label">코드구분</label>
          <select v-model="opClCd">
            <option
              value="COMM"
            >
              공통
            </option>
            <option
              value="EAI"
            >
              EAI
            </option>
            <option
              value="EIGW"
            >
              EIGW
            </option>
            <option
              value="MCG"
            >
              MCG
            </option>
          </select>
        </div>
        <div class="column on w-2">
          <label class="column_label">코드ID</label>
          <input
            v-model="cdId"
            type="text"
            value=""
          >
        </div>
        <div class="column on w-2">
          <label class="column_label">코드상세ID</label>
          <input
            v-model="cdDtlId"
            type="text"
            value=""
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
            <ul>
              <li class="th_cell" />
              <li class="th_cell">
                사용자ID
              </li>
              <li class="th_cell">
                사용자명
              </li>
              <li class="th_cell">
                직급
              </li>
              <li class="th_cell">
                생년월일
              </li>
              <li class="th_cell">
                권한
              </li>
              <li class="th_cell">
                연락처
              </li>
              <li class="th_cell">
                핸드폰
              </li>
              <li class="th_cell">
                이메일
              </li>
              <li class="th_cell" />
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(ccCd, i) in ccCdLst"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                {{ i+1 }}
              </li>
              <li class="td_cell">
                {{ ccCd.opClCd }}
              </li>
              <li class="td_cell">
                {{ ccCd.cdId }}
              </li>
              <li class="td_cell">
                {{ ccCd.cdDtlCd }}
              </li>
              <li class="td_cell">
                {{ ccCd.cdNm }}
              </li>
              <li class="td_cell">
                <div class="select_group">
                  <select v-model="ccCd.useYn">
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
                <i
                  class="ico-del"
                  @click="delList(i)"
                />
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
  /* eslint-disable */
  data() {
    return {
      ccCdLst: [],
      tgtUrl: '',
      opClCd: '',
      cdId: '',
      cdDtlId: '',
    };
  },
  computed: {
    ...mapState('frameSet', ['resetPopOn']),
  },
  methods: {
    ...mapActions('frameSet', ['setResetPopOn']),
    searchList() {
      this.tgtUrl = '/api/bizcomm/cccd';

      this.$axios.get(this.tgtUrl)
        .then((res) => {
          console.log(res);
          if (res.data.rstCd === 'S') {
            this.ccCdLst = res.data.rstData.ccCdLst;
          } else {
            // eslint-disable-next-line no-alert
            alert('failed');
          }
        })
        .catch((ex) => {
          console.log(`error occur!! : ${ex}`);
        });
    },
    editList(i) {
      if (confirm(`${this.userList[i].chrgrInfo.hanNm}님 권한을 ${this.userList[i].userAuth}로 변경할래요?`)) {
        // to-do userAuth값을 변경;
        this.tgtUrl = `/api/user/${this.userList[i].userId}`;
        this.$axios.put(this.tgtUrl, this.userList[i])
          .then((res) => {
            console.log(res);
            if (res.data.rstCd === 'S') {
            // eslint-disable-next-line no-alert
              alert('success');
            } else {
            // eslint-disable-next-line no-alert
              alert('failed');
            }
          })
          .catch((ex) => {
            console.log(`error occur!! : ${ex}`);
          });
      }
    },
    delList(i) {
      if (confirm(`${this.userList[i].chrgrInfo.hanNm}님 계정을 정말 삭제할래요?`)) {
        // to-do use_yn을 n으로 변경;
      }
    },
  },
};
</script>
