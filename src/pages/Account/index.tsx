import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'antd';
import styles from '@/pages/Account/styles.less';
import BaseView from '@/pages/Account/components/BaseView';
import SecurityView from '@/pages/Account/components/SecurityView';
// @ts-ignore
import { useIntl } from 'umi';

type AccountStateKeys = 'base' | 'security';

const Account: React.FC = () => {
  const intl = useIntl();
  const mainRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<any>('inline');
  const [selectKey, setSelectKey] = useState('base');
  const [menuMap] = useState({
    base: intl.formatMessage({ id: 'pages.account.base', defaultMessage: 'Thông tin cơ bản' }),
    security: intl.formatMessage({
      id: 'pages.account.security',
      defaultMessage: 'Cài đặt bảo mật',
    }),
  });

  const resize = () => {
    if (!mainRef) {
      return;
    }

    requestAnimationFrame(() => {
      if (!mainRef.current) {
        return;
      }

      let modeCustom: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = mainRef.current;

      if (mainRef.current.offsetWidth < 641 && offsetWidth > 400) {
        modeCustom = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        modeCustom = 'horizontal';
      }

      setMode(modeCustom);
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>);
  };

  const getRightTitle = () => {
    return menuMap[selectKey];
  };

  const renderChildren = () => {
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      default:
        return null;
        break;
    }
  };

  return (
    <div className={styles.main} ref={mainRef}>
      <div className={styles.leftMenu}>
        <Menu
          mode={mode}
          selectedKeys={[selectKey]}
          onClick={({ key }) => setSelectKey(key as AccountStateKeys)}
        >
          {getMenu()}
        </Menu>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{getRightTitle()}</div>
        {renderChildren()}
      </div>
    </div>
  );
};

export default Account;
