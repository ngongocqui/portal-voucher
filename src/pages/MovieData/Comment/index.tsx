import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommentList from '@/pages/MovieData/Comment/components/ErrorMovieList';

const Comment: React.FC = () => {
  return (
    <PageContainer>
      <CommentList />
    </PageContainer>
  );
};

export default Comment;
