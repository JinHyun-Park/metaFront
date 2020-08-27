<template>
  <div class="right_space">
    <EaiQueueListPopup
      v-if="svrOn"
      v-bind="props"
      @closePop="turOffSvrPop"
      @addData="addData"
    />
    <!-- EAI 서버리스트 팝업 호출 -->
    <EaiServerListPopup
      v-if="svrOnServer"
      v-bind="propsServer"
      @closePop="turOffSvrPopServer"
      @returnData="getData"
    />
    <ChrgrListPopup
      v-if="svrOnChrgr"
      v-bind="propsChrgr"
      @closePop="turOffSvrPopChrgr"
      @addData="addDataChrgr"
    />
    <section class="title style-2">
      <h2>
        <div>
          <i class="ico-bar" />EAI 인터페이스 등록
        </div>
        <div class="breadcrumb">
          <span>EGIW</span><em class="on">EAI</em>
        </div>
      </h2>
    </section>

    <section class="sub_info">
      <h4 class="sub_tit">
        사용자 안내
      </h4>
      <ul class="sub_list">
        <li>
          정보시스템 서비스 운영자가 자체 개선을 위해 변경 작업 등이 필요한 경우 작성하는 요청서입니다.
        </li>
        <li>
          고객 또는 현업 사용자 요청을 대리 등록할 수 없습니다.
        </li>
        <li>
          요청서 제출 후 변경계획서를 작성할 수 있습니다.
        </li>
      </ul>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        기본 정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label"> EAI 인터페이스ID</label>
          <input
            v-model="ifDetailInfo.eaiIfId"
            type="text"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">인터페이스명</label>
          <input
            v-model="ifDetailInfo.eaiIfNmKor"
            type="text"
            maxlength="80"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">연동 목적</label>
          <input
            v-model="ifDetailInfo.ifDesc"
            type="text"
          >
        </div>
        <div class="column w-1">
          <label class="column_label">사용 여부</label>
          <div class="select_group">
            <select
              v-model="ifDetailInfo.useYn"
            >
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
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain">
        <div class="column w-1">
          <label class="column_label">EAI HUB</label>
          <div class="select_group">
            <select
              v-model="ifDetailInfo.eaiHub"
            >
              <option
                value="1"
              >
                1
              </option>
              <option
                value="2"
              >
                2
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">브로커 사용 여부</label>
          <div class="select_group">
            <select
              v-model="ifDetailInfo.brkUseYn"
            >
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
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">연동 방식</label>
          <div class="select_group">
            <select
              v-model="ifDetailInfo.ifTypCd"
              @change="onChangeIfTypCd()"
            >
              <option
                v-for="(code, i) in ccCdList.ifTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">단/양방향</label>
          <div class="select_group">
            <select
              ref="selectRound"
              v-model="ifDetailInfo.roundTypCd"
              @click="checkIfTyp()"
              @change="onChangeRoundTypCd()"
            >
              <option
                v-for="(code, i) in ccCdList.roundTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">요청 처리 방식</label>
          <div class="select_group">
            <select
              ref="selectSync"
              v-model="ifDetailInfo.syncTypCd"
              @click="checkRoundTyp()"
            >
              <option
                v-for="(code, i) in ccCdList.syncTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-1">
          <label class="column_label">수신 전문 처리 주기</label>
          <div class="select_group">
            <select v-model="ifDetailInfo.rcvOpCd">
              <option
                v-for="(code, i) in ccCdList.rcvOpCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">수신TR (SWING만 해당)</label>
          <input
            ref="rcvTrInput"
            v-model="ifDetailInfo.rcvTr"
            type="text"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        File 연동
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">파일 연동 방식</label>
          <div class="select_group">
            <select
              ref="selectFileIfTypCd"
              v-model="ifDetailInfo.fileIfTypCd"
            >
              <option
                v-for="(code, i) in ccCdList.fileIfTypCd"
                :key="i"
                :value="code.cdDtlId"
              >
                {{ code.cdNm }}
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">송신 디렉토리</label>
          <input
            ref="sndDirInput"
            v-model="ifDetailInfo.sndDir"
            type="text"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">수신 디렉토리</label>
          <input
            ref="rcvDirInput"
            v-model="ifDetailInfo.rcvDir"
            type="text"
          >
        </div>
        <div class="column w-4">
          <label class="column_label">수신 실행 Shell</label>
          <input
            ref="rcvShNmInput"
            v-model="ifDetailInfo.rcvShNm"
            type="text"
            placeholder="파일 수신 후 자동 실행이 필요한 Shell 기입(경로 포함)"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">OP code</label>
          <input
            ref="fileOpCodeInput"
            v-model="ifDetailInfo.fileOpCode"
            type="text"
            maxlength="10"
            oninput="this.value = this.value.toUpperCase()"
            placeholder="Shell 등록을 위한 구분 값 (영문/숫자)"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-3">
        송신 업무/담당자 정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">MID</label>
          <input
            v-model="ifDetailInfo.sndMid"
            type="text"
            placeholder="MID 없는 경우 시스템명 약자 입력"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영 담당자1</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrNm1"
              type="text"
              @click="turnOnSvrPopChrgr(1)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(1)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrOrgNm1"
              type="text"
              readonly
            >
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">운영 담당자2</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrNm2"
              type="text"
              @click="turnOnSvrPopChrgr(2)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(2)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrOrgNm2"
              type="text"
              readonly
            >
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">업무 담당 매니저</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrMngrNm"
              type="text"
              @click="turnOnSvrPopChrgr(3)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(3)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.sndChrgrMngrOrgNm"
              type="text"
              readonly
            >
          </div>
        </div>
      </div>
      <h5 class="s_tit type-3">
        수신 업무/담당자 정보
      </h5>
      <div class="row_contain">
        <div class="column w-2">
          <label class="column_label">MID</label>
          <input
            v-model="ifDetailInfo.rcvMid"
            type="text"
            placeholder="MID 없는 경우 시스템명 약자 입력"
            oninput="this.value = this.value.toUpperCase()"
          >
        </div>
        <div class="column w-2">
          <label class="column_label">운영 담당자1</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrNm1"
              type="text"
              @click="turnOnSvrPopChrgr(4)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(4)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrOrgNm1"
              type="text"
              readonly
            >
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">운영 담당자2</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrNm2"
              type="text"
              @click="turnOnSvrPopChrgr(5)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(5)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrOrgNm2"
              type="text"
              readonly
            >
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">업무 담당 매니저</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrMngrNm"
              type="text"
              @click="turnOnSvrPopChrgr(6)"
            >
            <span class="search">
              <i
                class="ico-search"
                @click="turnOnSvrPopChrgr(6)"
              />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">소속</label>
          <div class="search_group">
            <input
              v-model="ifDetailInfo.rcvChrgrMngrOrgNm"
              type="text"
              readonly
            >
          </div>
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit type-2">
        송신 시스템 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%"
              >
                시스템명
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                Hostname
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP  ( VIP or 대표 IP )
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP ( NAT IP )
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP ( 추가 )
              </li>
              <li class="th_cell">
                OS
              </li>
              <li class="th_cell">
                담당 회사
              </li>
              <li class="th_cell">
                Edit
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(sndRow, n) in sndRows"
              :key="n"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="sndRow.sysNm"
                  type="text"
                  @click="turnOnSvrPopServer('S', n)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="sndRow.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addSndRow(n)"
                />
                <i
                  class="ico-del"
                  @click="removeSndRow(sndRow)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h5 class="s_tit type-2">
        수신 시스템 정보
      </h5>
      <div class="table_colgroup">
        <div class="table_grid tb_layout">
          <div class="table_head w-auto">
            <ul>
              <li
                class="th_cell"
                style="width:10%"
              >
                시스템명
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                Hostname
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP ( VIP or 대표 IP )
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP ( NAT IP )
              </li>
              <li
                class="th_cell"
                style="width:10%"
              >
                IP ( 추가 )
              </li>
              <li class="th_cell">
                OS
              </li>
              <li class="th_cell">
                담당 회사
              </li>
              <li class="th_cell">
                Edit
              </li>
            </ul>
          </div>
          <div class="table_body">
            <ul
              v-for="(rcvRow, i) in rcvRows"
              :key="i"
              class="table_row w-auto"
            >
              <li class="td_cell">
                <input
                  v-model="rcvRow.sysNm"
                  type="text"
                  @click="turnOnSvrPopServer('R', i)"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.hostNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.vIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.natIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.etcIp"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.osNm"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <input
                  v-model="rcvRow.company"
                  type="text"
                >
              </li>
              <li class="td_cell">
                <i
                  class="ico-add"
                  @click="addRcvRow(i)"
                />
                <i
                  class="ico-del"
                  @click="removeRcvRow(rcvRow)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="grid_form border_group">
      <h5 class="s_tit type-2">
        Queue 상세 정보
        <div class="right_button_area">
          <button
            type="button"
            class="default_button extend on"
            @click="resetQInfo()"
          >
            Reset
          </button>
        </div>
      </h5>
      <div class="division_row">
        <div>
          <label class="column_label">요청 송신 OUT</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(1)"
          >
            <input
              v-model="qInfo.qType01Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType01"
            type="text"
            value=""
          >
          <label class="column_label">요청 송신 XQ</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(2)"
          >
            <input
              v-model="qInfo.qType02Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType02"
            type="text"
            value=""
          >
          <label class="column_label">HUB 요청 수신 IN</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(3)"
          >
            <input
              v-model="qInfo.qType03Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType03"
            type="text"
            value=""
          >
          <label class="column_label">HUB 요청 송신 OUT</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(4)"
          >
            <input
              v-model="qInfo.qType04Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType04"
            type="text"
            value=""
          >
          <label class="column_label">HUB 요청 XQ</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(5)"
          >
            <input
              v-model="qInfo.qType05Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType05"
            type="text"
            value=""
          >
          <label class="column_label">요청 수신 IN</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(6)"
          >
            <input
              v-model="qInfo.qType06Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType06"
            type="text"
            value=""
          >
        </div>
        <div>
          <label class="column_label">응답 회신 OUT</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(7)"
          >
            <input
              v-model="qInfo.qType07Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType07"
            type="text"
            value=""
          >
          <label class="column_label">응답 회신 XQ</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(8)"
          >
            <input
              v-model="qInfo.qType08Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType08"
            type="text"
            value=""
          >
          <label class="column_label">HUB 응답 회신 IN</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(9)"
          >
            <input
              v-model="qInfo.qType09Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType09"
            type="text"
            value=""
          >
          <label class="column_label">HUB 응답 회신 OUT</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(10)"
          >
            <input
              v-model="qInfo.qType10Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType10"
            type="text"
            value=""
          >
          <label class="column_label">HUB 응답 회신 XQ</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(11)"
          >
            <input
              v-model="qInfo.qType11Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType11"
            type="text"
            value=""
          >
          <label class="column_label">응답 수신 IN</label>
          <div
            class="search_group"
            @click="turnOnSvrPop(12)"
          >
            <input
              v-model="qInfo.qType12Mngr"
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            v-model="qInfo.qType12"
            type="text"
            value=""
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group">
      <h5 class="s_tit">
        참고 사항
      </h5>
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">장애 영향도</label>
          <textarea
            v-model="ifDetailInfo.svcImpt"
            cols="50"
            rows="3"
          />
        </div>
        <div class="column w-3">
          <label class="column_label">비고</label>
          <textarea
            v-model="ifDetailInfo.eaiRmk"
            cols="50"
            rows="3"
          />
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button
        v-if="callType === 'new' || callType === 'appro'"
        class="default_button on"
        @click="movePage('approEaiList')"
      >
        목록
      </button>
      <button
        v-if="callType === 'update'"
        class="default_button on"
        @click="movePage('ifIdList')"
      >
        목록
      </button>
      <button
        v-if="callType === 'new' || callType === 'appro'"
        class="default_button on"
        @click="saveEaiInterfaceInfo()"
      >
        등록
      </button>
      <button
        v-if="callType === 'update'"
        class="default_button"
        @click="updateEaiInterfaceInfo()"
      >
        수정
      </button>
    </section>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import EaiQueueListPopup from '@/components/popup/meta/eai/QueueListPopup.vue';
