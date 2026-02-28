import { Layout, message, Popconfirm, Space, Spin, Table } from "antd";
import { User } from "../types/user";
import { api } from "../services/api";
import { Button, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Navbar } from "../components/layout/Navbar";
import { Content } from "antd/es/layout/layout";
import { UserFormModal } from "../components/UserModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { showError } from "../components/ShowError";

export const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    {
      dataIndex: "options",
      key: "options",
      render: (role: string, record: User) => (
        <Space>
          <EditOutlined onClick={() => setEditingUser(record)} />
          <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={async () => {
              try {
                await api.delete(`/users/${record.id}`);
                message.success("Usuario eliminado correctamente");
                // Actualiza el state para eliminarlo de la tabla
                setUsers((prev) => prev.filter((u) => u.id !== record.id));
              } catch (error: any) {
                message.error(
                  error.response?.data?.message || "Error al eliminar usuario",
                );
              }
            }}
            okText="Sí"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get<User[]>("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = async (values: User) => {
    try {
      setLoading(true);
      if (editingUser) {
        const res = await api.put(`/users/${values.id}`, values);
        setUsers((prev) =>
          prev.map((user) => (user.id === res.data.id ? res.data : user)),
        );
      } else {
        const res = await api.post("/users", values);
        setUsers((prev) => [...prev, res.data]);
      }
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Spin spinning={loading}>
        <Content style={{ padding: 50 }}>
          <UserFormModal
            open={!!editingUser}
            onCancel={() => setEditingUser(null)}
            onSubmit={handleCreate}
            initialValues={editingUser || undefined}
            isEdit
          />
          <div className="flex justify-center">
            <div className="w-2/3 p-8">
              <div className="flex justify-between">
                <h1 className="text-2xl mb-4">Usuarios</h1>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                  Crear
                </Button>
              </div>

              <Input
                className="border p-2 mb-4 rounded"
                placeholder="Buscar por email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Table
                columns={columns}
                dataSource={filtered}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
              <UserFormModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
                loading={loading}
              />
            </div>
          </div>
        </Content>
      </Spin>
    </Layout>
  );
};
