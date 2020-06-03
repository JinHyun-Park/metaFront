/* eslint-disable no-undef */

const preUrl = '/api/eigw';

function fetchEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchSaveEigwServerInfo(param) {
  return axios.post(`${preUrl}/serverInfo`, param);
}

function fetchPutEigwServerInfo(param) {
  return axios.put(`${preUrl}/serverInfo`, param);
}

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

function fetchEigwMetaSaveChrgr(param) {
  return axios.post(`${preUrl}/fileChrgrInfo`, param);
}

function fetchDeleteChrgrInfo(param) {
  return axios.delete(`${preUrl}/fileChrgrInfo`, param);
}

function fetchEigwMetaSaveServe(param) {
  return axios.post(`${fileUrl}/servesave`, param);
}

function fetchGetEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchGetEigwChrgrInfo(param) {
  return axios.get(`${preUrl}/chrgrInfo`, param);
}

function fetchSaveEigwChrgrInfo(param) {
  return axios.post(`${preUrl}/chrgrInfo`, param);
}

function fetchPutEigwChrgrInfo(param) {
  return axios.put(`${preUrl}/chrgrInfo`, param);
}

function fetchEigwAdOnlineList(param) {
  return axios.get(`${preUrl}/onlineList`, param);
}

function fetchEigwOnlineDetail(param) {
  return axios.get(`${preUrl}/onlineDetail`, param);
}

function fetchEigwOnlineSaveInfo(param) {
  return axios.post(`${preUrl}/onlineInfo`, param);
}

function fetchEigwOninePutInfo(param) {
  return axios.put(`${preUrl}/onlineInfo`, param);
}

function fetchEigwOnlineSaveChrgr(param) {
  return axios.post(`${preUrl}/onlineChrgrInfo`, param);
}

function fetchDeleteOnlineChrgrInfo(param) {
  return axios.delete(`${preUrl}/onlineChrgrInfo`, param);
}

function fetchEigwReqList(param) {
  return axios.get(`${preUrl}/ifReqList`, param);
}

function fetchEigwReqSave(param) {
  return axios.post(`${preUrl}/ifReqInfo`, param);
}

export {
  fetchEigwServerList,
  fetchEigwAdFileList,
  fetchEigwFileDetail,
  fetchEigwMetaSaveInfo,
  fetchEigwMetaSaveServe,
  fetchEigwMetaSaveChrgr,
  fetchGetEigwServerList,
  fetchGetEigwChrgrInfo,
  fetchEigwAdOnlineList,
  fetchEigwOnlineDetail,
  fetchDeleteChrgrInfo,
  fetchSaveEigwChrgrInfo,
  fetchPutEigwChrgrInfo,
  fetchSaveEigwServerInfo,
  fetchPutEigwServerInfo,
  fetchEigwMetaPutInfo,
  fetchEigwOnlineSaveInfo,
  fetchEigwOninePutInfo,
  fetchEigwOnlineSaveChrgr,
  fetchDeleteOnlineChrgrInfo,
  fetchEigwReqList,
  fetchEigwReqSave,
};
