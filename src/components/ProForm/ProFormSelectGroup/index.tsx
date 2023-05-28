import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllMovieGroup } from '@/pages/MovieData/MovieGroup/service';

const ProFormSelectGroup: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="group"
      label={intl.formatMessage({ id: 'pages.group', defaultMessage: 'Nhóm' })}
      showSearch
      request={async (params) => {
        const res = await getAllMovieGroup({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.data?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      params={{ ...props.params, current: 1, pageSize: 100 }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.group.placeholder',
          defaultMessage: 'Chọn nhóm.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectGroup;
