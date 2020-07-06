/* eslint-disable no-undef */
const preUrl = '/api/statistic';

function fetchGetStatEaiDailyTrms(param) {
  return axios.get(`${preUrl}/daily/eai`, param);
}
function fetchGetStatEigwDailyTrms(param) {
  return axios.get(`${preUrl}/daily/eigw`, param);
}
function fetchGetStatMcgDailyTrms(param) {
  return axios.get(`${preUrl}/daily/mcg`, param);
}

export {
  fetchGetStatEaiDailyTrms,
  fetchGetStatEigwDailyTrms,
  fetchGetStatMcgDailyTrms,
};
