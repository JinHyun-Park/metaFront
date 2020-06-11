export default {
  setReqNum: (store, payload) => {
    store.commit('setReqNum', payload);
  },

  setTempSaveFlag: (store, payload) => {
    store.commit('setTempSaveFlag', payload);
  },
};
