import { Row, Col, Card } from "antd";
import HtmlDiff from "@/plugins/htmldiff/htmldiff";
import "@/styles/xb-html-contrast/index.less";

interface HtmlContrastProps {
  currentTitle: string;
  currentContent: string;
  historyTitle: string;
  historyContent: string;
}

export default function HtmlContrast(props: HtmlContrastProps) {
  // props
  const { currentContent, currentTitle, historyContent, historyTitle } = props;
  /** html文本 */
  const [contentHtml, setContentHtml] = useState({
    historyContentHtml: "",
    currentContentHtml: "",
  });
  /** 获取domList集合 */
  const getDomList = (dom: HTMLElement, searchStr: string) => {
    return dom.querySelectorAll(searchStr);
  };
  /** 获取html文本 */
  const getContentHtml = (diffHtml: string, isHistory = true) => {
    const $div = document.createElement("div");
    $div.innerHTML = diffHtml;

    // 添加标识类名
    const flagDiff = ["historyDel", "historyMod", "curIns", "curMod"];
    const searchDiff = [
      // 历史删除
      "del.diffdel",
      // 历史修改
      "del.diffmod",
      // 当前新增
      "ins.diffins",
      // 当前修改
      "ins.diffmod",
    ];
    searchDiff.forEach((item, index) => {
      const domList = getDomList($div, item);
      for (const dom of domList) {
        const parent = dom.parentElement;
        if (isHistory) {
          if (item.startsWith("del")) {
            parent?.classList.add(flagDiff[index]);
          } else {
            parent?.removeChild(dom);
          }
        } else {
          if (item.startsWith("ins")) {
            parent?.classList.add(flagDiff[index]);
          } else {
            parent?.removeChild(dom);
          }
        }
      }
    });

    // 数字额外类名(目前只考虑diff情况)
    const numDiff = [".curMod", ".historyMod"];
    numDiff.forEach((item) => {
      const domList = getDomList($div, item);
      for (const dom of domList) {
        const innerText = Number(
          (dom as HTMLElement).innerText.replaceAll(",", "")
        );
        if (!Number.isNaN(innerText)) {
          dom?.classList.add(
            Number(innerText) > 0 ? "modPositiveNum" : "modNegativeNum"
          );
        }
      }
    });

    // 剔除ins和del标签
    const regArr = [
      /<ins class="diffmod">(.*?)<\/ins>/g,
      /<del class="diffmod">(.*?)<\/del>/g,
      /<ins class="diffins">(.*?)<\/ins>/g,
      /<del class="diffdel">(.*?)<\/del>/g,
    ];
    let htmlStr = $div.innerHTML;
    for (const reg of regArr) {
      htmlStr = htmlStr.replaceAll(reg, (_, value) => value);
    }

    // 返回结果
    return htmlStr;
  };
  /** 初始化html文本 */
  useEffect(() => {
    const diffHtml = HtmlDiff.execute(historyContent, currentContent);
    setContentHtml({
      historyContentHtml: getContentHtml(diffHtml),
      currentContentHtml: getContentHtml(diffHtml, false),
    });
  }, [historyContent, currentContent]);

  /** 判断是否可以滚动 0 不同步 1：按左边同步 2：按右边同步 */
  const [flag, setFlag] = useState(0);
  /** 改变滚动同步方式 */
  const changeFlag = (num: number) => setFlag(num);

  /** 左边滚动区 */
  const leftScroll = useRef({} as HTMLDivElement);
  /** 右边滚动区 */
  const rightScroll = useRef({} as HTMLDivElement);
  /** 左边滚动条滚动同步 */
  const leftHandleScroll = () => {
    if (flag === 1) {
      rightScroll.current.scrollTop = leftScroll.current.scrollTop;
    }
  };
  /** 右边滚动条滚动同步 */
  const rightHandleScroll = () => {
    if (flag === 2) {
      leftScroll.current.scrollTop = rightScroll.current.scrollTop;
    }
  };

  return (
    <Row className="p-3 bg-slate-100 h-screen">
      <Col span={12} className="!flex flex-col">
        <Card
          bodyStyle={{
            padding: "10px",
            textAlign: "center",
          }}
          className="!mb-4 !mr-2"
        >
          <div className="diff-html-title">
            <div className="text">{currentTitle}</div>
          </div>
        </Card>
        <Card className="!mr-2 flex-1">
          <div
            className="show-html-scroll"
            ref={leftScroll}
            onMouseMove={() => changeFlag(1)}
            onMouseLeave={() => changeFlag(0)}
            onScroll={leftHandleScroll}
          >
            <div className="show-html-box">
              <div
                className="diff-html-box"
                dangerouslySetInnerHTML={{
                  __html: contentHtml.currentContentHtml,
                }}
              ></div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={12} className="!flex flex-col">
        <Card
          bodyStyle={{
            padding: "10px",
            textAlign: "center",
          }}
          className="!mb-4"
        >
          <div className="diff-html-title">
            <div className="text">{historyTitle}</div>
          </div>
        </Card>
        <Card className="flex-1">
          <div
            className="show-html-scroll"
            ref={rightScroll}
            onMouseMove={() => changeFlag(2)}
            onMouseLeave={() => changeFlag(0)}
            onScroll={rightHandleScroll}
          >
            <div className="show-html-box">
              <div
                className="diff-html-box"
                dangerouslySetInnerHTML={{
                  __html: contentHtml.historyContentHtml,
                }}
              ></div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
