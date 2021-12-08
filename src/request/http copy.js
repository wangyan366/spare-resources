import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant';
import store from '@/store/index';
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
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




