import type { Trader } from '../../../../types/Trade';

const generatePerformanceData = (base: number, volatility: number, trend: number, points: number = 30) => {
    const data = [];
    let value = base;
    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.45) * volatility + trend;
        value = Math.max(value + change, base * 0.5);
        data.push({
            date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: Math.round(value * 100) / 100,
        });
    }
    return data;
};

export const tradersData: Trader[] = [
    {
        id: '1',
        rank: 1,
        name: 'CryptoWhale',
        isVerified: true,
        isStarred: true,
        totalPnL: 12450.80,
        pnlPercent: 34.2,
        winRate: 78.5,
        roi: 42.7,
        followers: 3421,
        aum: 1240000,
        avgTrade: 3200,
        tradesCount: 156,
        bestTrade: 2800,
        worstTrade: -420,
        strategy: 'Scalping & Swing',
        riskLevel: 'Medium',
        performanceData: generatePerformanceData(100, 3, 0.8, 40),
        monthlyReturns: [],
        isCopying: false,
    },
    {
        id: '2',
        rank: 2,
        name: 'AlphaTrader',
        isVerified: true,
        isStarred: false,
        totalPnL: 9820.30,
        pnlPercent: 28.6,
        winRate: 72.3,
        roi: 35.1,
        followers: 2856,
        aum: 980000,
        avgTrade: 2100,
        tradesCount: 203,
        bestTrade: 1900,
        worstTrade: -580,
        strategy: 'Momentum',
        riskLevel: 'High',
        performanceData: generatePerformanceData(100, 5, 1.2, 40),
        monthlyReturns: [],
        isCopying: false,
    },
    {
        id: '3',
        rank: 3,
        name: 'SmartInvestor',
        isVerified: false,
        isStarred: true,
        totalPnL: 7650.50,
        pnlPercent: 22.4,
        winRate: 68.9,
        roi: 29.8,
        followers: 2103,
        aum: 750000,
        avgTrade: 1800,
        tradesCount: 178,
        bestTrade: 1500,
        worstTrade: -320,
        strategy: 'Value & Growth',
        riskLevel: 'Low',
        performanceData: generatePerformanceData(100, 1.5, 0.5, 40),
        monthlyReturns: [],
        isCopying: false,
    },
];