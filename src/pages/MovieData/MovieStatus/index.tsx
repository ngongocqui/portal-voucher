import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MovieStatusList from '@/pages/MovieData/MovieStatus/components/MovieStatusList';
import MovieStatusForm from '@/pages/MovieData/MovieStatus/components/MovieStatusForm';

const MovieStatus: React.FC = () => {
  return (
    <PageContainer>
      <MovieStatusForm />
      <MovieStatusList />
    </PageContainer>
  );
};

export default MovieStatus;
