import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import RoleList from '@/pages/Admin/Role/components/RoleList';
import RoleForm from '@/pages/Admin/Role/components/RoleForm';

const Role: React.FC = () => {
  return (
    <PageContainer>
      <RoleForm />
      <RoleList />
    </PageContainer>
  );
};

export default Role;
