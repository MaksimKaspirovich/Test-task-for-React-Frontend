import React from 'react';
import { Avatar, Image, Card, Typography, Space, Button, Row, Col } from 'antd';
import { User } from '../../../entities/user/model/types';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface UsersListProps {
  users: User[];
  loading: boolean;
  onEditUser: (user: User) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, loading, onEditUser }) => {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {users.map((user) => (
        <Card 
          key={user.id} 
          hoverable
          style={{ 
            width: '100%',
            borderRadius: 8,
            border: '1px solid #f0f0f0'
          }}
          bodyStyle={{ padding: 16 }}
          onClick={() => onEditUser(user)}
        >
          <Row align="middle" gutter={16}>
            {/* Аватар слева */}
            <Col>
              <Avatar 
                src={
                  <Image 
                    src={user.avatar} 
                    alt={`Аватар ${user.name}`}
                    width={64}
                    height={64}
                    style={{ borderRadius: '50%' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=rgb(36,97,143)&color=fff&size=64`;
                    }}
                  />
                }
                size={64}
              />
            </Col>
            
            {/* Имя и дата справа */}
            <Col flex="1">
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Title 
                  level={5} 
                  style={{ 
                    margin: 0,
                    color: '#1890ff',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditUser(user);
                  }}
                >
                  {user.name}
                </Title>
                
                <Space>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Зарегистрирован:
                  </Text>
                  <Text strong style={{ fontSize: '14px' }}>
                    {dayjs(user.createdAt).format('DD.MM.YYYY')}
                  </Text>
                </Space>
                
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  ID: {user.id}
                </Text>
              </Space>
            </Col>
            
            {/* Кнопка редактирования справа */}
            <Col>
              <Button 
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditUser(user);
                }}
                style={{
                  backgroundColor: 'rgb(36, 97, 143)',
                  borderColor: 'rgb(36, 97, 143)'
                }}
              >
                Редактировать
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;