import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { SelectColor, TextDescription, TextName, UploadAvatar } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import { CategoryModalState } from '@/pages/MovieData/Category/model';
import { createCategory, updateCategory } from '@/pages/MovieData/Category/service';
import CategoryChildList from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildList';
import CategoryChildForm from '@/pages/MovieData/Category/components/CategoryForm/components/CategoryChildForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CategoryForm: React.FC = () => {
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
      if (category.CategoryForm?.type) {
        if (category.CategoryForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          colorRef.current?.setColor('#fff');
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(category.CategoryForm?.type)) {
          form.setFieldsValue({
            ...category.CategoryForm.itemEdit,
          });
          colorRef.current?.setColor(category.CategoryForm.itemEdit?.color || '');
          avatarRef.current?.setImageUrl(category.CategoryForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!category.CategoryForm?.type);
    })();
  }, [category.CategoryForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName />
            <TextDescription />
            <SelectColor form={form} ref={colorRef} />
          </div>
        </div>
        {category.CategoryForm?.type === TYPE_FORM.UPDATE && (
          <Card>
            <CategoryChildList />
            <CategoryChildForm />
          </Card>
        )}
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'category/updateCategoryForm', payload: { type: '' } });
    form.resetFields();
    colorRef.current?.setColor('#fff');
    avatarRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={category.CategoryForm?.type === TYPE_FORM.UPDATE ? 1000 : 600}
      title={
        category.CategoryForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.Category.CategoryForm.Update.title',
              defaultMessage: 'Cập nhật thể loại',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.Category.CategoryForm.Create.title',
              defaultMessage: 'Thêm mới thể loại',
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
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (category.CategoryForm?.type === TYPE_FORM.UPDATE
              ? updateCategory(category.CategoryForm?.itemEdit?.id || '', body)
              : createCategory(body));
            if (res) {
              onCancel();
              category.CategoryList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                category.CategoryForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.Category.CategoryForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.Category.CategoryForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.Category.CategoryForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: category.CategoryForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
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

export default CategoryForm;
