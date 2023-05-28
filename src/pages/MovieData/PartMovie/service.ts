import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangePartMovie,
  CreatePartMovie,
  PartMovieItem,
  QueryPartMovie,
  UpdatePartMovie,
} from '@/pages/MovieData/PartMovie/data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryPartMovie(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryPartMovie> {
  const res = await request({
    url: 'part-movie',
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

export async function getAllPartMovie(params: any, sort: any = {}): Promise<PartMovieItem[]> {
  return await request({
    url: 'part-movie',
    method: 'GET',
    joins: joinConverter({ ...params }),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createPartMovie(body: CreatePartMovie) {
  return await request({
    url: `part-movie`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updatePartMovie(id: string, body: UpdatePartMovie) {
  return await request({
    url: `part-movie/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changePartMovie(id: string, status: string): Promise<ChangePartMovie> {
  return await request({
    url: `part-movie/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
