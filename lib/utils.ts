import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 创建 axios 实例
const request = axios.create({
  baseURL: "/api", // 设置请求的基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 默认请求头
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以做些什么，例如添加认证token
    const token = localStorage.getItem("token"); // 假设 token 存储在 localStorage 中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data; // 直接返回响应数据
  },
  (error) => {
    // 对响应错误做点什么
    console.error("请求失败:", error);
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error("响应状态码:", error.response.status);
      console.error("响应数据:", error.response.data);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("请求未收到响应:", error.request);
    } else {
      // 在设置请求时发生了一些事情，触发了一个错误
      console.error("请求配置错误:", error.message);
    }
    return Promise.reject(error);
  },
);

export { request };
