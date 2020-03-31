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

function fetchGetMcgChrgrList(param) {
  return axios.get(`${preUrl}/chnl/chrgr`, param);
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

function fetchPostMcgChrgrList(param) {
  return axios.post(`${preUrl}/chnl/chrgr/post`, param);
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

function fetchPutMcgChrgrList(param) {
  return axios.put(`${preUrl}/chnl/chrgr/put`, param);
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
  fetchGetMcgChrgrList,
  fetchPostMcgChnlList,
  fetchPostMcgServerList,
  fetchPostMcgChrgrList,
  fetchPutMcgChnlList,
  fetchPutMcgServerList,
  fetchPutMcgChrgrList,
  fetchPutMcgDealList,
  fetchPostMcgDealList,
  fetchGetMcgDealList,
  fetchGetMcgVirtualUserList,
  fetchPostMcgVirtualUserList,
  fetchPutVirtualUserList,

};
