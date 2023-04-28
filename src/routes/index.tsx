import { FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";

const EtfExchangeConfig = lazy(
  () => import("../views/etf-exchange-config/index")
);

const XbList = lazy(() => import("../views/xb-list/index"));
const XbHtmlContrast = lazy(() => import("../views/xb-html-contrast/index"));
const XbCheck = lazy(() => import("../views/xb-check/index"));

const routeList: RouteObject[] = [
  // 通用crud页面
  {
    path: "/etfExchangeConfig",
    element: <EtfExchangeConfig />,
  },
  // xb列表
  {
    path: "/xbList",
    element: <XbList />,
  },
  // xb比对
  {
    path: "/xbHtmlContrast",
    element: <XbHtmlContrast />,
  },
  // xb核对
  {
    path: "/",
    element: <XbCheck />,
  },
];

const RenderRoute: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRoute;
