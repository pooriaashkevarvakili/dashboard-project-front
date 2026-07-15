import React from 'react';
import { FaBitcoin, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useMarketData } from '../../../hooks/useMarketData';

export const CoinHeader: React.FC = () => {
    const { data: market, isLoading, error } = useMarketData();

if (isLoading) return <div>Loading...</div>;
if (error || !market) return <div>Error</div>;

const priceChange = market.change24h;
const isPositive = priceChange >= 0;

if (isLoading) {
  return <div>Loading...</div>;
}

if (error || !market) {
  return <div>Error</div>;
}
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f7931a]/20 flex items-center justify-center">
            <FaBitcoin className="text-[#f7931a] text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Bitcoin</h1>
            <p className="text-xs text-gray-500">BTC / USD</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${market.price.toLocaleString()}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(priceChange).toFixed(2)}% today
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};