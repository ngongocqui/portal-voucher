import React, { useEffect, useRef, useState } from 'react';
import { Spin, Space } from 'antd';
import styles from '@/pages/Account/components/BaseView/styles.less';
import {
  SelectGender,
  SelectRole,
  TextEmail,
  TextName,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import ProForm from '@ant-design/pro-form';
import { updateUser } from '@/pages/Admin/User/service';
// @ts-ignore
import { useIntl, useModel } from 'umi';
import { getProfile } from '@/pages/User/Login/services';

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const BaseView: React.FC = () => {
  const [form] = ProForm.useForm();
  const avatarRef = useRef<ActionAvatar>();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      ...initialState?.currentUser,
      role: initialState?.currentUser?.role?.id,
    });
    avatarRef.current?.setImageUrl(initialState?.currentUser?.avatar || '');
  }, [initialState]);

  const fetchUserInfo = async () => {
    setLoading(true);
    const userInfo = await getProfile();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
    setLoading(false);
  };

  return (
    <Spin size="large" spinning={loading}>
      <ProForm
        form={form}
        {...formLayout}
        layout="horizontal"
        hideRequiredMark
        onFinish={async (values) => {
          const body = {
            ...values,
            avatar: avatarRef.current?.getImageUrl(),
          };
          const res = await updateUser(initialState?.currentUser?.id || '', body);
          if (res) await fetchUserInfo();
        }}
        submitter={{
          render: (_, dom) => <Space className={'flex justify-start mt-4'}>{dom}</Space>,
          searchConfig: {
            submitText: intl.formatMessage({
              id: 'pages.Admin.User.UserForm.Update.submitText',
              defaultMessage: 'Cập nhật',
            }),
            resetText: intl.formatMessage({
              id: 'pages.Admin.User.UserForm.resetText',
              defaultMessage: 'Làm mới',
            }),
          },
          resetButtonProps: {
            className: 'hidden',
          },
        }}
      >
        <div className={styles.baseView}>
          <div className={styles.left}>
            <TextName />
            <TextPhone />
            <TextEmail />
            <SelectGender />
            <SelectRole />
          </div>
          <div className={styles.right}>
            <UploadAvatar ref={avatarRef} folder="avatar" />
          </div>
        </div>
      </ProForm>
    </Spin>
  );
};

export default BaseView;
