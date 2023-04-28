import { Row, Col, Button } from "antd";
import LeftContainer from "./components/leftContainer";
import { MenuFold, MenuUnfold } from "@icon-park/react";
import RightContainer from "./components/RightContainer";
export default function XbCheck() {
  const [leftInfo, setLeftInfo] = useState({
    span: 4,
    expand: true,
  });

  const changeExpandStatus = () => {
    setLeftInfo({
      ...leftInfo,
      expand: !leftInfo.expand,
      span: leftInfo.expand ? 0 : 4,
    });
  };
  return (
    <Row className="bg-slate-100 p-3 h-screen overflow-hidden">
      {!leftInfo.expand && (
        <Button
          type="text"
          icon={<MenuUnfold />}
          onClick={changeExpandStatus}
          style={{
            position: "absolute",
            top: "1rem",
            justifyContent: "center",
            zIndex: 1,
          }}
        />
      )}
      <Col span={leftInfo.span} className="bg-white px-1 rounded-lg">
        <Button
          type="text"
          icon={<MenuFold />}
          onClick={changeExpandStatus}
          style={{
            position: "absolute",
            right: 0,
            top: "0.5rem",
            justifyContent: "center",
            zIndex: 1,
          }}
        />
        <LeftContainer />
      </Col>
      <Col span={24 - leftInfo.span} className="pl-3 !flex !flex-col">
        <RightContainer />
      </Col>
    </Row>
  );
}
