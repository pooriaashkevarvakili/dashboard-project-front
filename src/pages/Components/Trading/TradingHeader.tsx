import React from 'react';
import { Layout, Typography } from 'antd';
import { useCurrencyExchange } from '../../../hooks/useCurrencyExchange';

const { Header } = Layout;
const { Title } = Typography;

const TradingHeader: React.FC = () => {
  const { data } = useCurrencyExchange();
  const market = data?.[0];

  return (
  <Header className='    flex items-center justify-between
    px-3 md:px-6 xl:px-8 2xl:px-10
    h-14
    md:h-16
    xl:h-20
    2xl:h-24'>
  <div className="flex items-center gap-2">
    <img
      src={market?.icon}
      alt={market?.symbol}
      className="w-6 h-6 md:w-8 md:h-8"
    />
    <Title level={4} className="!mb-0 !text-base md:!text-xl">
      {market?.symbol}
    </Title>
  </div>

  <div className="text-center">
    <div
      className={`text-lg md:text-2xl font-bold ${
        market?.priceChangeDirection === "up"
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {market?.lastPrice.toLocaleString()} USDT
    </div>
  
  </div>

  <div
    className={`px-2 md:px-3 py-1 rounded-md font-semibold text-sm md:text-base ${
      market?.priceChangeDirection === "up"
        ? "text-green-500"
        : "text-orange-500"
    }`}
  >
    {market?.priceChangePercent}
  </div>
</Header>
  );
};

export default TradingHeader;