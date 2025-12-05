import { MenuOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Grid, Layout, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const { Header } = Layout;
const { Text, Title } = Typography;

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

  if (!auth) return null;

  const { user, logout } = auth;
  const isMobile = !screens.md;

  const guestMenuItems: MenuProps["items"] = [
    { key: "login", label: "Login" },
    { key: "register", label: "Register" },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "welcome",
      disabled: true,
      label: (
        <span style={{ color: "#64748b" }}>
          Signed in as <strong>{user?.name}</strong>
        </span>
      ),
    },
    { type: "divider" },
    { key: "logout", danger: true, label: "Logout" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      logout();
      return;
    }

    if (key === "login" || key === "register") {
      handleNavigate(`/${key}`);
    }
  };

  const headerStyle = {
    background: "#ffffffcc",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: isMobile ? 16 : 32,
    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
    position: "sticky" as const,
    top: 0,
    width: "100%",
    zIndex: 100,
  };

  return (
    <Header style={headerStyle}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            color: "#1f2937",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: isMobile ? 18 : 22,
          }}
        >
          🎬 CineSeat
        </Title>

        {isMobile ? (
          <Dropdown
            arrow
            placement="bottomRight"
            menu={{
              items: user ? userMenuItems : guestMenuItems,
              onClick: handleMenuClick,
            }}
          >
            <Button
              aria-label="Toggle navigation menu"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              type="text"
            />
          </Dropdown>
        ) : !user ? (
          <Space size="middle" align="center">
            <Button type="text" onClick={() => handleNavigate("/login")}>
              Login
            </Button>
            <Button type="primary" shape="round" onClick={() => handleNavigate("/register")}>
              Register
            </Button>
          </Space>
        ) : (
          <Space size="middle" align="center">
            <Text
              style={{
                margin: 0,
                color: "#475569",
                fontSize: 14,
              }}
            >
              Welcome, <strong>{user.name}</strong>
            </Text>
            <Button danger type="primary" shape="round" onClick={logout}>
              Logout
            </Button>
          </Space>
        )}
      </div>
    </Header>
  );
}
