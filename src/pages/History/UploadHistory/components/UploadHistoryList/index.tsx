import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getTypeUpload, PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
// @ts-ignore
import { useIntl } from 'umi';
import { queryUploadHistory } from '@/pages/History/UploadHistory/service';
import { UploadHistoryItem } from '@/pages/History/UploadHistory/data';

const UploadHistoryList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<UploadHistoryItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.History.UploadHistory.UploadHistoryList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo url.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.History.UploadHistory.UploadHistoryList.placeholder',
          defaultMessage: 'Nhập url.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.url', defaultMessage: 'Url' }),
      dataIndex: 'url',
      width: 150,
      ellipsis: true,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' }),
      dataIndex: 'type',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
      },
      width: 120,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: getTypeUpload(),
    },
    {
      title: intl.formatMessage({ id: 'pages.creator', defaultMessage: 'Người tạo' }),
      dataIndex: ['creator', 'name'],
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.createdAt', defaultMessage: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.updatedAt', defaultMessage: 'Ngày cập nhật' }),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<UploadHistoryItem>
          headerTitle={intl.formatMessage({
            id: 'pages.History.UploadHistory.UploadHistoryList.headerTitle',
            defaultMessage: 'Danh sách upload',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryUploadHistory(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default UploadHistoryList;
