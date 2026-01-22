import React from "react";
import { Table, Avatar, Image, Button, Tag, Space } from "antd";
import { User } from "../../../entities/user/model/types";
import dayjs from "dayjs";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onEditUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  onEditUser,
}) => {
  const columns = [
    {
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
      render: (avatarUrl: string) => (
        <Avatar
          src={
            <Image
              src={avatarUrl}
              alt="avatar"
              style={{ width: 40, height: 40 }}
            />
          }
          size={40}
          style={{ border: "1px solid #f0f0f0" }}
        />
      ),
    },
    {
      dataIndex: "name",
      key: "name",
      render: (name: string, record: User) => (
        <Button
          type="link"
          onClick={() => onEditUser(record)}
          style={{
            padding: 0,
            height: "auto",
            fontWeight: 500,
          }}
        >
          {name}
        </Button>
      ),
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: string) => (
        <div>
          <div style={{ fontWeight: 500 }}>
            {dayjs(date).format("DD.MM.YYYY")}
          </div>
          <div style={{ fontSize: "12px", color: "#999" }}>
            {dayjs(date).format("HH:mm")}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Всего ${total} пользователей`,
      }}
      locale={{
        emptyText: "Нет данных о пользователях",
      }}
    />
  );
};

export default UsersTable;
