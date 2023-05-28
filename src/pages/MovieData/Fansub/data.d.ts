export interface FansubItem {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  link: string;
  status: string;
  updatedAt: string;
}

export interface CreateFansub {
  code: string;
  name: string;
  link: string;
}

export interface UpdateFansub {
  code: string;
  name: string;
  link: string;
}

export interface QueryFansub {
  data: FansubItem[];
  total: number;
  success: boolean;
}

export interface ChangeFansub {
  status: string;
  message: string;
}
