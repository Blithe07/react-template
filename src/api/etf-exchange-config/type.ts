import type { PageRequestParams } from "../types";

/** 数据 */
export interface ExchangeConfigInfo {
  id: string;
  exchange: string;
  tickerSuffix: string;
  tickerDigits: string;
  createTime: string;
  createCode: string;
  createName: string;
  updateTime: string;
  updateCode: string;
  updateName: string;
}
/** 查询条件 */
export type ExchangeConfigSearchParams = PageRequestParams<Pick<ExchangeConfigInfo, "exchange" | "tickerSuffix">>;
/** 新增/修改数据 */
export type ExchangeConfigUpdateParams = Pick<ExchangeConfigInfo, 'id' | 'exchange' | 'tickerSuffix' | 'tickerDigits'>;
