/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
// import helpers from '@/utils/helpers';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// csrf 적용
axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

const config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // 해당 ms 이내에 응답이 오지 않으면 에러로 간주
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

let loader;

_axios.interceptors.request.use(
    config =>
    // Do something before request is sent
    {
        this.$gf.showLoading(5000); // 로딩 화면 노출

        return config
    },
    error => {
        this.$gf.showLoading(1000); // 로딩 화면 노출
        // Do something with request error
        console.log('axios 실패!'); // 이런식으로 넣으면 됨.
        return Promise.reject(error)
    },
);

// Add a response interceptor
_axios.interceptors.response.use(
    response =>
    // Do something with response data
    {
        //console.log('리스폰스 : ');
        console.log(response);
        let rstMsg = '';
        //rstCd 분기처리
        if (response.data.rstCd === 'D') {
            console.log('세션 정보 획득 실패, 로그인 화면으로 이동합니다.');
            rstMsg = `로그인 정보가 만료되어, 로그인화면으로 이동합니다.`;
            if (response.data.rstMsg !== null) {
                rstMsg = response.data.rstMsg;
            }

            let aFunc = function() { // 함수 전달 방식으로 파라미터에 전달
                router.push({ name: "login" });
            };
            Vue.gf.alertOn(rstMsg, aFunc);

        } else if (response.data.rstCd === 'E') {
            console.log('에러발생');
            if (response.data.rstMsg !== null) {
                rstMsg = response.data.rstMsg;
            }
            // alert(rstMsg);
            Vue.gf.alertOn(rstMsg);
        }
        helpers.hideLoading(); // 로딩화면 멈춤

        return response
    },
    error => {
        // Do something with response error
        helpers.hideLoading(); // 로딩화면 멈춤
        return Promise.reject(error)
    },
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
        },
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;