import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllMovieStatus } from '@/pages/MovieData/MovieStatus/service';

const ProFormSelectMovieStatus: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="movie_status"
      label={intl.formatMessage({ id: 'pages.movie.status', defaultMessage: 'Trạng thái phim' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.movie.status.required',
            defaultMessage: 'Trạng thái phim là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllMovieStatus({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({
          value: `${it.id}`,
          label: `${it.name}`,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.movie.status.placeholder',
          defaultMessage: 'Chọn trạng thái phim.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectMovieStatus;
