import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllCategory } from '@/pages/MovieData/Category/service';

const ProFormSelectCategory: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="categories"
      label={intl.formatMessage({ id: 'pages.category', defaultMessage: 'Thể loại' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.category.required',
            defaultMessage: 'Thể loại là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllCategory({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({
          value: `${it.id}`,
          label: `${it.parent?.name ? `${it.parent?.name} - ` : ''}${it.name}`,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.category.placeholder',
          defaultMessage: 'Chọn thể loại.',
        }),
        ...props.fieldProps,
      }}
      mode="multiple"
    />
  );
};

export default ProFormSelectCategory;
