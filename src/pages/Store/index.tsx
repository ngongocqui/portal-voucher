import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import StoreList from '@/pages/Store/components/StoreList';
import StoreForm from '@/pages/Store/components/StoreForm';

const Store: React.FC = () => {
  return (
    <PageContainer>
      <StoreForm />
      <StoreList />
    </PageContainer>
  );
};

export default Store;
