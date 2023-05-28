import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeStatusMovie,
  CreateMovie,
  QueryMovies,
  UpdateMovie,
} from '@/pages/MovieData/Movie/data';

const keyword_params = 'code,name,subName';
const join_params = {
  categories: [{ key: 'categories.id', condition: '$in' }],
};

export async function queryMovies(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryMovies> {
  const res = await request({
    url: 'movies',
    method: 'GET',
    joins: joinConverter(
      { ...filter, ...params, join: 'categories,movie_status,part,group,fansub' },
      join_params,
    ),
    params: paramsConverter({ ...params, inAll: true }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createMovie(body: CreateMovie) {
  return await request({
    url: `movies`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateMovie(id: string, body: UpdateMovie) {
  return await request({
    url: `movies/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusMovie(id: string, status: string): Promise<ChangeStatusMovie> {
  return await request({
    url: `movies/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
