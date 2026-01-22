import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Space } from "antd";
import { useUsers } from "../../../entities/user/model/useUsers";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { createUser, isCreating } = useUsers();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { name: string; avatar: string }) => {
  setIsSubmitting(true);
  try {
    await createUser(values);
    message.success("Пользователь успешно создан");
    form.resetFields();
    onSuccess();
  } catch (error) {
    message.error("Ошибка при создании пользователя");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCancel = () => {
    if (!isSubmitting) {
      form.resetFields();
      onClose();
    }
  };

  const validateUrl = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Введите URL аватара"));
    }

    try {
      new URL(value);
      return Promise.resolve();
    } catch (_) {
      return Promise.reject(
        new Error(
          "Введите корректный URL (например: https://example.com/avatar.jpg)",
        ),
      );
    }
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable={!isSubmitting}
      maskClosable={!isSubmitting}
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isSubmitting}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { message: "Введите имя пользователя" },
            { min: 2, message: "Имя должно быть не менее 2 символов" },
            { max: 50, message: "Имя должно быть не более 50 символов" },
          ]}
        >
          <Input disabled={isSubmitting} />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { message: "Введите URL аватара" },
            { validator: validateUrl },
          ]}
        >
          <Input disabled={isSubmitting} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              style={{
                backgroundColor: "rgb(36, 97, 143)",
                borderColor: "rgb(36, 97, 143)",
              }}
            >
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isSubmitting}
              style={{
                backgroundColor: "rgb(36, 97, 143)",
                borderColor: "rgb(36, 97, 143)",
                color: "rgb(255, 255, 255)",
              }}
            >
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
