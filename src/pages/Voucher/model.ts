// @ts-ignore
import { Reducer } from 'umi';

export interface VoucherModalState {
  VoucherList?: {
    reload?: () => void;
  };
}

export interface VoucherModelType {
  namespace: string;
  state: VoucherModalState;
  reducers: {
    updateVoucherList: Reducer<VoucherModalState>;
  };
}

const VoucherModel: VoucherModelType = {
  namespace: 'voucher',
  state: {
    VoucherList: {
      reload: undefined,
    },
  },

  reducers: {
    updateVoucherList(state, action) {
      const VoucherList = state?.VoucherList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        VoucherList[k] = fields[k];
      });
      return { ...state, VoucherList };
    },
  },
};

export default VoucherModel;
