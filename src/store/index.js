import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import CryptoJS from 'crypto-js'
import base from "@/api/base.js"; // 导入接口域名列表
import request from '@/request/http';
// import services from '@/store/services';
// axios.defaults.baseURL = '/api'  
Vue.use(Vuex) //安装使用这个功能
const store = new Vuex.Store({
	state: {
		token: localStorage.getItem("token") ? localStorage.getItem("token") : '',
		user: {},
		myInfo: {},
		tabName: 'home',
		competitionExisting: 2,
		showDanger: 2,
		showGoods: 2,
		showContestRate: 2,
		netcase: 2,
		safeDiploma: 2,
		network: true,
	},

	actions: {
		getMy({ context }, payload) {
			debugger
			let obj = {
				service: 'voucher.my.get',
				userId: '3429c686-1c91-4a82-b8db-62ea4323c548',
				// service:'voucher.my.get',
			}
			request('post', obj).then((res) => {
				return console.log("🚀 ~ file: index.js ~ line 92 ~ ).then ~ res", res)
			}).catch((err) => {
				return console.log("🚀 ~ file: index.js ~ line 94 ~ ).then ~ err", err)

			})
		},
		login({ context }, payload) {
			console.log("? ~ file: index.js ~ line 24 ~ login ~ payload", payload)
			debugger
			const initKey = 'vou2gg';
			const keySize = 128;
			/**
			 * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
			 * @param {string} key - 原始 key 值
			 * @return Buffer
			 */
			const fillKey = (key) => {
				const filledKey = Buffer.alloc(keySize / 8);
				const keys = Buffer.from(key);
				if (keys.length < filledKey.length) {
					filledKey.map((b, i) => filledKey[i] = keys[i]);
				}

				return filledKey;
			};

			/**
			 * 定义加密函数
			 * @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data);
			 * @param {string} key - 加密使用的 key
			 */
			const aesEncrypt = (data, key) => {

				/**
				 * CipherOption, 加密的一些选项:
				 *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
				 *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
				 *   iv: 偏移量, mode === ECB 时, 不需要 iv
				 * 返回的是一个加密对象
				 */
				const cipher = CryptoJS.AES.encrypt(data, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7,
					iv: '',
				});

				// 将加密后的数据转换成 Base64
				const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);

				// 处理 Android 某些低版的BUG
				const resultCipher = base64Cipher.replace(/\+/g, '-').replace(/\//g, '_');

				// 返回加密后的经过处理的 Base64
				return resultCipher;
			};

			// 获取填充后的key
			const key = CryptoJS.enc.Utf8.parse(fillKey(initKey));

			// 调用加密函数

			const encrypted = aesEncrypt(JSON.stringify({
				abc: payload.abc,
				def: payload.def,
				time: payload.time,
				verifyCode: payload.verifyCode
			}), key);
			let obj = {
				data: encrypted,
				service: 'voucher.login.login'

			}
			console.log("? ~ file: index.js ~ line 95 ~ login ~ data", encrypted)
			// return services.login({ data: encrypted });
			request('post', obj).then((res) => {
				return console.log("🚀 ~ file: index.js ~ line 92 ~ ).then ~ res", res)
			}).catch((err) => {
				return console.log("🚀 ~ file: index.js ~ line 94 ~ ).then ~ err", err)

			})
		},
	},
	mutations: {
		changeNetwork(state, payload) {
			this.network = payload
		},
		changeLogin(state, user) {
			state.token = user.token;
			localStorage.setItem("token", user.token)
		}
	}
})



//store "全局"对象  要记得导出
export default store