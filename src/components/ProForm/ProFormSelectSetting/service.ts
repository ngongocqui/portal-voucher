import { SettingItem } from '@/components/ProForm/ProFormSelectSetting/data';
import request from '@/utils/request';
import { joinConverter, paramsConverter, sortConverter } from '@/utils/utils';

const keyword_params = 'name';
const join_params = {};

export async function getAllSettings(params: any, sort: any = {}): Promise<SettingItem[]> {
  return await request({
    url: 'settings',
    method: 'GET',
    joins: joinConverter({ ...params }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}
