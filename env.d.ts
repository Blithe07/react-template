// 扩展axios自定义属性
import "axios";

declare module "axios" {

    export interface AxiosRequestConfig {
        /** 显示成功消息 */
        showSuccessMsg?: boolean;
        /** 显示错误 */
        showErrorMsg?: boolean;
        /** 显示警告 */
        showWarnMsg?: boolean;
        /** 显示解析文件信息 */
        showFileMsg?: boolean;
        /** 下载 */
        download?: boolean;
        /** 预览 */
        preview?: boolean;
        /** 执行额外函数 */
        callback?: () => void;
        /** 是否将falsy值置为null */
        allowFalsy?: boolean;
    }

    export interface AxiosInstance {
        <T = any>(config: AxiosRequestConfig): Promise<T>;
        request<T = any>(config: AxiosRequestConfig): Promise<T>;
        get<T = any>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<T>;
        delete<T = any>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<T>;
        head<T = any>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<T>;
        post<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<T>;
        put<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<T>;
        patch<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<T>;
    }
}

// 扩展ant-design tree自定义属性
import "antd/es/tree";
import * as React from 'react';
import type { TreeProps } from 'antd/es/tree/Tree'
import { ColumnsType } from "antd/es/table";

declare module "antd/es/tree" {
    /** For fieldNames, we provides a abstract interface */
    export interface BasicDataNode {
        checkable?: boolean;
        disabled?: boolean;
        disableCheckbox?: boolean;
        icon?: IconType;
        isLeaf?: boolean;
        selectable?: boolean;
        switcherIcon?: IconType;
        /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
        className?: string;
        style?: React.CSSProperties;

        /** 产品/章节树 */
        // 状态
        status?: string
        // 差异数量
        diffNum?: number

        /** 产品/章节内容 */
        // 层级
        level?: number | string
        // 内容数据类型(目前只有table、text，后续可拓展)
        type?: 'table' | 'text'
        // 文本
        textContent?: string | JSX.Element | Array<string | JSX.Element>
        // 表格(具体类型根据实际情况调整)
        tableContent?: { columns: ColumnsType<any>, data: any[] }
    }
    /** Provide a wrap type define for developer to wrap with customize fieldNames data type */
    export type FieldDataNode<T, ChildFieldName extends string = 'children'> = BasicDataNode & T & Partial<Record<ChildFieldName, FieldDataNode<T, ChildFieldName>[]>>;
    export type DataNode = FieldDataNode<{
        key: string;
        title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
    }>;
    export type ExpandAction = false | 'click' | 'doubleClick';
    export interface DirectoryTreeProps<T extends BasicDataNode = DataNode> extends TreeProps<T> {
        expandAction?: ExpandAction;
    }
}