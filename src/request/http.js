/**
 * axios��װ
 * �������ء���Ӧ���ء�����ͳһ����
 */
 import axios from 'axios';
 import router from '@/router/index';
 import store from '@/store/index';
 import { Toast } from 'vant';
 
 /** 
  * ��ʾ���� 
  * ��ֹ����ɲ㡢��ʾһ���ر�
  */
 const tip = msg => {    
     Toast({        
         message: msg,        
         duration: 1000,        
         forbidClick: true    
     });
 }
 
 /** 
  * ��ת��¼ҳ
  * Я����ǰҳ��·�ɣ������ڵ�¼ҳ����ɵ�¼�󷵻ص�ǰҳ��
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
  * ����ʧ�ܺ�Ĵ���ͳһ���� 
  * @param {Number} status ����ʧ�ܵ�״̬��
  */
 const errorHandle = (status, other) => {
     // ״̬���ж�
     switch (status) {
         // 401: δ��¼״̬����ת��¼ҳ
         case 401:
             toLogin();
             break;
         // 403 token����
         // ���token����ת��¼ҳ
         case 403:
             tip('��¼���ڣ������µ�¼');
             localStorage.removeItem('token');
             store.commit('loginSuccess', null);
             setTimeout(() => {
                 toLogin();
             }, 1000);
             break;
         // 404���󲻴���
         case 404:
             tip('�������Դ������'); 
             break;
         default:
             console.log(other);   
         }}
 
 // ����axiosʵ��
 var instance = axios.create({    timeout: 1000 * 12});
 // ����post����ͷ
 instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 /** 
  * ���������� 
  * ÿ������ǰ���������token��������ͷ��Я��token 
  */ 
 instance.interceptors.request.use(    
     config => {        
         // ��¼���̿����У����ݱ����Ƿ����token�ж��û��ĵ�¼���        
         // ���Ǽ�ʹtoken���ڣ�Ҳ�п���token�ǹ��ڵģ�������ÿ�ε�����ͷ��Я��token        
         // ��̨����Я����token�ж��û��ĵ�¼����������ظ����Ƕ�Ӧ��״̬��        
         // �������ǿ�������Ӧ�������У�����״̬�����һЩͳһ�Ĳ�����        
         const token = store.state.token;        
         token && (config.headers.Authorization = token);        
         return config;    
     },    
     error => Promise.error(error))
 
 // ��Ӧ������
 instance.interceptors.response.use(    
     // ����ɹ�
     res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
     // ����ʧ��
     error => {
         const { response } = error;
         if (response) {
             // �����ѷ��������ǲ���2xx�ķ�Χ 
             errorHandle(response.status, response.data.message);
             return Promise.reject(response);
         } else {
             // ������������
             // eg:����ʱ�����ʱ������state��network״̬
             // network״̬��app.vue�п�����һ��ȫ�ֵĶ�����ʾ�������ʾ����
             // ���ڶ�������е�ˢ�����»�ȡ���ݣ����ڶ��������˵��
             if (!window.navigator.onLine) {
              store.commit('changeNetwork', false);
           } else {
               return Promise.reject(error);
           }
         }
     });
 
 export default instance;