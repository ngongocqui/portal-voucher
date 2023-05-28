import { Button } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
// @ts-ignore
import { FormattedMessage, useDispatch } from 'umi';
import Access from '@/components/Access';
import { TYPE_FORM } from '@/utils/utils.enum';

const CreateManyEpisode: React.FC = () => {
  const dispatch = useDispatch();
  const access = Access();

  const handleClick = () => {
    dispatch({ type: 'movie/updateEpisodeForm', payload: { type: TYPE_FORM.CREATE_MANY } });
  };

  return (
    <Button
      className={`${access.className([TYPE_FORM.CREATE])}`}
      type="default"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create.many" defaultMessage="Tạo nhiều" />
    </Button>
  );
};

export default CreateManyEpisode;
