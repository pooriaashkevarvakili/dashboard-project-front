import React from 'react';
import { Card } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useCurrencyExchange } from '../../../hooks/useCurrencyExchange';

interface OrderBookItem {
  key?: number;
  price: string | number;
  amount: string | number;
  total: string | number;
  side: string | boolean | Boolean;  
}

interface OrderBookPanelProps {
  data?: OrderBookItem[];
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ data = [] }) => {
      const { data:dataOrder } = useCurrencyExchange();
      const market = dataOrder?.[0];
  const asks = data.filter(item => 
    String(item.side).toUpperCase() === 'ASK'
  );
  
  const bids = data.filter(item => 
    String(item.side).toUpperCase() === 'BID'
  );

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">دفتر سفارشات</span>
          <span className="text-xs text-gray-500">BTC/USDT</span>
        </div>
      }
      className="bg-white border-gray-200 shadow-sm"
      headStyle={{ 
        color: '#1e2329', 
        borderBottom: '1px solid #e8e8e8', 
        padding: '8px 12px' 
      }}
      bodyStyle={{ 
        padding: '6px 10px', 
        maxHeight: '280px', 
        overflowY: 'auto' 
      }}
      bordered={false}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-sm text-black mb-1 px-1">
          <span className="w-1/3 text-right ">قیمت</span>
          <span className="w-1/3 text-center ">مقدار</span>
          <span className="w-1/3 text-left">مجموع</span>
        </div>

        {/* Asks - قرمز */}
        <div className="space-y-0.5">
          {asks.map((item, idx) => {
            const priceNum = Number(item.price);
            const amountNum = Number(item.amount);
            const totalNum = Number(item.total);

            return (
              <div
                key={`ask-${item.key || idx}`}
                className="flex justify-between text-[11px] hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
              >
                <span className="w-1/3 text-right text-red-500 text-sm">{priceNum.toFixed(2)}</span>
                <span className="w-1/3 text-center text-sm text-black">{amountNum.toFixed(4)}</span>
                <span className="w-1/3 text-left text-sm text-black">{totalNum.toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        {/* قیمت میانی */}
        <div className="flex justify-between items-center py-1.5 border-y border-gray-200 my-1">
            <span
    className={`font-bold font-mono text-sm ${
      market?.priceChangeDirection === "up"
        ? "text-green-500"
        : "text-red-500"
    }`}
  >
    {Number(market?.lastPrice).toLocaleString()}
  </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-600 flex items-center">
              <CaretUpOutlined /> 
              <span
      className={`text-xs flex items-center gap-1 ${
        market?.priceChangeDirection === "up"
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {market?.priceChangeDirection === "up" ? (
        <CaretUpOutlined />
      ) : (
        <CaretDownOutlined />
      )}

      {market?.priceChangePercent}
    </span>
            </span>
            <span className="text-[10px] text-gray-400">~</span>
          </div>
        </div>

        {/* Bids - سبز */}
        <div className="space-y-0.5">
          {bids.map((item, idx) => {
            const priceNum = Number(item.price);
            const amountNum = Number(item.amount);
            const totalNum = Number(item.total);

            return (
              <div
                key={`bid-${item.key || idx}`}
                className="flex justify-between text-[11px] hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
              >
                <span className="w-1/3 text-right text-green-600 text-sm">{priceNum.toFixed(2)}</span>
                <span className="w-1/3 text-center text-sm text-black">{amountNum.toFixed(4)}</span>
                <span className="w-1/3 text-left text-sm text-black">{totalNum.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default OrderBookPanel;