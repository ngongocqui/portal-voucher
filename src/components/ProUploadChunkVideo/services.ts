import request from '@/utils/request';

export const uploadChunkVideoStatus = (headers: object) => {
  return request(
    {
      url: 'uploads/chunk-video/status',
      method: 'GET',
      headers,
    },
    false,
    true,
    false,
  );
};

export const uploadChunkVideo = (headers: object, body: FormData) => {
  return request(
    {
      url: 'uploads/chunk-video',
      method: 'POST',
      headers,
      body,
    },
    false,
    true,
    false,
  );
};

export const uploadChunkVideoComplete = (headers: object, body: any) => {
  return request(
    {
      url: 'uploads/chunk-video/complete',
      method: 'POST',
      headers,
      body,
    },
    false,
    true,
    false,
  );
};

export const uploadChunkVideoFailed = (headers: object) => {
  return request(
    {
      url: 'uploads/chunk-video/failed',
      method: 'POST',
      headers,
    },
    false,
    true,
    false,
  );
};
