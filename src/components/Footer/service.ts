import request from '@/utils/request';
import { SystemItem } from '@/components/Footer/data';

export async function querySystem(): Promise<SystemItem> {
  const res = await request({
    url: 'system',
    method: 'GET',
  });
  return {
    freeMem: res?.freeMem || '0',
    totalMem: res?.totalMem || '0',
    freeDisk: res?.freeDisk || '0',
    totalDisk: res?.totalDisk || '0',
  };
}
