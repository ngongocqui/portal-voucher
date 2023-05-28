export interface SettingSystemItem {
  code: string;
  key: string;
  name: string;
  id: string;
  appId: string;
  appSecret: string;
  value: string;
  expired: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}

export interface CreateSettingSystem {
  code: string;
  key: string;
  name: string;
  appId: string;
  appSecret: string;
  value: string;
  expired: string;
}

export interface UpdateSettingSystem {
  code: string;
  key: string;
  name: string;
  appId: string;
  appSecret: string;
  value: string;
  expired: string;
}

export interface QuerySettingSystems {
  data: SettingSystemItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusSettingSystem {
  status: string;
  message: string;
}
