import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { MovieStatusItem } from '@/pages/MovieData/MovieStatus/data';
import { MovieStatusModalState } from '@/pages/MovieData/MovieStatus/model';
import { changeMovieStatus } from '@/pages/MovieData/MovieStatus/service';

interface ChangeMovieStatusProps {
  status: string;
  record: MovieStatusItem;
}

const ChangeMovieStatus: React.FC<ChangeMovieStatusProps> = ({ status, record }) => {
  const movieStatus: MovieStatusModalState = useSelector((state: any) => state?.movieStatus);

  const onChange = async (checked: boolean) => {
    const res = await changeMovieStatus(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) movieStatus.MovieStatusList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeMovieStatus;
