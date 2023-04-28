import { Card, Button, Pagination } from "antd";
import YhPage from "../yh-page";
import { ExpandDownOne, Search, Refresh } from "@icon-park/react";
import classNames from "classnames";
export default function YhPageLayout({
  children,
  loading = false,
  pageSize,
  pageCurrent,
  pageTotal,
  handlePageChange,
  handleReset,
  search,
  handleSearch,
  left,
  leftClass,
  searchExpand,
  handleSearchExpand,
  customSearch,
}: {
  children: JSX.Element;
  /** 加载 */
  loading?: boolean;
  /** 页容量 */
  pageSize?: number;
  /** 页码 */
  pageCurrent?: number;
  /** 页总数 */
  pageTotal?: number | string;
  /** 处理分页 */
  handlePageChange?: (page: number, pageSize: number) => void;
  /** 处理重置 */
  handleReset?: () => void;
  /** 是否需要搜索区 */
  search?: JSX.Element | string;
  /** 处理搜索 */
  handleSearch?: () => void;
  /** 是否有左侧区域 */
  left?: JSX.Element;
  /** 左侧区域样式 */
  leftClass?: string;
  /** 是否需要展开 */
  searchExpand?: boolean;
  /** 处理展开 */
  handleSearchExpand?: (expand: boolean) => void;
  /** 自定义搜索区 */
  customSearch?: JSX.Element;
}) {
  // 左侧区域元素
  const LeftContainer = left && (
    <Card className={classNames("h-full mr-3", leftClass || "")}>{left}</Card>
  );
  // 处理查询
  const handleSearchEvent = () => {
    handleSearch && handleSearch();
  };
  // 处理重置
  const handleResetEvent = () => {
    handleReset && handleReset();
  };

  // 默认搜索区
  const defaultSearch = (
    <>
      <div className="flex-1">{search}</div>
      {searchExpand && (
        <div
          className={classNames(
            "ml-1 p-1 self-start flex-shrink-0 text-gray-500 hover:text-gray-800 cursor-pointer transition-transform duration-300",
            searchExpand ? "rotate-180" : ""
          )}
          title={searchExpand ? "收缩" : "展开"}
          onClick={
            handleSearchExpand && (() => handleSearchExpand(!searchExpand))
          }
        >
          <ExpandDownOne />
        </div>
      )}
      <div className="ml-8 flex-shrink-0">
        <Button
          type="primary"
          className="mr-2"
          icon={<Search />}
          loading={loading}
          onClick={handleSearchEvent}
        >
          查询
        </Button>
        <Button icon={<Refresh />} loading={loading} onClick={handleResetEvent}>
          重置
        </Button>
      </div>
    </>
  );
  // 查询区域元素
  const SearchContainer = (search || customSearch) && (
    <Card
      bodyStyle={{
        padding: "10px",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {customSearch || defaultSearch}
    </Card>
  );

  // 处理分页
  const handlePageEvent = (page: number, pageSize: number) => {
    handlePageChange && handlePageChange(page, pageSize);
  };
  // 分页器元素
  const PageContainer = pageCurrent && (
    <div className="flex mt-2 justify-end flex-shrink-0">
      <Pagination
        current={pageCurrent}
        pageSize={pageSize}
        total={Number(pageTotal)}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        showQuickJumper
        onChange={handlePageEvent}
      ></Pagination>
    </div>
  );

  return (
    <YhPage>
      <>
        {LeftContainer}
        <div className="h-full flex flex-col flex-1 overflow-auto">
          {SearchContainer}
          <Card
            className="flex flex-col flex-1 overflow-hidden !mt-2"
            bodyStyle={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <div className="flex-1 overflow-hidden">{children}</div>
            {PageContainer}
          </Card>
        </div>
      </>
    </YhPage>
  );
}
