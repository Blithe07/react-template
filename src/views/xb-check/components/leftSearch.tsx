import { Filter, Search } from "@icon-park/react";
import { Select, Input, Button } from "antd";
export default function LeftSearch() {
  const options = [
    { value: "001256", label: "001256赢和A" },
    { value: "001276", label: "001276赢和B" },
    { value: "001257", label: "001257赢和C" },
    { value: "001258", label: "001258赢和D" },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="flex justify-between mb-4">
      <div className="flex">
        <Select
          showSearch
          placeholder="产品名称"
          style={{ width: 100 }}
          onChange={handleChange}
          options={options}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Input
          placeholder="关键词"
          style={{ width: 90 }}
          prefix={<Search></Search>}
        ></Input>
      </div>
      <Button icon={<Filter />} className="flex justify-center" />
    </div>
  );
}
