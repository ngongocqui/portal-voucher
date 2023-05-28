import React from 'react';
import { Switch } from 'antd';
import { changeStatusMenu } from '@/pages/Admin/Menu/service';
import { MenuItem } from '@/pages/Admin/Menu/data';
import { useSelector } from 'umi';
import { MenuModalState } from '@/pages/Admin/Menu/model';

interface ChangeStatusMenuProps {
  status: string;
  record: MenuItem;
}

const ChangeStatusMenu: React.FC<ChangeStatusMenuProps> = ({ status, record }) => {
  const menu: MenuModalState = useSelector((state: any) => state?.menu);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusMenu(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) menu.MenuList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusMenu;
