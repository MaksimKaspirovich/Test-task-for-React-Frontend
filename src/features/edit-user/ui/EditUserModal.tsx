import React from 'react';
import { Modal } from 'antd';
import { User } from '../../../entities/user/model/types';

interface EditUserModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose, onSuccess }) => {
  return (
    <Modal
      title={`Редактирование пользователя: ${user.name}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <div style={{ padding: '20px' }}>
        <p>ID: {user.id}</p>
        <p>Имя: {user.name}</p>
        <p>Аватар: {user.avatar}</p>
        <div style={{ textAlign: 'center', color: '#666' }}>
          Форма редактирования будет здесь
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;