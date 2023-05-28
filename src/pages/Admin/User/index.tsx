import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import UserList from '@/pages/Admin/User/components/UserList';
import UserForm from '@/pages/Admin/User/components/UserForm';

const User: React.FC = () => {
  return (
    <PageContainer>
      <UserList />
      <UserForm />
    </PageContainer>
  );
};

export default User;
