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
import { CommentItem } from '@/pages/MovieData/Comment/data';
import { deleteComments, queryComments } from '@/pages/MovieData/Comment/service';
import CommentChildListExpand from '@/pages/MovieData/Comment/components/ErrorMovieList/components/CommentChildListExpand';

const CommentList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'comment/updateCommentList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CommentItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.MovieData.Comment.CommentList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã phim, tên phim.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.MovieData.Comment.CommentList.placeholder',
          defaultMessage: 'Nhập mã phim, tên phim.',
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
      title: intl.formatMessage({ id: 'pages.sender', defaultMessage: 'Người gửi' }),
      dataIndex: ['sender', 'name'],
      width: 120,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.receiver', defaultMessage: 'Người nhận' }),
      dataIndex: ['receiver', 'name'],
      width: 200,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.message', defaultMessage: 'Tin nhắn' }),
      dataIndex: 'message',
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
          key="delete-comment"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
          className={`${access.className([TYPE_FORM.DELETE])}`}
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteComments(record?.id);
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
        <ProTable<CommentItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Comment.CommentList.headerTitle',
            defaultMessage: 'Danh sách bình luận',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryComments(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
          expandable={{
            expandedRowRender: (record) => <CommentChildListExpand data={record} />,
            rowExpandable: (record) => record?.id !== 'Not Expandable',
          }}
        />
      </LocaleProTable>
    </div>
  );
};

export default CommentList;
