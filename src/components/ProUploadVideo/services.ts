import request from '@/utils/request';

export const uploadVideo = (body: FormData) => {
  return request({
    url: 'uploads/video',
    method: 'POST',
    body,
  });
};
