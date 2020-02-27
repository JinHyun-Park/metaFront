/* eslint-disable no-undef */
const preUrl = '/api/ifreg';

function fetchGetIfRegList(param) {
  return axios.get(`${preUrl}/list`, param);
}

export {
  fetchGetIfRegList,
};
