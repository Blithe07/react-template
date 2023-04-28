import { Form, Input } from "antd";

interface YhFormInputItemProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
}

export default function YhFormInputItem(props: YhFormInputItemProps) {
  const { placeholder, label, name, value, onChange } = props;

  const FormItemStyle: React.CSSProperties = {
    backgroundColor: "rgb(247,248,252)",
    border: "1px solid rgb(229,229,229)",
    borderRadius: "5px",
  };

  const InputStyle: React.CSSProperties = {
    border: "none",
    borderLeft: "1px solid rgb(229,229,229)",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  };

  return (
    <Form.Item label={label} name={name} style={FormItemStyle}>
      <Input
        placeholder={placeholder ?? "请输入"}
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        style={InputStyle}
      />
    </Form.Item>
  );
}
