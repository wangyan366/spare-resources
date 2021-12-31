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
		userId: "",
		network: true,
		tabBarActive: "home",
		tabbarShow: true,
		userInfo: {}
	},

	actions: {
		doPay(commit, payload){
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.tixianlog.getDetail',
					userId:commit.state.userId,
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
					commit.state.userInfo = response
				}).catch(error => {
					reject(error)
				})
			})
		},
		getDetail(commit, payload){
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.tixianlog.getDetail',
					userId:commit.state.userId,
				}
				request('post', obj).then(response => {
					resolve(response)
					commit.state.userInfo = response
				}).catch(error => {
					reject(error)
				})
			})
		},
		save(commit, payload){
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.register.save',
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
					commit.state.userInfo = response
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateMobile(commit, payload){
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.my.updateMobile',
					userId:commit.state.userId,
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
					commit.state.userInfo = response
				}).catch(error => {
					reject(error)
				})
			})
		},
				// 验证手机号
		confirmMobile(commit, payload) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.my.confirmMobile',
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 发送短信
		sendMessage(commit, payload) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.my.sendMessage',
					userId: payload.sendType == 3 ? commit.state.userId : "",
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getMaiKaList(commit, payload) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.usersell.list',
					userId: commit.state.userId,
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getWithdrawalList(commit, payload) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.tixianlog.list',
					userId: commit.state.userId,
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getlistNotice() {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.index.listNotice',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getlistFaq() {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.index.listFaq',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		updatePassword(commit, payload) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					userId: commit.state.userId,
					service: 'voucher.my.updatePassword',
					...payload
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		setSave(commit, payload) {
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
			 

			const encrypted = aesEncrypt(JSON.stringify([payload.info]), key);
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					cardJson: encrypted,
					service: 'voucher.usersell.save',
					userId: payload.userId,
					cardValueId: payload.cardValueId,
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})

		},
		getCarCenter(commit, limit) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					limit: limit ? limit : "",
					service: 'voucher.index.listCardType',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})

		},
		getlistCardValue(commit, cardCategoryId) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					cardCategoryId: cardCategoryId,
					service: 'voucher.index.listCardValue',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		listCardCategory(commit, {
			cardTypeId = "", limit = ""
		}) {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					limit: limit,
					cardTypeId: cardTypeId,
					service: 'voucher.index.listCardCategory',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getHome() {
			return new Promise((resolve, reject) => {
				//接口
				let obj = {
					service: 'voucher.index.index',
				}
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getMy(commit, payload) {
			return new Promise((resolve, reject) => {

				//接口
				let obj = {
					service: 'voucher.my.get',
					userId: commit.state.userId,
					// service:'voucher.my.get',
				}
				request('post', obj).then(response => {
					resolve(response)
					commit.state.userInfo = response
				}).catch(error => {
					reject(error)
				})
			})

		},
		login({ context }, payload) {

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
			return new Promise((resolve, reject) => {
				//接口
				request('post', obj).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})


		},
	},

	mutations: {
		setTabbarShow(state, payload) {
			state.tabbarShow = payload
		},
		changeNetwork(state, payload) {
			state.network = payload
		},
		changeLogin(state, userId) {
			 
			state.userId = userId;
			localStorage.setItem("userId", userId)
		}
	}
})



//store "全局"对象  要记得导出
export default store