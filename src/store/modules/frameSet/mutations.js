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
  setMenuLists: (state, payload) => {
    state.menuLists = payload.menuLists;
  },
};
