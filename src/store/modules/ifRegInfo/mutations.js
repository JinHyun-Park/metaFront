export default {
  setReqNum: (state, payload) => {
    state.reqNum = payload.reqNum;
  },

  setTempSaveFlag: (state, payload) => {
    if (payload.step === 'STEP1') {
      state.saveFlag.isStep1SaveYn = payload.rstCd;
    } else if (payload.step === 'STEP2EAI') {
      state.saveFlag.isStep2EaiSaveYn = payload.rstCd;
    } else if (payload.step === 'STEP2EIGW') {
      state.saveFlag.isStep2EigwSaveYn = payload.rstCd;
    } else if (payload.step === 'STEP2MCG') {
      state.saveFlag.isStep2McgSaveYn = payload.rstCd;
    }
  },
};
