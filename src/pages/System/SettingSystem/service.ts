import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeStatusSettingSystem,
  CreateSettingSystem,
  QuerySettingSystems,
  SettingSystemItem,
  UpdateSettingSystem,
} from '@/pages/System/SettingSystem/data';

const keyword_params = 'code,key,name';
const join_params = {};
const join_params_get_all = {};

export async function querySettingSystems(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QuerySettingSystems> {
  const res = await request({
    url: 'settings',
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

export async function getAllSettingSystems(
  params: any,
  sort: any = {},
): Promise<SettingSystemItem[]> {
  return await request({
    url: 'settings',
    method: 'GET',
    joins: joinConverter({ ...params }, join_params_get_all),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createSettingSystem(body: CreateSettingSystem) {
  return await request({
    url: `settings`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateSettingSystem(id: string, body: UpdateSettingSystem) {
  return await request({
    url: `settings/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusSettingSystem(
  id: string,
  status: string,
): Promise<ChangeStatusSettingSystem> {
  return await request({
    url: `settings/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
