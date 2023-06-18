import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import {
  DateRange,
  DigitDiscount,
  DigitQuantity,
  TextName,
  UploadAvatar,
} from '@/components/ProForm';
import { CampaignModalState } from '@/pages/Campaign/model';
import { createCampaign, updateCampaign } from '@/pages/Campaign/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';

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
  const avatarRef = useRef<ActionAvatar>();
  const [textEditor, setTextEditor] = useState(BraftEditor.createEditorState(''));

  useEffect(() => {
    (function () {
      if (campaign.CampaignForm?.type) {
        if (campaign.CampaignForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
          setTextEditor(BraftEditor.createEditorState(''));
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(campaign.CampaignForm?.type)) {
          form.setFieldsValue({
            ...campaign.CampaignForm.itemEdit,
            display_date: campaign.CampaignForm.itemEdit?.startDate &&
              campaign.CampaignForm.itemEdit?.endDate && [
                campaign.CampaignForm.itemEdit?.startDate,
                campaign.CampaignForm.itemEdit?.endDate,
              ],
          });
          avatarRef.current?.setImageUrl(campaign.CampaignForm.itemEdit?.avatar || '');
          setTextEditor(BraftEditor.createEditorState(campaign.CampaignForm.itemEdit?.content));
        }
      }
      setModalVisible(!!campaign.CampaignForm?.type);
    })();
  }, [campaign.CampaignForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-500px">
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName name="name" />
            <DigitQuantity name="quantity" />
            <DigitDiscount name="discount" />
            <DateRange name="display_date" />
          </div>
        </div>
        <Card title="Nội dung" size="small">
          <BraftEditor language="en" value={textEditor} onChange={setTextEditor} />
        </Card>
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'campaign/updateCampaignForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={1000}
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
              name: values.name,
              code: getKeyFromString(values.name),
              quantity: values.quantity,
              discount: values.discount,
              startDate: moment(values.display_date[0]).toISOString(),
              endDate: moment(values.display_date[1]).toISOString(),
              content: textEditor.toHTML(),
              avatar: avatarRef.current?.getImageUrl(),
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

export default CampaignForm;
