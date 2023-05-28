import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormTextSubName: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="subName"
      label={intl.formatMessage({ id: 'pages.subName', defaultMessage: 'Tên khác' })}
      placeholder={intl.formatMessage({
        id: 'pages.subName.placeholder',
        defaultMessage: 'Nhập tên khác',
      })}
      {...props}
    />
  );
};

export default ProFormTextSubName;
