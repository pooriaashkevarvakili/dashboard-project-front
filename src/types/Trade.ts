// types/Trade.ts
export interface Trader {
    id: string;
    rank: number;
    name: string;
    isVerified: boolean;
    isStarred: boolean;
    totalPnL: number;
    pnlPercent: number;
    winRate: number;
    roi: number;
    followers: number;
    aum: number;
    avgTrade: number;
    tradesCount: number;
    bestTrade: number;
    worstTrade: number;
    strategy: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    performanceData: { date: string; value: number }[];
    monthlyReturns: { month: string; value: number }[];
    isCopying: boolean;
    copyAmount?: number;
}