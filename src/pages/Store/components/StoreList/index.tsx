import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  FALLBACK_STRING,
  getCopyTooltip,
  getStatusEnum,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EditTwoTone, CopyTwoTone, EyeOutlined } from '@ant-design/icons';
import { Image, Tag, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { queryStores } from '@/pages/Store/service';
import ChangeStatusStore from '@/pages/Store/components/StoreList/components/ChangeStatusStore';
import { StoreItem } from '@/pages/Store/data';
import CreateStore from '@/pages/Store/components/StoreList/components/ToolBar/CreateStore';
import styles from '@/utils/utils.less';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import Access from '@/components/Access';

const StoreList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'store/updateStoreList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<StoreItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Store.StoreList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Store.StoreList.placeholder',
          defaultMessage: 'Nhập tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: StoreItem) => {
        return (
          <a className={styles.avatar}>
            <Image
              placeholder={
                <Image height={SIZE_AVATAR.height} src="error" fallback={FALLBACK_STRING} />
              }
              preview={{
                mask: <EyeOutlined />,
              }}
              height={SIZE_AVATAR.height}
              width={SIZE_AVATAR.width}
              src={record?.avatar || ''}
              fallback={FALLBACK_STRING}
            />
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'title',
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
      renderText: (dom, record: StoreItem) => {
        return <ChangeStatusStore status={dom} record={record} />;
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
    {
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.UPDATE, TYPE_FORM.COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE])}`}
          key="update-store"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'store/updateStoreForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-store"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'store/updateStoreForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<StoreItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Store.StoreList.headerTitle',
            defaultMessage: 'Danh sách cửa hàng',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryStores(params, sort, filter);
          }}
          toolBarRender={() => [<CreateStore key="create-store" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default StoreList;
