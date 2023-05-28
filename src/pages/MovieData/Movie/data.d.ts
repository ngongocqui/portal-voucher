import { CategoryItem } from '@/pages/MovieData/Category/data';
import { MovieStatusItem } from '@/pages/MovieData/MovieStatus/data';
import { MovieGroupItem } from '@/pages/MovieData/MovieGroup/data';
import { PartMovieItem } from '@/pages/MovieData/PartMovie/data';
import { FansubItem } from '@/pages/MovieData/Fansub/data';

export interface MovieItem {
  code: string;
  name: string;
  subName: string;
  description: string;
  picture: string;
  background: string;
  createdAt: string;
  movie_status: MovieStatusItem;
  categories: CategoryItem[];
  group: MovieGroupItem;
  part: PartMovieItem;
  fansub: FansubItem;
  id: string;
  status: string;
  total_episodes: number;
  episodes_count: number;
  updatedAt: string;
}

interface CreateMovieCategories {
  id: string;
}

export interface CreateMovie {
  code: string;
  name: string;
  subName: string;
  description: string;
  picture: string;
  background: string;
  movie_status: string;
  total_episodes: number;
  categories: CreateMovieCategories[];
}

interface UpdateMovieCategories {
  id: string;
}

export interface UpdateMovie {
  code: string;
  name: string;
  subName: string;
  description: string;
  picture: string;
  background: string;
  movie_status: string;
  total_episodes: number;
  categories: UpdateMovieCategories[];
}

export interface QueryMovies {
  data: MovieItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusMovie {
  status: string;
  message: string;
}
