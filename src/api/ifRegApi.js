/* eslint-disable no-undef */
const preUrl = '/api/ifReg';

function fetchGetIfRegList(param) {
  return axios.get(`${preUrl}/list`, param);
}

export {
  fetchGetIfRegList,
};
