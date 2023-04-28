/**
 * 分页数据返回类型
 */
export interface PageResponseData<T = any> {
  /** 当前页 */
  current: number;
  /** 页数 */
  pages: number;
  /** 总数条数 */
  total: number;
  /** 分页大小 */
  size: number;
  /** 数据 */
  records: T[];
}

/**
 * 分页数据请求类型
 */
export type PageRequestParams<T = any> = Omit<PageResponseData<T>, "total" | "pages">;

export type PageRequestWithoutRecords = Omit<
  PageResponseData,
  "total" | "records" | "pages"
>;

/** 架构数据返回类型 */
export interface SystemResponseData<T = any> {
  /** 状态码 */
  code: string;
  /** 数据 */
  data: T[];
  /** 响应消息 */
  msg: string;
  /** 响应类型 */
  yhRspType: string;
}

/** 部分也数据返回类型 */
export interface ResponseData<T = any> {
  /** 响应类型 */
  type: string;
  /** 响应内容 */
  content: string;
  /** 响应结果 */
  data: T;
}
/**
 * 弹框类型
 */
export type ModalType = "create" | "edit" | "view";
