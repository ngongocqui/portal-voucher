import React from 'react';
import { Modal, Form, Space } from 'antd';
import ProForm from '@ant-design/pro-form';
import { changePassword } from '@/pages/Admin/User/service';
// @ts-ignore
import { useIntl } from 'umi';
import { TextPassword } from '@/components/ProForm';

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

interface ChangePasswordProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const renderContent = () => {
    return (
      <div>
        <TextPassword
          name="current_password"
          label={intl.formatMessage({
            id: 'pages.current_password',
            defaultMessage: 'Mật khẩu hiện tại',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.current_password.placeholder',
            defaultMessage: 'Nhập mật khẩu hiện tại',
          })}
        />
        <TextPassword
          name="new_password"
          label={intl.formatMessage({
            id: 'pages.new_password',
            defaultMessage: 'Mật khẩu mới',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.new_password.placeholder',
            defaultMessage: 'Nhập mật khẩu mới',
          })}
        />
        <TextPassword
          name="confirm_password"
          label={intl.formatMessage({
            id: 'pages.confirm_password',
            defaultMessage: 'Mật khẩu xác nhận',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.confirm_password.placeholder',
            defaultMessage: 'Nhập mật khẩu xác nhận',
          })}
        />
      </div>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.password.change',
        defaultMessage: 'Thay đổi mật khẩu',
      })}
      forceRender
      visible={props.modalVisible}
      onCancel={() => props.onCancel()}
      footer={false}
    >
      <ProForm
        {...formLayout}
        form={form}
        onFinish={async (values) => {
          const res = await changePassword(values);
          if (res) props.onCancel();
        }}
        layout="horizontal"
        submitter={{
          render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
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
        }}
      >
        {renderContent()}
      </ProForm>
    </Modal>
  );
};

export default ChangePassword;
