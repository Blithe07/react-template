import { Form, Input, Spin } from "antd";
import { useRequest } from "ahooks";
import { useExchangeConfigPage } from "@/api/etf-exchange-config";
import YhPageLayout from "@/components/yh-page-layout";
import TableGrid from "./components/table-grid";
import { ExchangeConfigSearchParams } from "@/api/etf-exchange-config/type";

export default function EtfExchangeConfig() {
  // 表单实例
  const [form] = Form.useForm();
  // 查询参数
  const [params, setParams] = useState({
    records: [
      {
        exchange: "",
        tickerSuffix: "",
      },
    ],
    current: 1,
    size: 100,
  });
  // 查询接口
  const { data, loading, refresh, run } = useRequest(useExchangeConfigPage, {
    defaultParams: [params],
  });
  // 表单项变化
  const handleFormChange = () => {
    const newParams = {
      ...params,
      records: [form.getFieldsValue()],
      current: 1,
    };
    loadPage(newParams);
  };
  // 分页变化
  const handlePageChange = (current: number, size: number) => {
    const newParams = {
      ...params,
      current,
      size,
    };
    loadPage(newParams);
  };
  // 重置
  const reset = () => {
    form.resetFields();
    const newParams = {
      records: [
        {
          exchange: "",
          tickerSuffix: "",
        },
      ],
      current: 1,
      size: 100,
    };
    loadPage(newParams);
  };
  // 设置参数并查询
  const loadPage = (params: ExchangeConfigSearchParams) => {
    setParams(params);
    run(params);
  };

  // 表单元素
  const search = (
    <Form layout="inline" form={form} autoComplete="off">
      <Form.Item label="Exchange" name="exchange">
        <Input placeholder="Please input" onPressEnter={handleFormChange} />
      </Form.Item>
      <Form.Item label="TickerSuffix" name="tickerSuffix">
        <Input placeholder="Please input" onPressEnter={handleFormChange} />
      </Form.Item>
    </Form>
  );

  return (
    <Spin size="large" spinning={loading}>
      <YhPageLayout
        search={search}
        handleSearch={handleFormChange}
        handleReset={reset}
        pageCurrent={params.current}
        pageSize={params.size}
        pageTotal={data?.data.total ?? 0}
        handlePageChange={handlePageChange}
      >
        <TableGrid
          data={data?.data.records ?? []}
          startIndex={(params.current - 1) * params.size}
          refresh={refresh}
        />
      </YhPageLayout>
    </Spin>
  );
}
