/* eslint-disable no-undef */

const preUrl = '/api/eigw/';
const fileUrl = '/api/eigw/file/MetaInfo/';

function fetchEigwServerList(param) {
  return axios.get(`${preUrl}serverList`, param);
}

function fetchEigwAdFileList(param) {
  return axios.get(`${preUrl}admin/fileList`, param);
}

function fetchEigwFileDtlInfo() {
  return axios.get(`${preUrl}fileDtlInfo`);
}

function fetchEigwMetaSaveInfo(saveInfo) {
  return axios.post(`${fileUrl}save`, saveInfo);
}

function fetchEigwMetaSaveServe(serverList) {
  return axios.post(`${fileUrl}servesave`, serverList);
}

function fetchEigwMetaSaveChrgr(idList) {
  return axios.post(`${fileUrl}chrgrsave`, idList);
}

export {
  fetchEigwServerList,
  fetchEigwAdFileList,
  fetchEigwFileDtlInfo,
  fetchEigwMetaSaveInfo,
  fetchEigwMetaSaveServe,
  fetchEigwMetaSaveChrgr,
};
