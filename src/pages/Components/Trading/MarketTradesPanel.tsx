import React from 'react';
import { Card, List } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

interface MarketTrade {
  key?: number;
  id?: number;
  price: string | number;
  amount: string | number;
  time: string;
  isBayer: string | boolean | Boolean;   // ← این خط را اصلاح کردم
}

interface MarketTradesPanelProps {
  data?: MarketTrade[];
}

const MarketTradesPanel: React.FC<MarketTradesPanelProps> = ({ data = [] }) => {
  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">معاملات لحظه‌ای</span>
          <ClockCircleOutlined className="text-gray-400 text-xs" />
        </div>
      }
      className="bg-white border-gray-200 shadow-sm"
      headStyle={{ color: '#1e2329', borderBottom: '1px solid #e8e8e8', padding: '8px 12px' }}
      bodyStyle={{ padding: '6px 10px', maxHeight: '180px', overflowY: 'auto' }}
      bordered={false}
    >
      <div className="flex justify-between text-sm text-black mb-1 px-1">
        <span className="w-1/3 text-right">قیمت</span>
        <span className="w-1/3 text-center">مقدار</span>
        <span className="w-1/3 text-left">زمان</span>
      </div>

      <List
        size="small"
        dataSource={data}
        renderItem={(item) => {
          const priceNum = Number(item.price);
          const amountNum = Number(item.amount);

          const isBuyer = Boolean(item.isBayer === 'TRUE' || item.isBayer === true);

          return (
            <List.Item className="!px-1 !py-0.5 border-b border-gray-100">
              <div className="flex justify-between w-full text-[11px]">
                <span
                  className={`w-1/3 text-right text-sm ${
                    isBuyer ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {priceNum.toFixed(2)}
                </span>
                <span className="w-1/3 text-center text-sm text-gray-700">
                  {amountNum.toFixed(4)}
                </span>
                <span className="w-1/3 text-left text-black text-sm">
                  {new Date(item.time).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default MarketTradesPanel;