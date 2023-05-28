import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import FansubForm from '@/pages/MovieData/Fansub/components/FansubForm';
import FansubList from '@/pages/MovieData/Fansub/components/FansubList';

const Fansub: React.FC = () => {
  return (
    <PageContainer>
      <FansubForm />
      <FansubList />
    </PageContainer>
  );
};

export default Fansub;
