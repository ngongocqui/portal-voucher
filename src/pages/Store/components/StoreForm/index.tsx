import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { TextDescription, TextName, UploadAvatar } from '@/components/ProForm';
import { StoreModalState } from '@/pages/Store/model';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { createStore, updateStore } from '@/pages/Store/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const StoreForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const store: StoreModalState = useSelector((state: any) => state?.store);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (store.StoreForm?.type) {
        if (store.StoreForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(store.StoreForm?.type)) {
          form.setFieldsValue({
            ...store.StoreForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(store.StoreForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!store.StoreForm?.type);
    })();
  }, [store.StoreForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName name="title" />
            <TextDescription />
          </div>
        </div>
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'store/updateStoreForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={store.StoreForm?.type === TYPE_FORM.UPDATE ? 1000 : 600}
      title={
        store.StoreForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.Store.StoreForm.Update.title',
              defaultMessage: 'Cập nhật cửa hàng',
            })
          : intl.formatMessage({
              id: 'pages.Store.StoreForm.Create.title',
              defaultMessage: 'Thêm mới cửa hàng',
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
              code: getKeyFromString(values.title),
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (store.StoreForm?.type === TYPE_FORM.UPDATE
              ? updateStore(store.StoreForm?.itemEdit?.id || '', body)
              : createStore(body));
            if (res) {
              onCancel();
              store.StoreList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                store.StoreForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.Store.StoreForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Store.StoreForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Store.StoreForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: store.StoreForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            avatarRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default StoreForm;
