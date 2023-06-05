// @ts-ignore
import { Reducer } from 'umi';
import { StoreItem } from '@/pages/Store/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface StoreModalState {
  StoreList?: {
    reload?: () => void;
  };
  StoreForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: StoreItem;
  };
}

export interface StoreModelType {
  namespace: string;
  state: StoreModalState;
  reducers: {
    updateStoreForm: Reducer<StoreModalState>;
    updateStoreList: Reducer<StoreModalState>;
  };
}

const StoreModel: StoreModelType = {
  namespace: 'store',
  state: {
    StoreList: {
      reload: undefined,
    },
    StoreForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateStoreForm(state, action) {
      const StoreForm = state?.StoreForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        StoreForm[k] = fields[k];
      });
      return { ...state, StoreForm };
    },
    updateStoreList(state, action) {
      const StoreList = state?.StoreList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        StoreList[k] = fields[k];
      });
      return { ...state, StoreList };
    },
  },
};

export default StoreModel;
