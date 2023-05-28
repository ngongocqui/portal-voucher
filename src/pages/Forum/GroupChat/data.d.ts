export interface GroupChatItem {
  code: string;
  name: string;
  subName: string;
  picture: string;
  background: string;
  description: string;
  hobby: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateGroupChat {
  code: string;
  name: string;
  background: string;
  description: string;
  hobby: string;
}

export interface UpdateGroupChat {
  code: string;
  name: string;
  background: string;
  description: string;
  hobby: string;
}

export interface QueryGroupChats {
  data: GroupChatItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusGroupChat {
  status: string;
  message: string;
}
