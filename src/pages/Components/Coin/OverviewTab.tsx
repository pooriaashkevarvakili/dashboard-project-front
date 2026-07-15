import React from 'react';
import { PriceChart } from './PriceChart';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useMarketData } from '../../../hooks/useMarketData';
import { useChartsCoinData } from '../../../hooks/useChartCoinData';
import type { Timeframe } from './data/types';

interface OverviewTabProps {
  timeframe: Timeframe;
  setTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  timeframe,
}) => {
  const {
    data: market,
    isLoading: marketLoading,
    error,
  } = useMarketData();

  const {
    data: chartCoinData = [],
    isLoading: chartLoading,
  } = useChartsCoinData(timeframe);

  if (marketLoading || chartLoading) {
    return <div>Loading...</div>;
  }

  if (error || !market) {
    return <div>Error</div>;
  }

  const chartData = chartCoinData;

  const currentPrice = market.price;
  const priceChange = market.change24h;
  const isPositive = priceChange >= 0;

  const priceHigh = chartData.length
    ? Math.max(...chartData.map((d) => d.y))
    : 0;

  const priceLow = chartData.length
    ? Math.min(...chartData.map((d) => d.y))
    : 0;

  const avgPrice = chartData.length
    ? chartData.reduce((sum, d) => sum + d.y, 0) / chartData.length
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            Bitcoin Price
          </div>

          <div className="text-4xl font-bold text-gray-900">
            ${currentPrice.toLocaleString()}
          </div>

          <div
            className={`flex items-center gap-2 mt-2 text-sm font-medium ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(priceChange).toFixed(2)}%
            <span className="text-gray-500 font-normal">
              24h change
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-gray-500">High:</span>
            <span className="text-gray-900 font-medium ml-1">
              ${priceHigh.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-gray-500">Low:</span>
            <span className="text-gray-900 font-medium ml-1">
              ${priceLow.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-gray-500">Avg:</span>
            <span className="text-gray-900 font-medium ml-1">
              ${avgPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 -mx-2">
        <PriceChart
          data={chartData.slice(-60)}
          height={180}
        />
      </div>
    </div>
  );
};

export default OverviewTab;