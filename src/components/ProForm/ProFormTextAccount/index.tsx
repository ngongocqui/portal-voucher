import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormTextAccount: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="account"
      label="Account"
      placeholder={intl.formatMessage({
        id: 'pages.account.placeholder',
        defaultMessage: 'Nhập account',
      })}
      {...props}
    />
  );
};

export default ProFormTextAccount;
