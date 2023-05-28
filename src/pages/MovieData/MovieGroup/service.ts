import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeMovieGroup,
  CreateMovieGroup,
  QueryMovieGroup,
  UpdateMovieGroup,
} from '@/pages/MovieData/MovieGroup/data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryMovieGroup(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryMovieGroup> {
  const res = await request({
    url: 'movie-group',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllMovieGroup(params: any, sort: any = {}): Promise<QueryMovieGroup> {
  return await request({
    url: 'movie-group',
    method: 'GET',
    joins: joinConverter({ ...params }),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createMovieGroup(body: CreateMovieGroup) {
  return await request({
    url: `movie-group`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateMovieGroup(id: string, body: UpdateMovieGroup) {
  return await request({
    url: `movie-group/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeMovieGroup(id: string, status: string): Promise<ChangeMovieGroup> {
  return await request({
    url: `movie-group/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
