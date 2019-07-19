<template>
  <article class="contents">
    <section class="title">
      <h2><i class="ico-bar" />EAI 인터페이스 등록</h2>
    </section>

    <section class="form_area">
      <div class="row_contain">
        <div class="column on w-2">
          <label class="column_label">인터페이스 ID</label>
          <input
            type="text"
            value=""
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
      <div class="row_contain">
        <div class="column w-1">
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
        <div class="column on w-1">
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
        <div class="column w-1">
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
        <div class="column w-1">
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
        <div class="column w-1">
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
      <div class="row_contain type-2">
        <div class="column on w-3">
          <label class="column_label">송신 I/F DB</label>
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
        <div class="column w-3">
          <label class="column_label">수신 I/F DB</label>
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
      </div>
      <div class="row_contain type-1">
        <div class="column w-1">
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
        <div class="column w-2">
          <label class="column_label">수신 프로그램</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2" />
      </div>
      <div class="row_contain type-1">
        <div class="column w-1">
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
        <div class="column w-2">
          <label class="column_label">송신 디렉토리</label>
          <input
            type="text"
            value=""
          >
        </div>
        <div class="column w-2">
          <label class="column_label">수신 디렉토리</label>
          <input
            type="text"
            value=""
          >
        </div>
      </div>
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

    <section class="grid_form">
      <div>
        <i class="bg-left" />
        <label class="column_label">요청 송신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">요청 송신 XQ</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">HUB 수신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">HUB 송신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">HUB 송신 XQ</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">요청 수신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
      </div>
      <div>
        <i class="bg-left" />
        <label class="column_label">요청 송신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">요청 송신 XQ</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">HUB 수신 Q</label>
        <div class="search_group on">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          class="on"
          type="text"
          value=""
        >
        <label class="column_label">HUB 송신 Q</label>
        <div class="search_group">
          <input
            type="text"
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
        <label class="column_label">HUB 송신 XQ</label>
        <div class="search_group">
          <input
            type="text"
            value=""
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
            value=""
          >
          <span class="search">
            <i class="ico-search" />
          </span>
        </div>
        <input
          type="text"
          value=""
        >
      </div>
    </section>

    <section class="form_area style-1">
      <div class="row_contain">
        <div class="column w-3">
          <label class="column_label">장애 영향도</label>
          <textarea
            cols="50"
            rows="4"
            placeholder="이러한 장애가 있습니다."
          />
        </div>
        <div class="column w-3">
          <label class="column_label">비고</label>
          <textarea
            cols="50"
            rows="4"
            placeholder=""
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
  </article>
</template>
