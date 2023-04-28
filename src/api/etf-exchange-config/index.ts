import { http } from "@/http";

import type { AxiosRequestConfig } from "axios";
import type {
    ExchangeConfigInfo,
    ExchangeConfigSearchParams,
    ExchangeConfigUpdateParams,
} from "./type";
import { PageResponseData, ResponseData } from "../types";

const BASE_URL = "/yhinn-etfpm/etfExchangeConfig";
/**
 * 分页基础数据
 * @param params
 * @param config
 * @returns
 */
export function useExchangeConfigPage(
    params: ExchangeConfigSearchParams,
    config?: AxiosRequestConfig,
) {
    return http<PageResponseData<ExchangeConfigInfo>>(`${BASE_URL}/queryByPages`, {
        method: "POST",
        data: params,
        ...config,
    })

}

/**
 * 新增基础数据
 * @param params
 * @param config
 * @returns
 */
export function useExchangeConfigAdd(
    params: ExchangeConfigUpdateParams,
    config?: AxiosRequestConfig,
) {
    return http<ResponseData<boolean>>(`${BASE_URL}/save`, {
        method: "POST",
        data: params,
        ...config,
    });
}

/**
 * 编辑基础数据
 * @param params
 * @param config
 * @returns
 */
export function useExchangeConfigUpdate(
    params: ExchangeConfigUpdateParams,
    config?: AxiosRequestConfig,
) {
    return http<ResponseData<boolean>>(`${BASE_URL}/update`, {
        method: "POST",
        data: params,
        ...config,
    });
}

/**
 * 删除基础数据
 * @param id
 * @param config
 * @returns
 */
export function useExchangeConfigDelete(
    ids: string[],
    config?: AxiosRequestConfig,
) {
    return http<ResponseData<null>>(`${BASE_URL}/delete`, {
        method: "POST",
        data: ids,
        ...config,
    });
}
