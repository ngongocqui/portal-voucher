import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  FALLBACK_STRING,
  getCopyTooltip,
  getDeleteTooltip,
  getPopupConfirmDelete,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EditTwoTone, CopyTwoTone, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Popconfirm, Tag, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl, useSelector } from 'umi';
import {
  deleteCategoryChild,
  queryCategoryChild,
} from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/service';
import CreateCategoryChild from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/components/ToolBar/CreateCategoryChild';
import { CategoryChildItem } from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/data';
import { CategoryModalState } from '@/pages/MovieData/Category/model';
import styles from '@/utils/utils.less';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import Access from '@/components/Access';

const CategoryChildList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const category: CategoryModalState = useSelector((state: any) => state?.category);
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'category/updateCategoryChildList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CategoryChildItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: CategoryChildItem) => {
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
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.UPDATE, TYPE_FORM.COPY, TYPE_FORM.DELETE]),
      render: (_, record) => [
        <Tooltip
          key="update-category-child"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
          className={`${access.className([TYPE_FORM.UPDATE])}`}
        >
          <a
            onClick={() => {
              dispatch({
                type: 'category/updateCategoryChildForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-category-child"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'category/updateCategoryChildForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          key="delete-category-child"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
          className={`${access.className([TYPE_FORM.DELETE])}`}
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteCategoryChild(record?.id);
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
        <ProTable<CategoryChildItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Category.CategoryChildList.headerTitle',
            defaultMessage: 'Danh sách thể loại con',
          })}
          search={false}
          type="table"
          actionRef={actionRef}
          rowKey="id"
          params={{ parent: category.CategoryForm?.itemEdit?.id }}
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          request={async (params, sort, filter) => {
            return await queryCategoryChild(params, sort, filter);
          }}
          toolBarRender={() => [<CreateCategoryChild key="create-category-child" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default CategoryChildList;
