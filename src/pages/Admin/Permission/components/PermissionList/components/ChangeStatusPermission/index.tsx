import React from 'react';
import { Switch } from 'antd';
import { changeStatusPermission } from '@/pages/Admin/Permission/service';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { useSelector } from 'umi';
import { PermissionModalState } from '@/pages/Admin/Permission/model';

interface ChangeStatusPermissionProps {
  status: string;
  record: PermissionItem;
}

const ChangeStatusPermission: React.FC<ChangeStatusPermissionProps> = ({ status, record }) => {
  const permission: PermissionModalState = useSelector((state: any) => state?.permission);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusPermission(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) permission.PermissionList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusPermission;
