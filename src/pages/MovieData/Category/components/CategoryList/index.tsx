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
import { CategoryItem } from '@/pages/MovieData/Category/data';
import ChangeStatusCategory from '@/pages/MovieData/Category/components/CategoryList/components/ChangeStatusCategory';
import { queryCategory } from '@/pages/MovieData/Category/service';
import CreateCategory from '@/pages/MovieData/Category/components/CategoryList/components/ToolBar/CreateCategory';
import styles from '@/utils/utils.less';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import CategoryChildListExpand from '@/pages/MovieData/Category/components/CategoryList/components/CategoryChildListExpand';
import Access from '@/components/Access';

const CategoryList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'category/updateCategoryList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CategoryItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.MovieData.Category.CategoryList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.MovieData.Category.CategoryList.placeholder',
          defaultMessage: 'Nhập mã, tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: CategoryItem) => {
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
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Code' }),
      dataIndex: 'code',
      width: 120,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Name' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.description', defaultMessage: 'Mô tả' }),
      dataIndex: 'description',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.color', defaultMessage: 'Màu sắc' }),
      dataIndex: 'color',
      width: 150,
      renderText: (dom) => dom && <Tag color={dom}>{dom}</Tag>,
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
      renderText: (dom, record: CategoryItem) => {
        return <ChangeStatusCategory status={dom} record={record} />;
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
          key="update-category"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'category/updateCategoryForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-category"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'category/updateCategoryForm',
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
        <ProTable<CategoryItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Category.CategoryList.headerTitle',
            defaultMessage: 'Danh sách thể loại',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          params={{ parent: null }}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryCategory(params, sort, filter);
          }}
          toolBarRender={() => [<CreateCategory key="create-category" />]}
          columns={columns}
          scroll={scrollTable}
          expandable={{
            expandedRowRender: (record) => <CategoryChildListExpand data={record} />,
            rowExpandable: (record) => record?.id !== 'Not Expandable',
          }}
        />
      </LocaleProTable>
    </div>
  );
};

export default CategoryList;
