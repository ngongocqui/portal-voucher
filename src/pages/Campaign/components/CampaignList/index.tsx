import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getCopyTooltip,
  getStatusEnum,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EditTwoTone, CopyTwoTone } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { queryCampaigns } from '@/pages/Campaign/service';
import ChangeStatusCampaign from '@/pages/Campaign/components/CampaignList/components/ChangeStatusCampaign';
import { CampaignItem } from '@/pages/Campaign/data';
import CreateCampaign from '@/pages/Campaign/components/CampaignList/components/ToolBar/CreateCampaign';
import { TYPE_FORM } from '@/utils/utils.enum';
import Access from '@/components/Access';

const CampaignList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'campaign/updateCampaignList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CampaignItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Campaign.CampaignList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Campaign.CampaignList.placeholder',
          defaultMessage: 'Nhập tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'title',
      width: 150,
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
      renderText: (dom, record: CampaignItem) => {
        return <ChangeStatusCampaign status={dom} record={record} />;
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
          key="update-Campaign"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'campaign/updateCampaignForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-Campaign"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'campaign/updateCampaignForm',
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
        <ProTable<CampaignItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Campaign.CampaignList.headerTitle',
            defaultMessage: 'Danh sách cửa hàng',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryCampaigns(params, sort, filter);
          }}
          toolBarRender={() => [<CreateCampaign key="create-Campaign" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default CampaignList;
