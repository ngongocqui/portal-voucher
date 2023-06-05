import React from 'react';
import { Switch } from 'antd';
import { CampaignItem } from '@/pages/Campaign/data';
import { changeStatusCampaign } from '@/pages/Campaign/service';
// @ts-ignore
import { useSelector } from 'umi';
import { CampaignModalState } from '@/pages/Campaign/model';

interface ChangeStatusCampaignProps {
  status: string;
  record: CampaignItem;
}

const ChangeStatusCampaign: React.FC<ChangeStatusCampaignProps> = ({ status, record }) => {
  const campaign: CampaignModalState = useSelector((state: any) => state?.campaign);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCampaign(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) campaign.CampaignList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusCampaign;
