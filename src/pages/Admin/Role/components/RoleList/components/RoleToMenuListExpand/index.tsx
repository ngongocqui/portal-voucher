import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getTypeMenuEnum, PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { Tag, Space } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { typeMenuEnum } from '@/utils/utils.enum';
import { RoleItem } from '@/pages/Admin/Role/data';
import { RoleToMenuExpand } from '@/pages/Admin/Role/components/RoleList/components/RoleToMenuListExpand/data';
import { queryRoleToMenuExpand } from '@/pages/Admin/Role/components/RoleList/components/RoleToMenuListExpand/service';

interface RoleToMenuListExpandProps {
  data: RoleItem;
}

const RoleToMenuListExpand: React.FC<RoleToMenuListExpandProps> = ({ data }) => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<RoleToMenuExpand>[] = [
    {
      title: intl.formatMessage({ id: 'pages.menu', defaultMessage: 'Menu' }),
      dataIndex: ['menu', 'url'],
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.permission', defaultMessage: 'Permission' }),
      dataIndex: 'permission',
      width: 150,
      search: false,
      ellipsis: true,
      render: (_, record: RoleToMenuExpand) => {
        return (
          <Space>
            {record.permissions?.map((it) => (
              <Tag key={it.id} color={it.color}>
                {it.name}
              </Tag>
            ))}
          </Space>
        );
      },
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
      valueEnum: getTypeMenuEnum(),
      renderText: (_, record: RoleToMenuExpand) => {
        return (
          record?.type && (
            <Tag color={typeMenuEnum[record?.type]?.color}>{typeMenuEnum[record?.type]?.text}</Tag>
          )
        );
      },
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
    <div className="expand-body-style p-8">
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<RoleToMenuExpand>
          headerTitle={intl.formatMessage({
            id: 'pages.Admin.Menu.MenuList.headerTitle',
            defaultMessage: 'Danh sách Menu',
          })}
          type="table"
          search={false}
          actionRef={actionRef}
          rowKey="id"
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          params={{ role: data?.id }}
          request={async (params, sort, filter) => {
            return await queryRoleToMenuExpand(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default RoleToMenuListExpand;
