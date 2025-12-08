import {
  HomeOutlined,
  LogoutOutlined,
  MobileOutlined,
  ProfileOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const { Header } = Layout;

export default function Navbar() {
  const { user, setUser } = useAuth()!;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const logout = () => {
    // Clear auth token and reload
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // ===== Main User Navigation =====
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/my-tickets",
      icon: <MobileOutlined />,
      label: <Link to="/my-tickets">My Tickets</Link>,
    },
  ];

  // ===== Admin Navigation =====
  if (user?.role === "admin") {
    menuItems.push(
      {
        key: "/admin/movies",
        icon: <VideoCameraOutlined />,
        label: <Link to="/admin/movies">Manage Movies</Link>,
      },
      {
        key: "/admin/theatres",
        icon: <ShopOutlined />,
        label: <Link to="/admin/theatres">Approve Theatres</Link>,
      },
    );
  }

  if (user?.role === "partner") {
    menuItems.push({
      key: "/partner/theatres",
      icon: <ShopOutlined />,
      label: <Link to="/partner/theatres">My Theatres</Link>,
    });
  }

  // ===== Avatar Dropdown (Visible only when logged in) =====
  const dropdownMenu = {
    items: [
      {
        key: "profile",
        icon: <ProfileOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        danger: true,
        label: <span onClick={logout}>Logout</span>,
      },
    ],
  };

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ======= Logo ======= */}
      <div style={{ fontSize: "22px", fontWeight: "bold" }}>🎬 CineSeat</div>

      {/* ======= Main Navigation (only logged-in users) ======= */}
      {user && (
        <Menu
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          style={{ flex: 1, marginLeft: 40 }}
        />
      )}

      {/* ======= Right Actions ======= */}
      <div>
        {!user ? (
          // Not Logged In → Show Login/Register
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">
              <strong>Register</strong>
            </Link>
          </div>
        ) : (
          // Logged In → Show Avatar Dropdown
          <Dropdown menu={dropdownMenu} placement="bottomRight">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar style={{ backgroundColor: "#1890ff" }} size="large" icon={<UserOutlined />} />
              <span style={{ marginLeft: 10, fontWeight: 500 }}>{user.name}</span>
            </div>
          </Dropdown>
        )}
      </div>
    </Header>
  );
}
