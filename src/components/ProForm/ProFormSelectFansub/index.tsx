import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllFansub } from '@/pages/MovieData/Fansub/service';

const ProFormSelectFansub: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="fansub"
      label={intl.formatMessage({ id: 'pages.fansub', defaultMessage: 'Fansub' })}
      showSearch
      request={async (params) => {
        const res = await getAllFansub({
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
          id: 'pages.fansub.placeholder',
          defaultMessage: 'Chọn fansub.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectFansub;
