import { message } from "antd";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { showError } from "../components/ShowError";
import { UserFormModal } from "../components/UserModal";

export const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    try {
      setLoading(true);
      const body = { ...values, role: "user" };
      await api.post("/auth/register", body);
      message.success("Usuario registrado correctamente");
      setIsModalOpen(false);
      navigate("/login");
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserFormModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          navigate("/login");
        }}
        onSubmit={handleRegister}
        isEdit={false}
        loading={loading}
        initialValues={{ role: "user" }}
      />
    </>
  );
};
