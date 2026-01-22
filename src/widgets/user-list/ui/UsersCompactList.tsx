import React from 'react';
import { Avatar, Image, List, Typography, Button, Space } from 'antd';
import { User } from '../../../entities/user/model/types';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface UsersCompactListProps {
  users: User[];
  loading: boolean;
  onEditUser: (user: User) => void;
}

const UsersCompactList: React.FC<UsersCompactListProps> = ({ users, loading, onEditUser }) => {
  return (
    <List
      dataSource={users}
      loading={loading}
      itemLayout="horizontal"
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button 
              key="edit"
              type="link"
              onClick={() => onEditUser(user)}
              style={{
                color: 'rgb(36, 97, 143)',
                padding: 0
              }}
            >
              Редактировать
            </Button>
          ]}
          style={{ 
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar 
                src={
                  <Image 
                    src={user.avatar} 
                    alt={`Аватар ${user.name}`}
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%' }}
                  />
                }
                size={48}
              />
            }
            title={
              <Title 
                level={5} 
                style={{ 
                  margin: 0,
                  cursor: 'pointer'
                }}
                onClick={() => onEditUser(user)}
              >
                {user.name}
              </Title>
            }
            description={
              <Space direction="vertical" size={2}>
                <Text type="secondary">
                  Зарегистрирован: {dayjs(user.createdAt).format('DD.MM.YYYY')}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  ID: {user.id}
                </Text>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default UsersCompactList;