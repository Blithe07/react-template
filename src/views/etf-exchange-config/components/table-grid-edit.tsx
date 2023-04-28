import to from "await-to-js";
import {
  useExchangeConfigAdd,
  useExchangeConfigUpdate,
} from "@/api/etf-exchange-config";
import React, { Ref } from "react";
import { useRequest } from "ahooks";
import { Form, Modal, Input } from "antd";
import { ModalInfo } from "@/utils/createModal";
import type { ExchangeConfigUpdateParams } from "@/api/etf-exchange-config/type";

const TableGridEdit = React.forwardRef(
  ({ refresh }: { refresh: () => void }, ref: Ref<TableGridEditRef>) => {
    // 弹框状态
    const [modal, setModal] = useState(new ModalInfo());
    // 弹框默认数据
    const defaultModalData = {
      id: "",
      exchange: "",
      tickerSuffix: "",
      tickerDigits: "",
    };
    // 弹框数据
    const [formData, setFormData] = useState({ ...defaultModalData });
    // 数据填充
    const handleFormData = (name: string, value: string) => {
      setFormData({ ...formData, [name]: value });
    };

    //用useImperativeHandle暴露一些外部ref能访问的属性
    useImperativeHandle(ref, () => {
      // 需要将暴露的接口返回出去
      return {
        create: () => {
          setModal({
            visible: true,
            type: "create",
            title: "Create",
          });
          setFormData(defaultModalData);
        },
        edit: (data: ExchangeConfigUpdateParams) => {
          setModal({
            visible: true,
            type: "edit",
            title: "Edit",
          });
          setFormData({ ...data });
        },
      };
    });
    // 表单实例
    const [form] = Form.useForm();
    // 表单配置
    const formConfig = [
      {
        label: "Exchange",
        rules: [{ required: true }],
        value: "exchange",
      },
      {
        label: "TickerSuffix",
        rules: [{ required: true }],
        value: "tickerSuffix",
      },
      {
        label: "TickerDigits",
        rules: [{ required: true }],
        value: "tickerDigits",
        type: "number",
      },
    ];
    // 表单元素
    const FormItems = formConfig.map((item) => (
      <Form.Item
        label={item.label}
        required
        rules={item.rules}
        name={item.value}
        key={item.value}
      >
        <Input
          name={item.value}
          type={item.type ?? "string"}
          value={formData[item.value as keyof ExchangeConfigUpdateParams]}
          onChange={(e) => handleFormData(e.target.name, e.target.value)}
        />
      </Form.Item>
    ));
    // 具体接口
    const serviceApi =
      modal.type === "create" ? useExchangeConfigAdd : useExchangeConfigUpdate;
    // 新增/编辑
    const { loading, run } = useRequest(serviceApi, {
      manual: true,
      onSuccess: () => {
        onCancel();
        refresh();
      },
    });
    // 确认
    const onOk = async () => {
      const [err] = await to(form.validateFields());
      if (err) return;
      run(formData, { showSuccessMsg: true, showWarnMsg: true });
    };
    // 取消
    const onCancel = () => {
      setModal({
        ...modal,
        visible: false,
      });
      setFormData({ ...defaultModalData });
    };
    return (
      <Modal
        title={modal.title}
        open={modal.visible}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={loading}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 5 }}
          preserve={false}
          initialValues={formData}
        >
          {FormItems}
        </Form>
      </Modal>
    );
  }
);
export default TableGridEdit;
// emit
export interface TableGridEditRef {
  create: () => void;
  edit: (data: ExchangeConfigUpdateParams) => void;
}
