import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { TextName, TextValue } from '@/components/ProForm';
import { SettingSystemModalState } from '@/pages/System/SettingSystem/model';
import { createSettingSystem, updateSettingSystem } from '@/pages/System/SettingSystem/service';
import { TYPE_FORM } from '@/utils/utils.enum';
import { getKeyFromString } from '@/utils/utils';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const SettingSystemForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const settingSystem: SettingSystemModalState = useSelector((state: any) => state?.settingSystem);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (settingSystem.SettingSystemForm?.type) {
        if (settingSystem.SettingSystemForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(settingSystem.SettingSystemForm?.type)) {
          form.setFieldsValue({
            ...settingSystem.SettingSystemForm.itemEdit,
          });
        }
      }
      setModalVisible(!!settingSystem.SettingSystemForm?.type);
    })();
  }, [settingSystem.SettingSystemForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
        <TextValue />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'settingSystem/updateSettingSystemForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        settingSystem.SettingSystemForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.System.SettingSystem.SettingSystemForm.Update.title',
              defaultMessage: 'Cập nhật cài đặt',
            })
          : intl.formatMessage({
              id: 'pages.System.SettingSystem.SettingSystemForm.Create.title',
              defaultMessage: 'Thêm mới cài đặt',
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
            };

            const res = await (settingSystem.SettingSystemForm?.type === TYPE_FORM.UPDATE
              ? updateSettingSystem(settingSystem.SettingSystemForm?.itemEdit?.id || '', body)
              : createSettingSystem(body));
            if (res) {
              onCancel();
              settingSystem.SettingSystemList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                settingSystem.SettingSystemForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.System.SettingSystem.SettingSystemForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.System.SettingSystem.SettingSystemForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.System.SettingSystem.SettingSystemForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: settingSystem.SettingSystemForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default SettingSystemForm;
