import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getDeleteTooltip,
  getPopupConfirmDelete,
  getStatusAutoUploadEnum,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { deleteAutoUpload, queryAutoUpload } from '@/pages/System/AutoUpload/service';
import { AutoUploadItem } from '@/pages/System/AutoUpload/data';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Tag, Tooltip } from 'antd';
import Access from '@/components/Access';
import { TYPE_FORM } from '@/utils/utils.enum';

const AutoUploadList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'autoUpload/updateAutoUploadList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<AutoUploadItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.System.AutoUpload.AutoUploadList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo name, link.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.System.AutoUpload.AutoUploadList.placeholder',
          defaultMessage: 'Nhập name, link.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 250,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.link', defaultMessage: 'Link' }),
      dataIndex: 'link',
      width: 250,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.failed', defaultMessage: 'Đã lỗi' }),
      dataIndex: 'failed',
      width: 100,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom) => {
        return (
          dom && (
            <Tag color={getStatusAutoUploadEnum()[dom]?.color}>
              {getStatusAutoUploadEnum()[dom]?.text}
            </Tag>
          )
        );
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
      },
      valueType: 'select',
      valueEnum: getStatusAutoUploadEnum(),
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
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.DELETE]),
      render: (_, record) => [
        <Tooltip
          className={`${access.className([TYPE_FORM.DELETE])}`}
          key="delete-auto-movie"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteAutoUpload(record?.id);
              actionRef.current?.reload();
            }}
            okText={intl.formatMessage({ id: 'pages.OK', defaultMessage: 'Ok' })}
            cancelText={intl.formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
          >
            <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
          </Popconfirm>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<AutoUploadItem>
          headerTitle={intl.formatMessage({
            id: 'pages.System.AutoUpload.AutoUploadList.headerTitle',
            defaultMessage: 'Danh sách auto upload',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryAutoUpload(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default AutoUploadList;
