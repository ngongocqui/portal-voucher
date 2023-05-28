export interface PartMovieItem {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  index: number;
  status: string;
  updatedAt: string;
}

export interface CreatePartMovie {
  code: string;
  name: string;
  index: number;
}

export interface UpdatePartMovie {
  code: string;
  name: string;
  index: string;
}

export interface QueryPartMovie {
  data: PartMovieItem[];
  total: number;
  success: boolean;
}

export interface ChangePartMovie {
  status: string;
  message: string;
}
