export interface MovieGroupItem {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface CreateMovieGroup {
  code: string;
  name: string;
}

export interface UpdateMovieGroup {
  code: string;
  name: string;
}

export interface QueryMovieGroup {
  data: MovieGroupItem[];
  total: number;
  success: boolean;
}

export interface ChangeMovieGroup {
  status: string;
  message: string;
}
