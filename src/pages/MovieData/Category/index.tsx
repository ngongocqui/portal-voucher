import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CategoryForm from '@/pages/MovieData/Category/components/CategoryForm';
import CategoryList from '@/pages/MovieData/Category/components/CategoryList';

const Category: React.FC = () => {
  return (
    <PageContainer>
      <CategoryForm />
      <CategoryList />
    </PageContainer>
  );
};

export default Category;
