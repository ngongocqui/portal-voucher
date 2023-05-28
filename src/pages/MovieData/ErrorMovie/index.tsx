import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ErrorMovieList from '@/pages/MovieData/ErrorMovie/components/ErrorMovieList';

const ErrorMovie: React.FC = () => {
  return (
    <PageContainer>
      <ErrorMovieList />
    </PageContainer>
  );
};

export default ErrorMovie;
