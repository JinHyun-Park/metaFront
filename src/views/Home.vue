<template>
  <article class="contents index except">
    <!--
            <aside>
                <h3><i class="ico-bar-2"></i>EiGW Interface</h3>
                <ul class="lnb">
                    <li>I/F</li>
                    <li class="on">EAI</li>
                    <li>EiGW</li>
                    <li>MCG</li>
                    <li>EiGW</li>
                </ul>
            </aside>
-->
    <div class="right_space main">
      <section class="title style-1">
        <h2>
          <div>
            <i class="ico-bar" />Main Dashboard
          </div>
          <!-- <div class="breadcrumb">
            <span>EGIW</span><em class="on">EAI</em>
          </div> -->
        </h2>
      </section>
      <section class="form_area border_group dashboard">
        <h4 class="l_tit">
          모니터링
        </h4>
        <h5 class="s_tit type-2">
          거래량
          <div class="label_space">
            <label class="label-default on">EAI</label>
            <label class="label-default">EiGW</label>
            <label class="label-default">MCG</label>
          </div>
        </h5>
        <div class="row_contain chart_area">
          <reactive-bar-chart :chart-data="datacollection" />
          <div>
            <button
              class="button is-primary"
              @click="fillData()"
            >
              Randomize
            </button>
          </div>
        </div>
      </section>

      <div class="board_area">
        <section class="form_area border_group dashboard">
          <h4 class="l_tit">
            모니터링
          </h4>
          <h5 class="s_tit type-2">
            거래량
            <div class="label_space">
              <label class="label-default on">EAI</label>
              <label class="label-default">EiGW</label>
              <label class="label-default">MCG</label>
            </div>
          </h5>
          <div class="row_contain type-2 chart_area">
            <radar-chart />
          </div>
        </section>
        <section class="form_area border_group dashboard">
          <h4 class="l_tit">
            모니터링
          </h4>
          <h5 class="s_tit type-2">
            거래량
            <div class="label_space">
              <label class="label-default">EAI</label>
              <label class="label-default on">EiGW</label>
              <label class="label-default">MCG</label>
            </div>
          </h5>
          <div class="row_contain type-2 chart_area">
            <bar-chart />
          </div>
        </section>
        <section class="form_area border_group dashboard">
          <h4 class="l_tit">
            모니터링
          </h4>
          <h5 class="s_tit type-2">
            거래량
            <div class="label_space">
              <label class="label-default">EAI</label>
              <label class="label-default">EiGW</label>
              <label class="label-default on">MCG</label>
            </div>
          </h5>
          <div class="row_contain type-2 chart_area">
            <line-chart />
          </div>
        </section>
      </div>

      <div class="board_area">
        <section class="form_area border_group dashboard">
          <h5 class="s_tit type-2">
            공지사항
            <i class="ico-set" />
            <!--
                            <div class="right_button_area">
                                <button type="button" class="default_button on">검색</button>
                            </div>
    -->
          </h5>
          <div class="table_colgroup">
            <div class="table_grid radio_group">
              <div class="table_head w-auto">
                <ul>
                  <li class="th_cell" />
                  <li class="th_cell">
                    제목<i class="ico-sort-up" />
                  </li>
                  <!--<li class="th_cell">등록일<i class="ico-sort-up"></i></li>-->
                  <li class="th_cell" />
                </ul>
              </div>
              <div class="table_body">
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio on">
                      <input
                        id="chk_1"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_1"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">HERE IS SUBJECT TITLE</em>
                    2 documents2 documents22 documents2 docume
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_2"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_2"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are</em>
                    q sign
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_3"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_3"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Channel To Channel</em>
                    Ch to Ch
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_4"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_4"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are Couple Of Days</em>
                    2 documents2 documents2
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_5"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_5"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Documents Are</em>
                    q sign
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    <span class="default_radio">
                      <input
                        id="chk_6"
                        type="radio"
                        name="chk_1"
                      >
                      <label for="chk_6"><span /></label>
                    </span>
                  </li>
                  <li class="td_cell">
                    <em class="subject_tit">Channels are Variety Things</em>
                    Ch to Ch
                  </li>
                  <li class="td_cell text-right">
                    <i class="ico-edit" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="form_area border_group dashboard">
          <h5 class="s_tit type-2">
            Q&amp;A
            <i class="ico-set" />
          </h5>
          <div class="table_colgroup">
            <div class="table_grid">
              <div class="table_head w-auto">
                <ul>
                  <li class="th_cell">
