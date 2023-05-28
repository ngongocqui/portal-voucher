import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  CategoryChildItem,
  CreateCategoryChild,
  QueryCategoryChild,
  UpdateCategoryChild,
} from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/data';

const keyword_params = 'code,name';
const join_params = {
  parent: [{ key: 'parent.id', condition: '$eq' }],
};

export async function queryCategoryChild(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCategoryChild> {
  const res = await request({
    url: 'categories',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'parent' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllCategoryChild(
  params: any,
  sort: any = {},
): Promise<CategoryChildItem[]> {
  return await request({
    url: 'categories',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createCategoryChild(body: CreateCategoryChild) {
  return await request({
    url: `categories`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCategoryChild(id: string, body: UpdateCategoryChild) {
  return await request({
    url: `categories/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function deleteCategoryChild(id: string) {
  return await request({
    url: `categories/${id}`,
    method: 'DELETE',
  });
}
