/* eslint-disable no-undef */
const preUrl = '/api/monitoring';

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
