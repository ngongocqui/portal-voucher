// @ts-ignore
import { Reducer } from 'umi';
import { GroupChatItem } from '@/pages/Forum/GroupChat/data';
import { I_TYPE_FORM } from '@/utils/interface';

export interface GroupChatModalState {
  GroupChatList?: {
    reload?: () => void;
  };
  GroupChatForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: GroupChatItem;
  };
}

export interface GroupChatModelType {
  namespace: string;
  state: GroupChatModalState;
  reducers: {
    updateGroupChatForm: Reducer<GroupChatModalState>;
    updateGroupChatList: Reducer<GroupChatModalState>;
  };
}

const GroupChatModel: GroupChatModelType = {
  namespace: 'groupChat',
  state: {
    GroupChatList: {
      reload: undefined,
    },
    GroupChatForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateGroupChatForm(state, action) {
      const GroupChatForm = state?.GroupChatForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        GroupChatForm[k] = fields[k];
      });
      return { ...state, GroupChatForm };
    },
    updateGroupChatList(state, action) {
      const GroupChatList = state?.GroupChatList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        GroupChatList[k] = fields[k];
      });
      return { ...state, GroupChatList };
    },
  },
};

export default GroupChatModel;
