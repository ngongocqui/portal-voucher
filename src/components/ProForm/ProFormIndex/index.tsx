import React from 'react';
import { ProFormDigit } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';
import { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit';

const ProFormIndex: React.FC<ProFormDigitProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormDigit
      name="index"
      label={intl.formatMessage({ id: 'pages.index', defaultMessage: 'Vị trí' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.index.required',
            defaultMessage: 'Vị trí là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.index.placeholder',
        defaultMessage: 'Nhập vị trí',
      })}
      {...props}
    />
  );
};

export default ProFormIndex;
