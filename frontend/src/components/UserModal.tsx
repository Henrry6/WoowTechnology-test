import { Modal, Form, Input, Select } from "antd";
import { User } from "../types/user";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void> | void;
  initialValues?: Partial<User>;
  isEdit?: boolean;
  loading?: boolean;
}

export const UserFormModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isEdit = false,
  loading = false,
}: Props) => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    if (open && isEdit) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log("Errores de validación");
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar Usuario" : "Crear Usuario"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText={isEdit ? "Actualizar" : "Crear"}
    >
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        initialValues={{ role: "user" }}
      >
        <Form.Item name="id" className="hidden">
          <Input hidden />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Ingrese el nombre" }]}
        >
          <Input placeholder="Ingrese un nombre" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Ingrese el email" },
            { type: "email", message: "Email no válido" },
          ]}
        >
          <Input placeholder="Ingrese un email" />
        </Form.Item>
        {!isEdit && (
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Ingrese la contraseña" },
              {
                min: 8,
                message: "La contraseña debe tener mínimo 8 caracteres",
              },
            ]}
          >
            <Input.Password
              disabled={isEdit}
              placeholder="Ingrese la contraseña"
            />
          </Form.Item>
        )}
        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: "Seleccione un rol" }]}
        >
          <Select
            disabled={true}
            placeholder="Seleccione un rol"
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Usuario", value: "user" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
