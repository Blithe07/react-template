import { useRequest } from "ahooks";
import TableGridEdit from "./table-grid-edit";
import { Share, Delete, Plus } from "@icon-park/react";
import { Button, Popconfirm, Space, Table, App } from "antd";
import useTableScrollHeight from "@/hooks/useTableScrollHeight";
import { useExchangeConfigDelete } from "@/api/etf-exchange-config";
import type {
  ExchangeConfigInfo,
  ExchangeConfigUpdateParams,
} from "@/api/etf-exchange-config/type";
import type { ColumnsType } from "antd/es/table";
import type { TableGridEditRef } from "./table-grid-edit";

export default function TableGrid({
  data,
  startIndex,
  refresh,
}: {
  data: ExchangeConfigInfo[];
  startIndex: number;
  refresh: () => void;
}) {
  // 表格列配置
  const columns: ColumnsType<ExchangeConfigInfo> = [
    {
      title: "No.",
      render: (text, record, index) => startIndex + index + 1,
      align: "center",
      width: 50,
    },
    { title: "Exchange", dataIndex: "exchange", align: "center" },
    { title: "TickerSuffix", dataIndex: "tickerSuffix", align: "center" },
    { title: "TickerDigits", dataIndex: "tickerDigits", align: "center" },
    {
      title: "Operate",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<Share />}
            onClick={() => openModal("edit", record)}
          ></Button>
          <Popconfirm
            title="Operation"
            description="Sure to delete?"
            onConfirm={() => deleteInfo(record.id)}
          >
            <Button type="link" size="small" icon={<Delete />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 表格外层容器
  const tableRef = useRef({} as HTMLDivElement);
  // 表格可滚动高度
  const y = useTableScrollHeight(tableRef);

  // 选中行数据
  const [selectRows, setSelectRows] = useState([] as string[]);
  const { modal } = App.useApp();
  const { run } = useRequest(useExchangeConfigDelete, {
    manual: true,
    onSuccess: () => {
      setSelectRows([]);
      refresh();
    },
  });
  // 删除
  const deleteInfo = async (id?: string) => {
    if (id) {
      run([id], { showSuccessMsg: true });
    } else {
      modal.confirm({
        title: "Operation",
        content: "Sure to delete?",
        onOk() {
          run(selectRows, { showSuccessMsg: true });
        },
      });
    }
  };

  // 弹框实例
  const tableGridEditRef = useRef({} as TableGridEditRef);
  // 新增/编辑弹框
  const openModal = (
    modalType: "create" | "edit",
    data?: ExchangeConfigUpdateParams
  ) => {
    tableGridEditRef.current[modalType](data!);
  };

  return (
    <div className="flex flex-col h-full">
      <Space className="mb-2">
        <Button
          type="primary"
          icon={<Plus />}
          onClick={() => openModal("create")}
        >
          Add
        </Button>
        <Button
          disabled={!selectRows.length}
          type="primary"
          icon={<Delete />}
          onClick={() => deleteInfo()}
        >
          Delete
        </Button>
      </Space>
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
      <TableGridEdit ref={tableGridEditRef} refresh={refresh} />
    </div>
  );
}
