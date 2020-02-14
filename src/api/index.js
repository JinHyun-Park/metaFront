/* eslint-disable no-undef */
// axios 등 직접적으로 소스 내에서 수행하지 않고 이곳에서 정리해두고 가져다 쓰는 곳
// 20.02.10 추가
// 가져다 쓰는 곳에서는 import { fetchExampleData } from './api/index.js'; 해서 쓰면 됨

function fetchExampleData() {
  return axios.get('url');
}

function fetchExampleData2() {
  return axios.get('url');
}

export {
  fetchExampleData,
  fetchExampleData2,
};
