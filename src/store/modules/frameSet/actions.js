export default {
  setHeaderOn: (store, payload) => {
    store.commit('setHeaderOn', payload);
  },
  setAsideOn: (store, payload) => {
    store.commit('setAsideOn', payload);
  },
  setFooterOn: (store, payload) => {
    store.commit('setFooterOn', payload);
  },
  setLoginPageOn: (store, payload) => {
    store.commit('setLoginPageOn', payload);
  },
  setResetPopOn: (store, payload) => {
    store.commit('setResetPopOn', payload);
  },
  setSubNm: (store, payload) => {
    store.commit('setSubNm', payload);
  },
  setMenuLists: (store, payload) => {
    store.commit('setMenuLists', payload);
  },
};
