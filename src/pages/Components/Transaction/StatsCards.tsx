import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import type { TransactionStats } from './types/types';
import { useStatsCard } from '../../../hooks/useStatsCard';

const { Text } = Typography;

interface StatsCardsProps {
  stats: TransactionStats;
  uniqueCoins: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ }) => {
  const {data:StatsCard}=useStatsCard()


  return (
    <Row gutter={[16, 16]} className="mb-6">
      {StatsCard.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl overflow-hidden" bodyStyle={{ padding: '20px 24px' }}>
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.title}</Text>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{card.change}</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
  <span className="text-2xl">
    {card.icon}
  </span>
  </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;