import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import {
  SelectCategory,
  SelectFansub,
  SelectGroup,
  SelectMovieStatus,
  SelectPart,
  TextDescription,
  TextEpisodes,
  TextName,
  TextSubName,
  UploadAvatar,
} from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { MovieModalState } from '@/pages/MovieData/Movie/model';
import { createMovie, updateMovie } from '@/pages/MovieData/Movie/service';
import { getKeyFromString } from '@/utils/utils';
import EpisodeForm from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeForm';
import EpisodeList from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList';
import { TYPE_FORM } from '@/utils/utils.enum';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MovieForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const movie: MovieModalState = useSelector((state: any) => state?.movie);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const pictureRef = useRef<ActionAvatar>();
  const backgroundRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (movie.MovieForm?.type) {
        if (movie.MovieForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          pictureRef.current?.setImageUrl('');
          backgroundRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(movie.MovieForm?.type)) {
          form.setFieldsValue({
            ...movie.MovieForm.itemEdit,
            categories: movie.MovieForm.itemEdit?.categories?.map((it) => it.id),
            movie_status: movie.MovieForm.itemEdit?.movie_status?.id,
            group: movie.MovieForm.itemEdit?.group?.id,
            part: movie.MovieForm.itemEdit?.part?.id,
            fansub: movie.MovieForm.itemEdit?.fansub?.id,
          });
          pictureRef.current?.setImageUrl(movie.MovieForm.itemEdit?.picture || '');
          backgroundRef.current?.setImageUrl(movie.MovieForm.itemEdit?.background || '');
        }
      }
      setModalVisible(!!movie.MovieForm?.type);
    })();
  }, [movie.MovieForm?.type, movie.MovieForm?.itemEdit]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex">
          <div className="flex-1">
            <UploadAvatar ref={pictureRef} name="picture" labelCol={{ span: 14 }} folder="avatar" />
          </div>
          <div className="flex-1">
            <UploadAvatar
              ref={backgroundRef}
              name="background"
              label={intl.formatMessage({
                id: 'pages.ProForm.Background.title',
                defaultMessage: 'Ảnh',
              })}
              labelCol={{ span: 6 }}
              folder="background"
            />
          </div>
        </div>
        <TextName />
        <TextSubName />
        <SelectCategory />
        <SelectGroup
          params={{ code: movie.MovieForm?.itemEdit?.group?.code }}
          wrapperCol={{ span: 8 }}
        />
        <SelectPart
          params={{ code: movie.MovieForm?.itemEdit?.part?.code }}
          wrapperCol={{ span: 8 }}
        />
        <SelectFansub
          params={{ code: movie.MovieForm?.itemEdit?.fansub?.code }}
          wrapperCol={{ span: 8 }}
        />
        <TextEpisodes wrapperCol={{ span: 8 }} />
        <SelectMovieStatus wrapperCol={{ span: 8 }} />
        <TextDescription />
        {movie.MovieForm?.type === TYPE_FORM.UPDATE && (
          <Card>
            <EpisodeList />
            <EpisodeForm />
          </Card>
        )}
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'movie/updateMovieForm', payload: { type: '' } });
    form.resetFields();
    pictureRef.current?.setImageUrl('');
    backgroundRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={1200}
      title={
        movie.MovieForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.MovieData.Movie.MovieForm.Update.title',
              defaultMessage: 'Cập nhật phim',
            })
          : intl.formatMessage({
              id: 'pages.MovieData.Movie.MovieForm.Create.title',
              defaultMessage: 'Thêm mới phim',
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
              categories: values.categories?.map((it: string) => ({ id: it })),
              code: getKeyFromString(values.name, false),
              picture: pictureRef.current?.getImageUrl(),
              background: backgroundRef.current?.getImageUrl(),
              part: values.part,
              group: values.group,
              fansub: values.fansub,
            };
            const res = await (movie.MovieForm?.type === TYPE_FORM.UPDATE
              ? updateMovie(movie.MovieForm?.itemEdit?.id || '', body)
              : createMovie(body));
            if (res) {
              onCancel();
              movie.MovieList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                movie.MovieForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.MovieData.Movie.MovieForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.MovieData.Movie.MovieForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.MovieData.Movie.MovieForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: movie.MovieForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            pictureRef.current?.setImageUrl('');
            backgroundRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default MovieForm;
