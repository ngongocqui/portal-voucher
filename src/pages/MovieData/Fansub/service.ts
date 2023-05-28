import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeFansub,
  CreateFansub,
  QueryFansub,
  UpdateFansub,
} from '@/pages/MovieData/Fansub/data';

const keyword_params = 'code,name';
const join_params = {};

export async function queryFansub(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryFansub> {
  const res = await request({
    url: 'fansubs',
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

export async function getAllFansub(params: any, sort: any = {}): Promise<QueryFansub> {
  return await request({
    url: 'fansubs',
    method: 'GET',
    joins: joinConverter({ ...params }),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createFansub(body: CreateFansub) {
  return await request({
    url: `fansubs`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateFansub(id: string, body: UpdateFansub) {
  return await request({
    url: `fansubs/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeFansub(id: string, status: string): Promise<ChangeFansub> {
  return await request({
    url: `fansubs/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
