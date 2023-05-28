import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

interface ProFormTextLinkProps {
  name?: string;
  label?: string;
}

const ProFormTextLink: React.FC<ProFormTextLinkProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name={props.name || 'link'}
      label={intl.formatMessage({ id: 'pages.link', defaultMessage: 'Link' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.link.required',
            defaultMessage: 'Link là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.link.placeholder',
        defaultMessage: 'Nhập link',
      })}
      {...props}
    />
  );
};

export default ProFormTextLink;