import EaiServerListPopup from '@/components/popup/meta/eai/EaiServerListPopup.vue';
import ChrgrListPopup from '@/components/popup/bizcomm/ChrgrListPopup.vue';
import { fetchGetEaiIfDetailInfo } from '@/api/eaiApi';

export default {
  components: {
    EaiQueueListPopup,
    EaiServerListPopup,
    ChrgrListPopup,
  },
  data() {
    return {
      svrOn: false,
      svrOnServer: false,
      svrOnChrgr: false,
      props: { // 조회 시 parameter에 사용자 정보를 담아주려면 여기를 통해 넘겨주세요.
        message: '', // 사용방법 예시 데이터
      },
      propsServer: {
        message: '',
      },
      propsChrgr: {
        message: '',
      },

      serverPopupCase: '',

      qsign11: '',
      qsign12: '',
      qsignNm11: '',
      qsignNm12: '',

      idx: '',

      eaiIfSeq: '',

      eaiIfInfo: {},
      svrList: [],
      qInfo: {},

      callType: '',

      pEaiIfId: '',
      pEaiIfNmKor: '',
      pIfTypCd: '',
      pRoundTypCd: '',
      pEaiHub: '',
      pMqMngrNm: '',
      pQueueNm: '',
      pRcvTr: '',
      pHostNm: '',
      pChrgrId: '',
      pUseYn: '',


      ifDetailInfo: {
        reqNum: '',
        eaiReqIfNum: '',
        eaiIfSeq: '',
        eaiIfId: '',
        eaiIfNmKor: '',
        ifDesc: '',
        eaiHub: '',
        brkUseYn: '',
        ifTypCd: '',
        roundTypCd: '',
        syncTypCd: '',
        rcvOpCd: '',
        rcvTr: '',
        fileIfTypCd: '',
        sndDir: '',
        rcvDir: '',
        rcvShNm: '',
        fileOpCode: '',
        sndMid: '',
        sndChrgrId1: '',
        sndChrgrNm1: '',
        sndChrgrId2: '',
        sndChrgrNm2: '',
        sndChrgrMngrId: '',
        sndChrgrMngrNm: '',
        rcvMid: '',
        rcvChrgrId1: '',
        rcvChrgrNm1: '',
        rcvChrgrId2: '',
        rcvChrgrNm2: '',
        rcvChrgrMngrId: '',
        rcvChrgrMngrNm: '',
        sndChrgrOrgNm1: '',
        sndChrgrOrgNm2: '',
        sndChrgrMngrOrgNm: '',
        rcvChrgrOrgNm1: '',
        rcvChrgrOrgNm2: '',
        rcvChrgrMngrOrgNm: '',
        svcImpt: '',
        eaiRmk: '',
        useYn: '',
      },

      sndRows: [
        {
          eaiIfSeq: '',
          sndRcvCl: '',
          sysTypCd: '',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          etcIp: '',
          osNm: '',
          company: '',
          procSt: '',
        },
      ],
      rcvRows: [
        {
          eaiIfSeq: '',
          sndRcvCl: '',
          sysTypCd: '',
          svrTypCd: '',
          sysNm: '',
          hostNm: '',
          vIp: '',
          natIp: '',
          etcIp: '',
          osNm: '',
          company: '',
          procSt: '',
        },
      ],

    };
  },
  computed: {
    ...mapState('ccCdLst', ['ccCdList']),
  },
  created() {
    if (this.$route.params.callType === 'update') {
      this.eaiIfSeq = this.$route.params.eaiIfSeq;
      this.callType = this.$route.params.callType;

      // EAI 인터페이스 목록 조회 조건 값들을 유지하기 위해 할당
      this.pEaiIfId = this.$route.params.eaiIfId;
      this.pEaiIfNmKor = this.$route.params.eaiIfNmKor;
      this.pIfTypCd = this.$route.params.ifTypCd;
      this.pRoundTypCd = this.$route.params.roundTypCd;
      this.pEaiHub = this.$route.params.eaiHub;
      this.pMqMngrNm = this.$route.params.mqMngrNm;
      this.pQueueNm = this.$route.params.queueNm;
      this.pRcvTr = this.$route.params.rcvTr;
      this.pHostNm = this.$route.params.hostNm;
      this.pChrgrId = this.$route.params.chrgrId;
      this.pUseYn = this.$route.params.useYn;

      this.getEaiInterfaceInfo();
    } else if (this.$route.params.callType === 'new') {
      this.callType = this.$route.params.callType;
    } else if (this.$route.params.callType === 'appro') {
      this.callType = this.$route.params.callType;
      this.ifDetailInfo = this.$route.params.approData;
    }
  },
  mounted() {
    this.setCcCdList({
      opClCd: 'COMM', cdId: 'SVR_TYP_CD', allYn: 'N', listNm: 'svrTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'ROUND_TYP_CD', allYn: 'N', listNm: 'roundTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'IF_TYP_CD', allYn: 'N', listNm: 'ifTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'SYNC_TYP_CD', allYn: 'N', listNm: 'syncTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'RCV_OP_CD', allYn: 'N', listNm: 'rcvOpCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'FILE_IF_TYP_CD', allYn: 'N', listNm: 'fileIfTypCd',
    });
    this.setCcCdList({
      opClCd: 'EAI', cdId: 'SYS_TYP_CD', allYn: 'N', listNm: 'sysTypCd',
    });
  },
  methods: {

    ...mapActions('ccCdLst', ['setCcCdList']),


    getEaiInterfaceInfo() {
      fetchGetEaiIfDetailInfo({
        params: {
          eaiIfSeq: this.eaiIfSeq,
        },
      })
        .then((res) => {
          console.log(res);
          this.ifDetailInfo = res.data.rstData.ifInfo;

          this.eaiIfSeq = this.ifDetailInfo.eaiIfSeq;

          if (res.data.rstData.svrList) {
            this.svrList = res.data.rstData.svrList;
          }
          if (res.data.rstData.qInfo) {
            this.qInfo = res.data.rstData.qInfo;
          }
          this.sndRows.splice(0, this.sndRows.length);
          this.rcvRows.splice(0, this.rcvRows.length);

          for (let i = 0; i < this.svrList.length; i++) {
            if (this.svrList[i].sndRcvCl === 'S') {
              this.sndRows.push(this.svrList[i]);
            } else {
              this.rcvRows.push(this.svrList[i]);
            }
          }

          this.changeRoundStatus(1);
          this.changeSyncStatus(1);
        })
        .catch((ex) => {
          console.log(`error occur!!: ${ex}`);
        });
    },

    saveEaiInterfaceInfo() {
      if (this.ifDetailInfo.eaiIfId === '') {
        this.$gf.alertOn('EAI 인터페이스ID를 입력해주세요.');
        return;
      }
      if (this.sndRows[0].hostNm === '') {
        this.$gf.alertOn('송신 시스템 정보를 입력해주세요.');
        return;
      }
      if (this.rcvRows[0].hostNm === '') {
        this.$gf.alertOn('수신 시스템 정보를 입력해주세요.');
        return;
      }
      this.$gf.confirmOn('EAI 인터페이스 정보를 등록 하시겠습니까?', this.insertEaiInterfaceData);
    },
    insertEaiInterfaceData() {
      if (this.eaiIfSeq === '') {
        this.svrList.splice(0, this.svrList.length);

        for (let i = 0; i < this.sndRows.length; i++) {
          if (this.sndRows[i].hostNm !== '') {
            this.sndRows[i].sndRcvCl = 'S';
            this.svrList.push(this.sndRows[i]);
          }
        }
        for (let i = 0; i < this.rcvRows.length; i++) {
          if (this.rcvRows[i].hostNm !== '') {
            this.rcvRows[i].sndRcvCl = 'R';
            this.svrList.push(this.rcvRows[i]);
          }
        }

        console.log(this.sndRows.length);
        console.log(this.svrList.length);
        this.eaiIfInfo = {
          reqNum: this.ifDetailInfo.reqNum,
          eaiReqIfNum: this.ifDetailInfo.eaiReqIfNum,
          eaiIfSeq: '',
          ifDetail: this.ifDetailInfo,
          svrList: this.svrList,
          qInfo: this.qInfo,
        };


        this.$axios.post('/api/eai/eaiRegDetail', this.eaiIfInfo)
          .then((res) => {
            console.log(res);
            this.$gf.alertOn('EAI 정보가 정상 등록 되었습니다');
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
          });
      }
    },

    updateEaiInterfaceInfo() {
      this.$gf.confirmOn('EAI 인터페이스 정보를 수정 하시겠습니까?', this.updateEaiInterfaceData);
    },

    updateEaiInterfaceData() {
      if (this.eaiIfSeq > 0) {
        this.svrList.splice(0, this.svrList.length);

        for (let i = 0; i < this.sndRows.length; i++) {
          if (this.sndRows[i].hostNm !== '') {
            this.sndRows[i].sndRcvCl = 'S';
            this.svrList.push(this.sndRows[i]);
          }
        }
        for (let i = 0; i < this.rcvRows.length; i++) {
          if (this.rcvRows[i].hostNm !== '') {
            this.rcvRows[i].sndRcvCl = 'R';
            this.svrList.push(this.rcvRows[i]);
          }
        }

        console.log(this.sndRows.length);
        console.log(this.svrList.length);
        this.eaiIfInfo = {
          eaiIfSeq: this.eaiIfSeq,
          ifDetail: this.ifDetailInfo,
          svrList: this.svrList,
          qInfo: this.qInfo,
        };

        this.$axios.put('/api/eai/eaiDetail', this.eaiIfInfo)
          .then((res) => {
            console.log(res);
            this.$gf.alertOn('EAI 정보가 수정 되었습니다');
          })
          .catch((ex) => {
            console.log(`오류가 발생하였습니다 : ${ex}`);
          });
      }
    },

    turnOnSvrPop(val) {
      this.serverPopupCase = val;
      this.svrOn = true;
    },
    turOffSvrPop(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOn = false;
    },
    addData(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);

      if (this.serverPopupCase === 1) {
        this.qInfo.qType01Mngr = val.mqMngrNm;
        this.qInfo.qType01 = val.queueNm;
      } else if (this.serverPopupCase === 2) {
        this.qInfo.qType02Mngr = val.mqMngrNm;
        this.qInfo.qType02 = val.queueNm;
      } else if (this.serverPopupCase === 3) {
        this.qInfo.qType03Mngr = val.mqMngrNm;
        this.qInfo.qType03 = val.queueNm;
      } else if (this.serverPopupCase === 4) {
        this.qInfo.qType04Mngr = val.mqMngrNm;
        this.qInfo.qType04 = val.queueNm;
      } else if (this.serverPopupCase === 5) {
        this.qInfo.qType05Mngr = val.mqMngrNm;
        this.qInfo.qType05 = val.queueNm;
      } else if (this.serverPopupCase === 6) {
        this.qInfo.qType06Mngr = val.mqMngrNm;
        this.qInfo.qType06 = val.queueNm;
      } else if (this.serverPopupCase === 7) {
        this.qInfo.qType07Mngr = val.mqMngrNm;
        this.qInfo.qType07 = val.queueNm;
      } else if (this.serverPopupCase === 8) {
        this.qInfo.qType08Mngr = val.mqMngrNm;
        this.qInfo.qType08 = val.queueNm;
      } else if (this.serverPopupCase === 9) {
        this.qInfo.qType09Mngr = val.mqMngrNm;
        this.qInfo.qType09 = val.queueNm;
      } else if (this.serverPopupCase === 10) {
        this.qInfo.qType10Mngr = val.mqMngrNm;
        this.qInfo.qType10 = val.queueNm;
      } else if (this.serverPopupCase === 11) {
        this.qInfo.qType11Mngr = val.mqMngrNm;
        this.qInfo.qType11 = val.queueNm;
      } else if (this.serverPopupCase === 12) {
        this.qInfo.qType12Mngr = val.mqMngrNm;
        this.qInfo.qType12 = val.queueNm;
      }
      this.svrOn = false;
    },

    test() {
      this.$gf.alertOn(this.ifDetailInfo.ifTypCd);
    },
    addSndRow(n) {
      console.log('행 추가!');
      this.sndRows.splice(n + 1, 0, {});
    },
    removeSndRow(sndRow) {
      if (this.sndRows.length > 1) {
        console.log('행 삭제!');
        console.log(sndRow);
        const idx = this.sndRows.indexOf(sndRow);
        this.sndRows.splice(idx, 1);
      } else {
        this.sndRows[0].reqNum = '';
        this.sndRows[0].sndRcvCl = '';
        this.sndRows[0].sysTypCd = '';
        this.sndRows[0].svrTypCd = '';
        this.sndRows[0].sysNm = '';
        this.sndRows[0].hostNm = '';
        this.sndRows[0].vIp = '';
        this.sndRows[0].natIp = '';
        this.sndRows[0].etcIp = '';
        this.sndRows[0].osNm = '';
        this.sndRows[0].company = '';
        this.sndRows[0].procSt = '';
      }
    },
    addRcvRow(i) {
      console.log('행 추가!');
      this.rcvRows.splice(i + 1, 0, {});
    },
    removeRcvRow(rcvRow) {
      if (this.rcvRows.length > 1) {
        console.log('행 삭제!');
        console.log(rcvRow);
        const idx = this.rcvRows.indexOf(rcvRow);
        this.rcvRows.splice(idx, 1);
      } else {
        this.rcvRows[0].reqNum = '';
        this.rcvRows[0].sndRcvCl = '';
        this.rcvRows[0].sysTypCd = '';
        this.rcvRows[0].svrTypCd = '';
        this.rcvRows[0].sysNm = '';
        this.rcvRows[0].hostNm = '';
        this.rcvRows[0].vIp = '';
        this.rcvRows[0].natIp = '';
        this.rcvRows[0].etcIp = '';
        this.rcvRows[0].osNm = '';
        this.rcvRows[0].company = '';
        this.rcvRows[0].procSt = '';
      }
    },
    turnOnSvrPopServer(op, idx) {
      this.op = op;
      this.idx = idx;
      this.svrOnServer = true;
    },
    turOffSvrPopServer(val) {
      console.log(`가져온 데이터 : ${val}`);
      this.svrOnServer = false;
    },
    getData(val) {
      console.log(`가져온 데이터2 : ${val.hostNm}`);
      this.svrOnServer = false;
      if (this.op === 'S') {
        this.sndRows[this.idx].sysNm = val.sysNm;
        this.sndRows[this.idx].hostNm = val.hostNm;
        this.sndRows[this.idx].vIp = val.vIp;
        this.sndRows[this.idx].natIp = val.natIp;
        this.sndRows[this.idx].etcIp = val.etcIp;
        this.sndRows[this.idx].svrNum = val.svrNum;
        this.sndRows[this.idx].company = val.company;
      } else if (this.op === 'R') {
        this.rcvRows[this.idx].sysNm = val.sysNm;
        this.rcvRows[this.idx].hostNm = val.hostNm;
        this.rcvRows[this.idx].vIp = val.vIp;
        this.rcvRows[this.idx].natIp = val.natIp;
        this.rcvRows[this.idx].etcIp = val.etcIp;
        this.rcvRows[this.idx].svrNum = val.svrNum;
        this.rcvRows[this.idx].company = val.company;
      }
    },
    turnOnSvrPopChrgr(callChrgr) {
      this.callChrgr = callChrgr;
      this.svrOnChrgr = true;
    },
    turOffSvrPopChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;
    },
    addDataChrgr(val) {
      console.log(`Popup에서 받아온 Data : ${val}`);
      this.svrOnChrgr = false;

      // this.chrgrId = val.userId;
      if (this.callChrgr === 1) {
        this.ifDetailInfo.sndChrgrId1 = val.userId;
        this.ifDetailInfo.sndChrgrNm1 = val.hanNm;
        this.ifDetailInfo.sndChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 2) {
        this.ifDetailInfo.sndChrgrId2 = val.userId;
        this.ifDetailInfo.sndChrgrNm2 = val.hanNm;
        this.ifDetailInfo.sndChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 3) {
        this.ifDetailInfo.sndChrgrMngrId = val.userId;
        this.ifDetailInfo.sndChrgrMngrNm = val.hanNm;
        this.ifDetailInfo.sndChrgrMngrOrgNm = val.orgNm;
      }
      if (this.callChrgr === 4) {
        this.ifDetailInfo.rcvChrgrId1 = val.userId;
        this.ifDetailInfo.rcvChrgrNm1 = val.hanNm;
        this.ifDetailInfo.rcvChrgrOrgNm1 = val.orgNm;
      }
      if (this.callChrgr === 5) {
        this.ifDetailInfo.rcvChrgrId2 = val.userId;
        this.ifDetailInfo.rcvChrgrNm2 = val.hanNm;
        this.ifDetailInfo.rcvChrgrOrgNm2 = val.orgNm;
      }
      if (this.callChrgr === 6) {
        this.ifDetailInfo.rcvChrgrMngrId = val.userId;
        this.ifDetailInfo.rcvChrgrMngrNm = val.hanNm;
        this.ifDetailInfo.rcvChrgrMngrOrgNm = val.orgNm;
      }
    },
    onChangeIfTypCd() {
      this.changeRoundStatus();
    },

    changeRoundStatus(x) {
      if (x === 1) {
        if (this.ifDetailInfo.ifTypCd === '1') {
          this.$refs.selectRound.disabled = false;
          this.$refs.selectSync.disabled = false;
          this.$refs.rcvTrInput.disabled = false;

          this.$refs.selectFileIfTypCd.disabled = true;
          this.$refs.sndDirInput.disabled = true;
          this.$refs.rcvDirInput.disabled = true;
          this.$refs.rcvShNmInput.disabled = true;
          this.$refs.fileOpCodeInput.disabled = true;
        } if (this.ifDetailInfo.ifTypCd === '2') {
          this.$refs.selectRound.disabled = true;
          this.$refs.selectSync.disabled = true;
          this.$refs.rcvTrInput.disabled = true;

          this.$refs.selectFileIfTypCd.disabled = false;
          this.$refs.sndDirInput.disabled = false;
          this.$refs.rcvDirInput.disabled = false;
          this.$refs.rcvShNmInput.disabled = false;
          this.$refs.fileOpCodeInput.disabled = false;
        }
      } else {
        if (this.ifDetailInfo.ifTypCd === '1') {
          this.ifDetailInfo.roundTypCd = '';
          this.ifDetailInfo.syncTypCd = '';
          this.ifDetailInfo.rcvTr = '';
          this.ifDetailInfo.rcvOpCd = '';
          this.ifDetailInfo.fileIfTypCd = '';
          this.ifDetailInfo.sndDir = '';
          this.ifDetailInfo.rcvDir = '';
          this.ifDetailInfo.rcvShNm = '';
          this.ifDetailInfo.fileOpCode = '';

          this.$refs.selectRound.disabled = false;
          this.$refs.selectSync.disabled = false;
          this.$refs.rcvTrInput.disabled = false;

          this.$refs.selectFileIfTypCd.disabled = true;
          this.$refs.sndDirInput.disabled = true;
          this.$refs.rcvDirInput.disabled = true;
          this.$refs.rcvShNmInput.disabled = true;
          this.$refs.fileOpCodeInput.disabled = true;
        } if (this.ifDetailInfo.ifTypCd === '2') {
          this.ifDetailInfo.roundTypCd = '';
          this.ifDetailInfo.syncTypCd = '';
          this.ifDetailInfo.rcvTr = '';
          this.ifDetailInfo.rcvOpCd = '';
          this.ifDetailInfo.fileIfTypCd = '';
          this.ifDetailInfo.sndDir = '';
          this.ifDetailInfo.rcvDir = '';
          this.ifDetailInfo.rcvShNm = '';
          this.ifDetailInfo.fileOpCode = '';

          this.$refs.selectRound.disabled = true;
          this.$refs.selectSync.disabled = true;
          this.$refs.rcvTrInput.disabled = true;

          this.$refs.selectFileIfTypCd.disabled = false;
          this.$refs.sndDirInput.disabled = false;
          this.$refs.rcvDirInput.disabled = false;
          this.$refs.rcvShNmInput.disabled = false;
          this.$refs.fileOpCodeInput.disabled = false;
        }
      }
    },
    onChangeRoundTypCd() {
      this.changeSyncStatus();
    },
    changeSyncStatus(x) {
      if (x === 1) {
        if (this.ifDetailInfo.roundTypCd === '1') {
          this.$refs.selectSync.disabled = true;
        } if (this.ifDetailInfo.roundTypCd === '2') {
          this.$refs.selectSync.disabled = false;
        }
      } else {
        if (this.ifDetailInfo.roundTypCd === '1') {
          this.ifDetailInfo.syncTypCd = '';
          this.$refs.selectSync.disabled = true;
        } if (this.ifDetailInfo.roundTypCd === '2') {
          this.ifDetailInfo.syncTypCd = '';
          this.$refs.selectSync.disabled = false;
        }
      }
    },
    checkIfTyp() {
      if (this.ifDetailInfo.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 먼저 선택하세요');
      }
    },
    checkRoundTyp() {
      if (this.ifDetailInfo.ifTypCd === '') {
        this.$gf.alertOn('연동 방식을 먼저 선택하세요');
        return;
      }
      if (this.ifDetailInfo.roundTypCd === '') {
        this.$gf.alertOn('단/양방향을 먼저 선택하세요');
      }
    },

    resetQInfo() {
      this.qInfo = {};
    },

    movePage(page) { // 페이지 이동
    // 목록으로 돌아갈때 조회 조건 값을 유지하기 위해 값을 재할당

      if (page === 'approEaiList') {
        this.$router.push({ name: page });
      } else {
        this.$router.push({
          name: page,
          params: {
            callType: 'goList',
            eaiIfId: this.pEaiIfId,
            eaiIfNmKor: this.pEaiIfNmKor,
            ifTypCd: this.pIfTypCd,
            roundTypCd: this.pRoundTypCd,
            eaiHub: this.pEaiHub,
            mqMngrNm: this.pMqMngrNm,
            queueNm: this.pQueueNm,
            rcvTr: this.pRcvTr,
            hostNm: this.pHostNm,
            chrgrId: this.pChrgrId,
            useYn: this.pUseYn,
          },
        });
      }
    },
  },
};

</script>

<style scoped>
.contents .grid_form .search_group input[type=text] {
    width: 122px
}
.contents .grid_form .division_row>div {
    grid-template-columns: 130px 130px 373px;
    -ms-grid-colsumns: 130x 130px 373px;
    grid-template-rows: 53px 53px 53px 53px 53px 30px;
    -ms-grid-rows: 53px 53px 53px 53px 53px 30px;
}
</style>
