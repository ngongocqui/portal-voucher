import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { TextName } from '@/components/ProForm';
import { MovieGroupModalState } from '@/pages/MovieData/MovieGroup/model';
import { createMovieGroup, updateMovieGroup } from '@/pages/MovieData/MovieGroup/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MovieGroupForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const movieGroup: MovieGroupModalState = useSelector((state: any) => state?.movieGroup);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (movieGroup.MovieGroupForm?.type) {
        if (movieGroup.MovieGroupForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(movieGroup.MovieGroupForm?.type)) {
          form.setFieldsValue({
            ...movieGroup.MovieGroupForm.itemEdit,
          });
        }
      }
      setModalVisible(!!movieGroup.MovieGroupForm?.type);
    })();
  }, [movieGroup.MovieGroupForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'movieGroup/updateMovieGroupForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        movieGroup.MovieGroupForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.MovieGroup.MovieGroupForm.Update.title',
              defaultMessage: 'Cập nhật nhóm phim',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.MovieGroup.MovieGroupForm.Create.title',
              defaultMessage: 'Thêm mới nhóm phim',
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
            const res = await (movieGroup.MovieGroupForm?.type === TYPE_FORM.UPDATE
              ? updateMovieGroup(movieGroup.MovieGroupForm?.itemEdit?.id || '', body)
              : createMovieGroup(body));
            if (res) {
              onCancel();
              movieGroup.MovieGroupList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                movieGroup.MovieGroupForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.MovieGroup.MovieGroupForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.MovieGroup.MovieGroupForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.MovieGroup.MovieGroupForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: movieGroup.MovieGroupForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default MovieGroupForm;
