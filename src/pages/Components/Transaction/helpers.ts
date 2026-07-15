// helpers.ts
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SwapOutlined,
} from '@ant-design/icons';

type TransactionType = 'deposit' | 'withdraw' | 'buy' | 'sell' | 'swap';
type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled';

export const getTypeConfig = (type: TransactionType) => {
  const configs = {
    deposit: {
      label: 'Deposit',
      icon: ArrowDownOutlined,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    withdraw: {
      label: 'Withdraw',
      icon: ArrowUpOutlined,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    buy: {
      label: 'Buy',
      icon: ShoppingOutlined,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    sell: {
      label: 'Sell',
      icon: DollarOutlined,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    swap: {
      label: 'Swap',
      icon: SwapOutlined,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  } as const;

  return configs[type];
};

export const getStatusConfig = (status: TransactionStatus) => {
  const configs = {
    completed: { label: 'Completed', color: 'success' },
    pending: { label: 'Pending', color: 'warning' },
    failed: { label: 'Failed', color: 'error' },
    cancelled: { label: 'Cancelled', color: 'default' },
  } as const;

  return configs[status];
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};