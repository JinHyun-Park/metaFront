/**
 * 공통 method를 담은 js
 */
import asConfig from '@/config/asideConfig';
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

    // LEFT SIDE의 항목 설정
    if (path.indexOf('/notice/') > -1) {
      store.dispatch('frameSet/setSubNm', { subNm: 'NOTICE' });
      store.dispatch('frameSet/setMenuLists', { menuLists: asConfig.NOTICE });
    } else if (path.indexOf('/ifReg/') > -1) {
      store.dispatch('frameSet/setSubNm', { subNm: 'IF REGIST' });
      store.dispatch('frameSet/setMenuLists', { menuLists: asConfig.IFREG });
    } else if (path.indexOf('/meta/') > -1) {
      store.dispatch('frameSet/setSubNm', { subNm: 'META' });
      store.dispatch('frameSet/setMenuLists', { menuLists: asConfig.META });
    } else if (path.indexOf('/admin/') > -1) {
      store.dispatch('frameSet/setSubNm', { subNm: 'ADMIN' });
      store.dispatch('frameSet/setMenuLists', { menuLists: asConfig.MGMT });
    }
  },
};

export default helpers;
