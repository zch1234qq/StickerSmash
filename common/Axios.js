import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utils from './utils';
import config from './config';

// 创建axios实例
const Axios = axios.create({
    baseURL: config.url, // 替换成你的Axios基础链接
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
Axios.interceptors.request.use(
    config => {
      if(utils.token==""){
        utils.navigation.navigate("login",{positive:false})
      }
      const token =utils.token; // 从localStorage获取token
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token; // 将token加入到请求头
      }
      return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
export function setupInterceptors(store) {
  Axios.interceptors.response.use(
      response => response,
      error => {
        if (!utils.get401 &&error.response && error.response.status === 401) {
              utils.get401=true
              AsyncStorage.setItem("token","")
              store.dispatch({ type: 'LOGOUT' });
              utils.navigation.navigate("login",{positive:false})
              console.log("Token expired. Please login again.");
        }
        if(error.response && error.response.status === 502){
          utils.dispatch({type:"FAIL",message:"服务器宕机,全力修复中"})
        }
        return Promise.reject(error);
      }
  );
}

export default Axios;
