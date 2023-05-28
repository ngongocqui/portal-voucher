import { Space } from 'antd';
import React from 'react';
// @ts-ignore
import { useModel, SelectLang } from 'umi';
import styles from './index.less';
import { getLocales } from '@/utils/utils';
import AvatarDropdown from '@/components/RightContent/components/AvatarDropdown';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <AvatarDropdown />
      <SelectLang className={styles.action} postLocalesData={() => getLocales()} />
    </Space>
  );
};
export default GlobalHeaderRight;
