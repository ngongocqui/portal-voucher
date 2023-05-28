import React from 'react';
import { createIntl, IntlProvider } from '@ant-design/pro-table';
// @ts-ignore
import { getLocale } from 'umi';
import viVN from '@/locales/vi-VN/proTable';
import enUS from '@/locales/en-US/proTable';

interface LocaleProTableProps {
  localeVN?: any;
  localeEN?: any;
}

const LocaleProTable: React.FC<LocaleProTableProps> = ({ localeVN, localeEN, children }) => {
  const viVNIntl = createIntl('vi_VN', localeVN || viVN);
  const enUSIntl = createIntl('en-US', localeEN || enUS);

  const intlMap = {
    'vi-VN': viVNIntl,
    'en-US': enUSIntl,
  };

  return (
    <IntlProvider value={{ intl: intlMap[getLocale()], valueTypeMap: {} }}>{children}</IntlProvider>
  );
};

export default LocaleProTable;
