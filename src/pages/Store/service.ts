import { paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeStatusStore,
  CreateStore,
  QueryStores,
  StoreItem,
  UpdateStore,
} from '@/pages/Store/data';

const keyword_params = 'name';
const join_params = {};

export async function queryStores(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryStores> {
  const res = await request({
    url: 'stores',
    method: 'GET',
    params: paramsConverter({ ...filter, ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllStores(params: any, sort: any = {}): Promise<StoreItem[]> {
  return await request({
    url: 'stores',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createStore(body: CreateStore) {
  return await request({
    url: `stores`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateStore(id: string, body: UpdateStore) {
  return await request({
    url: `stores/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusStore(id: string, status: string): Promise<ChangeStatusStore> {
  return await request({
    url: `stores/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
