import React from 'react';
import { Switch } from 'antd';
import { StoreItem } from '@/pages/Store/data';
import { changeStatusStore } from '@/pages/Store/service';
// @ts-ignore
import { useSelector } from 'umi';
import { StoreModalState } from '@/pages/Store/model';

interface ChangeStatusStoreProps {
  status: string;
  record: StoreItem;
}

const ChangeStatusStore: React.FC<ChangeStatusStoreProps> = ({ status, record }) => {
  const Store: StoreModalState = useSelector((state: any) => state?.store);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusStore(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) Store.StoreList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusStore;
