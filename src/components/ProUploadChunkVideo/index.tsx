import { Episode } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeList/data';
import { Button, message, Progress, Upload } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import {
  uploadChunkVideo,
  uploadChunkVideoComplete,
  uploadChunkVideoFailed,
  uploadChunkVideoStatus,
} from './services';
import { extname } from 'path';
import { uid } from 'uid';

interface ProUploadVideoType {
  data: Episode;
  onSuccess?: () => void;
}

interface FileStateProps {
  fileSize: number;
  fileId: string;
  totalChunks: number;
  totalChunksUploaded: number;
  startChunk: number;
  endChunk: number;
  fileToUpload: any;
  uploadedBytes: number;
  percent: number;
}

const chunkSize = +UPLOAD_FILE_SIZE;

const ProUploadChunkVideo: React.FC<ProUploadVideoType> = ({ data, onSuccess }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const errorRef = useRef(0);
  const [fileState, setFileState] = useState<FileStateProps>({
    fileSize: 0,
    fileId: '',
    totalChunks: 0,
    totalChunksUploaded: 0,
    startChunk: 0,
    endChunk: chunkSize,
    fileToUpload: null,
    uploadedBytes: 0,
    percent: 0,
  });

  const resetState = () => {
    setFileState({
      fileSize: 0,
      fileId: '',
      totalChunks: 0,
      totalChunksUploaded: 0,
      startChunk: 0,
      endChunk: chunkSize,
      fileToUpload: null,
      uploadedBytes: 0,
      percent: 0,
    });
    errorRef.current = 0;
  };

  const fileUpload = async (totalChunksUploaded: number) => {
    const { totalChunks, startChunk, endChunk, fileId, fileToUpload } = fileState;
    if (totalChunksUploaded <= totalChunks) {
      const chunk = fileToUpload.slice(startChunk, endChunk);
      await uploadChunk(chunk);
    } else {
      const res = await uploadChunkVideoComplete({ 'x-file-name': fileId }, { episode: data?.id });

      resetState();
      setLoading(false);
      onSuccess?.();
      if (!res) message.error(`Upload file code: ${data.code} failed!`);
      else message.success(`Upload file code: ${data.code} success!`);
    }
  };

  const uploadChunk = async (chunk: any) => {
    const { fileSize, totalChunksUploaded, startChunk, endChunk, fileId, uploadedBytes } =
      fileState;

    const formData = new FormData();
    formData.append('file', chunk);
    const res = await uploadChunkVideo(
      {
        'x-file-name': fileId,
        'Content-Range': `bytes ${startChunk}-${endChunk}/${fileSize}`,
        'file-size': fileSize,
      },
      formData,
    );

    if (!res) {
      errorRef.current += 1;
      if (errorRef.current < 3) await fileUpload(fileState.totalChunksUploaded);
      else {
        await uploadChunkVideoFailed({ 'x-file-name': fileId });
        resetState();
        setLoading(false);
        message.error(`Upload file [code: ${data.code}] failed!`);
      }
      return;
    }

    const endingChunk = Math.min(endChunk + chunkSize, fileSize);
    setFileState({
      ...fileState,
      totalChunksUploaded: totalChunksUploaded + 1,
      startChunk: endChunk,
      endChunk: endingChunk === fileSize ? endingChunk + 1 : endingChunk,
      uploadedBytes: endingChunk,
      percent: fileSize ? Math.round((uploadedBytes / fileSize) * 100) : 0.1,
    });
  };

  useEffect(() => {
    return () => {
      if (fileState.fileId) {
        uploadChunkVideoFailed({ 'x-file-name': fileState.fileId }).catch((err) => err);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (fileState.fileSize > 0) await fileUpload(fileState.totalChunksUploaded);
    })();
  }, [fileState.fileSize, fileState.totalChunksUploaded]);

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
      resetState();

      const randomName = Date.now() + uid(32);
      const fileId = `${randomName}${extname(file.name)}`;

      const res = await uploadChunkVideoStatus({ 'x-file-name': fileId, 'file-size': file.size });
      if (!res) {
        setLoading(false);
        return;
      }

      const uploadedBytes = res.uploaded;
      const bytesRemaining = file.size - uploadedBytes;
      const endingChunk = Math.min(uploadedBytes + chunkSize, file.size);

      if (res) {
        setFileState({
          fileSize: file.size,
          fileId,
          totalChunks: Math.ceil(bytesRemaining / chunkSize),
          totalChunksUploaded: 0,
          startChunk: uploadedBytes,
          endChunk: endingChunk === fileState.fileSize ? endingChunk + 1 : endingChunk,
          fileToUpload: file,
          uploadedBytes,
          percent: 0,
        });
        errorRef.current = 0;
      }
    }
    return;
  };

  const renderUploadIcon = () => {
    if (loading)
      return (
        <Button
          style={{ width: 100 }}
          icon={
            <Progress
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              percent={fileState.percent}
              status="active"
            />
          }
        />
      );
    return <Button icon={<UploadOutlined />} />;
  };

  return (
    <div className="flex justify-center">
      <Upload
        name="video"
        showUploadList={false}
        customRequest={() => {}}
        beforeUpload={beforeUpload}
        disabled={loading}
      >
        {renderUploadIcon()}
      </Upload>
    </div>
  );
};

export default ProUploadChunkVideo;
