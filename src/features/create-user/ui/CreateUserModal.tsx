import React from 'react';
import { Modal } from 'antd';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onSuccess }) => {
  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Форма создания пользователя будет здесь
      </div>
    </Modal>
  );
};

export default CreateUserModal;