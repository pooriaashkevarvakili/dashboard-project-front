import React from 'react';
import { PriceChart } from './PriceChart';
import type { Timeframe } from './data/types';
import { useChartsCoinData } from '../../../hooks/useChartCoinData';

interface ChartTabProps {
  timeframe: Timeframe;
  setTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
}

const ChartTab: React.FC<ChartTabProps> = ({
  timeframe,
  setTimeframe,
}) => {
  const {
    data: chartData = [],
    isLoading,
    isError,
  } = useChartsCoinData(timeframe);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading chart.</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Price Chart
          </h2>
          <p className="text-sm text-gray-500">
            Bitcoin / USD
          </p>
        </div>

        <div className="flex gap-1">
          {(['1W', '1M', '3M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeframe === tf
                  ? 'bg-[#f7931a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <PriceChart
        data={chartData}
        height={420}
      />
    </div>
  );
};

export default ChartTab;