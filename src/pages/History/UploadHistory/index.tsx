import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import UploadHistoryList from '@/pages/History/UploadHistory/components/UploadHistoryList';

const UploadHistory: React.FC = () => {
  return (
    <PageContainer>
      <UploadHistoryList />
    </PageContainer>
  );
};

export default UploadHistory;
