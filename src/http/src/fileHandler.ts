import type { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
/**
 * 获取返回文件名
 * @param header
 * @param key
 * @returns
 */
export function getFileName(header: string, key = "fileName") {
  let disMatch = header.match(`${key}=(.+)`);

  if (!disMatch) {
    disMatch = header.match("filename=(.+)");
    if (!disMatch) {
      return "";
    }
  }

  const [, fileName] = disMatch;

  return decodeURIComponent(fileName);
}
/**
 * 下载文件
 * @param data
 * @param fileName
 */
export function downloadFile(data: Blob, fileName = "file") {
  /** 解析路径 */
  const url = window.URL.createObjectURL(data);
  /** 创建跳转元素 */
  const link = document.createElement("a");
  /** 设置href跳转路径 */
  link.href = url;
  /** 设置下载属性 */
  link.setAttribute("download", fileName);
  /** 添加到页面中 */
  document.body.appendChild(link);
  /** 触发点击 */
  link.click();
  /** 移除元素 */
  link.remove();
  /** 销毁url */
  window.URL.revokeObjectURL(url);
}
/**
 * 预览文件
 * @param data
 */
export function previewFile(data: Blob) {
  /** 解析路径 */
  const url = window.URL.createObjectURL(data);
  /** 打开新弹窗 */
  window.open(url);
  /** 销毁url */
  window.URL.revokeObjectURL(url);
}

export function downloadFail(data: Blob, config: AxiosRequestConfig) {
  /** 文件流内容 */
  const content = new Blob([data], {
    type: data.type,
  });
  /** 文件读取类 */
  const fr = new FileReader();
  /** 读文件 */
  fr.readAsText(content);
  /** 读取函数 */
  fr.onload = (e) => {
    try {
      const { content, type, msg, yhRspType } =
        JSON.parse(e.target?.result as string) || {};
      if (type === "error" || yhRspType === "ERROR") {
        message.error(content || msg || "下载错误");
      } else if (type === "warn" || yhRspType === "WARN") {
        message.warning(content || msg || "下载错误");
      } else {
        config.callback && config.callback();
      }
    } catch (error) {
      //error
    }
  };
}
