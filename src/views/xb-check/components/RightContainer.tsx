import { useAppSelector } from "@/hooks/useStore";
import {
  Download,
  Refresh,
  Help,
  Search,
  UpOne,
  DownOne,
} from "@icon-park/react";
import {
  Tree,
  Card,
  Button,
  Space,
  Row,
  Col,
  Switch,
  Checkbox,
  Form,
  Input,
  Select,
  Table,
} from "antd";
import YhCheckboxButton from "@/components/yh-checkbox-button";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { DataNode } from "antd/es/tree";
import rightContainerStyles from "@/styles/xb-check/rightContainer.module.less";

export default function RightContainer() {
  /** 报告信息 */
  const reportSlice = useAppSelector((state) => state.report);

  const checkOptions = [{ label: "核对一致", value: "check-same" }];
  const categoryOptions = [{ label: "风控指标", value: "FA" }];

  const typeOptions = [
    { label: "核对", value: "check" },
    { label: "勾稽", value: "goofy" },
  ];
  // 查询条件(根据实际情况，可选择通过redux管理)
  const [pageSearch, setPageSearch] = useState({
    type: [] as string[],
    indexName: "",
    checkStatus: [] as string[],
    indexCategory: [] as string[],
    followStatus: true,
    difference: false,
  });

  const changeCheckedStatus = (e: CheckboxChangeEvent) => {
    const { value, checked } = e.target;
    let type = [] as string[];
    if (value === "all") {
      type = checked ? [value, ...typeOptions.map((item) => item.value)] : [];
    } else {
      type = !checked
        ? pageSearch.type.filter((item) => item !== value)
        : pageSearch.type.concat([value]);
    }
    // 自动选中/取消选中全部
    if (type.length === typeOptions.length) {
      type = type.includes("all")
        ? type.filter((item) => item !== "all")
        : [...type, "all"];
    }
    setPageSearch({ ...pageSearch, type });
  };

  // 期望数据结构
  const [treeData, setTreeData] = useState([
    {
      title: "$1 001256",
      key: "001256",
      level: 1,
      icon: null,
      children: [
        {
          title: "1.1 管理人对报告期内本基金运作遵规守信情况的说明",
          key: "001256-1",
          level: 2,
          children: [
            {
              title: "随便是啥",
              key: "001256-1-1",
              level: 3,
              type: "text",
              textContent:
                "本基金管理人严格遵守《评安基金管理有限公司公平交易制度》、《平安基金管理有限公司异常交易监控与报告制度》，严格执行法律法现及制度要求，从以下五个方面对交易行为进行严格控制:一是搭建平等的投本报告期内，根据《证券投资基金管理公司公平交易制度指导意见》资信息平台，合理设置各举资产管理业条之间以及各举资产管理业条内部的织结物，在保资组合资决相对立性的同，在获得资信息，资建议为实资中面享有公平的社合二是制定公平交易规则，建立科学的投资决策体系，加强交易执行环节的内部括共手 是   2五 是 采取相关控制和改进措施。五是建立投资组合投资信息的管理及保密制度,不同投资组合经理之间的持仓和交易等重五是建立投资组合投资信息的管理及保密制度,不同投资组合经理之间的持仓和交易等重大非公开投资信息相互隔离。五是建立投资组合投资信息的曾大非公开投资信息相互隔离。理及保密制度,不同投资组合经理之间的持仓和交易等重大非公开投资信息相互隔离。五是建立投资织合投资信息的管及保家制 不同投资合经理之间的特合和交易等重大非公开资信息相与离。五是建立资组合资信息的管理及保感制度不同资合经理之间的特合本易",
              isLeaf: true,
            },
          ],
        },
        {
          title: "1.2 管理人xxxx",
          key: "001256-2",
          level: 2,
          children: [
            {
              title: "随便是啥",
              key: "001256-1-2",
              level: 3,
              type: "table",
              tableContent: {
                columns: [
                  { title: "年度", dataIndex: "year" },
                  { title: "已按投资形式转实收基金", dataIndex: "fund" },
                  { title: "直接通过应付赎回款转出金额", dataIndex: "money" },
                  { title: "应付利润本年变动", dataIndex: "change" },
                  { title: "年度利润分配合计", dataIndex: "amount" },
                  { title: "备注", dataIndex: "remark" },
                ],
                data: [
                  {
                    id: "001256-1-2-1",
                    year: "2021年",
                    fund: "584,042,810.19",
                    money: "-",
                    change: "-787,509.22",
                    amount: "583,255,300.97",
                    remark: "",
                  },
                  {
                    id: "001256-1-2-2",
                    year: "2021年",
                    fund: "584,042,810.19",
                    money: "-",
                    change: "-787,509.22",
                    amount: "583,255,300.97",
                    remark: "",
                  },
                ],
              },
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      title: "$2 001257",
      key: "001257",
      level: 1,
      icon: null,
      children: [
        {
          title: "1.1 管理人对报告期内本基金运作遵规守信情况的说明",
          key: "001257-1",
          level: 2,
          children: [
            {
              title: "随便是啥",
              key: "001257-1-1",
              level: 3,
              type: "text",
              textContent:
                "本基金管理人严格遵守《评安基金管理有限公司公平交易制度》、《平安基金管理有限公司异常交易监控与报告制度》，严格执行法律法现及制度要求，从以下五个方面对交易行为进行严格控制:一是搭建平等的投本报告期内，根据《证券投资基金管理公司公平交易制度指导意见》资信息平台，合理设置各举资产管理业条之间以及各举资产管理业条内部的织结物，在保资组合资决相对立性的同，在获得资信息，资建议为实资中面享有公平的社合二是制定公平交易规则，建立科学的投资决策体系，加强交易执行环节的内部括共手 是   2五 是 采取相关控制和改进措施。五是建立投资组合投资信息的管理及保密制度,不同投资组合经理之间的持仓和交易等重五是建立投资组合投资信息的管理及保密制度,不同投资组合经理之间的持仓和交易等重大非公开投资信息相互隔离。五是建立投资组合投资信息的曾大非公开投资信息相互隔离。理及保密制度,不同投资组合经理之间的持仓和交易等重大非公开投资信息相互隔离。五是建立投资织合投资信息的管及保家制 不同投资合经理之间的特合和交易等重大非公开资信息相与离。五是建立资组合资信息的管理及保感制度不同资合经理之间的特合本易",
              isLeaf: true,
            },
          ],
        },
        {
          title: "1.2 管理人xxxx",
          key: "001257-2",
          level: 2,
          children: [
            {
              title: "随便是啥",
              key: "001257-1-2",
              level: 3,
              type: "table",
              tableContent: {
                columns: [
                  { title: "年度", dataIndex: "year" },
                  { title: "已按投资形式转实收基金", dataIndex: "fund" },
                  { title: "直接通过应付赎回款转出金额", dataIndex: "money" },
                  { title: "应付利润本年变动", dataIndex: "change" },
                  { title: "年度利润分配合计", dataIndex: "amount" },
                  { title: "备注", dataIndex: "remark" },
                ],
                data: [
                  {
                    id: "001257-1-2-1",
                    year: "2021年",
                    fund: "584,042,810.19",
                    money: "-",
                    change: "-787,509.22",
                    amount: "583,255,300.97",
                    remark: "",
                  },
                  {
                    id: "001257-1-2-2",
                    year: "2021年",
                    fund: "584,042,810.19",
                    money: "-",
                    change: "-787,509.22",
                    amount: "583,255,300.97",
                    remark: "",
                  },
                ],
              },
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ] as DataNode[]);

  const [expandedKeys, setExpandKeys] = useState([] as string[]);

  const handleExpand = (key: string) => {
    const newExpandKeys = expandedKeys.includes(key)
      ? expandedKeys.filter((item) => item !== key)
      : [...expandedKeys, key];
    setExpandKeys(newExpandKeys);
  };

  /** 树虚拟高度(px) */
  const treeContainerRef = useRef({} as HTMLDivElement);
  const [treeHeight, setTreeHeight] = useState(0);
  useEffect(() => {
    // Card Component padding 5px
    setTreeHeight(treeContainerRef.current.clientHeight - 10);
  }, []);

  return (
    <>
      <Card bodyStyle={{ padding: "15px", height: "4rem" }}>
        <div className="text-center relative">
          <span className="text-2xl font-bold">
            {reportSlice.type === "fund"
              ? reportSlice.fundInfo.title
              : reportSlice.chapterInfo.title}
          </span>
          <div className="absolute right-0 inline-block">
            <Space>
              <Button icon={<Help />} className="justify-center"></Button>
              <Button icon={<Refresh />} className="justify-center"></Button>
              <Button>VS 比对</Button>
              <Button type="primary" icon={<Download />}>
                下载
              </Button>
            </Space>
          </div>
        </div>
      </Card>
      <Row className="my-2 items-center">
        <Col span={21}>
          <Form layout="inline">
            <Form.Item>
              <Checkbox.Group value={pageSearch.type}>
                <YhCheckboxButton value="all" onChange={changeCheckedStatus}>
                  全部
                </YhCheckboxButton>
                {typeOptions.map((item) => (
                  <YhCheckboxButton
                    key={item.value}
                    value={item.value}
                    onChange={changeCheckedStatus}
                  >
                    {item.label}
                  </YhCheckboxButton>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="指标名称：">
              <Input
                style={{ width: 140 }}
                placeholder="请输入"
                value={pageSearch.indexName}
                onChange={(e) =>
                  setPageSearch({ ...pageSearch, indexName: e.target.value })
                }
                prefix={<Search></Search>}
              ></Input>
            </Form.Item>
            <Form.Item label="核对状态：">
              <Select
                style={{ width: 140 }}
                value={pageSearch.checkStatus}
                options={checkOptions}
                onChange={(e) =>
                  setPageSearch({ ...pageSearch, checkStatus: e })
                }
                mode="multiple"
                placeholder="请选择"
              />
            </Form.Item>
            <Form.Item label="指标分类：">
              <Select
                style={{ width: 140 }}
                value={pageSearch.indexCategory}
                options={categoryOptions}
                onChange={(e) =>
                  setPageSearch({ ...pageSearch, indexCategory: e })
                }
                mode="multiple"
                placeholder="请选择"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={pageSearch.followStatus}
                onChange={(e) =>
                  setPageSearch({
                    ...pageSearch,
                    followStatus: e.target.checked,
                  })
                }
              >
                仅看关注数据
              </Checkbox>
            </Form.Item>
          </Form>
        </Col>
        <Col span={3} className="text-end">
          <Switch
            checked={pageSearch.difference}
            onChange={(e) => setPageSearch({ ...pageSearch, difference: e })}
          />{" "}
          差额：99
        </Col>
      </Row>
      <Card
        className="flex-1"
        ref={treeContainerRef}
        bodyStyle={{
          padding: "5px",
        }}
      >
        <Tree
          blockNode
          treeData={treeData}
          selectable={false}
          expandedKeys={expandedKeys}
          className={rightContainerStyles["right-container"]}
          height={treeHeight}
          titleRender={(node) => {
            if (node.level === 1) {
              return (
                <div className="flex items-center justify-center">
                  <span className="mr-1 font-bold text-lg">
                    {node.title as string}
                  </span>
                  <Button
                    type="text"
                    onClick={() => handleExpand(node.key)}
                    icon={
                      expandedKeys.includes(node.key) ? <DownOne /> : <UpOne />
                    }
                  />
                </div>
              );
            } else if (node?.children && node.children[0].isLeaf) {
              return (
                <div>
                  <Button
                    type="text"
                    onClick={() => handleExpand(node.key)}
                    icon={
                      expandedKeys.includes(node.key) ? <DownOne /> : <UpOne />
                    }
                  />
                  <span className="font-bold">{node.title as string}</span>
                </div>
              );
            } else if (node.type === "text") {
              return <span>{node.textContent}</span>;
            } else if (node.type === "table") {
              return (
                <Table
                  rowKey="id"
                  size="small"
                  expandable={{
                    defaultExpandAllRows: true,
                  }}
                  pagination={false}
                  columns={node.tableContent?.columns}
                  dataSource={node.tableContent?.data}
                />
              );
            } else {
              return <span>{node.title as string}</span>;
            }
          }}
        />
      </Card>
    </>
  );
}
