// @ts-ignore
import { Reducer } from 'umi';
import { MovieItem } from '@/pages/MovieData/Movie/data';
import { Episode } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface MovieModalState {
  MovieList?: {
    reload?: () => void;
  };
  MovieForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: MovieItem;
  };
  EpisodeList?: {
    reload?: () => void;
  };
  EpisodeForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: Episode;
  };
}

export interface MovieModelType {
  namespace: string;
  state: MovieModalState;
  reducers: {
    updateMovieForm: Reducer<MovieModalState>;
    updateMovieList: Reducer<MovieModalState>;
    updateEpisodeForm: Reducer<MovieModalState>;
    updateEpisodeList: Reducer<MovieModalState>;
  };
}

const MovieModel: MovieModelType = {
  namespace: 'movie',
  state: {
    MovieList: {
      reload: undefined,
    },
    MovieForm: {
      type: undefined,
      itemEdit: undefined,
    },
    EpisodeList: {
      reload: undefined,
    },
    EpisodeForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateMovieForm(state, action) {
      const MovieForm = state?.MovieForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieForm[k] = fields[k];
      });
      return { ...state, MovieForm };
    },
    updateMovieList(state, action) {
      const MovieList = state?.MovieList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MovieList[k] = fields[k];
      });
      return { ...state, MovieList };
    },
    updateEpisodeForm(state, action) {
      const EpisodeForm = state?.EpisodeForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        EpisodeForm[k] = fields[k];
      });
      return { ...state, EpisodeForm };
    },
    updateEpisodeList(state, action) {
      const EpisodeList = state?.EpisodeList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        EpisodeList[k] = fields[k];
      });
      return { ...state, EpisodeList };
    },
  },
};

export default MovieModel;
