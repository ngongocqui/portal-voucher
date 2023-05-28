// @ts-ignore
import { Reducer } from 'umi';
import { MovieStatusItem } from '@/pages/MovieData/MovieStatus/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface MovieStatusModalState {
  MovieStatusList?: {
    reload?: () => void;
  };
  MovieStatusForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: MovieStatusItem;
  };
}

export interface MovieStatusModelType {
  namespace: string;
  state: MovieStatusModalState;
  reducers: {
    updateMovieStatusForm: Reducer<MovieStatusModalState>;
    updateMovieStatusList: Reducer<MovieStatusModalState>;
  };
}

const MovieStatusModel: MovieStatusModelType = {
  namespace: 'movieStatus',
  state: {
    MovieStatusList: {
      reload: undefined,
    },
    MovieStatusForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateMovieStatusForm(state, action) {
      const MovieStatusForm = state?.MovieStatusForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieStatusForm[k] = fields[k];
      });
      return { ...state, MovieStatusForm };
    },
    updateMovieStatusList(state, action) {
      const MovieStatusList = state?.MovieStatusList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieStatusList[k] = fields[k];
      });
      return { ...state, MovieStatusList };
    },
  },
};

export default MovieStatusModel;
