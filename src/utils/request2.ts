import { extend, ResponseError } from 'umi-request';
import { getToken } from '@/utils/utils';
import { message } from 'antd';
import { history } from '@@/core/history';
// @ts-ignore
import { History, getIntl, getLocale } from 'umi';
import lodash from 'lodash';
import to from 'await-to-js';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };

    localStorage.clear();
    if (!redirect) {
      history.replace('/user/login');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

/**
 * Handle error http
 */
const errorHandler = (error: ResponseError, method: HttpMethod | undefined) => {
  const { messages } = getIntl(getLocale());
  const { response, data } = error;
  let errorText;

  if (response && response.status === 401) {
    replaceGoto();
  }

  if (response && response.status && lodash.isArray(data.message)) {
    errorText = data.message.join('\n');
  }

  if (response && response.status && lodash.isString(data.message)) {
    errorText = data.message;
  }

  if (response && response.status && lodash.isEmpty(errorText)) {
    errorText = messages[`app.request.${response.status}`] || response.statusText;
  }

  if (!response) {
    errorText = 'Mạng không bình thường, không thể kết nối với máy chủ.';
  }

  if (method !== 'GET') message.error(errorText, 3);
};

const extendRequest = extend({
  headers: {},
  ttl: 120000,
  maxCache: 0,
});

interface RequestProps {
  url: string;
  method: HttpMethod;
  body?: any;
  params?: any;
  sorts?: string;
  filters?: string;
  joins?: string;
  headers?: { 'Content-Type': 'application/json' } | object;
}

const request = async (
  initialRequest: RequestProps,
  showMessage: boolean = true,
  authorization: boolean = true,
): Promise<any> => {
  const options: any = {};
  options.method = initialRequest.method;
  options.data = initialRequest.body || {};
  options.headers = { ...initialRequest.headers };

  let query =
    initialRequest.sorts && initialRequest.sorts?.length > 0 ? `?${initialRequest.sorts}` : '';
  if (initialRequest.filters)
    query = query.length > 0 ? `${query}&${initialRequest.filters}` : `?${initialRequest.filters}`;
  if (initialRequest.joins)
    query = query.length > 0 ? `${query}&${initialRequest.joins}` : `?${initialRequest.joins}`;

  if (authorization)
    options.headers = { ...options.headers, Authorization: `Bearer ${getToken()}` };

  const [err, res]: [any, any] = await to(
    extendRequest(`${SOCKET_URL}/${initialRequest.url}${query}`, {
      ...options,
      headers: {
        ...options.headers,
        'x-custom-lang': getLocale(),
      },
      params: { ...initialRequest.params },
    }),
  );
  if (err || !res) errorHandler(err as ResponseError, initialRequest?.method);
  if (res && initialRequest?.method !== 'GET' && res?.message && showMessage) {
    message.success(res?.message);
  }
  return res;
};

export default request;
