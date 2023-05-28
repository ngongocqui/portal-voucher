import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { AutoUploadItem, QueryAutoUpload } from '@/pages/System/AutoUpload/data';

const keyword_params = 'link,name';
const join_params = {};
const join_params_get_all = {};

export async function queryAutoUpload(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryAutoUpload> {
  const res = await request({
    url: 'auto-upload',
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

export async function getAllAutoUpload(params: any, sort: any = {}): Promise<AutoUploadItem[]> {
  return await request({
    url: 'auto-upload',
    method: 'GET',
    joins: joinConverter({ ...params }, join_params_get_all),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function deleteAutoUpload(id: string) {
  return await request({
    url: `auto-upload/${id}`,
    method: 'DELETE',
  });
}
