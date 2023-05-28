import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AutoUploadList from '@/pages/System/AutoUpload/components/AutoUploadList';

const AutoUpload: React.FC = () => {
  return (
    <PageContainer>
      <AutoUploadList />
    </PageContainer>
  );
};

export default AutoUpload;
