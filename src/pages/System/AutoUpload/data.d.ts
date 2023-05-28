export interface AutoUploadItem {
  name: string;
  id: string;
  link: string;
  failed: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}

export interface QueryAutoUpload {
  data: AutoUploadItem[];
  total: number;
  success: boolean;
}
