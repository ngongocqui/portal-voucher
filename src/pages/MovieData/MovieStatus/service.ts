import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeMovieStatus,
  CreateMovieStatus,
  MovieStatusItem,
  QueryMovieStatus,
  UpdateMovieStatus,
} from '@/pages/MovieData/MovieStatus/data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryMovieStatus(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryMovieStatus> {
  const res = await request({
    url: 'movie-status',
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

export async function getAllMovieStatus(params: any, sort: any = {}): Promise<MovieStatusItem[]> {
  return await request({
    url: 'movie-status',
    method: 'GET',
    joins: joinConverter({ ...params }),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createMovieStatus(body: CreateMovieStatus) {
  return await request({
    url: `movie-status`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateMovieStatus(id: string, body: UpdateMovieStatus) {
  return await request({
    url: `movie-status/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeMovieStatus(id: string, status: string): Promise<ChangeMovieStatus> {
  return await request({
    url: `movie-status/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
