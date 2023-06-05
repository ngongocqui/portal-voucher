export interface CampaignItem {
  code: string;
  createdAt: string;
  id: string;
  name: string;
  quantity: number;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
  updatedAt: string;
}

export interface CreateCampaign {
  code: string;
  name: string;
  quantity: number;
  discount: number;
  startDate: string;
  endDate: string;
}

export interface UpdateCampaign {
  code: string;
  name: string;
  quantity: number;
  discount: number;
  startDate: string;
  endDate: string;
}

export interface QueryCampaigns {
  data: CampaignItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCampaign {
  status: string;
  message: string;
}
