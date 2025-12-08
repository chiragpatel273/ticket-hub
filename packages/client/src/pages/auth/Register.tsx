import { Button, Card, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.register(values);

      message.success("Registration successful");
      navigate("/login");
    } catch (error: any) {
      message.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f5f7fb",
      }}
    >
      <Card
        title="Register"
        style={{
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.1)",
          borderRadius: 16,
        }}
        styles={{
          header: {
            textAlign: "center",
            fontSize: 20,
            fontWeight: 600,
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Register As" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="partner">Partner</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}
