import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

interface ProFormFansubProps {
  name?: string;
}

const ProFormLinkFansub: React.FC<ProFormFansubProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="link"
      label={intl.formatMessage({ id: 'pages.link.fansub', defaultMessage: 'Link fansub' })}
      placeholder={intl.formatMessage({
        id: 'pages.link.fansub.placeholder',
        defaultMessage: 'Nhập link fansub',
      })}
      {...props}
    />
  );
};

export default ProFormLinkFansub;
