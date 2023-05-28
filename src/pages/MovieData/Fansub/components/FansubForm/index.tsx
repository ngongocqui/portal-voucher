import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { LinkFansub, TextName } from '@/components/ProForm';
import { FansubModalState } from '@/pages/MovieData/Fansub/model';
import { createFansub, updateFansub } from '@/pages/MovieData/Fansub/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const FansubForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const fansub: FansubModalState = useSelector((state: any) => state?.fansub);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (fansub.FansubForm?.type) {
        if (fansub.FansubForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(fansub.FansubForm?.type || '')) {
          form.setFieldsValue({
            ...fansub.FansubForm.itemEdit,
          });
        }
      }
      setModalVisible(!!fansub.FansubForm?.type);
    })();
  }, [fansub.FansubForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
        <LinkFansub />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'fansub/updateFansubForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        fansub.FansubForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.Fansub.FansubForm.Update.title',
              defaultMessage: 'Cập nhật fansub',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.Fansub.FansubForm.Create.title',
              defaultMessage: 'Thêm mới fansub',
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
              code: getKeyFromString(values.name),
            };
            const res = await (fansub.FansubForm?.type === TYPE_FORM.UPDATE
              ? updateFansub(fansub.FansubForm?.itemEdit?.id || '', body)
              : createFansub(body));
            if (res) {
              onCancel();
              fansub.FansubList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                fansub.FansubForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.Fansub.FansubForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.Fansub.FansubForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.Fansub.FansubForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: fansub.FansubForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default FansubForm;
