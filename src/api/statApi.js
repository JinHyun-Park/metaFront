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

function fetchGetStatEaiHourlyTrms(param) {
    return axios.get(`${preUrl}/hourly/eai`, param);
}

function fetchGetStatEigwHourlyTrms(param) {
    return axios.get(`${preUrl}/hourly/eigw`, param);
}

function fetchGetStatMcgHourlyTrms(param) {
    return axios.get(`${preUrl}/hourly/mcg`, param);
}

export {
    fetchGetStatEaiDailyTrms,
    fetchGetStatEigwDailyTrms,
    fetchGetStatMcgDailyTrms,
    fetchGetStatEaiHourlyTrms,
    fetchGetStatEigwHourlyTrms,
    fetchGetStatMcgHourlyTrms,
};