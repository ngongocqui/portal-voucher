import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';
import { ColProps } from 'antd';

interface ProFormTextValueProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormTextValue: React.FC<ProFormTextValueProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="value"
      label={intl.formatMessage({ id: 'pages.value', defaultMessage: 'Value' })}
      placeholder={intl.formatMessage({
        id: 'pages.value.placeholder',
        defaultMessage: 'Nhập giá trị',
      })}
      {...props}
    />
  );
};

export default ProFormTextValue;
