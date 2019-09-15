/* eslint-disable */
import axios from 'axios';

export default {
    setCcCdList: (store, payload) => {
        let rstList = [];
        let rst = [];
        const allRstOne = { cdDtlId: '', cdNm: '전체' };

        if (payload.opClCd == null || payload.cdId == null) {
            rstList.push(allRstOne);
            rst[payload.listNm] = rstList;
            payload.ccCdList = rst;
            store.commit('setCcCdList', payload);
            return;
        }

        axios.get('/api/bizcomm/cccd/selectbox', {
                params: {
                    opClCd: payload.opClCd,
                    cdId: payload.cdId,
                    cdDtlId: '',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    //console.log(res.data);
                    if (res.data.rstData.ccCdLst.length > 0) {
                        rstList = res.data.rstData.ccCdLst;
                        if (payload.allYn === 'Y') {
                            rstList.unshift(allRstOne);
                        }

                        rst[payload.listNm] = rstList;
                        payload.ccCdList = rst;
                        console.log(payload.ccCdList);
                        store.commit('setCcCdList', payload);
                        return;
                    }
                }
            })
            .catch((ex) => {
                console.log(`error occur!! : ${ex}`);
            });

        store.commit('setCcCdList', payload);
    },
};