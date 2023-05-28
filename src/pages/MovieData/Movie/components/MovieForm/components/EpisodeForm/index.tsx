import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, message } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { NumberIndex, TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { MovieModalState } from '@/pages/MovieData/Movie/model';
import {
  createEpisode,
  createManyEpisode,
  updateEpisode,
} from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/service';
import CreateManyEpisodeForm from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeForm/components/CreateManyEpisodeForm';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const EpisodeForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const movie: MovieModalState = useSelector((state: any) => state?.movie);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (movie.EpisodeForm?.type) {
        if ([TYPE_FORM.CREATE, TYPE_FORM.CREATE_MANY].includes(movie.EpisodeForm?.type)) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(movie.EpisodeForm?.type)) {
          form.setFieldsValue({
            ...movie.EpisodeForm.itemEdit,
          });
        }
      }
      setModalVisible(!!movie.EpisodeForm?.type);
    })();
  }, [movie.EpisodeForm?.type]);

  const renderContent = () => {
    return (
      <div>
        {[TYPE_FORM.CREATE, TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(
          movie.EpisodeForm?.type || '',
        ) && (
          <React.Fragment>
            <TextName labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} />
            <NumberIndex labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} />
          </React.Fragment>
        )}
        {movie.EpisodeForm?.type === TYPE_FORM.CREATE_MANY && <CreateManyEpisodeForm />}
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'movie/updateEpisodeForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        movie.EpisodeForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.Movie.EpisodeForm.Update.title',
              defaultMessage: 'Cập nhật tập phim',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.Movie.EpisodeForm.Create.title',
              defaultMessage: 'Thêm mới tập phim',
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
            if (movie.EpisodeForm?.type === TYPE_FORM.CREATE_MANY) {
              const { from, to } = values;
              if (from > to) {
                message.error('Error: Minimum <= Maximum!');
                return;
              }

              const bulk = Array.from({ length: to - from + 1 }, (_, i) => {
                return {
                  code: getKeyFromString(`Tập ${from + i}`, false),
                  name: `Tập ${from + i}`,
                  movie: movie.MovieForm?.itemEdit?.id,
                  index: from + i,
                };
              });
              const res = await createManyEpisode({ bulk });
              if (res) {
                onCancel();
                movie.EpisodeList?.reload?.();
              }
            } else {
              const body = {
                ...values,
                code: getKeyFromString(values.name, false),
                movie: movie.MovieForm?.itemEdit?.id,
              };
              const res = await (movie.EpisodeForm?.type === TYPE_FORM.UPDATE
                ? updateEpisode(movie.EpisodeForm?.itemEdit?.id || '', body)
                : createEpisode(body));
              if (res) {
                onCancel();
                movie.EpisodeList?.reload?.();
              }
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                movie.EpisodeForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.Movie.EpisodeForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.Movie.EpisodeForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.Movie.EpisodeForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: movie.EpisodeForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default EpisodeForm;
