import {
  downloadFile,
  previewFile,
  getFileName,
  downloadFail,
} from "./fileHandler";
import { loginInvalid } from "./loginHandler";

import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { message } from 'antd'

const { DEV } = import.meta.env;

/**
 * 请求拦截
 * @param config
 * @returns
 */
export function interceptorsRequest(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  /** 设置token */
  const Authorization = DEV
    ? "development"
    : localStorage.getItem("Authorization");
  config.headers.Authorization = Authorization || ''
  /** 判断下载或者预览 */
  if (config.download || config.preview) {
    config.responseType = "blob";
  }
  return config;
}
/**
 * 响应拦截
 * @param param0
 * @returns
 */
export function interceptorsResponse({
  data,
  config,
  headers,
}: AxiosResponse<any, any>): any {
  /** 处理下载或者预览 */
  if (data instanceof Blob) {
    if (data.type === "application/json") {
      downloadFail(data, config);
      return;
    } else {
      /** 强制执行传入函数，不进行下载 */
      if (config.callback) {
        config.callback();
        return;
      }
      if (config.download) {
        /** 获取文件名 */
        const fileName = getFileName(headers["content-disposition"]);
        /** 下载文件 */
        downloadFile(data, fileName);
        return data;
      }
      if (config.preview) {
        previewFile(data);
        return data;
      }
    }
  }
  /** 处理正常请求 */
  const { content: msg, type: status, code, msg: msg1, yhRspType } = data;
  const tipsMsg = msg || msg1

  if (status === "success" || code === "200") {
    if (config.showSuccessMsg && tipsMsg) {
      message.success(tipsMsg);
    }
    if (config.showFileMsg && tipsMsg) {
      message.success(`${tipsMsg},file uploaded then parse`);
    }
    return data;
  }
  if (
    (status === "error" ||
      yhRspType === "ERROR" ||
      yhRspType === "AUTH_ERROR") &&
    config.showErrorMsg
  ) {
    message.error(tipsMsg);
  }
  if ((status === "warn" || yhRspType === "WARN") && config.showWarnMsg) {
    message.warning(tipsMsg);
  }
  /** 登录失效 */
  if ([401, "401"].includes(status)) {
    loginInvalid();
  }
  return Promise.reject({ message: tipsMsg });
}
/**
 * 错误请求处理
 * @param error
 * @returns
 */
export function requestReject(error: {
  message: string;
  config: AxiosRequestConfig;
}): Promise<any> {
  const { message: errorMsg, config = {} } = error;
  /** 需要显示错误 */
  if (config.showErrorMsg) {
    message.error(errorMsg || "请求超时或服务器错误");
  }
  return Promise.reject(error);
}
