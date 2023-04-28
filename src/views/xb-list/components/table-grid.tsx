import useTableScrollHeight from "@/hooks/useTableScrollHeight";
import {
  Download,
  DocDetail,
  Refresh,
  CheckOne,
  SettingTwo,
  RowHeight,
} from "@icon-park/react";
import { Button, Space, Table, Divider, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Progress from "./progress";
import xbListStyles from "@/styles/xb-list/index.module.less";

export default function TableGrid({
  data,
  startIndex,
}: {
  data: any[];
  startIndex: number;
}) {
  // 表格外层容器
  const tableRef = useRef({} as HTMLDivElement);
  // 表格可滚动高度
  const y = useTableScrollHeight(tableRef);

  // 选中行数据
  const [selectRows, setSelectRows] = useState([] as string[]);

  // 表格列配置
  const columns: ColumnsType<any> = [
    {
      title: "序号",
      render: (text, record, index) => startIndex + index + 1,
      align: "center",
      width: 50,
    },
    {
      title: "产品名称",
      dataIndex: "fundCode",
      align: "center",
      width: 180,
      render: (text, record) => (
        <span>
          {record.fundCode} {record.fundName}
        </span>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      width: 300,
      render: (text, record) => <Progress data={record.status} />,
    },
    {
      title: "不一致章节",
      children: [
        { title: "FA", dataIndex: "diffFAChapter", align: "center" },
        { title: "TA", dataIndex: "diffTAChapter", align: "center" },
        { title: "关联", dataIndex: "diffGLChapter", align: "center" },
        { title: "风险", dataIndex: "diffFXChapter", align: "center" },
      ],
    },
    {
      title: "文字核对状态",
      dataIndex: "wordStatus",
      align: "center",
      render: (text, record) => (
        <span
          className={
            record.wordStatus === "N"
              ? xbListStyles["check-diff"]
              : xbListStyles["check-same"]
          }
        >
          {record.wordStatus === "N" ? `不一致(${record.wordNum})` : "一致"}
        </span>
      ),
    },
    {
      title: "勾稽核对状态",
      dataIndex: "goofyStatus",
      align: "center",
      render: (text, record) => (
        <span
          className={
            record.goofyStatus === "N"
              ? xbListStyles["check-diff"]
              : xbListStyles["check-same"]
          }
        >
          {record.goofyStatus === "N" ? `不一致(${record.goofyNum})` : "一致"}
        </span>
      ),
    },
    {
      title: "操作",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" size="small" icon={<DocDetail />}></Button>
          </Tooltip>
          <Tooltip title="核对">
            <Button type="link" size="small" icon={<Refresh />}></Button>
          </Tooltip>
          <Tooltip title="同步xml">
            <Button type="link" size="small" icon={<CheckOne />}></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Space className="mb-2">
          <Button type="primary" icon={<Download />}>
            下载
          </Button>
        </Space>
        <Space>
          <span>
            40/全部 10/未核对 <span className="text-red-500">20</span>/不一致
          </span>
          <Divider type="vertical" />
          <Button type="link" size="small" icon={<RowHeight />} className="-rotate-90"/>
          <Divider type="vertical" />
          <Button type="link" size="small" icon={<SettingTwo />} />
        </Space>
      </div>
      <div className="flex-1 overflow-hidden" ref={tableRef}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={true}
          scroll={{ y }}
          rowSelection={{
            onChange(selectedRowKeys) {
              setSelectRows(selectedRowKeys as string[]);
            },
          }}
          size="small"
          rowKey="id"
        ></Table>
      </div>
    </div>
  );
}
