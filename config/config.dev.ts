import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    SERVER_API: 'https://apivoucher-ngongocqui.cloud.okteto.net',
    SOCKET_URL: 'https://apivoucher-ngongocqui.cloud.okteto.net',
    HOST_NAME: 'http://localhost:8000',
    KEY_GOOGLE_MAP: 'AIzaSyDCm32QP-RshEWhMbzvFAgR-87qMlnFQEw',
    UPLOAD_FILE_SIZE: 1048576 * 100,
  },
});
