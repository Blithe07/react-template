import { Attention, Time, CheckOne, Round } from "@icon-park/react";
import xbListStyles from  "@/styles/xb-list/index.module.less";
import classNames from "classnames";
export default function Progress({
  data,
}: {
  data: Array<{ name: string; status: string }>;
}) {
  const ProgressItems = data.map((item) => (
    <div className={classNames(xbListStyles['progress-item'], item.status)} key={item.name}>
      <div className="inline-flex items-center">
        {item.status === "succ" && (
          <CheckOne theme="filled" size="16" fill="#4787f0" />
        )}
        {item.status === "warn" && (
          <Time theme="filled" size="16" fill="#feb640" />
        )}
        {item.status === "error" && (
          <Attention theme="filled" size="16" fill="#e0251b" />
        )}
        {!item.status && (
          <Round theme="two-tone" size="16" fill={["#ececec", "#fff"]} />
        )}
        <span className="ml-1">{item.name}</span>
      </div>
    </div>
  ));

  return <div className="w-full flex">{ProgressItems}</div>;
}
