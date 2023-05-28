import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { validationPassWord } from '@/utils/utils';
import { FormattedMessage, useIntl } from 'umi';
import { ColProps } from 'antd';

interface ProFormTextPasswordProps {
  name?: string;
  label?: string;
  placeholder?: string;
  labelCol?: ColProps | undefined;
  wrapperCol?: ColProps | undefined;
}

const ProFormTextPassword: React.FC<ProFormTextPasswordProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText.Password
      name="password"
      label={intl.formatMessage({
        id: 'pages.password',
        defaultMessage: 'Mật khẩu',
      })}
      placeholder={intl.formatMessage({
        id: 'pages.login.password.placeholder',
        defaultMessage: 'Nhập mật khẩu',
      })}
      rules={[
        {
          required: true,
          message: (
            <FormattedMessage
              id="pages.login.password.required"
              defaultMessage="Bạn chưa nhập mật khẩu!"
            />
          ),
        },
        { validator: validationPassWord },
      ]}
      {...props}
    />
  );
};

export default ProFormTextPassword;
