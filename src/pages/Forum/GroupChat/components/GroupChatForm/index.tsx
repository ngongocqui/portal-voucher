import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import {
  TextDescription,
  TextHobby,
  TextName,
  TextSubName,
  UploadAvatar,
} from '@/components/ProForm';
import { GroupChatModalState } from '@/pages/Forum/GroupChat/model';
import { createGroupChat, updateGroupChat } from '@/pages/Forum/GroupChat/service';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const GroupChatForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const groupChat: GroupChatModalState = useSelector((state: any) => state?.groupChat);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const pictureRef = useRef<ActionAvatar>();
  const backgroundRef = useRef<ActionAvatar>();

  useEffect(() => {
    (function () {
      if (groupChat.GroupChatForm?.type) {
        if (groupChat.GroupChatForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          pictureRef.current?.setImageUrl('');
          backgroundRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(groupChat.GroupChatForm?.type)) {
          form.setFieldsValue({
            ...groupChat.GroupChatForm.itemEdit,
          });
          pictureRef.current?.setImageUrl(groupChat.GroupChatForm.itemEdit?.picture || '');
          backgroundRef.current?.setImageUrl(groupChat.GroupChatForm.itemEdit?.background || '');
        }
      }
      setModalVisible(!!groupChat.GroupChatForm?.type);
    })();
  }, [groupChat.GroupChatForm?.type]);

  const renderContent = () => {
    return (
      <>
        <div className="flex">
          <div className="flex-1">
            <UploadAvatar ref={pictureRef} name="picture" labelCol={{ span: 14 }} folder="avatar" />
          </div>
          <div className="flex-1">
            <UploadAvatar
              ref={backgroundRef}
              name="background"
              label={intl.formatMessage({
                id: 'pages.ProForm.Background.title',
                defaultMessage: 'Ảnh',
              })}
              labelCol={{ span: 6 }}
              folder="background"
            />
          </div>
        </div>
        <TextName />
        <TextSubName />
        <TextDescription />
        <TextHobby />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'groupChat/updateGroupChatForm', payload: { type: '' } });
    form.resetFields();
    pictureRef.current?.setImageUrl('');
    backgroundRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={600}
      title={
        groupChat.GroupChatForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.Forum.GroupChat.GroupChatForm.Update.title',
              defaultMessage: 'Cập nhật nhóm',
            })
          : intl.formatMessage({
              id: 'pages.Forum.GroupChat.GroupChatForm.Create.title',
              defaultMessage: 'Thêm mới nhóm',
            })
      }
      forceRender
      destroyOnClose
      visible={modalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <div ref={modalRef}>
        <ProForm
          form={form}
          {...formLayout}
          layout="horizontal"
          onFinish={async (values) => {
            const body = {
              ...values,
              code: getKeyFromString(values.name, false),
              picture: pictureRef.current?.getImageUrl(),
              background: backgroundRef.current?.getImageUrl(),
            };
            const res = await (groupChat.GroupChatForm?.type === TYPE_FORM.UPDATE
              ? updateGroupChat(groupChat.GroupChatForm?.itemEdit?.id || '', body)
              : createGroupChat(body));
            if (res) {
              onCancel();
              groupChat.GroupChatList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                groupChat.GroupChatForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.Forum.GroupChat.GroupChatForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Forum.GroupChat.GroupChatForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Forum.GroupChat.GroupChatForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: groupChat.GroupChatForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            pictureRef.current?.setImageUrl('');
            backgroundRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default GroupChatForm;
