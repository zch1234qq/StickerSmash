import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utils from './utils';
import { useNavigation } from '@react-navigation/native';

// 创建axios实例
const Axios = axios.create({
    baseURL: "https://bxjs.store:8892", // 替换成你的Axios基础链接
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
Axios.interceptors.request.use(
    config => {
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
        console.log("拦截器"+error.response)
        console.log("拦截器"+error.request)
        if (error.request.socket) {
          console.log('Socket Information:');
          console.log('  Bytes written:', error.request.socket.bytesWritten);
          console.log('  Local address:', error.request.socket.localAddress);
          console.log('  Local port:', error.request.socket.localPort);
          console.log('  Remote address:', error.request.socket.remoteAddress);
          console.log('  Remote family:', error.request.socket.remoteFamily);
          console.log('  Remote port:', error.request.socket.remotePort);
        }
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
