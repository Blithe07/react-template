import { Spin, Form, Button } from "antd";
import YhPageLayout from "@/components/yh-page-layout";
import YhFormInputItem from "@/components/yh-form-item";
import { Clear, Search, Filter } from "@icon-park/react";
import TableGrid from "./components/table-grid";

export default function XbList() {
  // 表单实例
  const [form] = Form.useForm();
  /** 查询参数 */
  const [params, setParams] = useState({
    condition: "",
    fundCode: "",
    fileName: "",
    fileSource: "",
    current: 1,
    size: 100,
  });
  /** 查询参数变化 */
  const handleSearchParams = (name: string, value: string) => {
    setParams({ ...params, [name]: value });
  };

  /** 重置 */
  const reset = () => {
    form.resetFields();
    const newParams = {
      condition: "",
      fundCode: "",
      fileName: "",
      fileSource: "",
      current: 1,
      size: 100,
    };
    loadPage(newParams);
  };

  /** 分页变化 */
  const handlePageChange = (current: number, size: number) => {
    const newParams = {
      ...params,
      current,
      size,
    };
    loadPage(newParams);
  };

  /** 查询 */
  const loadPage = (newParams = params) => {
    setParams(newParams);
    // run(newParams);
  };

  /** 自定义渲染搜索 */
  const searchContainer = (
    <div className="w-full flex justify-between items-center">
      <Form
        layout="inline"
        autoComplete="off"
        form={form}
        initialValues={params}
      >
        {/* <Form.Item label="我的条件" name="condition">
          Select
        </Form.Item> */}
        <YhFormInputItem
          label="产品名称"
          name="fundCode"
          value={params.fundCode}
          onChange={handleSearchParams}
        ></YhFormInputItem>
        <YhFormInputItem
          label="文件名称"
          name="fileName"
          value={params.fileName}
          onChange={handleSearchParams}
        ></YhFormInputItem>
        <YhFormInputItem
          label="文件来源"
          name="fileSource"
          value={params.fileSource}
          onChange={handleSearchParams}
        ></YhFormInputItem>
        <Form.Item>
          <Button type="primary" icon={<Search />} onClick={() => loadPage}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button icon={<Clear />} onClick={reset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <Button type="text" color="#fff" icon={<Filter />}>
        筛选
      </Button>
    </div>
  );

  const data = {
    total: 9,
    records: [
      {
        id: 1,
        fundCode: "006466",
        fundName: "浦银安盛债券",
        status: [
          { name: "稽核数据", status: "succ" },
          { name: "报送数据", status: "succ" },
          { name: "数据核对", status: "succ" },
        ],
        diffFAChapter: 13,
        diffTAChapter: 13,
        diffGLChapter: 13,
        diffFXChapter: 13,
        wordStatus: "N",
        wordNum: 32,
        goofyStatus: "N",
        goofyNum: 30,
      },
      {
        id: 2,
        fundCode: "006466",
        fundName: "浦银安盛债券",
        status: [
          { name: "稽核数据", status: "succ" },
          { name: "报送数据", status: "succ" },
          { name: "数据核对", status: "warn" },
        ],
        diffFAChapter: 13,
        diffTAChapter: 13,
        diffGLChapter: 13,
        diffFXChapter: 13,
        wordStatus: "N",
        wordNum: 32,
        goofyStatus: "N",
        goofyNum: 30,
      },
      {
        id: 3,
        fundCode: "006466",
        fundName: "浦银安盛债券",
        status: [
          { name: "稽核数据", status: "succ" },
          { name: "报送数据", status: "succ" },
          { name: "数据核对", status: "error" },
        ],
        diffFAChapter: 13,
        diffTAChapter: 13,
        diffGLChapter: 13,
        diffFXChapter: 13,
        wordStatus: "N",
        wordNum: 32,
        goofyStatus: "N",
        goofyNum: 30,
      },
      {
        id: 4,
        fundCode: "006466",
        fundName: "浦银安盛债券",
        status: [
          { name: "稽核数据", status: "succ" },
          { name: "报送数据", status: "warn" },
          { name: "数据核对", status: "" },
        ],
        diffFAChapter: 13,
        diffTAChapter: 13,
        diffGLChapter: 13,
        diffFXChapter: 13,
        wordStatus: "N",
        wordNum: 32,
        goofyStatus: "N",
        goofyNum: 30,
      },
      {
        id: 5,
        fundCode: "006466",
        fundName: "浦银安盛债券",
        status: [
          { name: "稽核数据", status: "succ" },
          { name: "报送数据", status: "error" },
          { name: "数据核对", status: "" },
        ],
        diffFAChapter: 13,
        diffTAChapter: 13,
        diffGLChapter: 13,
        diffFXChapter: 13,
        wordStatus: "Y",
        // wordNum: 32,
        goofyStatus: "Y",
        // goofyNum: 30,
      },
    ],
  };

  return (
    <Spin size="large" spinning={false}>
      <YhPageLayout
        customSearch={searchContainer}
        pageCurrent={params.current}
        pageSize={params.size}
        pageTotal={data.total ?? 0}
        handlePageChange={handlePageChange}
      >
        <TableGrid
          data={data?.records ?? []}
          startIndex={(params.current - 1) * params.size}
        />
      </YhPageLayout>
    </Spin>
  );
}
