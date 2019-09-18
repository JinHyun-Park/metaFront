/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

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

_axios.interceptors.request.use(
    config =>
    // Do something before request is sent
    {
        console.log('axios 시작'); // 이런식으로 넣으면 됨.
        return config
    },
    error => {
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
        console.log('리스폰스 : ');
        // console.log(response);
        return response
    },
    error =>
    // Do something with response error
    Promise.reject(error),
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