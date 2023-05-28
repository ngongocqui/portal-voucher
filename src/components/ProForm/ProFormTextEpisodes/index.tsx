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

const ProFormTextEpisodes: React.FC<ProFormTextValueProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="total_episodes"
      label={intl.formatMessage({ id: 'pages.movie.total_episodes', defaultMessage: 'Số tập' })}
      placeholder={intl.formatMessage({
        id: 'pages.movie.total_episodes.placeholder',
        defaultMessage: 'Nhập số tập',
      })}
      {...props}
    />
  );
};

export default ProFormTextEpisodes;
