/* eslint-disable no-undef */
const preUrl = '/api/ifreq';

function fetchGetIfRegList(param) {
    return axios.get(`${preUrl}/list`, param);
}

function fetchGetIfReqMst(param) {
    return axios.get(`${preUrl}/detail/step1`, param);
}

function fetchPostIfStep1Reg(param) {
    return axios.post(`${preUrl}/reqInfo/step1`, param);
}

function fetchPutIfStep1Reg(param) {
    return axios.put(`${preUrl}/reqInfo/step1`, param);
}


function fetchPostIfStep2Reg(param) {
    return axios.post(`${preUrl}/reqInfo/step2`, param);
}

export {
    fetchGetIfRegList,
    fetchGetIfReqMst,
    fetchPostIfStep1Reg,
    fetchPutIfStep1Reg,
    fetchPostIfStep2Reg,
};