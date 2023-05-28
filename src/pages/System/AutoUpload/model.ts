// @ts-ignore
import { Reducer } from 'umi';

export interface AutoUploadModalState {
  AutoUploadList?: {
    reload?: () => void;
  };
}

export interface AutoUploadModelType {
  namespace: string;
  state: AutoUploadModalState;
  reducers: {
    updateAutoUploadList: Reducer<AutoUploadModalState>;
  };
}

const AutoUploadModel: AutoUploadModelType = {
  namespace: 'autoUpload',
  state: {
    AutoUploadList: {
      reload: undefined,
    },
  },

  reducers: {
    updateAutoUploadList(state, action) {
      const AutoUploadList = state?.AutoUploadList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        AutoUploadList[k] = fields[k];
      });
      return { ...state, AutoUploadList };
    },
  },
};

export default AutoUploadModel;
