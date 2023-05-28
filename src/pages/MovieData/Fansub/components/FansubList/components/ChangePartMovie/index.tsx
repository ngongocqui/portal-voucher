import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { FansubItem } from '@/pages/MovieData/Fansub/data';
import { FansubModalState } from '@/pages/MovieData/Fansub/model';
import { changeFansub } from '@/pages/MovieData/Fansub/service';

interface ChangeFansubProps {
  status: string;
  record: FansubItem;
}

const ChangeFansub: React.FC<ChangeFansubProps> = ({ status, record }) => {
  const fansub: FansubModalState = useSelector((state: any) => state?.fansub);

  const onChange = async (checked: boolean) => {
    const res = await changeFansub(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) fansub.FansubList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeFansub;
