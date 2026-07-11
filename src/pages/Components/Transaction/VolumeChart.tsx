// VolumeChart.tsx
import React from 'react';
import { Card, Typography, Alert } from 'antd';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import type { Transaction } from './types/types';
import { useWeek } from '../../../hooks/useWeek';
import { useChartSeries } from '../../../hooks/useChartSeries';

const { Title } = Typography;

interface VolumeChartProps {
  filteredTransactions: Transaction[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ filteredTransactions }) => {
  const { data: week } = useWeek();
  const { data: chartSeriesNumber } = useChartSeries();

  const chartData = React.useMemo(() => {
    return {
      dates: filteredTransactions.map(tx =>
        dayjs(tx.date).format('MM/DD HH:mm')
      ),
      volume: filteredTransactions.map(tx => tx.total),
    };
  }, [filteredTransactions]);

  if (chartData.dates.length === 0) {
    return (
      <Card className="mb-6">
        <Title level={4}>حجم تراکنش‌ها</Title>
        <Alert message="هیچ داده‌ای برای نمایش وجود ندارد" type="warning" />
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm rounded-xl overflow-hidden" bodyStyle={{ padding: '24px' }}>
      <Title level={4} className="mb-4">حجم تراکنش‌ها</Title>
      
      <div style={{ height: '320px' }}>
        <Chart
          type="line"
          height={320}
          series={[
            {
              name: "Test",
              data: chartSeriesNumber?.map((item: any) => item.priceChart) ?? []
            }
          ]}
          options={{
            xaxis: {
              categories: week?.map((item) => item.week) ?? []
            }
          }}
        />
      </div>
    </Card>
  );
};

export default VolumeChart;