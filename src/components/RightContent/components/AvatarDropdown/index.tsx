import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { FormattedMessage, history, useModel } from 'umi';
import { stringify } from 'querystring';
import styles from '@/components/RightContent/index.less';
import { removeToken } from '@/utils/utils';
import LoadingAvatar from '@/components/RightContent/components/AvatarDropdown/components/LoadingAvatar';
import HeaderDropdown from '@/components/HeaderDropdown';
import Access from '@/components/Access';

const loginOut = () => {
  removeToken();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const access = Access();

  const onMenuClick = (event: { key: React.Key }) => {
    const { key } = event;
    if (key === 'logout' && initialState) {
      setInitialState({ ...initialState, currentUser: undefined });
      loginOut();
      return;
    }
    history.push(`/${key}`);
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item className={`${access.classNamePath(['READ'], '/account')}`} key="account">
        <UserOutlined />
        <FormattedMessage id="pages.account" defaultMessage="Thông tin cá nhân" />
      </Menu.Item>
      <Menu.Item className={`${access.classNamePath(['READ'], '/settings')}`} key="settings">
        <SettingOutlined />
        <FormattedMessage id="pages.settings" defaultMessage="Cài đặt" />
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        <FormattedMessage id="pages.logout" defaultMessage="Đăng xuất" />
      </Menu.Item>
    </Menu>
  );

  if (!initialState?.currentUser || !initialState?.currentUser?.name) return <LoadingAvatar />;
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={initialState?.currentUser?.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{initialState?.currentUser?.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
