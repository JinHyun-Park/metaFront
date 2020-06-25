/* eslint-disable no-undef */
const preUrl = '/api/dashboard';

function fetchGetQueueDepthList(param) {
  return axios.get(`${preUrl}/queueDepth`, param);
}

export {
  fetchGetQueueDepthList,
};
