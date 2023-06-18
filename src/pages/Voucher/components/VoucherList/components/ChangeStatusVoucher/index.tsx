import React from 'react';
import { Switch } from 'antd';
import { VoucherItem } from '@/pages/Voucher/data';
import { changeStatusVoucher } from '@/pages/Voucher/service';
// @ts-ignore
import { useSelector } from 'umi';
import { VoucherModalState } from '@/pages/Voucher/model';

interface ChangeStatusVoucherProps {
  status: string;
  record: VoucherItem;
}

const ChangeStatusVoucher: React.FC<ChangeStatusVoucherProps> = ({ status, record }) => {
  const voucher: VoucherModalState = useSelector((state: any) => state?.voucher);

  const onChange = async (checked: boolean) => {
    const res = await changeStatusVoucher(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) voucher.VoucherList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeStatusVoucher;
