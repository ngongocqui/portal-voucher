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
import { Image, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import Access from '@/components/Access';
import { GroupChatItem } from '@/pages/Forum/GroupChat/data';
import ChangeStatusGroupChat from '@/pages/Forum/GroupChat/components/GroupChatList/components/ChangeStatusGroupChat';
import { queryGroupChats } from '@/pages/Forum/GroupChat/service';
import CreateGroupChat from '@/pages/Forum/GroupChat/components/GroupChatList/components/ToolBar/CreateGroupChat';
import styles from '@/utils/utils.less';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';

const GroupChatList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'groupChat/updateGroupChatList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<GroupChatItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Forum.GroupChat.GroupChatList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Forum.GroupChat.GroupChatList.placeholder',
          defaultMessage: 'Nhập mã, tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.background', defaultMessage: 'Ảnh nền' }),
      dataIndex: 'background',
      width: 120,
      search: false,
      render: (_, record: GroupChatItem) => {
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
              src={record?.background || ''}
              fallback={FALLBACK_STRING}
            />
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 150,
      search: false,
      ellipsis: true,
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
      renderText: (dom, record: GroupChatItem) => {
        return <ChangeStatusGroupChat status={dom} record={record} />;
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
          key="update-group"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'groupChat/updateGroupChatForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-group"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'groupChat/updateGroupChatForm',
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
        <ProTable<GroupChatItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Forum.GroupChat.GroupChatList.headerTitle',
            defaultMessage: 'Danh sách nhóm',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryGroupChats(params, sort, filter);
          }}
          toolBarRender={() => [<CreateGroupChat key="create-group" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default GroupChatList;
