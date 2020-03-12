/* eslint-disable no-undef */
const preUrl = '/api/ifreq';

function fetchGetIfRegList(param) {
  return axios.get(`${preUrl}/list`, param);
}

export {
  fetchGetIfRegList,
};
