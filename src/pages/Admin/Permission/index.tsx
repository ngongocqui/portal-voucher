import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PermissionList from '@/pages/Admin/Permission/components/PermissionList';
import PermissionForm from '@/pages/Admin/Permission/components/PermissionForm';

const Permission: React.FC = () => {
  return (
    <PageContainer>
      <PermissionForm />
      <PermissionList />
    </PageContainer>
  );
};

export default Permission;
