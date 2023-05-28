// @ts-ignore
import { Reducer } from 'umi';
import { PartMovieItem } from '@/pages/MovieData/PartMovie/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface PartMovieModalState {
  PartMovieList?: {
    reload?: () => void;
  };
  PartMovieForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: PartMovieItem;
  };
}

export interface PartMovieModelType {
  namespace: string;
  state: PartMovieModalState;
  reducers: {
    updatePartMovieForm: Reducer<PartMovieModalState>;
    updatePartMovieList: Reducer<PartMovieModalState>;
  };
}

const PartMovieModel: PartMovieModelType = {
  namespace: 'partMovie',
  state: {
    PartMovieList: {
      reload: undefined,
    },
    PartMovieForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updatePartMovieForm(state, action) {
      const PartMovieForm = state?.PartMovieForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        PartMovieForm[k] = fields[k];
      });
      return { ...state, PartMovieForm };
    },
    updatePartMovieList(state, action) {
      const PartMovieList = state?.PartMovieList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        PartMovieList[k] = fields[k];
      });
      return { ...state, PartMovieList };
    },
  },
};

export default PartMovieModel;
