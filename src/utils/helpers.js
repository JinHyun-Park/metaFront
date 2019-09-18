/**
 * 공통 method를 담은 js
 */
// import Axios from 'axios';
import store from '@/store';

const helpers = {
  /**
     * value의 null 처리
     * @param {*} value
     * @return {Boolean} true/false
     */
  isEmpty(value) {
    console.log('isEmpty 진입!');
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
    } else if (page === '/' || page === 'home') { // 메인 페이지
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
  dateToString(format, offset) {
    const offRtnDate = new Date();

    if (offset != null && offset !== '') {
      const lastChar = offset.charAt(offset.length - 1);
      const offsetValue = offset.slice(0, -1);

      switch (lastChar) {
        case 'd':
          offRtnDate.setDate(format.getDate() + parseInt(offsetValue, 10));
          break;

        case 'm':
          offRtnDate.setMonth(format.getMonth() + parseInt(offsetValue, 10));
          break;

        case 'y':
          offRtnDate.setYear(format.getFullYear() + parseInt(offsetValue, 10));
          break;
        default:
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


    return year + month + date;
  },
  stringToDate(str, ylen) {
    let inLen;
    // default value setting : 4 length
    if (ylen == null || ylen === 0) {
      inLen = 4;
    }
    if (ylen !== 2 && ylen !== 4) {
      return new Date();
    }

    const inStr = str.replace(/\-/g, '');

    const year = inStr.substr(0, inLen);
    const month = inStr.substr(inLen, 2);
    const date = inStr.substr(inLen + 2, 2);

    return new Date(year, month, date);
  },

  /**
     * 예시 함수 - 이 함수를 변형/삭제해서 사용해주세요.
     */
  exFunc1() {
    console.log('exFunc1 진입');
    axios.get(this.tgtUrl, {
      params: {},
    })
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
