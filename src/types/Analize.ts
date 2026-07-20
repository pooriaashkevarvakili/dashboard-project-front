// types.ts
export interface MetricCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export interface Transaction {
  key: string;
  pair: string;
  type: 'خرید' | 'فروش';
  amount: number;
  price: number;
  total: number;
  time: string;
  status: 'تکمیل‌شده' | 'در انتظار' | 'ناموفق';
}

export interface AllocationItem {
  name: string;
  value: number;
  color: string;
}