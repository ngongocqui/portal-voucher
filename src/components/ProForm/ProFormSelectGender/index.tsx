import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { GENDER } from '@/utils/utils.enum';
// @ts-ignore
import { useIntl } from 'umi';

const ProFormSelectGender: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="gender"
      label={intl.formatMessage({ id: 'pages.gender', defaultMessage: 'Giới tính' })}
      showSearch
      request={async () => {
        return GENDER?.map((it) => ({
          value: it.key,
          label: intl.formatMessage({ id: it.id, defaultMessage: it.text }),
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.gender.placeholder',
          defaultMessage: 'Chọn giới tính.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectGender;
