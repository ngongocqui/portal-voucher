import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { Tag } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { queryCommentChildExpand } from '@/pages/MovieData/Comment/components/ErrorMovieList/components/CommentChildListExpand/service';
import { CommentChildExpandItem } from '@/pages/MovieData/Comment/components/ErrorMovieList/components/CommentChildListExpand/data';

interface CommentChildListExpandProps {
  data: CommentChildExpandItem;
}

const CommentChildListExpand: React.FC<CommentChildListExpandProps> = ({ data }) => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<CommentChildExpandItem>[] = [
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
  ];

  return (
    <div className="expand-body-style p-8">
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<CommentChildExpandItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Comment.CommentChildList.headerTitle',
            defaultMessage: 'Danh sách bình luận con',
          })}
          search={false}
          type="table"
          actionRef={actionRef}
          rowKey="id"
          params={{ parent: data.id }}
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          request={async (params, sort, filter) => {
            return await queryCommentChildExpand(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default CommentChildListExpand;
