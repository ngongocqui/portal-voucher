// @ts-ignore
import { Reducer } from 'umi';
import { ErrorMovieItem } from '@/pages/MovieData/ErrorMovie/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface ErrorMovieModalState {
  ErrorMovieList?: {
    reload?: () => void;
  };
  ErrorMovieForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: ErrorMovieItem;
  };
}

export interface ErrorMovieModelType {
  namespace: string;
  state: ErrorMovieModalState;
  reducers: {
    updateErrorMovieForm: Reducer<ErrorMovieModalState>;
    updateErrorMovieList: Reducer<ErrorMovieModalState>;
  };
}

const ErrorMovieModel: ErrorMovieModelType = {
  namespace: 'errorMovie',
  state: {
    ErrorMovieList: {
      reload: undefined,
    },
    ErrorMovieForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateErrorMovieForm(state, action) {
      const ErrorMovieForm = state?.ErrorMovieForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ErrorMovieForm[k] = fields[k];
      });
      return { ...state, ErrorMovieForm };
    },
    updateErrorMovieList(state, action) {
      const ErrorMovieList = state?.ErrorMovieList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ErrorMovieList[k] = fields[k];
      });
      return { ...state, ErrorMovieList };
    },
  },
};

export default ErrorMovieModel;
