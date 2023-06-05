import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    SERVER_API: 'http://localhost:3333',
    SOCKET_URL: 'http://localhost:3333',
    HOST_NAME: 'http://localhost:8000',
    KEY_GOOGLE_MAP: 'AIzaSyDCm32QP-RshEWhMbzvFAgR-87qMlnFQEw',
    UPLOAD_FILE_SIZE: 1048576 * 100,
  },
});
