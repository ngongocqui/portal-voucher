import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { statusEnum } from '@/utils/utils.enum';
// @ts-ignore
import { useIntl } from 'umi';
import { getAllMenus } from '@/pages/Admin/Menu/service';

const ProFormSelectMenu: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="menu"
      label={intl.formatMessage({ id: 'pages.menu', defaultMessage: 'Menu' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.menu.required',
            defaultMessage: 'Menu là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllMenus({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.url }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.menu.placeholder',
          defaultMessage: 'Chọn menu.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectMenu;
