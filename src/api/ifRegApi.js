/* eslint-disable no-undef */
const preUrl = '/api/ifreq';

function fetchGetIfRegList(param) {
    return axios.get(`${preUrl}/list`, param);
}

function fetchPostIfStep2Reg(param) {
    return axios.post(`${preUrl}/reqInfo/step2`, param);
}

export {
    fetchGetIfRegList,
    fetchPostIfStep2Reg,
};