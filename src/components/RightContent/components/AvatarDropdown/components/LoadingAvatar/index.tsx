import React from 'react';
import styles from '@/components/RightContent/index.less';
import { Spin } from 'antd';

const LoadingAvatar: React.FC = () => {
  return (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    </span>
  );
};

export default LoadingAvatar;
