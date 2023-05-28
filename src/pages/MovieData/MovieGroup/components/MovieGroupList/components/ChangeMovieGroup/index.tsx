import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { MovieGroupItem } from '@/pages/MovieData/MovieGroup/data';
import { MovieGroupModalState } from '@/pages/MovieData/MovieGroup/model';
import { changeMovieGroup } from '@/pages/MovieData/MovieGroup/service';

interface ChangeMovieGroupProps {
  status: string;
  record: MovieGroupItem;
}

const ChangeMovieGroup: React.FC<ChangeMovieGroupProps> = ({ status, record }) => {
  const movieGroup: MovieGroupModalState = useSelector((state: any) => state?.movieGroup);

  const onChange = async (checked: boolean) => {
    const res = await changeMovieGroup(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) movieGroup.MovieGroupList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeMovieGroup;
