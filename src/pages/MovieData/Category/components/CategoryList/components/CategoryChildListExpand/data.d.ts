export interface CategoryChildExpandItem {
  avatar: string;
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface QueryCategoryChildExpand {
  data: CategoryChildExpandItem[];
  total: number;
  success: boolean;
}
