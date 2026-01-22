import React, { useState } from "react";
import {
  Button,
  Typography,
  Space,
  Spin,
  Alert,
  List,
  Avatar,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/model/useAuth";
import { useUsers } from "../../../entities/user/model/useUsers";
import CreateUserModal from "../../../features/create-user/ui/CreateUserModal";
import EditUserModal from "../../../features/edit-user/ui/EditUserModal";
import { User } from "../../../entities/user/model/types";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { users, isLoading, error, refetch } = useUsers();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  const handleEditSuccess = () => {
    setEditingUser(null);
    refetch();
  };

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Ошибка загрузки"
          description="Не удалось загрузить список пользователей."
          type="error"
          action={
            <Button
              onClick={() => refetch()}
              style={{
                backgroundColor: "rgb(36, 97, 143)",
                borderColor: "rgb(36, 97, 143)",
              }}
            >
              Повторить
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <Row justify="end" align="middle">
        <Col>
          <Button
            onClick={handleLogout}
            style={{
              borderColor: "rgb(36, 97, 143)",
              color: "rgb(255, 255, 255)",
              backgroundColor: "rgb(36, 97, 143)",
            }}
          >
            Выход
          </Button>
        </Col>
      </Row>

      {/* Компактный список */}
      <Spin spinning={isLoading}>
        <List
          dataSource={users}
          locale={{ emptyText: "Нет пользователей" }}
          renderItem={(user) => (
            <List.Item
              style={{
                padding: "8px 16px",
                backgroundColor: "#fff",
                transition: "all 0.2s",
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    onClick={() => handleEditUser(user)}
                    src={user.avatar}
                    size={40}
                    style={{ border: "1px solid #f0f0f0", cursor: "pointer" }}
                  />
                }
                title={
                  <Text
                    strong
                    style={{ fontSize: "15px", cursor: "pointer" }}
                    onClick={() => handleEditUser(user)}
                  >
                    {user.name}
                  </Text>
                }
                description={
                  <Space size={12}>
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      Зарегистрирован{" "}
                      {dayjs(user.createdAt).format("DD.MM.YYYY")}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            backgroundColor: "rgb(36, 97, 143)",
            borderColor: "rgb(36, 97, 143)",
            marginTop: "30px",
          }}
        >
          Создать пользователя
        </Button>
      </Spin>

      {/* Модальные окна */}
      <CreateUserModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default UsersPage;
