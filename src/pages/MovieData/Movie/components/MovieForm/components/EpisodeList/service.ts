import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  CreateEpisode,
  CreateManyEpisode,
  QueryEpisode,
  UpdateEpisode,
} from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';

const keyword_params = '';
const join_params = {
  movie: [{ key: 'movie.id', condition: '$eq' }],
};

export async function queryEpisode(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryEpisode> {
  const res = await request({
    url: 'episodes',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'movie' }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ index: 'descend', ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createManyEpisode(body: CreateManyEpisode) {
  return await request({
    url: `episodes/bulk`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function createEpisode(body: CreateEpisode) {
  return await request({
    url: `episodes`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateEpisode(id: string, body: UpdateEpisode) {
  return await request({
    url: `episodes/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function deleteEpisode(id: string) {
  return await request({
    url: `episodes/${id}`,
    method: 'DELETE',
  });
}
