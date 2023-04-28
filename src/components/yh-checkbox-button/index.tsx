import { Checkbox } from "antd";
import YhCheckboxStyles from "./index.module.less";
export default function YhCheckboxButton(props: any) {
  return (
    <Checkbox {...props} className={YhCheckboxStyles["yh-checkbox-button"]} />
  );
}
