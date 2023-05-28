import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { QueryUploadHistory } from '@/pages/History/UploadHistory/data';

const keyword_params = 'url';
const join_params = {
  type: [{ key: 'type', condition: '$in' }],
};

export async function queryUploadHistory(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryUploadHistory> {
  const res = await request({
    url: 'upload-history',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'creator' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}
