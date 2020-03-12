/* eslint-disable no-undef */
const preUrl = '/api/bizcomm';

function fetchSearchBoard(param) {
  return axios.get(`${preUrl}/board`, param);
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

export {
  fetchSearchBoard,
  fetchGetCccdSelbox,
  fetchServerList,
  fetchGetCcCdList,
  fetchPostCcCdList,
  fetchPutCcCdList,
  fetchGetInstCdList,
  fetchDeleteInstCdList,
  fetchGetChrgrInfo,
};