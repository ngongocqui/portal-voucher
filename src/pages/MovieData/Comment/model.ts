// @ts-ignore
import { Reducer } from 'umi';
import { CommentItem } from '@/pages/MovieData/Comment/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface CommentModalState {
  CommentList?: {
    reload?: () => void;
  };
  CommentForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CommentItem;
  };
}

export interface CommentModelType {
  namespace: string;
  state: CommentModalState;
  reducers: {
    updateCommentForm: Reducer<CommentModalState>;
    updateCommentList: Reducer<CommentModalState>;
  };
}

const CommentModel: CommentModelType = {
  namespace: 'comment',
  state: {
    CommentList: {
      reload: undefined,
    },
    CommentForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCommentForm(state, action) {
      const CommentForm = state?.CommentForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CommentForm[k] = fields[k];
      });
      return { ...state, CommentForm };
    },
    updateCommentList(state, action) {
      const CommentList = state?.CommentList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CommentList[k] = fields[k];
      });
      return { ...state, CommentList };
    },
  },
};

export default CommentModel;
