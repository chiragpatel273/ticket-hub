import { Button, Card, Form, Input, message } from "antd";
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
    <div>
      <Card title="Register" style={{ width: 350 }}>
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

          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}
