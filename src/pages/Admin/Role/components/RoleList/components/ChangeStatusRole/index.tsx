import React from 'react';
import { Switch } from 'antd';
import { RoleItem } from '@/pages/Admin/Role/data';
import { changeStatusRole } from '@/pages/Admin/Role/service';
import { useSelector } from 'umi';
import { RoleModalState } from '@/pages/Admin/Role/model';

interface ChangeStatusRoleProps {
  status: string;
  record: RoleItem;
}

const ChangeStatusRole: React.FC<ChangeStatusRoleProps> = ({ status, record }) => {
  const role: RoleModalState = useSelector((state: any) => state?.role);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRole(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) role.RoleList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusRole;
