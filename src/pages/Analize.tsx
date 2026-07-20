// Analize.tsx
import React from 'react';
import { ConfigProvider, Typography } from 'antd';

import MetricsRow from '../pages/Components/Analize/MetricsRow';
import MainCharts from '../pages/Components/Analize/MainCharts';
import ProfitAndStats from '../pages/Components/Analize/ProfitAndStats';
import RecentTransactions from '../pages/Components/Analize/RecentTransactions';

const { Title, Text } = Typography;

const Analize: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Title level={2} className="!text-gray-900 !mb-1">
              داشبورد تحلیلی
            </Title>
            <Text className="text-gray-500 text-lg">
              عملکرد لحظه‌ای سبد ارزهای دیجیتال
            </Text>
          </div>

         
        </div>

        <MetricsRow />
        <MainCharts />
        <ProfitAndStats />
        <RecentTransactions />
      </div>
    </ConfigProvider>
  );
};

export default Analize;