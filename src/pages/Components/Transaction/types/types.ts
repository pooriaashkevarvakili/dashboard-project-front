// types.ts
export type TransactionType = 'deposit' | 'withdraw' | 'buy' | 'sell' | 'swap';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  coin: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: TransactionStatus;
  date: string;
  from?: string;
  to?: string;
  description?: string;
  txHash?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalVolume: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalBuys: number;
  totalSells: number;
  totalSwaps: number;
  successRate: number;
}

// Props Interfaces
export interface TransactionHeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export interface StatsCardsProps {
  stats: TransactionStats;
  uniqueCoins: number;
}

export interface VolumeChartProps {
  filteredTransactions: Transaction[];
}

export interface TransactionFiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  selectedType: TransactionType | 'all';
  setSelectedType: (value: TransactionType | 'all') => void;
  selectedCoin: string;
  setSelectedCoin: (value: string) => void;
  dateRange: [any, any] | null; // dayjs simplified
  setDateRange: (dates: [any, any] | null) => void;
  uniqueCoins: string[];
  onReset: () => void;
}

export interface TransactionTableSectionProps {
  filteredTransactions: Transaction[];
  activeTab: string;
  setActiveTab: (key: string) => void;
  loading: boolean;
}

export interface TransactionRowProps {
  record: Transaction;
}