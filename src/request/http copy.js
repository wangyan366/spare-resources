import axios from 'axios'
import QS from 'qs'; // ����qsģ�飬�������л�post���͵����ݣ�������ᵽ
// vant��toast��ʾ���������ҿɸ����Լ���ui������ġ�
import { Toast } from 'vant';
import store from '@/store/index';
// �������л�
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'

// ����������
axios.interceptors.request.use(
  config => {
    // ÿ�η�������֮ǰ�ж�vuex���Ƿ����token        
    // ������ڣ���ͳһ��http�����header������token��������̨����token�ж���ĵ�¼���
    // ��ʹ���ش���token��Ҳ�п���token�ǹ��ڵģ���������Ӧ��������Ҫ�Է���״̬�����ж� 
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })
// ��Ӧ������
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // ������״̬�벻��200�����
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: δ��¼
        // δ��¼����ת��¼ҳ�棬��Я����ǰҳ���·��
        // �ڵ�¼�ɹ��󷵻ص�ǰҳ�棬��һ����Ҫ�ڵ�¼ҳ������
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        // 403 token����
        // ��¼���ڶ��û�������ʾ
        // �������token�����vuex��token����
        // ��ת��¼ҳ��
        case 403:
          Toast({
            message: '��¼���ڣ������µ�¼',
            duration: 1000,
            forbidClick: true
          })
          // ���token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // ��ת��¼ҳ�棬����Ҫ�����ҳ��fullPath����ȥ����¼�ɹ�����ת��Ҫ���ʵ�ҳ��
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        // 404���󲻴���
        case 404:
          Toast({
            message: '�������󲻴���',
            duration: 1500,
            forbidClick: true
          })
          break
        // ��������ֱ���׳�������ʾ
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
 * get��������Ӧget����
 * @param {String} url [�����url��ַ]
 * @param {Object} params [����ʱЯ���Ĳ���]
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
 * post��������Ӧpost����
 * @param {String} url [�����url��ַ]
 * @param {Object} params [����ʱЯ���Ĳ���]
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
/* ============================ ����Ϊ�����㷨 ============================== */
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
    i += 16 // ÿ�δ���512λ 16*32
  ) {
    var olda = a
    var oldb = b
    var oldc = c
    var oldd = d
    var olde = e
    for (
      var j = 0;
      j < 80;
      j++ // ��ÿ��512λ����80������
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




