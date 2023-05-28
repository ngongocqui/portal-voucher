import React, { useState } from 'react';
import { List } from 'antd';
import ChangePassword from '@/pages/Account/components/SecurityView/components/ChangePassword';
// @ts-ignore
import { useIntl } from 'umi';

const SecurityView: React.FC = () => {
  const intl = useIntl();
  const [isChangePassword, setIsChangePassword] = useState(false);

  const getData = () => [
    {
      title: intl.formatMessage({
        id: 'pages.password.change',
        defaultMessage: 'Thay đổi mật khẩu',
      }),
      description: `${intl.formatMessage({
        id: 'pages.current_password',
        defaultMessage: 'Mật khẩu hiện tại',
      })}：******`,
      actions: [
        <a key="change-password" onClick={() => setIsChangePassword(true)}>
          {intl.formatMessage({ id: 'pages.change', defaultMessage: 'Thay đổi' })}
        </a>,
      ],
    },
  ];

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ChangePassword modalVisible={isChangePassword} onCancel={() => setIsChangePassword(false)} />
    </div>
  );
};

export default SecurityView;
