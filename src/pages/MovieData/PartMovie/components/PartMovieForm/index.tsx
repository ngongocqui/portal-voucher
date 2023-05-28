import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { NumberIndex, TextName } from '@/components/ProForm';
import { PartMovieModalState } from '@/pages/MovieData/PartMovie/model';
import { createPartMovie, updatePartMovie } from '@/pages/MovieData/PartMovie/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PartMovieForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const partMovie: PartMovieModalState = useSelector((state: any) => state?.partMovie);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (partMovie.PartMovieForm?.type) {
        if (partMovie.PartMovieForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(partMovie.PartMovieForm?.type)) {
          form.setFieldsValue({
            ...partMovie.PartMovieForm.itemEdit,
          });
        }
      }
      setModalVisible(!!partMovie.PartMovieForm?.type);
    })();
  }, [partMovie.PartMovieForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
        <NumberIndex />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'partMovie/updatePartMovieForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        partMovie.PartMovieForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.PartMovie.PartMovieForm.Update.title',
              defaultMessage: 'Cập nhật phần',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.PartMovie.PartMovieForm.Create.title',
              defaultMessage: 'Thêm mới phần',
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
            const res = await (partMovie.PartMovieForm?.type === TYPE_FORM.UPDATE
              ? updatePartMovie(partMovie.PartMovieForm?.itemEdit?.id || '', body)
              : createPartMovie(body));
            if (res) {
              onCancel();
              partMovie.PartMovieList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                partMovie.PartMovieForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.PartMovie.PartMovieForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.PartMovie.PartMovieForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.PartMovie.PartMovieForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: partMovie.PartMovieForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default PartMovieForm;
