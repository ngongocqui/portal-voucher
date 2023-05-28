import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { QueryComment } from '@/pages/MovieData/Comment/data';

const keyword_params = 'movie.code,movie.name';
const join_params = {
  parent: [{ key: 'parent.id', condition: '$isnull' }],
};

export async function queryComments(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryComment> {
  const res = await request({
    url: 'comments',
    method: 'GET',
    joins: joinConverter(
      { ...filter, ...params, join: 'movie,parent,sender,receiver' },
      join_params,
    ),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function deleteComments(id: string) {
  return await request({
    url: `comments/${id}`,
    method: 'DELETE',
  });
}
