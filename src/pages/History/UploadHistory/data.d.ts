export interface UploadHistoryItem {
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface QueryUploadHistory {
  data: UploadHistoryItem[];
  total: number;
  success: boolean;
}
