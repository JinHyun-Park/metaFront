/* eslint-disable no-undef */
const preUrl = '/api/bizcomm';

function fetchSearchBoard(param) {
  return axios.get(`${preUrl}/board`, param);
}

function fetchDeleteBoard(param) {
  return axios.delete(`${preUrl}/board`, param);
}

function fetchGetCccdSelbox(param) {
  return axios.get(`${preUrl}/cccd/selectbox`, param);
}

function fetchServerList(param) {
  return axios.get(`${preUrl}/server`, param);
}

function fetchGetCcCdList(param) {
  return axios.get(`${preUrl}/cccd`, param);
}

function fetchPutCcCdList(param) {
  return axios.put(`${preUrl}/cccd`, param);
}

function fetchPostCcCdList(param) {
  return axios.post(`${preUrl}/cccd`, param);
}

function fetchGetInstCdList(param) {
  return axios.get(`${preUrl}/inst_cd`, param);
}

function fetchDeleteInstCdList(param) {
  return axios.delete(`${preUrl}/inst_cd`, param);
}

function fetchGetChrgrInfo(param) {
  return axios.get(`${preUrl}/chrgr`, param);
}

function fetchGetMenuList(param) {
  return axios.get(`${preUrl}/menu`, param);
}

function fetchGetMyChrgrInfo(param) {
  return axios.get(`${preUrl}/chrgr/my`, param);
}

export {
  fetchSearchBoard,
  fetchDeleteBoard,
  fetchGetCccdSelbox,
  fetchServerList,
  fetchGetCcCdList,
  fetchPostCcCdList,
  fetchPutCcCdList,
  fetchGetInstCdList,
  fetchDeleteInstCdList,
  fetchGetChrgrInfo,
  fetchGetMenuList,
  fetchGetMyChrgrInfo,
};
