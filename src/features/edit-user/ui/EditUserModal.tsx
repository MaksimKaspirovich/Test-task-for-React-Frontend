import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Space, Popconfirm } from "antd";
import { useUsers } from "../../../entities/user/model/useUsers";
import { User } from "../../../entities/user/model/types";

interface EditUserModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { updateUser, deleteUser, isUpdating } = useUsers();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Инициализируем форму данными пользователя
  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [open, user, form]);

  const handleSubmit = async (values: { name: string; avatar: string }) => {
    setIsSubmitting(true);
    try {
      await updateUser({
        id: user.id,
        ...values,
      });

      message.success("Пользователь успешно обновлен");
      onSuccess();
    } catch (error) {
      message.error("Ошибка при обновлении пользователя");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      message.success("Пользователь успешно удален");
      onSuccess();
    } catch (error) {
      message.error("Ошибка при удалении пользователя");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting && !isDeleting) {
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
      title="Редактирование пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable={!isSubmitting && !isDeleting}
      maskClosable={!isSubmitting && !isDeleting}
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isSubmitting || isDeleting}
      >
        <Form.Item
          label="id"
          name="id"
          style={{
            marginBottom: "10px",
          }}
        >
          <Input
            disabled
            style={{
              backgroundColor: "rgb(222,222,222)",
              borderColor: "rgb(166,166,166)",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { message: "Введите имя пользователя" },
            { min: 2, message: "Имя должно быть не менее 2 символов" },
            { max: 50, message: "Имя должно быть не более 50 символов" },
          ]}
          style={{
            marginBottom: "10px",
          }}
        >
          <Input
            disabled={isSubmitting || isDeleting}
            style={{
              borderColor: "rgb(166,166,166)",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { message: "Введите URL аватара" },
            { validator: validateUrl },
          ]}
        >
          <Input
            disabled={isSubmitting || isDeleting}
            style={{
              borderColor: "rgb(166,166,166)",
            }}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                loading={isDeleting}
                disabled={isSubmitting || isDeleting}
                onClick={handleDelete}
                style={{
                  backgroundColor: "rgb(36, 97, 143)",
                  borderColor: "rgb(36, 97, 143)",
                  color: "rgb(255, 255, 255)",
                }}
              >
                {isDeleting ? "Удаление..." : "Удалить"}
              </Button>
            </div>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                disabled={isSubmitting || isDeleting}
                style={{
                  backgroundColor: "rgb(36, 97, 143)",
                  borderColor: "rgb(36, 97, 143)",
                }}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить"}
              </Button>
              <Button
                onClick={handleCancel}
                disabled={isSubmitting || isDeleting}
                style={{
                  backgroundColor: "rgb(36, 97, 143)",
                  borderColor: "rgb(36, 97, 143)",
                  color: "rgb(255, 255, 255)",
                }}
              >
                Отмена
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
