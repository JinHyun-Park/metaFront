/* eslint-disable no-undef */
const preUrl = '/api/dashboard';

function fetchGetQueueDepthList(param) {
  return axios.get(`${preUrl}/queueDepth`, param);
}
function fetchGetQueueDepthByQueueNmList(param) {
  return axios.get(`${preUrl}/queueDepth/queueNm`, param);
}

export {
  fetchGetQueueDepthList,
  fetchGetQueueDepthByQueueNmList,
};
