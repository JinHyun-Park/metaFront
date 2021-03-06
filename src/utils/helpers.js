/**
 * 공통 method를 담은 js
 */
import Vue from 'vue';
import store from '@/store';

let loader;
let loaderOn = false;

const TIME_LIMIT = 59 * 60;
let remainingTime = TIME_LIMIT;

const helpers = {

  /**
   * 달력의 언어셋
   * @param {*} language - 달력에 표현할 언어 셋
   * @return {} 언어 셋에 맞춘 리스트
   */
  getCalDaySet(lang) {
    const langSetKr = ['일', '월', '화', '수', '목', '금', '토'];
    const langSetEn = ['SUN', 'MON', 'THU', 'WED', 'THR', 'FRI', 'SAT'];

    if (lang === 'EN') {
      return langSetEn;
    }
    return langSetKr;
  },

  /**
   * value의 null 처리
   * @param {*} value
   * @return {Boolean} true/false
   */
  isEmpty(value) {
    if (value === '' || value === null || value === undefined
      || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
      return true;
    }
    return false;
  },

  /**
   * 화면 이동, 새로 고침 등을 하면서 헤더, 좌측 nav 등 세팅 용도
   * @param {*} to - 이동할 경로
   */
  setFrame(to) {
    const page = to.name;
    const { path } = to;

    if (path.indexOf('/login/') >= 0) { // 로그인 영역 페이지 - 헤더, left side 없음
      store.dispatch('frameSet/setLoginPageOn', { loginPageOn: true });
    } else if (page === '/' || page === 'home' || path.indexOf('/error/') >= 0) { // 메인 페이지
      store.dispatch('frameSet/setLoginPageOn', { loginPageOn: false });
      store.dispatch('frameSet/setHeaderOn', { headerOn: true });
      store.dispatch('frameSet/setAsideOn', { asideOn: false });
      store.dispatch('frameSet/setFooterOn', { footerOn: true });
    } else {
      store.dispatch('frameSet/setLoginPageOn', { loginPageOn: false });
      store.dispatch('frameSet/setHeaderOn', { headerOn: true });
      store.dispatch('frameSet/setAsideOn', { asideOn: true });
      store.dispatch('frameSet/setFooterOn', { footerOn: true });
    }
  },

  parseRtnData(pageSet, rstSet, pageYn) {
    if (pageYn === 'Y') {
      // eslint-disable-next-line
      pageSet.pageCount = rstSet.totalPages;
      // eslint-disable-next-line
      pageSet.pageNo = rstSet.pageable.pageNumber + 1;
      console.log(pageSet);
    }

    return rstSet.content;
  },
  dateToString(format, offset, hyphenYn) {
    let offRtnDate = new Date();
    let rtnStr = '';

    if (offset != null && offset !== '') {
      const lastChar = offset.charAt(offset.length - 1);
      const offsetValue = offset.slice(0, -1);

      switch (lastChar) {
        case 'm':
          offRtnDate.setMonth(format.getMonth() + parseInt(offsetValue, 10));
          break;
        case 'y':
          offRtnDate.setYear(format.getFullYear() + parseInt(offsetValue, 10));
          break;
        case 'd':
          offRtnDate.setDate(format.getDate() + parseInt(offsetValue, 10));
          break;
        case 'h':
          let offHour = parseInt(offsetValue, 10);
          if(offHour > 23 || offHour < -23) {
            offRtnDate.setDate(format.getDate() + parseInt(offHour/24, 10));
            offRtnDate.setHours(format.getHours() + parseInt(offHour%24, 10));
          } else {
            offRtnDate.setHours(format.getHours() + parseInt(offsetValue, 10));
          }
          break;
        default:
          offRtnDate = format;
      }
    }

    const year = offRtnDate.getFullYear();
    let month = offRtnDate.getMonth() + 1;
    let date = offRtnDate.getDate();
    let hour = offRtnDate.getHours();
    let min = offRtnDate.getMinutes();
    let sec = offRtnDate.getSeconds();


    if (month < 10) month = `0${month}`;
    if (date < 10) date = `0${date}`;
    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    if (hyphenYn === 'Y') {
      rtnStr = `${year}-${month}-${date}`;
    } else {
      rtnStr = `${year}${month}${date}`;
    }

    return rtnStr;
  },
  stringToDate(str, ylen) {
    let inLen = ylen;
    // default value setting : 4 length
    if (ylen == null || ylen === 0) {
      inLen = 4;
    }
    if (ylen !== 2 && ylen !== 4) {
      return new Date();
    }

    // eslint-disable-next-line no-useless-escape
    const inStr = str.replace(/\-/g, '');

    const year = inStr.substr(0, inLen);
    const month = inStr.substr(inLen, 2);
    const date = inStr.substr(inLen + 2, 2);

    return new Date(year, month, date);
  },

  /**
   * 모달, 팝업 등을 띄울 시 스크롤 stop
   * @param {*} val Boolean
   */
  scrollPrevent(val) {
    if (val) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  },


  /* confirm 관련 method */
  /**
   * confirm 팝업, fnc는 확인 이후 실행시킬 method
   * function은 function object를 전달해야함.
   * @param {String} msg : confirm modal에 띄울 메시지, optional
   * @param {Object(function)} fnc : callback 함수, 필수
   * @param {Object} callParam : callback 함수를 위한 파라미터, optional
   * @param {Number} iconNo : 아이콘 모양 번호(1-느낌표, 2-X, 3-체크(기본)), optional
   */
  confirmOn(msg, fnc, callParam, iconNo) {
    let lvMsg = '계속 진행하시겠습니까?';

    if (!this.isEmpty(msg)) {
      lvMsg = msg;
    }
    if (this.isEmpty(fnc)) {
      console.log('callback 함수가 정의되지 않았습니다.');
    } else {
      store.dispatch('frameSet/setConfirmSet', {
        confirmOn: true,
        confirmMsg: lvMsg,
        parentFunc: fnc,
        iconNum: iconNo,
        param: callParam,
      });
    }
  },

  /**
   * confirm 종료, fnc는 확인 이후 실행시킬 method
   * @param {Object(function)} fnc
   * @param {Object} callParam
   */
  confirmOff(fnc, callParam) {
    store.dispatch('frameSet/setConfirmSet', {
      confirmOn: false,
      confirmMsg: '',
      parentFunc: '',
      iconNum: '',
      param: '',
    });

    if (!this.isEmpty(fnc)) {
      fnc(callParam);
    }
  },
  /* confirm 관련 method */


  /* alert 관련 method */
  /**
   * alert 팝업, fnc는 확인 이후 실행시킬 method
   * function은 function object를 전달해야함.
   * @param {String} msg, 메시지 값 필수
   * @param {Object(function)} fnc, optional
   */
  alertOn(msg, fnc, callParam) {
    let lvMsg = '"-"';
    let lvFnc = '';

    if (!this.isEmpty(msg)) {
      lvMsg = msg;
    }
    if (!this.isEmpty(fnc)) {
      lvFnc = fnc;
    }

    store.dispatch('frameSet/setAlertSet', {
      alertOn: true,
      alertMsg: lvMsg,
      parentFunc: lvFnc,
      param: callParam,
    });
  },

  /**
   * alert 종료, fnc는 확인 이후 실행시킬 method
   * @param {Object(function)} fnc
   * @param {Object} callParam
   */
  alertOff(fnc, callParam) {
    store.dispatch('frameSet/setAlertSet', {
      alertOn: false,
      alertMsg: '',
      parentFunc: '',
      param: '',
    });

    if (!this.isEmpty(fnc)) {
      fnc(callParam);
    }
  },

  /* alert 관련 method */
  transEnterExp(val) {
    const regExp = '\n';
    return val.split(regExp);
  },

  /**
   * 로딩 화면을 보여준다.
   * @param {String} sec 이고 msec이 있으면 msec초 이후 로딩 화면 없어짐
   */
  showLoading(msec) {
    if (!loaderOn) { // 중복 로더 발생 방지
      loader = Vue.$loading.show({
        // Optional parameters
        // container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: 'spinner',
        width: 90,
        height: 90,
        // onCancel: this.onCancel,
      });
      loaderOn = true;

      if (!this.isEmpty(msec)) {
        setTimeout(() => {
          loader.hide();
          loaderOn = false;
        }, msec);
      }
    }
  },

  /**
   * 로딩 화면을 멈춘다.
   */
  hideLoading() {
    loader.hide();
    loaderOn = false;
  },

  /**
   * 세션 Count Time 값
   */
  getSessionCount(timePassed) {
    if (remainingTime === 0) {
      return '0:00';
    }

    remainingTime -= timePassed;

    // eslint-disable-next-line prefer-const
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (remainingTime === 0) {
      seconds = '00';
    }

    return `${minutes}:${seconds}`;
  },

  resetCount() {
    remainingTime = TIME_LIMIT;
  },
  /*
  checkPasswd(passwd1, passwd2) {
    if(passwd1 != passwd2) {
      return false, '비밀번호가 상이합니다.';
    }

    var pattern1 = /[0-9]/;
    var pattern2 = /[a-zA-Z]/;
    var pattern3 = /[~!@#$%^&*()_-[]\|]/;

    if(passwd1.length < 8) {
      return false, "비밀번호는 8자리 이상이여야 합니다.";
    }

    // 10자리 이하면, 3가지 종류로 구성되야함
    if(passwd1.length < 10) {
      if(!pattern1.test(passwd1)||!pattern2.test(passwd1)||!pattern3.test(passwd1)) {
        return false, "10자리이하인 경우, 3가지 종류(숫자, 영문, 특수문자)를 포함해야 합니다."
      }
    }

    // 10자리 이상이면 2가지 종류여도 됨
    if(passwd1.length > 10) {
      let rstPtRst = 0;
      rstPtRst += pattern1.test(passwd1);
      rstPtRst += pattern2.test(passwd1);
      rstPtRst += pattern3.test(passwd1);

      if(rstPtRst < 2) {
        return false, "2가지 종류 이상 포함해야 합니다."
      }
    }

    return true, "";

  },*/

  /**
   * 예시 함수 - 이 함수를 변형/삭제해서 사용해주세요.
   */
  exFunc1() {
    console.log('exFunc1 진입');
    // eslint-disable-next-line no-undef
    axios.get(this.tgtUrl, { params: {} })
      .then((res) => {
        console.log(res);
        if (res.data.rstCd === 'S') {
          this.ifReqList = this.parseRtnData(this.pageSet, res.data.rstData.ifReqMstList, 'Y');
        } else {
          // eslint-disable-next-line no-alert
          alert('failed');
        }
      })
      .catch((ex) => {
        console.log(`error occur!!12 : ${ex}`);
      });
  },
};

export default helpers;
