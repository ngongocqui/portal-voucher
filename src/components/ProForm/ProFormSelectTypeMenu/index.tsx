import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { TYPE_MENU } from '@/utils/utils.enum';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormSelectTypeMenu: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="type"
      label={intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.type.required',
            defaultMessage: 'Loại là bắt buộc!',
          }),
        },
      ]}
      showSearch
      request={async () => {
        return TYPE_MENU?.map((it) => ({
          value: it.key,
          label: intl.formatMessage({ id: it.id, defaultMessage: it.text }),
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectTypeMenu;
