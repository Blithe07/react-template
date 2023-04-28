import LeftSearch from "./leftSearch";
import { Tree } from "antd";
import fundTreeStyles from "@/styles/xb-check/fundTree.module.less";
import classNames from "classnames";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { useAppDispatch } from "@/hooks/useStore";
import { setFundInfo } from "@/redux/reportSlice";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "洪德基金",
    key: "0-0",
    children: [
      {
        title: "001256赢和A(22)",
        key: "001256",
        isLeaf: true,
        status: "error",
        diffNum: 22,
      },
      {
        title: "001276赢和B(32)",
        key: "001276",
        isLeaf: true,
        status: "warn",
        diffNum: 32,
      },
    ],
  },
  {
    title: "浦银安盛",
    key: "0-1",
    children: [
      {
        title: "001257赢和C(32)",
        key: "001257",
        isLeaf: true,
        status: "succ",
        diffNum: 22,
      },
      {
        title: "001258赢和D(32)",
        key: "001258",
        isLeaf: true,
        status: "none",
        diffNum: 32,
      },
    ],
  },
];

export default function FundTree() {
  const dispatch = useAppDispatch();

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, { node }) => {
    if (!node.selected && node.isLeaf) {
      const { title, diffNum, status, key } = node;
      dispatch(setFundInfo({ title: title as string, diffNum, status, key }));
    }
  };
  return (
    <div className={fundTreeStyles["fund-tree-container"]}>
      <LeftSearch />
      <DirectoryTree
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
        titleRender={(node) => {
          if (node.isLeaf) {
            return (
              <span
                className={classNames(
                  fundTreeStyles["leaf-node"],
                  fundTreeStyles[node.status!]
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
