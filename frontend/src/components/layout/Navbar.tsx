import { User } from "../../types/user";
import { api } from "../../services/api";
import { showError } from "../ShowError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Avatar, Space, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [nameUser, setName] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<User>(
        `${user?.role === "admin" ? `/users/${user?.id}` : "/users/me"}`,
      )
      .then((res) => {
        setName(res?.data?.name);
      })
      .catch((err) => {
        showError(err);
      });
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    ...(user?.role === "admin"
      ? [
          {
            key: "profile",
            label: (
              <span>
                <strong>{nameUser}</strong>
                <br />
                <Text type="secondary">{user?.role}</Text>
              </span>
            ),
            disabled: true,
          },
        ]
      : []),
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Text strong style={{ fontSize: 18 }}>
        {user?.role === "admin" ? "Panel Administrativo" : nameUser}
      </Text>

      <Dropdown menu={{ items }} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
          <Text>{user?.name}</Text>
        </Space>
      </Dropdown>
    </Header>
  );
};
