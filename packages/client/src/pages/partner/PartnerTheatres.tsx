import { Button, Form, Input, Modal, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import theatreApi from "../../api/theatreApi";

export default function PartnerTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const loadData = () => {
    theatreApi.getMyTheatres().then((res: any) => {
      setTheatres(res.data.theatres);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = () => {
    setVisible(true);
    form.resetFields();
  };

  const onSubmit = async (values: any) => {
    try {
      await theatreApi.createTheatre(values);
      message.success("Theatre submitted for approval!");
      setVisible(false);
      loadData();
    } catch (e) {
      message.error("Error creating theatre");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "City", dataIndex: "city" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        if (status === "approved") return <Tag color="green">APPROVED</Tag>;
        if (status === "pending") return <Tag color="orange">PENDING</Tag>;
        return <Tag color="red">REJECTED</Tag>;
      },
    },
    {
      title: "Actions",
      render: (_, theatre: any) => (
        <>
          {theatre.status === "approved" && (
            <>
              <Link type="link" to={`/partner/theatres/${theatre._id}/screens`}>
                Screens
              </Link>
              &nbsp;&nbsp;
              <Link type="link" to={`/partner/theatres/${theatre._id}/shows`}>
                Shows
              </Link>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>My Theatres</h1>

      <Button type="primary" onClick={openModal}>
        Add Theatre
      </Button>

      <Table columns={columns} dataSource={theatres} rowKey="_id" style={{ marginTop: 20 }} />

      <Modal
        title="Add Theatre"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Form.Item label="Theatre Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="City" name="city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
