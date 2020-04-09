/* eslint-disable no-undef */
const preUrl = '/api/eai';

function fetchGetEaiMqMngrList(param) {
  return axios.get(`${preUrl}/mqMngr`, param);
}

function fetchGetEaiQueueList(param) {
  return axios.get(`${preUrl}/queue`, param);
}

function fetchGetEaiChannelList(param) {
  return axios.get(`${preUrl}/channel`, param);
}

function fetchPostEaiChannelList(param) {
  return axios.post(`${preUrl}/channel`, param);
}

function fetchGetEaiSwgSndList(param) {
  return axios.get(`${preUrl}/swg/snd`, param);
}

function fetchGetEaiSwgRcvList(param) {
  return axios.get(`${preUrl}/swg/rcv`, param);
}

function fetchPostEaiSwgSnd(param) {
  return axios.post(`${preUrl}/swg/snd`, param);
}

function fetchEaiServerList(param) {
  return axios.get(`${preUrl}/server`, param);
}

function fetchGetEaiRegSvrList(param) {
  return axios.get(`${preUrl}/regSvrList`, param);
}

function fetchGetEaiRegIfList(param) {
  return axios.get(`${preUrl}/regIfList`, param);
}

function fetchGetEaiIfDetailInfo(param) {
  return axios.get(`${preUrl}/eaiDetail`, param);
}

export {
  fetchGetEaiMqMngrList,
  fetchGetEaiQueueList,
  fetchGetEaiChannelList,
  fetchPostEaiChannelList,
  fetchGetEaiSwgSndList,
  fetchGetEaiSwgRcvList,
  fetchPostEaiSwgSnd,
  fetchEaiServerList,
  fetchGetEaiRegSvrList,
  fetchGetEaiRegIfList,
  fetchGetEaiIfDetailInfo,
};
