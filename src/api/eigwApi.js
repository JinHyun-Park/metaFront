/* eslint-disable no-undef */

const preUrl = '/api/eigw';
const fileUrl = '/api/eigw/file/MetaInfo';

function fetchEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchEigwAdFileList(param) {
  return axios.get(`${preUrl}/fileList`, param);
}

function fetchEigwFileDetail(param) {
  return axios.get(`${preUrl}/fileDetail`, param);
}

function fetchEigwMetaSaveInfo(saveInfo) {
  return axios.post(`${preUrl}/fileInfoSave`, saveInfo);
}

function fetchEigwMetaSaveChrgr(inuserList) {
  return axios.post(`${preUrl}/fileChrgrInfoSave`, inuserList);
}

function fetchEigwMetaSaveServe(serverList) {
  return axios.post(`${fileUrl}/servesave`, serverList);
}

function fetchGetEigwServerList(param) {
  return axios.get(`${preUrl}/serverList`, param);
}

function fetchGetEigwChrgrInfo(param) {
  return axios.get(`${preUrl}/chrgrInfo`, param);
}

function fetchDeleteChrgrInfo(param) {
  return axios.delete(`${preUrl}/fileChrgrInfoDelete`, param);
}


function fetchEigwAdOnlineList(param) {
  return axios.get(`${preUrl}/onlineList`, param);
}

function fetchEigwOnlineDetail(param) {
  return axios.get(`${preUrl}/onlineDetail`, param);
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
};
