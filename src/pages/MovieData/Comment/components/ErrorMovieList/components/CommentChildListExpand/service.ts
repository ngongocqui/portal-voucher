import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import { QueryCommentChildExpand } from '@/pages/MovieData/Comment/components/ErrorMovieList/components/CommentChildListExpand/data';

const keyword_params = 'movie.code,movie.name';
const join_params = {
  parent: [{ key: 'parent.id', condition: '$eq' }],
};

export async function queryCommentChildExpand(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryCommentChildExpand> {
  const res = await request({
    url: 'comments',
    method: 'GET',
    joins: joinConverter(
      { ...filter, ...params, join: 'movie,parent,sender,receiver' },
      join_params,
    ),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}
