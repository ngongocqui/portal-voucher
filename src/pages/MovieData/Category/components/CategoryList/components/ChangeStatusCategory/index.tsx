import React from 'react';
import { Switch } from 'antd';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { changeStatusCategory } from '@/pages/MovieData/Category/service';
import { useSelector } from 'umi';
import { CategoryModalState } from '@/pages/MovieData/Category/model';

interface ChangeStatusCategoryProps {
  status: string;
  record: PermissionItem;
}

const ChangeStatusCategory: React.FC<ChangeStatusCategoryProps> = ({ status, record }) => {
  const category: CategoryModalState = useSelector((state: any) => state?.category);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCategory(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) category.CategoryList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusCategory;
