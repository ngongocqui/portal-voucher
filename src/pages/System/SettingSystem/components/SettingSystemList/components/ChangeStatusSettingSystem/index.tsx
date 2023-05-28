import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { SettingSystemModalState } from '@/pages/System/SettingSystem/model';
import { SettingSystemItem } from '@/pages/System/SettingSystem/data';
import { changeStatusSettingSystem } from '@/pages/System/SettingSystem/service';

interface ChangeStatusSettingSystemProps {
  status: string;
  record: SettingSystemItem;
}

const ChangeStatusSettingSystem: React.FC<ChangeStatusSettingSystemProps> = ({
  status,
  record,
}) => {
  const settingSystem: SettingSystemModalState = useSelector((state: any) => state?.settingSystem);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusSettingSystem(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) settingSystem.SettingSystemList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusSettingSystem;
