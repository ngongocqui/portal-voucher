import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { QueryCategoryChildExpand } from '@/pages/MovieData/Category/components/CategoryList/components/CategoryChildListExpand/data';

const keyword_params = 'code,name';
const join_params = {
  parent: [{ key: 'parent.id', condition: '$eq' }],
};

export async function queryCategoryChildExpand(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCategoryChildExpand> {
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
