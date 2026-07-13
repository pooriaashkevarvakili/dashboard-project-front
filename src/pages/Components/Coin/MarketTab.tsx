import React from 'react';
import { FaDollarSign, FaExchangeAlt, FaCoins, FaFire, FaClock, FaGlobe } from 'react-icons/fa';
import { useMarketData } from '../../../hooks/useMarketData';

export const MarketTab: React.FC = () => {
    const { data: market, isLoading, error } = useMarketData();
  
  if (isLoading) return <div>Loading...</div>;
  if (error || !market) return <div>Error</div>;
  const stats = [
    { label: 'Market Cap', value: '$' + (market.marketCap / 1e9).toFixed(2) + 'B', icon: FaDollarSign },
    { label: '24h Volume', value: '$' + (market.volume24h / 1e9).toFixed(2) + 'B', icon: FaExchangeAlt },
    { label: 'Circulating Supply', value: market.circulatingSupply.toLocaleString() + ' BTC', icon: FaCoins },
    { label: 'Total Supply', value: market.totalSupply.toLocaleString() + ' BTC', icon: FaCoins },
    { label: 'Max Supply', value: market.maxSupply.toLocaleString() + ' BTC', icon: FaCoins },
    { label: 'ATH', value: '$' + market.ath.toLocaleString(), icon: FaFire },
    { label: 'ATH Date', value: market.athDate, icon: FaClock },
    { label: 'Dominance', value: market.dominance + '%', icon: FaGlobe },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Statistics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Icon className="text-[#f7931a]" />
                {item.label}
              </div>
              <div className="text-gray-900 font-semibold text-sm truncate">{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};