import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';
import { getAllSettings } from '@/components/ProForm/ProFormSelectSetting/service';

const ProFormSelectSetting: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="setting"
      label={intl.formatMessage({ id: 'pages.setting', defaultMessage: 'Cài đặt' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.setting.required',
            defaultMessage: 'Cài đặt là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllSettings({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
          code: 'TOKEN_FB',
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: `${it.name} - ${it.appId}` }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.setting.placeholder',
          defaultMessage: 'Chọn cài đặt.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectSetting;
