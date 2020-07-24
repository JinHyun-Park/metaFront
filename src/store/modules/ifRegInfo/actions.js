export default {
  setReqNum: (store, payload) => {
    store.commit('setReqNum', payload);
  },

  setTempSaveFlag: (store, payload) => {
    store.commit('setTempSaveFlag', payload);
  },

  resetTempSaveFlag: (store, payload) => {
    store.commit('resetTempSaveFlag', payload);
  },
  setMovePossible: (store, payload) => {
    store.commit('setMovePossible', payload);
  },
};
