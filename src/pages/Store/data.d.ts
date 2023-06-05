export interface StoreItem {
  code: string;
  createdAt: string;
  id: string;
  avatar: string;
  title: string;
  description: string;
  status: string;
  updatedAt: string;
}

export interface CreateStore {
  code: string;
  avatar: string;
  title: string;
  description: string;
}

export interface UpdateStore {
  code: string;
  avatar: string;
  title: string;
  description: string;
}

export interface QueryStores {
  data: StoreItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusStore {
  status: string;
  message: string;
}
