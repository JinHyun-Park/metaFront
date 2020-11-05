/* eslint-disable no-undef */
const preUrl = '/api/monitoring';

function fetchGetQueueDepthList(param) {
  return axios.get(`${preUrl}/queueDepth`, param);
}
function fetchGetQueueDepthByQueueNmList(param) {
  return axios.get(`${preUrl}/queueDepth/queueNm`, param);
}

function fetchGetQueueDepthListReal(param) {
  return axios.get(`${preUrl}/queueDepthReal`, param);
}

export {
  fetchGetQueueDepthList,
  fetchGetQueueDepthByQueueNmList,
  fetchGetQueueDepthListReal,
};
