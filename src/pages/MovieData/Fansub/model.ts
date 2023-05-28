// @ts-ignore
import { Reducer } from 'umi';
import { FansubItem } from '@/pages/MovieData/Fansub/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface FansubModalState {
  FansubList?: {
    reload?: () => void;
  };
  FansubForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: FansubItem;
  };
}

export interface FansubModelType {
  namespace: string;
  state: FansubModalState;
  reducers: {
    updateFansubForm: Reducer<FansubModalState>;
    updateFansubList: Reducer<FansubModalState>;
  };
}

const FansubModel: FansubModelType = {
  namespace: 'fansub',
  state: {
    FansubList: {
      reload: undefined,
    },
    FansubForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateFansubForm(state, action) {
      const FansubForm = state?.FansubForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        FansubForm[k] = fields[k];
      });
      return { ...state, FansubForm };
    },
    updateFansubList(state, action) {
      const FansubList = state?.FansubList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        FansubList[k] = fields[k];
      });
      return { ...state, FansubList };
    },
  },
};

export default FansubModel;
