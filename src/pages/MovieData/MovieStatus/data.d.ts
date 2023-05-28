export interface MovieStatusItem {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  color: string;
  status: string;
  updatedAt: string;
}

export interface CreateMovieStatus {
  code: string;
  name: string;
  color: string;
}

export interface UpdateMovieStatus {
  code: string;
  name: string;
  color: string;
}

export interface QueryMovieStatus {
  data: MovieStatusItem[];
  total: number;
  success: boolean;
}

export interface ChangeMovieStatus {
  status: string;
  message: string;
}
