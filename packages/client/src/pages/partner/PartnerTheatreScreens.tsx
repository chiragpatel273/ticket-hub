import { Button, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import screenApi from "../../api/screenApi";
import theatreApi from "../../api/theatreApi";

export default function PartnerTheatreScreens() {
  const { theatreId } = useParams();

  const [theatre, setTheatre] = useState<any>(null);
  const [screens, setScreens] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  // Load theatre + screens
  useEffect(() => {
    theatreApi.getMyTheatres().then((res) => {
      const t = res.data.theatres.find((th: any) => th._id === theatreId);
      setTheatre(t);
    });

    screenApi.getScreensByTheatre(theatreId).then((res) => {
      setScreens(res.data.screens);
    });
  }, [theatreId]);

  const onSubmit = async (values: any) => {
    try {
      await screenApi.createScreen({
        ...values,
        theatre: theatreId,
      });

      message.success("Screen added!");
      setVisible(false);

      screenApi.getScreensByTheatre(theatreId).then((res) => {
        setScreens(res.data.screens);
      });
    } catch (err) {
      message.error("Error creating screen");
    }
  };

  const columns = [
    { title: "Screen Name", dataIndex: "name" },
    { title: "Total Seats", dataIndex: "totalSeats" },
  ];

  return (
    <div>
      <h1>Screens — {theatre?.name}</h1>

      <Button type="primary" onClick={() => setVisible(true)}>
        Add Screen
      </Button>

      <Table dataSource={screens} columns={columns} rowKey="_id" style={{ marginTop: 20 }} />

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

          <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
