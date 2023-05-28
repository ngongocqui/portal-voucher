import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { GroupChatItem } from '@/pages/Forum/GroupChat/data';
import { GroupChatModalState } from '@/pages/Forum/GroupChat/model';
import { changeStatusGroupChat } from '@/pages/Forum/GroupChat/service';

interface ChangeStatusGroupChatProps {
  status: string;
  record: GroupChatItem;
}

const ChangeStatusGroupChat: React.FC<ChangeStatusGroupChatProps> = ({ status, record }) => {
  const groupChat: GroupChatModalState = useSelector((state: any) => state?.groupChat);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusGroupChat(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) groupChat.GroupChatList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusGroupChat;
