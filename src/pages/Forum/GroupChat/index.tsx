import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import GroupChatForm from '@/pages/Forum/GroupChat/components/GroupChatForm';
import GroupChatList from '@/pages/Forum/GroupChat/components/GroupChatList';

const GroupChat: React.FC = () => {
  return (
    <PageContainer>
      <GroupChatForm />
      <GroupChatList />
    </PageContainer>
  );
};

export default GroupChat;
