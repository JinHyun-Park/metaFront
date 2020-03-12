/* eslint-disable no-undef */
const preUrl = '/api/mcg';

function fetchGetMcgChnlList(param) {
    return axios.get(`${preUrl}/chnl`, param);
}


export {
    // eslint-disable-next-line import/prefer-default-export
    fetchGetMcgChnlList,
};