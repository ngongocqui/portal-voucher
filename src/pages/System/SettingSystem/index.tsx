import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import SettingSystemForm from '@/pages/System/SettingSystem/components/SettingSystemForm';
import SettingSystemList from '@/pages/System/SettingSystem/components/SettingSystemList';

const SettingSystem: React.FC = () => {
  return (
    <PageContainer>
      <SettingSystemForm />
      <SettingSystemList />
    </PageContainer>
  );
};

export default SettingSystem;
