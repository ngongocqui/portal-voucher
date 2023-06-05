// @ts-ignore
import { Reducer } from 'umi';
import { CampaignItem } from '@/pages/Campaign/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface CampaignModalState {
  CampaignList?: {
    reload?: () => void;
  };
  CampaignForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CampaignItem;
  };
}

export interface CampaignModelType {
  namespace: string;
  state: CampaignModalState;
  reducers: {
    updateCampaignForm: Reducer<CampaignModalState>;
    updateCampaignList: Reducer<CampaignModalState>;
  };
}

const CampaignModel: CampaignModelType = {
  namespace: 'campaign',
  state: {
    CampaignList: {
      reload: undefined,
    },
    CampaignForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCampaignForm(state, action) {
      const CampaignForm = state?.CampaignForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CampaignForm[k] = fields[k];
      });
      return { ...state, CampaignForm };
    },
    updateCampaignList(state, action) {
      const CampaignList = state?.CampaignList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CampaignList[k] = fields[k];
      });
      return { ...state, CampaignList };
    },
  },
};

export default CampaignModel;
