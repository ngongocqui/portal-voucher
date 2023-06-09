import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    SERVER_API: 'https://apivoucher-ngongocqui.cloud.okteto.net',
    SOCKET_URL: 'https://apivoucher-ngongocqui.cloud.okteto.net',
    HOST_NAME: 'https://portal.animefree.online',
    KEY_GOOGLE_MAP: 'AIzaSyDCm32QP-RshEWhMbzvFAgR-87qMlnFQEw',
    UPLOAD_FILE_SIZE: 1048576 * 100, //its 100MB, increase the number measure in mb
  },
});
