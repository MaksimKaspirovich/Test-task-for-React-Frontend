import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/model/useAuth'

const { Title } = Typography;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <Title level={2} style={{ margin: 0 }}>Список пользователей</Title>
        <Button 
          type="primary" 
          onClick={handleLogout}
          style={{
            backgroundColor: 'rgb(36, 97, 143)',
            borderColor: 'rgb(36, 97, 143)'
          }}
        >
          Выход
        </Button>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <p>Здесь будет список пользователей...</p>
      </div>
    </div>
  );
};
