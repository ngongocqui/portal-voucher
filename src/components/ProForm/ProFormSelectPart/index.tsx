import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllPartMovie } from '@/pages/MovieData/PartMovie/service';

const ProFormSelectPart: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="part"
      label={intl.formatMessage({ id: 'pages.part', defaultMessage: 'Phần' })}
      showSearch
      request={async (params) => {
        const res = await getAllPartMovie({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.part.placeholder',
          defaultMessage: 'Chọn phần.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectPart;
