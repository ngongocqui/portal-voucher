import { Episode } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';
import { Button, message, Upload } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { uploadVideo } from './services';

interface ProUploadVideoType {
  data: Episode;
  onSuccess?: () => void;
}

const ProUploadVideo: React.FC<ProUploadVideoType> = ({ data, onSuccess }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const beforeUpload = async (file: any) => {
    const isVideo = !!file.type.match(/(x-matroska|mov|avi|wmv|flv|3gp|mp4|mpg|ts)/);
    if (!isVideo) {
      message.error(
        intl.formatMessage({
          id: 'pages.ProForm.Video.errors.type',
          defaultMessage: 'Bạn chỉ có thể up lên file mkv|mov|avi|wmv|flv|3gp|mp4|mpg|ts!',
        }),
      );
      return;
    }

    if (isVideo) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('episode', data?.id);
      await uploadVideo(formData);
      setLoading(false);
      onSuccess?.();
    }
  };

  return (
    <div className="flex justify-center">
      <Upload name="video" showUploadList={false} beforeUpload={beforeUpload}>
        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />} />
      </Upload>
    </div>
  );
};

export default ProUploadVideo;
