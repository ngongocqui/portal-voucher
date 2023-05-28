import React from 'react';
import { ProFormTextArea } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormTextDescription: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormTextArea
      name="video"
      label={intl.formatMessage({ id: 'pages.hobby', defaultMessage: 'Sở thích' })}
      placeholder={intl.formatMessage({
        id: 'pages.hobby.placeholder',
        defaultMessage: 'Nhập sở thích',
      })}
      {...props}
    />
  );
};

export default ProFormTextDescription;
