import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { ChangeStatusVoucher, QueryVouchers } from '@/pages/Voucher/data';

const keyword_params = 'name';
const join_params = {
  created_by: [{ key: 'created_by.id', condition: '$eq' }],
};

export async function queryVouchers(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryVouchers> {
  const res = await request({
    url: 'vouchers',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'created_by' }, join_params),
    params: paramsConverter({ ...filter, ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function changeStatusVoucher(
  id: string,
  status: string,
): Promise<ChangeStatusVoucher> {
  return await request({
    url: `Vouchers/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
