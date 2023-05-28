export interface CategoryItem {
  avatar: string;
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
  parent: CategoryItem;
}

export interface CreateCategory {
  avatar: string;
  code: string;
  name: string;
  color: string;
}

export interface UpdateCategory {
  avatar: string;
  code: string;
  name: string;
  color: string;
}

export interface QueryCategory {
  data: CategoryItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCategory {
  status: string;
  message: string;
}
