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
          if (error.response && error.response.status === 401) {
              AsyncStorage.setItem("token","")
              store.dispatch({ type: 'LOGOUT' });
              utils.navigation.navigate("login",{positive:false})
              console.log("Token expired. Please login again.");
          }
          return Promise.reject(error);
      }
  );
}

export default Axios;
