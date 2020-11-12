/* eslint-disable no-undef */

const preUrl = '/api/eigw';

// Server
function fetchEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchGetEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchSaveEigwServerInfo(param) {
  return axios.post(`${preUrl}/serverInfo`, param);
}

function fetchPutEigwServerInfo(param) {
  return axios.put(`${preUrl}/serverInfo`, param);
}

// Chrgr
function fetchGetEigwChrgrInfo(param) {
  return axios.get(`${preUrl}/chrgrInfo`, param);
}

function fetchSaveEigwChrgrInfo(param) {
  return axios.post(`${preUrl}/chrgrInfo`, param);
}

function fetchPutEigwChrgrInfo(param) {
  return axios.put(`${preUrl}/chrgrInfo`, param);
}

// Req
function fetchEigwReqList(param) {
  return axios.get(`${preUrl}/ifReqList`, param);
}

function fetchEigwReqSave(param) {
  return axios.post(`${preUrl}/ifReqInfo`, param);
}

// File
function fetchEigwAdFileList(param) {
  return axios.get(`${preUrl}/fileList`, param);
}

function fetchEigwFileDetail(param) {
  return axios.get(`${preUrl}/fileDetail`, param);
}

function fetchEigwMetaSaveInfo(param) {
  return axios.post(`${preUrl}/fileInfo`, param);
}

function fetchEigwMetaPutInfo(param) {
  return axios.put(`${preUrl}/fileInfo`, param);
}

// Online
function fetchEigwAdOnlineList(param) {
  return axios.get(`${preUrl}/onlineList`, param);
}

function fetchGetEigwOnlineList(param) {
  return axios.get(`${preUrl}/onlineList`, param);
}

function fetchGetEigwOnlineInfo(param) {
  return axios.get(`${preUrl}/onlineInfo`, param);
}

function fetchPostEigwOnlineInfo(param) {
  return axios.post(`${preUrl}/onlineInfo`, param);
}

function fetchPutEigwOnlineInfo(param) {
  return axios.put(`${preUrl}/onlineInfo`, param);
}

function fetchDeleteEigwOnlineInfo(param) {
  return axios.delete(`${preUrl}/onlineInfo`, param);
}

function fetchGetEigwProcList(param) {
  return axios.get(`${preUrl}/procList`, param);
}

function fetchPostEigwProcInfo(param) {
  return axios.post(`${preUrl}/procInfo`, param);
}

function fetchPutEigwProcInfo(param) {
  return axios.put(`${preUrl}/procInfo`, param);
}

function fetchDeleteEigwProcInfo(param) {
  return axios.delete(`${preUrl}/procInfo`, param);
}

export {
  // Server
  fetchGetEigwServerList,
  fetchSaveEigwServerInfo,
  fetchPutEigwServerInfo,
  fetchEigwServerList,
  // Chrgr
  fetchGetEigwChrgrInfo,
  fetchSaveEigwChrgrInfo,
  fetchPutEigwChrgrInfo,
  // ReqfetchPut
  fetchEigwReqList,
  fetchEigwReqSave,
  // File
  fetchEigwAdFileList,
  fetchEigwFileDetail,
  fetchEigwMetaSaveInfo,
  fetchEigwMetaPutInfo,
  // Online
  fetchEigwAdOnlineList,
  fetchGetEigwOnlineList,
  fetchGetEigwOnlineInfo,
  fetchPostEigwOnlineInfo,
  fetchPutEigwOnlineInfo,
  fetchDeleteEigwOnlineInfo,
  fetchGetEigwProcList,
  fetchPutEigwProcInfo,
  fetchPostEigwProcInfo,
  fetchDeleteEigwProcInfo,
};
