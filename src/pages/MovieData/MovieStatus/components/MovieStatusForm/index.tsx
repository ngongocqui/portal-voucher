import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { SelectColor, TextName } from '@/components/ProForm';
import { MovieStatusModalState } from '@/pages/MovieData/MovieStatus/model';
import { createMovieStatus, updateMovieStatus } from '@/pages/MovieData/MovieStatus/service';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MovieStatusForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const movieStatus: MovieStatusModalState = useSelector((state: any) => state?.movieStatus);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const colorRef = useRef<ActionColor>();

  useEffect(() => {
    (function () {
      if (movieStatus.MovieStatusForm?.type) {
        if (movieStatus.MovieStatusForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          colorRef.current?.setColor('#fff');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(movieStatus.MovieStatusForm?.type)) {
          form.setFieldsValue({
            ...movieStatus.MovieStatusForm.itemEdit,
          });
          colorRef.current?.setColor(movieStatus.MovieStatusForm.itemEdit?.color || '');
        }
      }
      setModalVisible(!!movieStatus.MovieStatusForm?.type);
    })();
  }, [movieStatus.MovieStatusForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
        <SelectColor form={form} ref={colorRef} />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'movieStatus/updateMovieStatusForm', payload: { type: '' } });
    form.resetFields();
    colorRef.current?.setColor('#fff');
  };

  return (
    <Modal
      width={600}
      title={
        movieStatus.MovieStatusForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.MovieStatus.MovieStatusForm.Update.title',
              defaultMessage: 'Cập nhật trạng thái phim',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.MovieStatus.MovieStatusForm.Create.title',
              defaultMessage: 'Thêm mới trạng thái phim',
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
            const res = await (movieStatus.MovieStatusForm?.type === TYPE_FORM.UPDATE
              ? updateMovieStatus(movieStatus.MovieStatusForm?.itemEdit?.id || '', body)
              : createMovieStatus(body));
            if (res) {
              onCancel();
              movieStatus.MovieStatusList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                movieStatus.MovieStatusForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.MovieStatus.MovieStatusForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.MovieStatus.MovieStatusForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.MovieStatus.MovieStatusForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: movieStatus.MovieStatusForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            colorRef.current?.setColor('#fff');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default MovieStatusForm;
