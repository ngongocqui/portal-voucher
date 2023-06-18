import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getStatusEnum, PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { queryVouchers } from '@/pages/Voucher/service';
import ChangeStatusVoucher from '@/pages/Voucher/components/VoucherList/components/ChangeStatusVoucher';
import { VoucherItem } from '@/pages/Voucher/data';
import { TYPE_FORM } from '@/utils/utils.enum';
import Access from '@/components/Access';

const VoucherList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'voucher/updateVoucherList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<VoucherItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.discount', defaultMessage: 'Giảm giá' }),
      dataIndex: 'discount',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.createdBy', defaultMessage: 'Người tạo' }),
      dataIndex: ['created_by', 'name'],
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
    {
      title: intl.formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom, record: VoucherItem) => {
        return <ChangeStatusVoucher status={dom} record={record} />;
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
      },
      valueType: 'select',
      valueEnum: getStatusEnum(),
      hideInTable: !access.accessible([TYPE_FORM.UPDATE_STATUS]),
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<VoucherItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Voucher.VoucherList.headerTitle',
            defaultMessage: 'Danh sách voucher',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryVouchers(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default VoucherList;
