// @ts-ignore
import { Reducer } from 'umi';
import { CategoryItem } from '@/pages/MovieData/Category/data';
import { CategoryChildItem } from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface CategoryModalState {
  CategoryList?: {
    reload?: () => void;
  };
  CategoryForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CategoryItem;
  };
  CategoryChildList?: {
    reload?: () => void;
  };
  CategoryChildForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CategoryChildItem;
  };
}

export interface CategoryModelType {
  namespace: string;
  state: CategoryModalState;
  reducers: {
    updateCategoryForm: Reducer<CategoryModalState>;
    updateCategoryList: Reducer<CategoryModalState>;
    updateCategoryChildForm: Reducer<CategoryModalState>;
    updateCategoryChildList: Reducer<CategoryModalState>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    CategoryList: {
      reload: undefined,
    },
    CategoryForm: {
      type: undefined,
      itemEdit: undefined,
    },
    CategoryChildList: {
      reload: undefined,
    },
    CategoryChildForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCategoryForm(state, action) {
      const CategoryForm = state?.CategoryForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CategoryForm[k] = fields[k];
      });
      return { ...state, CategoryForm };
    },
    updateCategoryList(state, action) {
      const CategoryList = state?.CategoryList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CategoryList[k] = fields[k];
      });
      return { ...state, CategoryList };
    },
    updateCategoryChildForm(state, action) {
      const CategoryChildForm = state?.CategoryChildForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CategoryChildForm[k] = fields[k];
      });
      return { ...state, CategoryChildForm };
    },
    updateCategoryChildList(state, action) {
      const CategoryChildList = state?.CategoryChildList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CategoryChildList[k] = fields[k];
      });
      return { ...state, CategoryChildList };
    },
  },
};

export default CategoryModel;
