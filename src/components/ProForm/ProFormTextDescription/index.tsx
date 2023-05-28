import React from 'react';
import { ProFormTextArea } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormTextDescription: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormTextArea
      name="description"
      label={intl.formatMessage({ id: 'pages.description', defaultMessage: 'Mô tả' })}
      placeholder={intl.formatMessage({
        id: 'pages.description.placeholder',
        defaultMessage: 'Nhập mô tả',
      })}
      {...props}
    />
  );
};

export default ProFormTextDescription;
