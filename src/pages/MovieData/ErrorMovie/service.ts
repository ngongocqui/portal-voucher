import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { QueryErrorMovie } from '@/pages/MovieData/ErrorMovie/data';

const keyword_params = 'movie.code,movie.name,episodes.code,episodes.name';
const join_params = {};

export async function queryErrorMovie(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryErrorMovie> {
  const res = await request({
    url: 'error-movie',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'movie,episodes' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function deleteErrorMovie(id: string) {
  return await request({
    url: `error-movie/${id}`,
    method: 'DELETE',
  });
}
