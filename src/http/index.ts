import axios from 'axios'
import { interceptorsRequest, interceptorsResponse, requestReject } from './src/interceptors';
export const http = axios.create({
    // 基础路径
    baseURL: "",
    // 超时
    timeout: 600000,
    // 请求头
    headers: {
        Authorization: "",
        user: JSON.stringify({
            userId: localStorage.getItem("userCode") ?? "admin",
            userName: encodeURIComponent(localStorage.getItem("userName") ?? "admin"),
            userCode: localStorage.getItem("userCode") ?? "admin",
        }),
    },
});
/** 请求拦截 */
http.interceptors.request.use(interceptorsRequest, (error) =>
    Promise.reject(error),
);
/** 响应拦截 */
http.interceptors.response.use(interceptorsResponse, requestReject);