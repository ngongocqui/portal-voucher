import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { FALLBACK_STRING, PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EyeOutlined } from '@ant-design/icons';
import { Image, Tag } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { CategoryChildItem } from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/data';
import styles from '@/utils/utils.less';
import { SIZE_AVATAR } from '@/utils/utils.enum';
import { queryCategoryChildExpand } from '@/pages/MovieData/Category/components/CategoryList/components/CategoryChildListExpand/service';
import { CategoryItem } from '@/pages/MovieData/Category/data';

interface CategoryChildListExpandProps {
  data: CategoryItem;
}

const CategoryChildListExpand: React.FC<CategoryChildListExpandProps> = ({ data }) => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

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
  ];

  return (
    <div className="expand-body-style p-8">
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
          params={{ parent: data.id }}
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          request={async (params, sort, filter) => {
            return await queryCategoryChildExpand(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default CategoryChildListExpand;
