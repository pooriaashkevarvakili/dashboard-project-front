export interface WalletAsset {
  key: string;
  currency: string;
  name: string;
  icon: string;
  balance: number;
  usdValue: number;
  available: number;
  frozen: number;
  change24h: number;
  address?: string;
}

export interface WalletSummary {
  totalBalance: number;
  totalProfit: number;
  totalProfitPercent: number;
  activePositions: number;
  pendingOrders: number;
}