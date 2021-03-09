/* eslint-disable no-undef */
const preUrl = '/api/statistic';

function fetchGetStatEaiMonthlyTrms(param) {
  return axios.get(`${preUrl}/monthly/eai`, param);
}

function fetchGetStatEigwMonthlyTrms(param) {
  return axios.get(`${preUrl}/monthly/eigw`, param);
}

function fetchGetStatMcgMonthlyTrms(param) {
  return axios.get(`${preUrl}/monthly/mcg`, param);
}

function fetchGetStatEaiDailyTrms(param) {
  return axios.get(`${preUrl}/daily/eai`, param);
}

function fetchGetStatEigwDailyTrms(param) {
  return axios.get(`${preUrl}/daily/eigw`, param);
}

function fetchGetStatMcgDailyTrms(param) {
  return axios.get(`${preUrl}/daily/mcg`, param);
}

function fetchGetStatEaiHourlyTrms(param) {
  return axios.get(`${preUrl}/hourly/eai`, param);
}

function fetchGetStatEigwHourlyTrms(param) {
  return axios.get(`${preUrl}/hourly/eigw`, param);
}

function fetchGetStatMcgHourlyTrms(param) {
  return axios.get(`${preUrl}/hourly/mcg`, param);
}

function fetchPostStatMcgHourlyTrmsDetail(param) {
  return axios.post(`${preUrl}/hourly/mcg/detail`, param);
}

export {
  fetchGetStatEaiMonthlyTrms,
  fetchGetStatEigwMonthlyTrms,
  fetchGetStatMcgMonthlyTrms,
  fetchGetStatEaiDailyTrms,
  fetchGetStatEigwDailyTrms,
  fetchGetStatMcgDailyTrms,
  fetchGetStatEaiHourlyTrms,
  fetchGetStatEigwHourlyTrms,
  fetchGetStatMcgHourlyTrms,
  fetchPostStatMcgHourlyTrmsDetail,
};
