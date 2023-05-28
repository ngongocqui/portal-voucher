import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
// @ts-ignore
import { history } from 'umi';
import { getProfile } from '@/pages/User/Login/services';
import { getToken, importLocale, removeToken } from '@/utils/utils';
import { UserItem } from '@/pages/Admin/User/data';

const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserItem;
  fetchUserInfo?: () => Promise<UserItem | undefined>;
}> {
  importLocale();

  const fetchUserInfo = async () => {
    if (!getToken()) return undefined;
    try {
      const currentUser = await getProfile();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo?.();
  if (!currentUser) {
    removeToken();
    history.push(loginPath);
    return { fetchUserInfo, currentUser: undefined, settings: {} };
  }

  if (history.location.pathname === '/user/login' && currentUser) history.push('/admin/users');
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  };
}
