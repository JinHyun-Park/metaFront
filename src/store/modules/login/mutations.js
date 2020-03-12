export default {
  setToken: (state, payload) => {
    state.token = payload.token;
  },
  logout: (state) => {
    if (state.token) {
      state.token = '';
      console.log('로그아웃!');
    }
  },
  loginCheck: (state) => {
    // store.commit('loginCheck', payload);
    // 여기 체크하는 로직 수정해야 함.
    console.log(state.token);
  },
  setLoginInfo: (state, payload) => {
    // 로그인한 한글 이름
    state.loginHanNm = payload.loginHanNm;
  },

};
