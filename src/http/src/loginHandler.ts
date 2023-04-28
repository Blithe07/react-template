import { message } from 'antd'
/** 登录锁 */
let loginLock = false;

/** 未授权提示 */
export function loginInvalid() {
  if (loginLock) {
    return;
  }
  loginLock = true;
  message.warning({
    content: "系统提示：认证过期，请重新登录",
    onClose() {
      const currentWindow = window.parent ?? window;
      localStorage.getItem("Authorization");
      const { pathname } = currentWindow.location;
      currentWindow.location.href = pathname + "#/login";
    },
  });
}
