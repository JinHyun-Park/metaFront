<template>
  <div class="right_space">
    <section class="title style-2">
      <h2><i class="ico-bar" />EAI 인터페이스 등록</h2>
      <div class="breadcrumb">
        <span>EGIW</span><em class="on">EAI</em>
      </div>
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
      <div class="row_contain type-2">
        <div class="column on w-2">
          <label class="column_label">인터페이스 ID</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12"
          >
        </div>
        <div class="column w-4">
          <label class="column_label">인터페이스명</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                MQ
              </option>
              <option value="">
                FILE
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column on w-2">
          <label class="column_label">HUB</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                1
              </option>
              <option value="">
                2
              </option>
              <option value="">
                3
              </option>
              <option value="">
                4
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">방향</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                단방향
              </option>
              <option value="">
                양방향
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">브로커</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                Y
              </option>
              <option value="">
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">사용여부</label>
          <div class="select_group disabled">
            <select disabled>
              <option value="">
                Y
              </option>
              <option
                value=""
                selected
              >
                N
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        DB / Program
      </h5>
      <div class="row_contain type-2">
        <div class="column on w-3">
          <label class="column_label">송신 I/F DB</label>
          <div class="search_group">
            <input
              type="text"
              value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">수신 I/F DB</label>
          <div class="search_group">
            <input
              type="text"
              value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">수신전문처리</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                실시간/배치
              </option>
              <option value="">
                실시간
              </option>
              <option value="">
                배치
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">수신 프로그램</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-3" />
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        File 연동
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">파일 전송 유형</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                file_put
              </option>
              <option value="">
                file_get
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
        <div class="column w-3">
          <label class="column_label">송신 디렉토리</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
        <div class="column w-3">
          <label class="column_label">수신 디렉토리</label>
          <input
            type="text"
            value="myidisyoungjunyumyidisyoungjunyu12myidisyo"
          >
        </div>
      </div>
    </section>
    <section class="form_area border_group">
      <h5 class="s_tit">
        담당자 정보
      </h5>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">송신 담당자1</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">송신 담당자2</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">송신 회사</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SKT
              </option>
              <option value="">
                SKB
              </option>
              <option value="">
                SKP
              </option>
              <option value="">
                SKTX
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
      <div class="row_contain type-2">
        <div class="column w-2">
          <label class="column_label">수신 담당자1</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">수신 담당자2</label>
          <div class="search_group">
            <input
              type="text"
              value=""
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
        </div>
        <div class="column w-2">
          <label class="column_label">수신 회사</label>
          <div class="select_group">
            <select>
              <option
                value=""
                selected
              >
                SKT
              </option>
              <option value="">
                SKB
              </option>
              <option value="">
                SKP
              </option>
              <option value="">
                SKTX
              </option>
            </select>
            <span class="select" />
          </div>
        </div>
      </div>
    </section>

    <section class="grid_form border_group">
      <h5 class="s_tit">
        Queue 상세 정보
      </h5>
      <div class="division_row">
        <div>
          <!--                    <i class="bg-left"></i>-->
          <label class="column_label">요청 송신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">요청 송신 XQ</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 수신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 송신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 송신 XQ</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">요청 수신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
        </div>
        <div>
          <!--                    <i class="bg-left"></i>-->
          <label class="column_label">요청 송신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">요청 송신 XQ</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 수신 Q</label>
          <div class="search_group on">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            class="on"
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 송신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">HUB 송신 XQ</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
          <label class="column_label">요청 수신 Q</label>
          <div class="search_group">
            <input
              type="text"
              value="qsign"
            >
            <span class="search">
              <i class="ico-search" />
            </span>
          </div>
          <input
            type="text"
            value="2documents2documents2documents2documents2document"
          >
        </div>
      </div>
    </section>

    <section class="form_area border_group style-1">
      <h5 class="s_tit">
        참고 사항
      </h5>
      <div class="row_contain">
        <div class="column on w-3">
          <label class="column_label">장애 영향도</label>
          <textarea
            cols="50"
            rows="5"
            placeholder="이러한 장애가 있습니다."
          />
        </div>
        <div class="column w-3">
          <label class="column_label">비고</label>
          <textarea
            cols="50"
            rows="5"
            placeholder="비고란 입니다."
          />
        </div>
      </div>
    </section>

    <section class="btm_button_area">
      <button class="default_button on">
        등록
      </button>
      <button class="default_button">
        수정
      </button>
    </section>
  </div>
</template>

<style>
article {justify-content: flex-start}
</style>
