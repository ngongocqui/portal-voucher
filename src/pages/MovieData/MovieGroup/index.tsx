import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MovieGroupForm from '@/pages/MovieData/MovieGroup/components/MovieGroupForm';
import MovieGroupList from '@/pages/MovieData/MovieGroup/components/MovieGroupList';

const MovieGroup: React.FC = () => {
  return (
    <PageContainer>
      <MovieGroupForm />
      <MovieGroupList />
    </PageContainer>
  );
};

export default MovieGroup;
