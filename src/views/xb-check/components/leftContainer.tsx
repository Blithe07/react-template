import { Tabs } from "antd";
import FundTree from "./fundTree";
import ChapterTree from "./chapterTree";
import { useAppDispatch } from "@/hooks/useStore";
import { setReportType } from "@/redux/reportSlice";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "fund",
    label: `产品`,
    children: <FundTree />,
  },
  {
    key: "chapter",
    label: `章节`,
    children: <ChapterTree />,
  },
];
export default function LeftContainer() {
  const dispatch = useAppDispatch();

  const onChange = (key: string) => {
    dispatch(setReportType(key as "fund" | "chapter"));
  };
  return <Tabs defaultActiveKey="fund" items={items} onChange={onChange} />;
}
