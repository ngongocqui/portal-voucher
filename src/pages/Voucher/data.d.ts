export interface VoucherItem {
  createdAt: string;
  id: string;
  discount: number;
  status: string;
  updatedAt: string;
}

export interface QueryVouchers {
  data: VoucherItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusVoucher {
  status: string;
  message: string;
}
