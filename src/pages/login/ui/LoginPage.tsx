// src/pages/login/ui/LoginPage.tsx
import React, { useEffect } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "features/auth/model/useAuth";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, isAuth, checkAuth } = useAuth();
  const [form] = Form.useForm();

  // Проверяем авторизацию при загрузке компонента
  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
    };
    checkAuthentication();
  }, [checkAuth]);

  // Показываем уведомление об ошибке
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка авторизации",
        description: error.message,
        placement: "topRight",
      });
    }
  }, [error]);

  const handleSubmit = async (values: { login: string; password: string }) => {
    login(values, {
      onSuccess: () => {
        const from = (location.state as any)?.from?.pathname || "/users";
        navigate(from, { replace: true });

        notification.success({
          message: "Успешный вход",
          description: "Добро пожаловать",
          placement: "topRight",
        });
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: "15px",
            textAlign: "left",
            marginBottom: "24px",
            color: "#000",
            fontWeight: "normal",
          }}
        >
          Авторизация
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={isLoading}
        >
          <Form.Item
            name="login"
            rules={[
              { required: true, message: "Введите логин" },
              { min: 3, message: "Логин должен быть не менее 3 символов" },
            ]}
          >
            <Input placeholder="Логин" disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Введите пароль" },
              { min: 3, message: "Пароль должен быть не менее 3 символов" },
            ]}
          >
            <Input.Password placeholder="Пароль" disabled={isLoading} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                style={{
                  backgroundColor: "rgb(36, 97, 143)",
                  borderColor: "rgb(36, 97, 143)",
                }}
              >
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
