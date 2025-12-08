import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import screenApi from "../../api/screenApi";
import theatreApi from "../../api/theatreApi";

export default function PartnerScreens() {
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    theatreApi.getMyTheatres().then((res) => setTheatres(res.data.theatres));
    screenApi.getMyScreens().then((res: any) => setScreens(res.data.screens));
  }, []);

  const onSubmit = async (values: any) => {
    try {
      await screenApi.createScreen(values);
      message.success("Screen created!");
      setVisible(false);
      screenApi.getMyScreens().then((res: any) => setScreens(res.data.screens));
    } catch (err) {
      message.error("Error creating screen");
    }
  };

  return (
    <div>
      <h1>My Screens</h1>

      <Button type="primary" onClick={() => setVisible(true)}>
        Add Screen
      </Button>

      <Table
        dataSource={screens}
        rowKey="_id"
        style={{ marginTop: 20 }}
        columns={[
          { title: "Screen Name", dataIndex: "name" },
          { title: "Theatre", render: (s) => s.theatre?.name },
          { title: "Total Seats", dataIndex: "totalSeats" },
        ]}
      />

      <Modal
        title="Add Screen"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="name" label="Screen Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="theatre" label="Select Theatre" rules={[{ required: true }]}>
            <Select>
              {theatres.map((t: any) => (
                <Select.Option value={t._id} key={t._id}>
                  {t.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
