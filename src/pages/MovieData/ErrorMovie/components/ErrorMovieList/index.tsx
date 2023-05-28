import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getDeleteTooltip,
  getPopupConfirmDelete,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Tag, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import Access from '@/components/Access';
import { ErrorMovieItem } from '@/pages/MovieData/ErrorMovie/data';
import { deleteErrorMovie, queryErrorMovie } from '@/pages/MovieData/ErrorMovie/service';
import { TYPE_FORM } from '@/utils/utils.enum';

const ErrorMovieList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'errorMovie/updateErrorMovieList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<ErrorMovieItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.MovieData.ErrorMovie.ErrorMovieList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã phim, tên phim, mã tập, tên tập.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.MovieData.ErrorMovie.ErrorMovieList.placeholder',
          defaultMessage: 'Nhập mã phim, tên phim, mã tập, tên tập.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.movie.code', defaultMessage: 'Mã phim' }),
      dataIndex: ['movie', 'code'],
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.movie.name', defaultMessage: 'Tên phim' }),
      dataIndex: ['movie', 'name'],
      width: 200,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.episodes.code', defaultMessage: 'Mã tập' }),
      dataIndex: ['episodes', 'code'],
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.episodes.name', defaultMessage: 'Tên tập' }),
      dataIndex: ['episodes', 'name'],
      width: 200,
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
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.DELETE]),
      render: (_, record) => [
        <Tooltip
          key="delete-error-movie"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
          className={`${access.className([TYPE_FORM.DELETE])}`}
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteErrorMovie(record?.id);
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
        <ProTable<ErrorMovieItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.ErrorMovie.ErrorMovieList.headerTitle',
            defaultMessage: 'Danh sách phim lỗi',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryErrorMovie(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default ErrorMovieList;
