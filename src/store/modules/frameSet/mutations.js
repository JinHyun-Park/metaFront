export default {
  setHeaderOn: (state, payload) => {
    state.headerOn = payload.headerOn;
  },
  setAsideOn: (state, payload) => {
    state.asideOn = payload.asideOn;
  },
  setFooterOn: (state, payload) => {
    state.footerOn = payload.footerOn;
  },
  setLoginPageOn: (state, payload) => {
    state.loginPageOn = payload.loginPageOn;
  },
  setResetPopOn: (state, payload) => {
    state.resetPopOn = payload.resetPopOn;
  },
  setSubNm: (state, payload) => {
    state.subNm = payload.subNm;
  },
  setMenuLists: (state, payload) => {
    state.menuLists = payload.menuLists;
  },
  setConfirmSet: (state, payload) => {
    state.confirmSet.confirmOn = payload.confirmOn;
    state.confirmSet.confirmMsg = payload.confirmMsg;
    state.confirmSet.iconNum = payload.iconNum;
    state.confirmSet.parentFunc = payload.parentFunc;
  },
  setAlertSet: (state, payload) => {
    state.alertSet.alertOn = payload.alertOn;
    state.alertSet.alertMsg = payload.alertMsg;
  },
};
