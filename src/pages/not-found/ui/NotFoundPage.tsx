import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/users', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1); // Вернуться назад
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff',
      padding: '20px'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница, которую вы посетили, не существует."
        extra={[
          <Button 
            type="primary" 
            key="home"
            onClick={handleGoHome}
            style={{
              backgroundColor: 'rgb(36, 97, 143)',
              borderColor: 'rgb(36, 97, 143)'
            }}
          >
            На главную
          </Button>,
          <Button 
            key="back" 
            onClick={handleGoBack}
            style={{
              borderColor: 'rgb(36, 97, 143)',
              color: 'rgb(36, 97, 143)'
            }}
          >
            Вернуться назад
          </Button>
        ]}
      />
    </div>
  );
};