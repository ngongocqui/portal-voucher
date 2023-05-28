import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PartMovieList from '@/pages/MovieData/PartMovie/components/PartMovieList';
import PartMovieForm from '@/pages/MovieData/PartMovie/components/PartMovieForm';

const PartMovie: React.FC = () => {
  return (
    <PageContainer>
      <PartMovieForm />
      <PartMovieList />
    </PageContainer>
  );
};

export default PartMovie;
