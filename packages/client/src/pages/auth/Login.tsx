import { Button, Card, Form, Input, Space, Typography, message } from "antd";
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
        title="Login"
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

        <Space
          orientation="vertical"
          size={4}
          style={{ width: "100%", marginTop: 16, textAlign: "center" }}
        >
          <Typography.Text type="secondary">New user?</Typography.Text>
          <Button type="link" block onClick={() => navigate("/register")}>
            Create an account
          </Button>
        </Space>
      </Card>
    </div>
  );
}
