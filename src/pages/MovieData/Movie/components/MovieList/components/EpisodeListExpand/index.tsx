import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PAGINATE_OPTIONS, scrollTable } from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
// @ts-ignore
import { useIntl } from 'umi';
import { EpisodeExpand } from '@/pages/MovieData/Movie/components/MovieList/components/EpisodeListExpand/data';
import { queryEpisodeExpand } from '@/pages/MovieData/Movie/components/MovieList/components/EpisodeListExpand/service';
import { MovieItem } from '@/pages/MovieData/Movie/data';

interface EpisodeListExpandProps {
  data: MovieItem;
}

const EpisodeListExpand: React.FC<EpisodeListExpandProps> = ({ data }) => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<EpisodeExpand>[] = [
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
      title: intl.formatMessage({ id: 'pages.index', defaultMessage: 'Vị trí' }),
      dataIndex: 'index',
      width: 150,
      search: false,
      ellipsis: true,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.link', defaultMessage: 'Link' }),
      dataIndex: 'link',
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
  ];

  return (
    <div className="expand-body-style p-8">
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<EpisodeExpand>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Movie.EpisodeList.headerTitle',
            defaultMessage: 'Danh sách tập phim',
          })}
          type="table"
          search={false}
          actionRef={actionRef}
          rowKey="id"
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          params={{ movie: data?.id }}
          request={async (params, sort, filter) => {
            return await queryEpisodeExpand(params, sort, filter);
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default EpisodeListExpand;
