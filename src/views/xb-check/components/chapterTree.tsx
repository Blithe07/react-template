import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import chapterTreeStyles from "@/styles/xb-check/chapterTree.module.less";
import LeftSearch from "./leftSearch";
import { Tree } from "antd";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks/useStore";
import { setChapterInfo } from "@/redux/reportSlice";

const { DirectoryTree } = Tree;
const treeData: DataNode[] = [
  {
    title: "$1 基金简介",
    key: "0-0",
    children: [
      {
        title: "1.1管理人",
        key: "0-0-0",
        children: [
          { title: "管理人", key: "0-0-0-0", isLeaf: true, status: "succ" },
        ],
      },
      { title: "1.2管理人", key: "0-0-1", isLeaf: true, status: "error" },
      { title: "界面分类", key: "0-0-2", isLeaf: true, status: "none" },
    ],
  },
];

export default function ChapterTree() {
  const dispatch = useAppDispatch();

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, { node }) => {
    if (!node.selected && node.isLeaf) {
      const { title, status, key } = node;
      dispatch(setChapterInfo({ title: title as string, status, key }));
    }
  };
  return (
    <div className={chapterTreeStyles["chapter-tree-container"]}>
      <LeftSearch />
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
        titleRender={(node) => {
          if (node.isLeaf) {
            return (
              <span
                className={classNames(
                  chapterTreeStyles["leaf-node"],
                  chapterTreeStyles[node.status!]
                )}
              >
                {node.title as string}
              </span>
            );
          }
          return <span>{node.title as string}</span>;
        }}
      />
    </div>
  );
}
