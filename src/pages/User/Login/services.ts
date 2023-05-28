import request from '@/utils/request';

export const login = async (params: UserLogin.AuthParams) => {
  const res = await request(
    {
      url: 'auth/login',
      method: 'POST',
      body: params,
    },
    false,
    false,
  );
  return res;
};

export const getProfile = async () => {
  const res = await request({
    url: 'auth/profile',
    method: 'GET',
  });
  return res;
};
