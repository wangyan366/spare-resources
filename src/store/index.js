import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex) //��װʹ���������

var MY_HIDE = "hideMaizuoTabbar"
const store = new Vuex.Store({
	state:{
		isShow:true,
		datalist:[],
		title:""
		//����״̬
	},

	actions:{
		getComingSoonListRequest(store){
			console.log("��������")

			axios({
				url:"https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=1190215",
				method: 'get',
				headers:{
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"154277371928424093566579"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(res=>{
				console.log(res.data) //res.data ���Ǻ�˷��صĽӿ� axios�Լ��������װ��data
				store.commit("setDatalist",res.data.data.films)
			})
		}
	},
	mutations:{
		[MY_HIDE](state,payload){
			state.isShow = false;
		},
		//�޸�״̬�� ֻ����ͬ������
		// hideMaizuoTabbar(state,payload){
		// 	console.log(payload);
		// 	state.isShow = false;
		// },
		showMaizuoTabbar(state,payload){
			state.isShow = true;
		},

		setDatalist(state,payload){
			state.datalist= payload;
		}
	}
})

var name="kerwin"

var obj = {
	[name]:"aaaaa"
}

console.log(obj);


//store "ȫ��"����  Ҫ�ǵõ���
export default store  