&nbsp;
                  </li>
                  <li class="th_cell">
                    채널ID<i class="ico-sort-up" />
                  </li>
                  <li class="th_cell">
                    등록일<i class="ico-sort-up" />
                  </li>
                  <li class="th_cell">
                    신청자<i class="ico-sort-down" />
                  </li>
                </ul>
              </div>
              <div class="table_body">
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default color-green"><i class="ico-replying" />답변 중</label>
                  </li>
                  <li class="td_cell">
                    2 documents2 documents2 documents2 documents
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default color-green"><i class="ico-replying" />답변 중</label>
                  </li>
                  <li class="td_cell">
                    q sign
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Yourworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default color-green"><i class="ico-replying" />답변 중</label>
                  </li>
                  <li class="td_cell">
                    Ch to Ch
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Tworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default"><i class="ico-replyed" />답변완료</label>
                  </li>
                  <li class="td_cell">
                    Ch to Ch
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Tworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default"><i class="ico-replyed" />답변완료</label>
                  </li>
                  <li class="td_cell">
                    2 documents2 documents2 documents2 documents2 documents
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell reply">
                    <label class="label-default"><i class="ico-replyed" />답변완료</label>
                  </li>
                  <li class="td_cell">
                    q sign
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Yourworld
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="form_area border_group dashboard">
          <h5 class="s_tit type-2">
            가이드
            <i class="ico-set" />
          </h5>
          <div class="table_colgroup">
            <div class="table_grid">
              <div class="table_head w-auto">
                <ul>
                  <li class="th_cell">
                    업무코드<i class="ico-sort-down" />
                  </li>
                  <li class="th_cell">
                    채널ID<i class="ico-sort-up" />
                  </li>
                  <li class="th_cell">
                    등록일<i class="ico-sort-up" />
                  </li>
                  <li class="th_cell">
                    신청자<i class="ico-sort-down" />
                  </li>
                </ul>
              </div>
              <div class="table_body">
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2 documents2 documents2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1012
                  </li>
                  <li class="td_cell">
                    q sign
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Yourworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1013
                  </li>
                  <li class="td_cell">
                    Ch to Ch
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Tworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2 documents2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1012
                  </li>
                  <li class="td_cell">
                    q sign
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Yourworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1013
                  </li>
                  <li class="td_cell">
                    Ch to Ch
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Tworld
                  </li>
                </ul>
                <ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul><ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul><ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul><ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul><ul class="table_row w-auto">
                  <li class="td_cell">
                    1011
                  </li>
                  <li class="td_cell">
                    2 documents2
                  </li>
                  <li class="td_cell">
                    2019-08-07
                  </li>
                  <li class="td_cell">
                    Mywolrd
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script>
import LineChart from './chart/LineChart.vue';
import BarChart from './chart/BarChart.vue';
import ReactiveBarChart from './chart/ReactiveBarChart.vue';
import RadarChart from './chart/RadarChart.vue';

export default {
  name: 'Home',
  components: {
    'line-chart': LineChart,
    'bar-chart': BarChart,
    'reactive-bar-chart': ReactiveBarChart,
    'radar-chart': RadarChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  created() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            // Data for the x-axis of the chart
            data: [
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
              this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * 100) + 1;
    },
  },
};
</script>
