import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import cryptoJs from 'crypto-js'
Vue.use(Vuex) //��װʹ���������
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
		safeDiploma: 2
	},

	actions: {
		login({ context }, payload) {
			const initKey = 'xie2gg';
			const keySize = 128;
			/**
			 * ������Կ�ֽ�����, ԭʼ��Կ�ַ�������128λ, ����0.
			 * @param {string} key - ԭʼ key ֵ
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
			 * ������ܺ���
			 * @param {string} data - ��Ҫ���ܵ�����, ������ǰ�Ƚ��� JSON.stringify(data);
			 * @param {string} key - ����ʹ�õ� key
			 */
			const aesEncrypt = (data, key) => {

				/**
				 * CipherOption, ���ܵ�һЩѡ��:
				 *   mode: ����ģʽ, ��ȡֵ(CBC, CFB, CTR, CTRGladman, OFB, ECB), ���� CryptoJS.mode ������
				 *   padding: ��䷽ʽ, ��ȡֵ(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), ���� CryptoJS.pad ������
				 *   iv: ƫ����, mode === ECB ʱ, ����Ҫ iv
				 * ���ص���һ�����ܶ���
				 */
				const cipher = CryptoJS.AES.encrypt(data, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7,
					iv: '',
				});

				// �����ܺ������ת���� Base64
				const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);

				// ���� Android ĳЩ�Ͱ��BUG
				const resultCipher = base64Cipher.replace(/\+/g, '-').replace(/\//g, '_');

				// ���ؼ��ܺ�ľ�������� Base64
				return resultCipher;
			};

			// ��ȡ�����key
			const key = CryptoJS.enc.Utf8.parse(fillKey(initKey));

			// ���ü��ܺ���
			const encrypted = aesEncrypt(JSON.stringify({
				keyNumber: payload.userName,
				password: payload.password,
				tenantCode: payload.tenantCode,
				time: payload.timestamp,
				verifyCode: payload.verificationCode
			}), key);

			// ��ѧ�����ü��ܺ���
			const returnedEncrypted = aesEncrypt(JSON.stringify({
				keyNumber: payload.userName,
				password: payload.password,
				time: payload.timestamp,
				verifyCode: payload.captchaCode
			}), key);

			console.log("? ~ file: index.js ~ line 95 ~ login ~ data", data)
			if (payload.entry === 'foods') {
				return services.foodsLogin({ data: encrypted });
			} else if (payload.entry === 'returnedStudent') {
				return services.returnedStudentLogin({ data: returnedEncrypted });
			} else {
				return services.login({ data: encrypted });
			}
		},
	},
	mutations: {
		changeLogin(state, user) {
			state.token = user.token;
			localStorage.setItem("token", user.token)
		}
	}
})



//store "ȫ��"����  Ҫ�ǵõ���
export default store