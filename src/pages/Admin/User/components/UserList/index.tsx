import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  FALLBACK_STRING,
  getCopyTooltip,
  getGenderEnum,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  phoneFormatter,
  scrollTable,
} from '@/utils/utils';
import { queryUsers } from '@/pages/Admin/User/service';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EyeOutlined, EditTwoTone, CopyTwoTone, LockOutlined } from '@ant-design/icons';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import ChangeStatusUser from '@/pages/Admin/User/components/UserList/components/ChangeStatusUser';
import { UserItem } from '@/pages/Admin/User/data';
import { Tag, Image, Tooltip } from 'antd';
import { SelectRole } from '@/components/ProForm';
import CreateUser from '@/pages/Admin/User/components/UserList/components/ToolBar/CreateUser';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import Access from '@/components/Access';

const UserList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'user/updateUserList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<UserItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.User.UserList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, email, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.User.UserList.placeholder',
          defaultMessage: 'Nhập mã, tên, email, số điện thoại.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: UserItem) => {
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
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.phone', defaultMessage: 'Số điện thoại' }),
      dataIndex: 'phone',
      width: 130,
      renderText: (dom) => phoneFormatter(dom),
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.gender', defaultMessage: 'Giới tính' }),
      dataIndex: 'gender',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.gender.placeholder',
          defaultMessage: 'Chọn giới tính.',
        }),
      },
      width: 120,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: getGenderEnum(),
    },
    {
      title: intl.formatMessage({ id: 'pages.role', defaultMessage: 'Role' }),
      dataIndex: 'role.name',
      renderFormItem: () => <SelectRole noStyle rules={[]} />,
      width: 150,
      renderText: (_, record: UserItem) => {
        return record?.role?.id && <Tag color={record?.role?.color}>{record?.role?.name}</Tag>;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.email', defaultMessage: 'Email' }),
      dataIndex: 'email',
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
      renderText: (dom, record: UserItem) => {
        return <ChangeStatusUser status={dom} record={record} />;
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
          key="update-user"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'user/updateUserForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-user"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'user/updateUserForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-user"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'user/updateUserForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE_PASSWORD },
              });
            }}
          >
            <LockOutlined style={{ fontSize: '16px', color: 'red' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<UserItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Admin.User.UserList.headerTitle',
            defaultMessage: 'Danh sách người dùng',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryUsers(params, sort, filter);
          }}
          toolBarRender={() => [<CreateUser key="create-user" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default UserList;
