export interface CategoryChildItem {
  avatar: string;
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateCategoryChild {
  code: string;
  name: string;
  color: string;
  parent: string;
  avatar: string;
}

export interface UpdateCategoryChild {
  code: string;
  name: string;
  color: string;
  parent: string;
  avatar: string;
}

export interface QueryCategoryChild {
  data: CategoryChildItem[];
  total: number;
  success: boolean;
}
