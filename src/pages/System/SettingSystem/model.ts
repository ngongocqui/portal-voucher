// @ts-ignore
import { Reducer } from 'umi';
import { SettingSystemItem } from '@/pages/System/SettingSystem/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface SettingSystemModalState {
  SettingSystemList?: {
    reload?: () => void;
  };
  SettingSystemForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: SettingSystemItem;
  };
}

export interface SettingSystemModelType {
  namespace: string;
  state: SettingSystemModalState;
  reducers: {
    updateSettingSystemForm: Reducer<SettingSystemModalState>;
    updateSettingSystemList: Reducer<SettingSystemModalState>;
  };
}

const SettingSystemModel: SettingSystemModelType = {
  namespace: 'settingSystem',
  state: {
    SettingSystemList: {
      reload: undefined,
    },
    SettingSystemForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateSettingSystemForm(state, action) {
      const SettingSystemForm = state?.SettingSystemForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        SettingSystemForm[k] = fields[k];
      });
      return { ...state, SettingSystemForm };
    },
    updateSettingSystemList(state, action) {
      const SettingSystemList = state?.SettingSystemList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        SettingSystemList[k] = fields[k];
      });
      return { ...state, SettingSystemList };
    },
  },
};

export default SettingSystemModel;
