import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Descriptions, Layout, message, Spin } from "antd";
import { UserFormModal } from "../components/UserModal";
import { Navbar } from "../components/layout/Navbar";
import { User } from "../types/user";
import { api } from "../services/api";
import { showError } from "../components/ShowError";

export const Profile = () => {
  const { logout, user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [datosUsuario, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get<User>("/users/me")
      .then((res) => {
        setUser(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);
      delete values.role;
      await api.put(`/users/me`, values);
      await updateProfile();
      message.success("Perfil actualizado correctamente");
      setEditing(false);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="p-8 flex justify-center">
        <Spin spinning={loading}>
          <Card title="Perfil" style={{ width: 500 }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Nombre">
                {datosUsuario?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {datosUsuario?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Rol">
                {datosUsuario?.role}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-4 flex gap-2">
              <Button type="primary" onClick={() => setEditing(true)}>
                Editar
              </Button>
              <Button danger onClick={logout}>
                Logout
              </Button>
            </div>
          </Card>
        </Spin>

        {editing && (
          <UserFormModal
            open={editing}
            onCancel={() => setEditing(false)}
            onSubmit={handleUpdate}
            initialValues={datosUsuario!!}
            isEdit
            loading={loading}
          />
        )}
      </div>
    </Layout>
  );
};
