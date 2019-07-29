export default {
  setToken: (store, payload) => {
    store.commit('setToken', payload);
  },
  logout: (store) => {
    store.commit('logout');
  },
  loginCheck: (store) => {
    store.commit('loginCheck');
  },
};
