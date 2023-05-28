import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { changeStatusMovie } from '@/pages/MovieData/Movie/service';
import { MovieItem } from '@/pages/MovieData/Movie/data';
import { MovieModalState } from '@/pages/MovieData/Movie/model';

interface ChangeStatusMovieProps {
  status: string;
  record: MovieItem;
}

const ChangeStatusMovie: React.FC<ChangeStatusMovieProps> = ({ status, record }) => {
  const movie: MovieModalState = useSelector((state: any) => state?.movie);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusMovie(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) movie.MovieList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusMovie;
