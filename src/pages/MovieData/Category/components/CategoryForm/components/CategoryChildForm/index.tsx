import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { SelectColor, TextDescription, TextName, UploadAvatar } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import { CategoryModalState } from '@/pages/MovieData/Category/model';
import {
  createCategoryChild,
  updateCategoryChild,
} from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList/service';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CategoryChildForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const category: CategoryModalState = useSelector((state: any) => state?.category);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const colorRef = useRef<ActionColor>();
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (category.CategoryChildForm?.type) {
        if (category.CategoryChildForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          colorRef.current?.setColor('#fff');
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(category.CategoryChildForm?.type)) {
          form.setFieldsValue({
            ...category.CategoryChildForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(category.CategoryChildForm.itemEdit?.avatar || '');
          colorRef.current?.setColor(category.CategoryChildForm.itemEdit?.color || '');
        }
      }
      setModalVisible(!!category.CategoryChildForm?.type);
    })();
  }, [category.CategoryChildForm?.type]);

  const renderContent = () => {
    return (
      <>
        <UploadAvatar ref={avatarRef} folder="avatar" />
        <TextName />
        <TextDescription />
        <SelectColor form={form} ref={colorRef} />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'category/updateCategoryChildForm', payload: { type: '' } });
    form.resetFields();
    colorRef.current?.setColor('#fff');
    avatarRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={600}
      title={
        category.CategoryChildForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.Category.CategoryChildForm.Update.title',
              defaultMessage: 'Cập nhật thể loại con',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.Category.CategoryChildForm.Create.title',
              defaultMessage: 'Thêm mới thể loại con',
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
              code: `${category.CategoryForm?.itemEdit?.code}-${getKeyFromString(values.name)}`,
              parent: category.CategoryForm?.itemEdit?.id,
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (category.CategoryChildForm?.type === TYPE_FORM.UPDATE
              ? updateCategoryChild(category.CategoryChildForm?.itemEdit?.id || '', body)
              : createCategoryChild(body));
            if (res) {
              onCancel();
              category.CategoryChildList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                category.CategoryChildForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.Category.CategoryChildForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.Category.CategoryChildForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.Category.CategoryChildForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: category.CategoryChildForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            colorRef.current?.setColor('#fff');
            avatarRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default CategoryChildForm;
