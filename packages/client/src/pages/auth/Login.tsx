import { Button, Card, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const { setUser } = auth!;

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.login(values);

      // Save token
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      message.success("Login successful");
      navigate("/");
    } catch (error: any) {
      message.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title="Login" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
