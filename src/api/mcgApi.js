/* eslint-disable no-undef */
const preUrl = '/api/eai';

function fetchGetMcgChnlList(param) {
  return axios.get(`${preUrl}/mcg/chnl`, param);
}


export {
  fetchGetMcgChnlList,
};
