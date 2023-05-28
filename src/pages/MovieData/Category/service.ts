import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  CategoryItem,
  ChangeStatusCategory,
  CreateCategory,
  QueryCategory,
  UpdateCategory,
} from '@/pages/MovieData/Category/data';

const keyword_params = 'code,name';
const join_params = {
  parent: [{ key: 'parent.id', condition: '$isnull' }],
};

export async function queryCategory(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCategory> {
  const res = await request({
    url: 'categories',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'parent' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllCategory(params: any, sort: any = {}): Promise<CategoryItem[]> {
  return await request({
    url: 'categories',
    method: 'GET',
    joins: joinConverter({ ...params, join: 'parent' }, {}),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createCategory(body: CreateCategory) {
  return await request({
    url: `categories`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCategory(id: string, body: UpdateCategory) {
  return await request({
    url: `categories/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCategory(
  id: string,
  status: string,
): Promise<ChangeStatusCategory> {
  return await request({
    url: `categories/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
