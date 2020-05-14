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

function fetchPostServer(param) {
  return axios.post(`${preUrl}/server`, param);
}

function fetchPutServer(param) {
  return axios.put(`${preUrl}/server`, param);
}

function fetchDeleteServer(param) {
  return axios.delete(`${preUrl}/server`, param);
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

function fetchPostInstCdList(param) {
  return axios.post(`${preUrl}/inst_cd`, param);
}

function fetchPutInstCdList(param) {
  return axios.put(`${preUrl}/inst_cd`, param);
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
  fetchPostServer,
  fetchPutServer,
  fetchDeleteServer,
  fetchGetCcCdList,
  fetchPostCcCdList,
  fetchPutCcCdList,
  fetchGetInstCdList,
  fetchPostInstCdList,
  fetchPutInstCdList,
  fetchDeleteInstCdList,
  fetchGetChrgrInfo,
  fetchGetMenuList,
  fetchGetMyChrgrInfo,
};
