/* eslint-disable no-undef */
const preUrl = '/api/bizcomm/';

function fetchSearchBoard(param) {
  return axios.get(`${preUrl}board`, param);
}

function fetchGetCccdSelbox(param) {
  return axios.get(`${preUrl}cccd/selectbox`, param);
}

function fetchServerList(param) {
  return axios.get(`${preUrl}server`, param);
}

export {
  fetchSearchBoard,
  fetchGetCccdSelbox,
  fetchServerList,
};
