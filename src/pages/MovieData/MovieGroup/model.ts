// @ts-ignore
import { Reducer } from 'umi';
import { MovieGroupItem } from '@/pages/MovieData/MovieGroup/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface MovieGroupModalState {
  MovieGroupList?: {
    reload?: () => void;
  };
  MovieGroupForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: MovieGroupItem;
  };
}

export interface MovieGroupModelType {
  namespace: string;
  state: MovieGroupModalState;
  reducers: {
    updateMovieGroupForm: Reducer<MovieGroupModalState>;
    updateMovieGroupList: Reducer<MovieGroupModalState>;
  };
}

const MovieGroupModel: MovieGroupModelType = {
  namespace: 'movieGroup',
  state: {
    MovieGroupList: {
      reload: undefined,
    },
    MovieGroupForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateMovieGroupForm(state, action) {
      const MovieGroupForm = state?.MovieGroupForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieGroupForm[k] = fields[k];
      });
      return { ...state, MovieGroupForm };
    },
    updateMovieGroupList(state, action) {
      const MovieGroupList = state?.MovieGroupList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieGroupList[k] = fields[k];
      });
      return { ...state, MovieGroupList };
    },
  },
};

export default MovieGroupModel;
