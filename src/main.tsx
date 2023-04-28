import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RenderRoute from "./routes";
import { StyleProvider } from "@ant-design/cssinjs";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, App } from "antd";
import "@/assets/styles";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App>
          <StyleProvider hashPriority="high">
            <BrowserRouter>
              <RenderRoute />
            </BrowserRouter>
          </StyleProvider>
        </App>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
