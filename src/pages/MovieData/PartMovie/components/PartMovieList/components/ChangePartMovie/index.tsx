import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { PartMovieItem } from '@/pages/MovieData/PartMovie/data';
import { PartMovieModalState } from '@/pages/MovieData/PartMovie/model';
import { changePartMovie } from '@/pages/MovieData/PartMovie/service';

interface ChangePartMovieProps {
  status: string;
  record: PartMovieItem;
}

const ChangePartMovie: React.FC<ChangePartMovieProps> = ({ status, record }) => {
  const partMovie: PartMovieModalState = useSelector((state: any) => state?.partMovie);

  const onChange = async (checked: boolean) => {
    const res = await changePartMovie(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) partMovie.PartMovieList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangePartMovie;
