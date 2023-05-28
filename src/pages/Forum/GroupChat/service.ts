import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request2';
import {
  ChangeStatusGroupChat,
  CreateGroupChat,
  GroupChatItem,
  QueryGroupChats,
  UpdateGroupChat,
} from '@/pages/Forum/GroupChat/data';

const keyword_params = 'code,name';
const join_params = {};
const join_params_get_all = {};

export async function queryGroupChats(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryGroupChats> {
  const res = await request({
    url: 'group-chat',
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

export async function getAllGroupChats(params: any, sort: any = {}): Promise<GroupChatItem[]> {
  return await request({
    url: 'group-chat',
    method: 'GET',
    joins: joinConverter({ ...params, join: 'roles,roles.role' }, join_params_get_all),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createGroupChat(body: CreateGroupChat) {
  return await request({
    url: `group-chat`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateGroupChat(id: string, body: UpdateGroupChat) {
  return await request({
    url: `group-chat/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusGroupChat(
  id: string,
  status: string,
): Promise<ChangeStatusGroupChat> {
  return await request({
    url: `group-chat/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
