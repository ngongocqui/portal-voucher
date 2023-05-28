import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
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
import { EditTwoTone, CopyTwoTone, DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Popconfirm } from 'antd';
// @ts-ignore
import { useDispatch, useIntl, useSelector } from 'umi';
import {
  deleteEpisode,
  queryEpisode,
} from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/service';
import { Episode } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';
import CreateEpisode from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/components/ToolBar/CreateEpisode';
import { MovieModalState } from '@/pages/MovieData/Movie/model';
import Access from '@/components/Access';
import CreateManyEpisode from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/components/ToolBar/CreateManyEpisode';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProUploadChunkVideo from '@/components/ProUploadChunkVideo';

const EpisodeList: React.FC = () => {
  const intl = useIntl();
  const movie: MovieModalState = useSelector((state: any) => state?.movie);
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'movie/updateEpisodeList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<Episode>[] = [
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
    {
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
      hideInTable: !access.accessible([TYPE_FORM.UPDATE, TYPE_FORM.COPY, TYPE_FORM.DELETE]),
      render: (_, record) => [
        <ProUploadChunkVideo
          key="upload-video"
          data={record}
          onSuccess={() => {
            actionRef.current?.reload?.();
          }}
        />,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE])}`}
          key="update-episode"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'movie/updateEpisodeForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-episode"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'movie/updateEpisodeForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.DELETE])}`}
          key="delete-episode"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteEpisode(record?.id);
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
        <ProTable<Episode>
          headerTitle={intl.formatMessage({
            id: 'pages.MovieData.Movie.EpisodeList.headerTitle',
            defaultMessage: 'Danh sách tập phim',
          })}
          type="table"
          search={false}
          actionRef={actionRef}
          rowKey="id"
          pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
          params={{ movie: movie.MovieForm?.itemEdit?.id }}
          request={async (params, sort, filter) => {
            return await queryEpisode(params, sort, filter);
          }}
          toolBarRender={() => [
            <CreateManyEpisode key="create-many-episode" />,
            <CreateEpisode key="create-episode" />,
          ]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default EpisodeList;
