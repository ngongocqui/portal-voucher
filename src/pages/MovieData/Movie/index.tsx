import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MovieList from '@/pages/MovieData/Movie/components/MovieList';
import MovieForm from '@/pages/MovieData/Movie/components/MovieForm';

const Movie: React.FC = () => {
  return (
    <PageContainer>
      <MovieList />
      <MovieForm />
    </PageContainer>
  );
};

export default Movie;
