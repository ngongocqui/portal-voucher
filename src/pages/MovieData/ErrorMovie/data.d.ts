import { MovieItem } from '@/pages/MovieData/Movie/data';
import { Episode } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';

export interface ErrorMovieItem {
  createdAt: string;
  id: string;
  movie: MovieItem;
  episodes: Episode;
  updatedAt: string;
}

export interface QueryErrorMovie {
  data: ErrorMovieItem[];
  total: number;
  success: boolean;
}
