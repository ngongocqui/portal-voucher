import { paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeStatusCampaign,
  CreateCampaign,
  QueryCampaigns,
  CampaignItem,
  UpdateCampaign,
} from '@/pages/Campaign/data';

const keyword_params = 'name';
const join_params = {};

export async function queryCampaigns(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCampaigns> {
  const res = await request({
    url: 'campaigns',
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

export async function getAllCampaigns(params: any, sort: any = {}): Promise<CampaignItem[]> {
  return await request({
    url: 'campaigns',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createCampaign(body: CreateCampaign) {
  return await request({
    url: `campaigns`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateCampaign(id: string, body: UpdateCampaign) {
  return await request({
    url: `campaigns/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusCampaign(
  id: string,
  status: string,
): Promise<ChangeStatusCampaign> {
  return await request({
    url: `campaigns/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
