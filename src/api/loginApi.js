/* eslint-disable no-undef */ // axios 때문에 넣어줌
// 로그인&유저 API
// import { fetchLoginProc } from '@/api/loginApi'; 이런식으로 import 하고 함수 호출
const preUrl = '/api';

function fetchResetPasswd(reqData) {
  return axios.post(`${preUrl}/user/reqresetpasswd`, reqData);
}

function fetchChangePasswd(reqData) {
  return axios.post(`${preUrl}/user/reqchgpasswd`, reqData);
}

function fetchResetPasswdAdmin(reqData) {
  return axios.post(`${preUrl}/user/resetpasswdadmin`, reqData);
}

function fetchLoginProc(form) {
  return axios.post(`${preUrl}/loginProc`, form);
}

function fetchGetUserDetailInfo(params) {
  return axios.get(`${preUrl}/user/detail`, params);
}

function fetchGetUserInfoList(param) {
  return axios.get(`${preUrl}/user/list`, param);
}

function fetchGetLogout(param) {
  return axios.get(`${preUrl}/logout`, param);
}

function fetchGetUserAuth() {
  return axios.get(`${preUrl}/user/auth`);
}

export {
  fetchResetPasswd,
  fetchLoginProc,
  fetchGetUserDetailInfo,
  fetchGetUserInfoList,
  fetchGetLogout,
  fetchResetPasswdAdmin,
  fetchGetUserAuth,
  fetchChangePasswd,
};
