/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@/router/index';
import store from '@/store/index';
import { Toast } from 'vant';
import { now, keys } from 'lodash';
import qs from 'qs';
import base from "@/api/base.js"; // 导入接口域名列表
import * as config from '@/config';

const secretKey = config.secretKey;
const baseAPI = base.VUE_APP_BASE_API;
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}
// 标准化参数
const standardiseParams = (params, ignores = []) => {
    const signParams = {
        format: config.format,
        timestamp: now(),
        tenantCode: 'dev'
    };
    keys(params).forEach(key => {
        // 忽略参与签名,包括config文件配置的全局ignores以及各请求params传入的ignores
        if (config.ignores.indexOf(key) !== -1 || ignores.indexOf(key) !== -1) {
            return;
        }
        if (params[key] === null) {
            signParams[key] = '';
        } else {
            signParams[key] = params[key];
        }
    });

    // params.ns = ignores.join();
    // if (!params.ns) {
    //     delete params.ns;
    // }

    return qs.stringify(
        // {
        // ...params,
        // ...signParams,
        createSign(signParams)
        // }
    );
};
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('changeLogin', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
instance.defaults.baseURL = '/api'
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf8';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
    config => {
        // console.log(store.getters.token);
        if (localStorage.getItem('token')) {
            config.headers['X-Token'] = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    })

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        const { response } = error;
        const res = response.data.result;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(res.code, res.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });
// export default instance;
const request = function (method, data) {
    // const request = function ({ url: apiURL, method, data: params = {}, ignores }) {
    debugger

    // instance.defaults.baseURL = baseAPI;
    return new Promise(function (resolve, reject) {
        const signParams = {
            format: config.format,
            timestamp: now(),
            tenantCode: 'dev'
        };
        let jsonObj = JSON.parse(JSON.stringify(data));
        jsonObj.sign = createSign(signParams);

        instance({
            method: method || 'post',
            url: '/voucher/router',
            data: qs.stringify(jsonObj)
        }).then(response => {
            resolve(response);
        }).catch(error => {
            const res = error.response;
            reject(res);
        });

        // instance
        //     .request({
        //         url: "/voucher/router",
        //         method: method || 'post',
        //         data: {
        //             data: params,
        //             service: apiURL,
        //             sign: standardiseParams(params, ignores)
        //         }
        //     })
        //     .then(response => {
        //         if (response.code === '1') {
        //             resolve(response);
        //         } else {
        //             reject(response);
        //         }
        //     })
        //     .catch(error => {
        //         const res = error.response;
        //         reject(res);
        //     });
    });
};

export default request;
/* ============================ 以下为加密算法 ============================== */
function createSign(params) {
    const keys = Object.keys(params);
    const hashMap = [];

    keys.forEach(key => {
        hashMap.push({
            key,
            value: params[key]
        });
    });
    hashMap.sort(orderBy('key'));

    return ropsign(hashMap, secretKey || '');
}

function orderBy(name) {
    return function (o, p) {
        var a, b;
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw new Error('error');
        }
    };
}

function ropsign(arrtest, secretKey) {
    var sss = '';
    sss = sss + secretKey;
    for (var key = 0; key < arrtest.length; key++) {
        sss = sss + arrtest[key].key + arrtest[key].value;
    }
    sss = sss + secretKey;
    return hex_sha1(utf16to8(sss));
}

function utf16to8(str) {
    var out, i, len, c;

    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }

    return out;
}

/* eslint-disable */
function hex_sha1(s) {
    return binb2hex(core_sha1(alignSHA1(s)));
}

function alignSHA1(str) {
    var nblk = ((str.length + 8) >> 6) + 1;

    var blks = new Array(nblk * 16);
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < str.length; i++) { blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8) }
    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
    blks[nblk * 16 - 1] = str.length * 8;
    return blks;
}

function core_sha1(blockArray) {
    var x = blockArray // append padding
    var w = Array(80)
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878
    var e = -1009589776
    for (
        var i = 0;
        i < x.length;
        i += 16 // 每次处理512位 16*32
    ) {
        var olda = a
        var oldb = b
        var oldc = c
        var oldd = d
        var olde = e
        for (
            var j = 0;
            j < 80;
            j++ // 对每个512位进行80步操作
        ) {
            if (j < 16) w[j] = x[i + j]
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)
            var t = safe_add(
                safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                safe_add(safe_add(e, w[j]), sha1_kt(j))
            )
            e = d
            d = c
            c = rol(b, 30)
            b = a
            a = t
        }
        a = safe_add(a, olda)
        b = safe_add(b, oldb)
        c = safe_add(c, oldc)
        d = safe_add(d, oldd)
        e = safe_add(e, olde)
    }
    return [a, b, c, d, e]
}

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
}

function sha1_kt(t) {
    return t < 20
        ? 1518500249
        : t < 40
            ? 1859775393
            : t < 60
                ? -1894007588
                : -899497514
}

function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | (~b & d)

    if (t < 40) return b ^ c ^ d

    if (t < 60) return (b & c) | (b & d) | (c & d)
    return b ^ c ^ d // t<80
}

function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
}

function binb2hex(binarray) {
    var hex_tab = config.hexcase ? '0123456789ABCDEF' : '0123456789abcdef'
    var str = ''
    for (var i = 0; i < binarray.length * 4; i++) {
        str +=
            hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
            hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf)
    }
    return str.toUpperCase()
}

