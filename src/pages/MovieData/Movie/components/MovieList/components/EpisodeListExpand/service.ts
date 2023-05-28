import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  CreateEpisodeExpand,
  QueryEpisodeExpand,
  UpdateEpisodeExpand,
} from '@/pages/MovieData/Movie/components/MovieList/components/EpisodeListExpand/data';

const keyword_params = '';
const join_params = {
  movie: [{ key: 'movie.id', condition: '$eq' }],
};

export async function queryEpisodeExpand(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryEpisodeExpand> {
  const res = await request({
    url: 'episodes',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'movie' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createEpisodeExpand(body: CreateEpisodeExpand) {
  return await request({
    url: `episodes`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateEpisodeExpand(id: string, body: UpdateEpisodeExpand) {
  return await request({
    url: `episodes/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function deleteEpisodeExpand(id: string) {
  return await request({
    url: `episodes/${id}`,
    method: 'DELETE',
  });
}
