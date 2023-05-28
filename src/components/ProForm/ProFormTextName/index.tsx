import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';
import { ColProps } from 'antd';

interface ProFormTextNameProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormTextName: React.FC<ProFormTextNameProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="name"
      label={intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.name.required',
            defaultMessage: 'Tên là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({ id: 'pages.name.placeholder', defaultMessage: 'Nhập tên' })}
      {...props}
    />
  );
};

export default ProFormTextName;
