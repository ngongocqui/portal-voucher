import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { TextDescription, TextName } from '@/components/ProForm';
import { CampaignModalState } from '@/pages/Campaign/model';
import { createCampaign, updateCampaign } from '@/pages/Campaign/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CampaignForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const campaign: CampaignModalState = useSelector((state: any) => state?.campaign);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (campaign.CampaignForm?.type) {
        if (campaign.CampaignForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(campaign.CampaignForm?.type)) {
          form.setFieldsValue({
            ...campaign.CampaignForm.itemEdit,
          });
        }
      }
      setModalVisible(!!campaign.CampaignForm?.type);
    })();
  }, [campaign.CampaignForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <TextName name="title" />
            <TextDescription />
          </div>
        </div>
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'Campaign/updateCampaignForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={campaign.CampaignForm?.type === TYPE_FORM.UPDATE ? 1000 : 600}
      title={
        campaign.CampaignForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.Campaign.CampaignForm.Update.title',
              defaultMessage: 'Cập nhật chiến dịch',
            })
          : intl.formatMessage({
              id: 'pages.Campaign.CampaignForm.Create.title',
              defaultMessage: 'Thêm mới chiến dịch',
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
            };
            const res = await (campaign.CampaignForm?.type === TYPE_FORM.UPDATE
              ? updateCampaign(campaign.CampaignForm?.itemEdit?.id || '', body)
              : createCampaign(body));
            if (res) {
              onCancel();
              campaign.CampaignList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                campaign.CampaignForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.Campaign.CampaignForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Campaign.CampaignForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Campaign.CampaignForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: campaign.CampaignForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default CampaignForm;
