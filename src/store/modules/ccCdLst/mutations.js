export default {
  setCcCdList: (state, payload) => {
    state.ccCdList = Object.assign({}, state.ccCdList, payload.ccCdList);
  },
};
