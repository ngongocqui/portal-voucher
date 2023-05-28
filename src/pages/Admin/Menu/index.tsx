import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MenuList from '@/pages/Admin/Menu/components/MenuList';
import MenuForm from '@/pages/Admin/Menu/components/MenuForm';

const Menu: React.FC = () => {
  return (
    <PageContainer>
      <MenuForm />
      <MenuList />
    </PageContainer>
  );
};

export default Menu;
