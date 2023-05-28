import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormTextEmail: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="email"
      label="Email"
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.email.required',
            defaultMessage: 'Email là bắt buộc!',
          }),
        },
        {
          type: 'email',
          message: intl.formatMessage({
            id: 'pages.email.invalid',
            defaultMessage: 'Email không hợp lệ!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.email.placeholder',
        defaultMessage: 'Nhập email',
      })}
      {...props}
    />
  );
};

export default ProFormTextEmail;
