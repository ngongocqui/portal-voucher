import { UserItem } from '@/pages/Admin/User/data';
import routes from '../config/routes';
import { RoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import lodash from 'lodash';
import { ActionType } from '@/utils/utils.enum';

const getAccessPaths = (): object => {
  const accessPaths = {};
  routes[0].routes?.forEach((value: any) => {
    if (value.access) {
      accessPaths[value.access] = false;
    }
    if (value.routes && Array.isArray(value.routes)) {
      value.routes.forEach((element: any) => {
        if (element.access) {
          accessPaths[element.access] = false;
        }
      });
    }
  });
  return accessPaths;
};

const getPermissions = (accessPaths: object, currentUser: UserItem | undefined) => {
  const permitData = lodash.clone(accessPaths);
  const menus = currentUser?.role?.menus;

  if (menus && Array.isArray(menus)) {
    menus.forEach((it: RoleToMenu) => {
      const permissions = it.permissions.map((value) => value.code);
      if (permitData.hasOwnProperty(it.menu.url) && permissions.includes(ActionType.READ.value)) {
        permitData[it.menu.url] = true;
        permitData[`${it.menu.url.replace(/\//g, '')}_permissions`] = (permitStr: string[]) => {
          return permitStr.some((r) => permissions.includes(r));
        };
      }
    });
  }

  permitData['/user/login'] = true;
  return permitData;
};

export default function access(initialState: { currentUser?: UserItem | undefined }) {
  const { currentUser } = initialState || {};
  const accessPaths = getAccessPaths();
  return getPermissions(accessPaths, currentUser);
}
