/* eslint-disable no-undef */
const preUrl = '/api/mcg';

function fetchGetMcgChnlList(param) {
  return axios.get(`${preUrl}/chnl`, param);
}

function fetchGetMcgDealList(param) {
  return axios.get(`${preUrl}/deal`, param);
}

function fetchGetMcgServerList(param) {
  return axios.get(`${preUrl}/chnl/server`, param);
}

function fetchGetMcgChnlChrgrList(param) {
  return axios.get(`${preUrl}/chnl/chrgr`, param);
}

function fetchGetMcgDealChrgrList(param) {
  return axios.get(`${preUrl}/deal/chrgr`, param);
}

function fetchPostMcgChnlList(param) {
  return axios.post(`${preUrl}/chnl/post`, param);
}

function fetchPostMcgDealList(param) {
  return axios.post(`${preUrl}/deal/post`, param);
}

function fetchPostMcgServerList(param) {
  return axios.post(`${preUrl}/chnl/server/post`, param);
}

function fetchPostMcgChnlChrgr1(param) {
  return axios.post(`${preUrl}/chnl/chrgr1/post`, param);
}

function fetchPostMcgDealChrgr2(param) {
  return axios.post(`${preUrl}/deal/chrgr2/post`, param);
}

function fetchPostMcgDealChrgr1(param) {
  return axios.post(`${preUrl}/deal/chrgr1/post`, param);
}

function fetchPostMcgChnlChrgr2(param) {
  return axios.post(`${preUrl}/chnl/chrgr2/post`, param);
}

function fetchPutMcgChnlList(param) {
  return axios.put(`${preUrl}/chnl/put`, param);
}

function fetchPutMcgDealList(param) {
  return axios.put(`${preUrl}/deal/put`, param);
}

function fetchPutMcgServerList(param) {
  return axios.put(`${preUrl}/chnl/server/put`, param);
}

function fetchPutMcgChnlChrgr1(param) {
  return axios.put(`${preUrl}/chnl/chrgr1/put`, param);
}

function fetchPutMcgChnlChrgr2(param) {
  return axios.put(`${preUrl}/chnl/chrgr2/put`, param);
}

function fetchPutMcgDealChrgr1(param) {
  return axios.put(`${preUrl}/deal/chrgr1/put`, param);
}

function fetchPutMcgDealChrgr2(param) {
  return axios.put(`${preUrl}/deal/chrgr2/put`, param);
}

function fetchGetMcgVirtualUserList(param) {
  return axios.get(`${preUrl}/vuser`, param);
}

function fetchPostMcgVirtualUserList(param) {
  return axios.post(`${preUrl}/vuser/post`, param);
}

function fetchPutVirtualUserList(param) {
  return axios.put(`${preUrl}/vuser/put`, param);
}


export {
  fetchGetMcgChnlList,
  fetchGetMcgServerList,
  fetchGetMcgChnlChrgrList,
  fetchGetMcgDealChrgrList,
  fetchPostMcgChnlList,
  fetchPostMcgServerList,
  fetchPutMcgChnlList,
  fetchPutMcgServerList,
  fetchPutMcgDealList,
  fetchPostMcgDealList,
  fetchGetMcgDealList,
  fetchGetMcgVirtualUserList,
  fetchPostMcgVirtualUserList,
  fetchPutVirtualUserList,
  fetchPostMcgChnlChrgr1,
  fetchPostMcgChnlChrgr2,
  fetchPostMcgDealChrgr1,
  fetchPostMcgDealChrgr2,
  fetchPutMcgChnlChrgr1,
  fetchPutMcgChnlChrgr2,
  fetchPutMcgDealChrgr1,
  fetchPutMcgDealChrgr2,

};
