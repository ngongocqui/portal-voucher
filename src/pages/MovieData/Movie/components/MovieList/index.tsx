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
import { EyeOutlined, EditTwoTone, CopyTwoTone } from '@ant-design/icons';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { FormInstance, Image, Space, Tag, Tooltip } from 'antd';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import { queryMovies } from '@/pages/MovieData/Movie/service';
import { MovieItem } from '@/pages/MovieData/Movie/data';
import ChangeStatusMovie from '@/pages/MovieData/Movie/components/MovieList/components/ChangeStatusMovie';
import CreateMovie from '@/pages/MovieData/Movie/components/MovieList/components/ToolBar/CreateMovie';
import { SelectCategory } from '@/components/ProForm';
import EpisodeListExpand from '@/pages/MovieData/Movie/components/MovieList/components/EpisodeListExpand';
import Access from '@/components/Access';

const MovieList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const formTable = useRef<FormInstance>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'movie/updateMovieList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<MovieItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.MovieData.Movie.MovieList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên, tên khác.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.MovieData.Movie.MovieList.placeholder',
          defaultMessage: 'Nhập mã, tên, tên khác.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'picture',
      width: 120,
      search: false,
      render: (_, record: MovieItem) => {
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
              src={record?.picture || ''}
              fallback={FALLBACK_STRING}
            />
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.background', defaultMessage: 'Ảnh nền' }),
      dataIndex: 'background',
      width: 120,
      search: false,
      render: (_, record: MovieItem) => {
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
      title: intl.formatMessage({ id: 'pages.subName', defaultMessage: 'Tên khác' }),
      dataIndex: 'subName',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.group', defaultMessage: 'Nhóm' }),
      dataIndex: ['group', 'name'],
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.fansub', defaultMessage: 'Fansub' }),
      dataIndex: ['fansub', 'name'],
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.part', defaultMessage: 'Phần' }),
      dataIndex: ['part', 'name'],
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.category', defaultMessage: 'Thể loại' }),
      dataIndex: 'categories',
      width: 150,
      ellipsis: true,
      renderFormItem: () => <SelectCategory noStyle rules={[]} />,
      render: (_, record: MovieItem) => {
        return (
          <Space>
            {record.categories?.map((it) => (
              <Tag key={it.id} color={it.color}>
                {it.name}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.movie.status', defaultMessage: 'Trạng thái phim' }),
      dataIndex: ['movie_status', 'name'],
      width: 150,
      search: false,
      ellipsis: true,
      renderText: (_, record) =>
        record?.movie_status?.code && (
          <Tag color={record?.movie_status?.color}>{record?.movie_status?.name}</Tag>
        ),
    },
    {
      title: intl.formatMessage({ id: 'pages.movie.total_episodes', defaultMessage: 'Tập phim' }),
      dataIndex: 'total_episodes',
      width: 150,
      search: false,
      ellipsis: true,
      renderText: (_, record) => `${record?.episodes_count || 0}/${record?.total_episodes || 0}`,
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
      renderText: (dom, record: MovieItem) => {
        return <ChangeStatusMovie status={dom} record={record} />;
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
          key="update-movie"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'movie/updateMovieForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-movie"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'movie/updateMovieForm',
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

  // @ts-ignore
  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<MovieItem>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Movie.MovieList.headerTitle',
            defaultMessage: 'Danh sách phim',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          sticky
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryMovies(params, sort, filter);
          }}
          toolBarRender={() => [<CreateMovie key="create-movie" />]}
          columns={columns}
          scroll={scrollTable}
          expandable={{
            expandedRowRender: (record) => <EpisodeListExpand data={record} />,
            rowExpandable: (record) => record?.id !== 'Not Expandable',
          }}
        />
      </LocaleProTable>
    </div>
  );
};

export default MovieList;
